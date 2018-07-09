import unittest
import os
import sys
import platform
import subprocess
from selenium import webdriver
from pyvirtualdisplay import Display

# Select an unused port for serving web pages to the test suite.
PORT = '8081'

# Define `module modules fixtures <https://docs.python.org/2/library/unittest.html#setupmodule-and-teardownmodule>`_ to build the test Runestone project, run the server, then shut it down when the tests complete.
class ModuleFixture(unittest.TestCase):
    def __init__(self,
        # The path to the Python module in which the test resides. This provides a simple way to determine the path in which to run runestone build/serve.
        module_path):

        super(ModuleFixture, self).__init__()
        self.base_path = os.path.dirname(module_path)
        # Windows Compatability
        if platform.system() is 'Windows' and self.base_path is '':
            self.base_path = '.'

    def setUpModule(self):
        # Change to this directory for running Runestone.
        self.old_cwd = os.getcwd()
        os.chdir(self.base_path)
        # Compile the docs. Save the stdout and stderr for examination.
        p = subprocess.Popen(['runestone', 'build', '--all'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
        self.build_stdout_data, self.build_stderr_data = p.communicate()
        print(self.build_stdout_data + self.build_stderr_data)
        self.assertFalse(p.returncode)
        # Run the server. Simply calling ``runestone serve`` fails, since the process killed isn't the actual server, but probably a setuptools-created launcher.
        self.runestone_server = subprocess.Popen(['python', '-m', 'runestone', 'serve', '--port', PORT])

    def tearDownModule(self):
        # Shut down the server.
        self.runestone_server.kill()
        # Restore the directory.
        os.chdir(self.old_cwd)

    # Without this, Python 2.7 produces errors when running unit tests:
    #
    #   .. code::
    #       :number-lines:
    #
    #       python -m unitest discover
    #
    #       ImportError: Failed to import test module: runestone.tabbedStuff.test.test_tabbedStuff
    #       Traceback (most recent call last):  (omitted)
    #       ValueError: no such test method in <class 'runestone.unittest_base.ModuleFixture'>: runTest
    def runTest(self):
        pass

# Provide a simple way to instantiante a ModuleFixture in a test module. Typical use:
#
# .. code:: Python
#   :number-lines:
#
#   from unittest_base import module_fixture_maker
#   setUpModule, tearDownModule = module_fixture_maker(__file__)
def module_fixture_maker(module_path, return_mf=False):
    mf = ModuleFixture(module_path)
    if return_mf:
        return mf, mf.setUpModule, mf.tearDownModule
    else:
        return mf.setUpModule, mf.tearDownModule

# Provide a base test case which sets up the `Selenium <http://selenium-python.readthedocs.io/>`_ driver.
class RunestoneTestCase(unittest.TestCase):
    def setUp(self):
        # `PyVirtualDisplay <http://pyvirtualdisplay.readthedocs.io/en/latest/>`_ only runs on X-windows, meaning Linux. Mac seems to have `some support <https://support.apple.com/en-us/HT201341>`_. Windows is out of the question.
        if sys.platform.startswith('linux'):
            self.display = Display(visible=0, size=(1280, 1024))
            self.display.start()
        else:
            self.display = None
        #self.driver = webdriver.PhantomJS() # use this for Jenkins auto testing
        # options = webdriver.ChromeOptions()
        # options.add_argument("headless")
        # options.add_argument("window-size=1200x800")
        #self.driver = webdriver.Chrome(chrome_options=options)  # good for development.
        self.driver = webdriver.Chrome()  # good for development.
        self.driver.implicitly_wait(10)

        self.host = 'http://127.0.0.1:' + PORT

    def tearDown(self):
        self.driver.quit()
        if self.display:
            self.display.stop()
