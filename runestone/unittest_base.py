# **************************************************************
# |docname| - Base classes for RunestoneComponents test fixtures
# **************************************************************
#
# Imports
# =======
# These are listed in the order prescribed by `PEP 8
# <http://www.python.org/dev/peps/pep-0008/#imports>`_.
#
# Standard library
# ----------------
import logging
import os
import platform
import signal
import time
import subprocess
import sys
import unittest
from urllib.request import urlopen
from urllib.error import URLError

# Third-party imports
# -------------------
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
import pytest
from pyvirtualdisplay import Display

logging.basicConfig(level=logging.WARN)
mylogger = logging.getLogger()

# Local imports
# -------------
# None

# Globals
# =======
# Select an unused port for serving web pages to the test suite.
PORT = "8081"
# Use the localhost for testing.
HOST_ADDRESS = "127.0.0.1:" + PORT
HOST_URL = "http://" + HOST_ADDRESS


# Define the platform.
IS_WINDOWS = platform.system() == "Windows"
IS_LINUX = sys.platform.startswith("linux")

# Provide access to the currently-active ModuleFixture object.
mf = None


# Code
# ====
# Define `module fixtures <https://docs.python.org/2/library/unittest.html#setupmodule-and-teardownmodule>`_ to build the test Runestone project, run the server, then shut it down when the tests complete.
class ModuleFixture(unittest.TestCase):
    def __init__(
        self,
        # The path to the Python module in which the test resides. This provides a simple way to determine the path in which to run runestone build/serve.
        module_path,
        # True if the sphinx-build process must exit with status of 0 (success)
        exit_status_success=True,
    ):

        super(ModuleFixture, self).__init__()
        self.base_path = os.path.dirname(module_path)
        self.exit_status_success = exit_status_success
        # Windows Compatability
        if IS_WINDOWS and self.base_path == "":
            self.base_path = "."

    def setUpModule(self):
        # Change to this directory for running Runestone.
        self.old_cwd = os.getcwd()
        os.chdir(self.base_path)
        # use `run` so that `npm run build` completes before we move on to `runestone build`
        # otherwise the runestone build may fail due to lack of a runestone.js file!
        p = subprocess.run(
            ["npm.cmd" if IS_WINDOWS else "npm", "run", "build"],
            capture_output=True,
            text=True,
        )
        print(p.stdout + p.stderr)
        self.assertFalse(p.returncode)
        # Compile the docs. Save the stdout and stderr for examination.
        p = subprocess.run(
            ["runestone", "build", "--all"], capture_output=True, text=True,
        )
        self.build_stdout_data = p.stdout
        self.build_stderr_data = p.stderr
        print(self.build_stdout_data + self.build_stderr_data)
        if self.exit_status_success:
            self.assertFalse(p.returncode)
        # Make sure any older servers on port 8081 are killed.
        if IS_WINDOWS:
            netstat_output = subprocess.run(
                # Flags are:
                #
                # -n: Display addresses numerically. Looking up names is slow.
                # -o: Include the PID for each connection.
                ["netstat", "-no"],
                capture_output=True,
                text=True,
            ).stdout
            # Skip the first four lines, which are headings.
            for connection in netstat_output.splitlines()[4:]:
                # Typical output is:
                ##   Proto  Local Address          Foreign Address        State           PID
                ##   TCP    127.0.0.1:1277         127.0.0.1:49971        ESTABLISHED     4624
                proto, local_address, foreign_address, state, pid = connection.split()
                pid = int(pid)
                if local_address == HOST_ADDRESS and pid != 0:
                    os.kill(pid, 0)
        else:
            lsof_output = subprocess.run(
                ["lsof", "-i", ":{0}".format(PORT)], capture_output=True, text=True,
            ).stdout
            for process in lsof_output.split("\n")[1:]:
                data = [x for x in process.split(" ") if x != ""]
                if len(data) <= 1:
                    continue
                ptokill = int(data[1])
                mylogger.warn(
                    "Attempting to kill a stale runestone serve process: {}".format(
                        ptokill
                    )
                )
                os.kill(ptokill, signal.SIGKILL)
                time.sleep(2)  # give the old process a couple seconds to clear out
                try:
                    os.kill(ptokill, 0)  # will throw an Error if process gone
                    pytest.exit(
                        "Stale runestone server can't kill process: {}".format(ptokill)
                    )
                except ProcessLookupError:
                    # The process was killed
                    pass
                except PermissionError:
                    pytest.exit(
                        "Another server is using port {} process: {}".format(
                            PORT, ptokill
                        )
                    )
                except Exception:
                    pytest.exit(
                        "Unknown error while trying to kill stale runestone server"
                    )

        # Run the server. Simply calling ``runestone serve`` fails, since the process killed isn't the actual server, but probably a setuptools-created launcher.
        self.runestone_server = subprocess.Popen(
            [sys.executable, "-m", "runestone", "serve", "--port", PORT]
        )

        # Testing time in dominated by browser startup/shutdown. So, simply run all tests in a module in a single browser instance to speed things up. See ``RunestoneTestCase.setUp`` for additional code to (mostly) clear the browser between tests.
        #
        # `PyVirtualDisplay <http://pyvirtualdisplay.readthedocs.io/en/latest/>`_ only runs on X-windows, meaning Linux. Mac seems to have `some support <https://support.apple.com/en-us/HT201341>`_. Windows is out of the question.
        if IS_LINUX:
            self.display = Display(visible=0, size=(1280, 1024))
            self.display.start()
        else:
            self.display = None
        # self.driver = webdriver.PhantomJS() # use this for Jenkins auto testing
        options = Options()
        options.add_argument("--window-size=1200,800")
        options.add_argument("--no-sandbox")
        self.driver = webdriver.Chrome(options=options)  # good for development.

        # Make this accessible
        global mf
        mf = self

        # Wait for the webserver to come up.
        for tries in range(50):
            try:
                urlopen(HOST_URL, timeout=5)
            except URLError:
                # Wait for the server to come up.
                time.sleep(0.1)
            else:
                # The server is up. We're done.
                break

    def tearDownModule(self):
        # Shut down Selenium.
        self.driver.quit()
        if self.display:
            self.display.stop()
        # Shut down the server.
        self.runestone_server.kill()
        # Restore the directory.
        os.chdir(self.old_cwd)

        global mf
        mf = None


# Provide a simple way to instantiante a ModuleFixture in a test module. Typical use:
#
# .. code:: Python
#   :number-lines:
#
#   from unittest_base import module_fixture_maker
#   setUpModule, tearDownModule = module_fixture_maker(__file__)
def module_fixture_maker(module_path, return_mf=False, exit_status_success=True):
    mf = ModuleFixture(module_path, exit_status_success)
    if return_mf:
        return mf, mf.setUpModule, mf.tearDownModule
    else:
        return mf.setUpModule, mf.tearDownModule


# Provide a base test case which sets up the `Selenium <http://selenium-python.readthedocs.io/>`_ driver.
class RunestoneTestCase(unittest.TestCase):
    def setUp(self):
        # Use the shared module-wide driver.
        self.driver = mf.driver
        self.host = HOST_URL
        # Add an `implicit wait <https://selenium-python.readthedocs.io/waits.html#implicit-waits>`_.
        self.driver.implicitly_wait(10)
        # For cases where an implicit wait does not help.  For example waiting for text to appear
        # after running an activecode.  We create an explicit wait object.
        self.wait = WebDriverWait(self.driver, 10)

    def tearDown(self):
        # Clear as much as possible, to present an almost-fresh instance of a browser for the next test. (Shutting down then starting up a browswer is very slow.)
        self.driver.execute_script("window.localStorage.clear();")
        self.driver.execute_script("window.sessionStorage.clear();")
        self.driver.delete_all_cookies()


# An expectation for Selenium, used for checking that an element has a particular css class. From the `Selenium docs <https://selenium-python.readthedocs.io/waits.html#explicit-waits>`_, under the "Custom wait conditions" subheading.
#
# locator - used to find the element
#
# returns the WebElement once it has the particular css class.
class element_has_css_class:
    def __init__(
        self,
        # The element to find; this is passed directly to `driver.find_element <https://selenium-python.readthedocs.io/api.html#selenium.webdriver.remote.webdriver.WebDriver.find_element>`_. See the `Selenium docs`_.
        locator,
        # The CSS class to look for.
        css_class,
    ):

        self.locator = locator
        self.css_class = css_class

    def __call__(self, driver):
        # Find the referenced element.
        element = driver.find_element(*self.locator)
        if self.css_class in element.get_attribute("class"):
            return element
        else:
            return False
