# ***************************************
# |docname| - pytest fixtures for testing
# ***************************************
# This defines fixtures specific to the client for test. These same fixtures are defined differently on the server to accommodate the different setup these.
#
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
import pytest
from pyvirtualdisplay import Display
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# Local imports
# -------------
# This is necessary to bring in the shared pytest fixture.
from runestone.shared_conftest import _SeleniumUtils, selenium_driver  # noqa: F401
logging.basicConfig(level=logging.WARN)


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

mylogger = logging.getLogger()


# Fixtures
# ========
# Run this once, before all tests, to update the webpacked JS.
@pytest.fixture(scope="session", autouse=True)
def run_webpack():
    # Note that Windows requires ``shell=True``, since the command to execute is ``npm.cmd``.
    p = subprocess.run(["npm", "run", "build"], text=True, shell=IS_WINDOWS, capture_output=True)
    print(p.stderr + p.stdout)
    assert not p.returncode

# .. _selenium_module_fixture:
#
# ``selenium_module_fixture``
# ---------------------------
# Provide access to the Selenium module fixture, for tests with specific needs.
@pytest.fixture(scope="module")
def selenium_module_fixture(request):
    # Allow modules to specify the ``exit_status_success`` parameter passed to the ``ModuleFixture``` constructor by adding the statement ``pytestmark = pytest.mark.exit_status_success(False)``. (Since this is a module-scoped fixture, applying this mark to an individual test has no effect. Marking it True instead is equivalent to the unmarked, default value.) See the `example <https://docs.pytest.org/en/stable/fixture.html#using-markers-to-pass-data-to-fixtures>`_ (which applies only to function-scoped marks, not module-scoped marks), `marking whole classes or modules <https://docs.pytest.org/en/6.2.x/example/markers.html#marking-whole-classes-or-modules>`_, and the `API docs <https://docs.pytest.org/en/stable/reference.html#pytest.nodes.Node.get_closest_marker>`_.
    exit_status_success_mark = request.node.get_closest_marker("exit_status_success")
    exit_status_success = True if exit_status_success_mark is None else exit_status_success_mark.args[0]

    mf = ModuleFixture(request.fspath, exit_status_success)
    mf.setUpModule()
    yield mf
    mf.tearDownModule()


# Provide access to the Selenium driver.
@pytest.fixture(scope="module")
def selenium_driver_session(selenium_module_fixture):
    return selenium_module_fixture.driver


# Present ``_SeleniumUser`` as a fixture.
@pytest.fixture
def selenium_utils(selenium_driver):  # noqa: F811
    return _SeleniumUtils(selenium_driver, HOST_URL)


# Provide a fixture which loads the ``index.html`` page.
@pytest.fixture
def selenium_utils_get(selenium_utils):
    selenium_utils.get("index.html")
    return selenium_utils


# Utility class
# =============
# Define a class to build the test Runestone project, run the server, then shut it down when the tests complete.
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
        if IS_LINUX and not os.environ.get("DISPLAY"):
            self.display = Display(visible=0, size=(1280, 1024))
            self.display.start()
        else:
            self.display = None
        # self.driver = webdriver.PhantomJS() # use this for Jenkins auto testing
        options = Options()
        options.add_argument("--window-size=1200,800")
        options.add_argument("--no-sandbox")
        self.driver = webdriver.Chrome(options=options)  # good for development.

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
        self.driver.close()
        self.driver.quit()
        if self.display:
            self.display.stop()
        # Shut down the server.
        self.runestone_server.kill()
        # Restore the directory.
        os.chdir(self.old_cwd)
