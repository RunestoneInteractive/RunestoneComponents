# **************************************************************
# |docname| - pytest fixtures used by both the client and server
# **************************************************************
# The goal of this test framework is to enable tests written for the Runestone Components to be easily run on the server, where values stored by the database can also be checked. This avoids a duplication of test code between Runestone Components and the server.
#
# To accomplish this goal, this file provides functions that work on both client and server. Then, the client and server must each uniquely define two fixtures (see `conftest.py`) specalized for that environment which provided the same results (access to the Selenium WebDriver and to a class of Selenium utilities). Both client and server tests must import from this file; tests can then
#
# Structure:
#
# - The ``selenium_driver_session`` fixture performs client- and server-specific setup, then returns an instance of a Selenium WebDriver. Since it's specific to the environment, this fixture must be defined differently for client and server. It should be defined at the module level or higher, since starting Selenium is an expensive operation.
# - The shared `selenium_driver`_ fixture then sets up/tears down the Selenium environment for each test.
# - The client/server-specific ``selenium_utils`` fixture wraps the shared `_SeleniumUtils`_ class, which provides a common set of methods for the tests.
# - All client tests should use the ``selenium_utils`` fixture, ensuring that they can run in either environment.
#
# Imports
# =======
# These are listed in the order prescribed by `PEP 8
# <http://www.python.org/dev/peps/pep-0008/#imports>`_.
#
# Standard library
# ----------------
import logging

# Third-party imports
# -------------------
import pytest
from selenium.common.exceptions import StaleElementReferenceException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

# Local imports
# -------------
# None.


# Code
# ====
#
# selenium_driver
# ---------------
# Provide a way to reset the state of Selenium for each test, without exiting/restarting the driver (which is slow).
@pytest.fixture()
def selenium_driver(selenium_driver_session):
    driver = selenium_driver_session
    # Copied from the Runestone Components test framework.
    driver.implicitly_wait(10)

    try:
        yield driver
    finally:
        # Print the logs -- see the setup in `selenium_logging <selenium_logging>`. Capture them if setup fails, since the logs may help understand the failure. However, pytest ignore any generated logs; see `my bug report <https://github.com/pytest-dev/pytest/issues/9021>`_. As a workaround, uncomment the print statement below to dump unfiltered logs during a test run.
        #
        # Transform Chrome log levels to `Python log levels <https://docs.python.org/3/library/logging.html#logging-levels>`_.
        chrome_to_py_loglevels = {
            "NOTSET": 0,
            "DEBUG": 10,
            "INFO": 20,
            "WARNING": 30,
            "ERROR": 40,
            "SEVERE": 40,
            "CRITICAL": 50,
        }
        py_logger = logging.getLogger("Chrome.JavaScript.console")
        chrome_logs = driver.get_log("browser")
        for log in chrome_logs:
            py_logger.log(chrome_to_py_loglevels[log["level"]], log["message"])
            # Uncomment this to print raw log-like data as a workaround, as described above.
            ##print(f"{log['level']} - {log['message']}")

    # Clear as much as possible, to present an almost-fresh instance of a browser for the next test. (Shutting down then starting up a browser is very slow.)
    driver.execute_script("window.localStorage.clear();")
    driver.execute_script("window.sessionStorage.clear();")
    driver.delete_all_cookies()


# _SeleniumUtils
# --------------
# Provide basic Selenium-based operations.
class _SeleniumUtils:
    def __init__(
        self,
        # These are fixtures.
        runestone_selenium_driver,
        host_address,
    ):

        self.driver = runestone_selenium_driver
        self.host_address = host_address
        self.wait = WebDriverWait(self.driver, 10)

    # A helper function to attach to the Selenium driver: get from a URL relative to the Runestone application.
    def get(self, relative_url):
        return self.driver.get("{}/{}".format(self.host_address, relative_url))

    # Scroll to the top of the window. A button can sometimes be scrolled to the top of the screen, where it's hidden by the navigation bar. In this case, we can't click it, since Selenium will complain ``Message: element click intercepted: Element <button class="btn btn-success run-button" type="button">...</button> is not clickable at point (460, 17). Other element would receive the click: <div class="navbar-collapse collapse navbar-ex1-collapse">...</div>``. To avoid this, scroll to the top of the document, guaranteeing that the navbar won't be hiding the run button.
    def scroll_to_top(self):
        self.driver.execute_script("window.scrollTo(0, 0);")

    # Wait until a Runestone component has finished rendering itself, given the ID of the component.
    def wait_until_ready(self, id):
        # The component is ready when it has the class below.
        self.wait.until(element_has_css_class((By.ID, id), "runestone-component-ready"))


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
        # Find the referenced element. Ignore stale elements.
        try:
            element = driver.find_element(*self.locator)
            if self.css_class in element.get_attribute("class"):
                return element
        except StaleElementReferenceException:
            pass
        return False
