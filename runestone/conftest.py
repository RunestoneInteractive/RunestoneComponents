# ***************************************
# |docname| - pytest fixtures for testing
# ***************************************
# This defines fixtures specific to the client for test. These same fixtures are defined differently on the server to accommodate the different setup these.
#
# TODO: rewrite the tests to use pytest-native syntax, then put the contents of ``unittest_base`` here.
#
# Imports
# =======
# These are listed in the order prescribed by `PEP 8
# <http://www.python.org/dev/peps/pep-0008/#imports>`_.
#
# Standard library
# ----------------
import subprocess


# Third-party imports
# -------------------
import pytest


# Local imports
# -------------
# This is necessary to bring in the shared pytest fixture.
from runestone.shared_conftest import _SeleniumUtils, selenium_driver  # noqa: F401
from runestone.unittest_base import ModuleFixture, HOST_URL, IS_WINDOWS


# Fixtures
# ========
# Run this once, before all tests, to update the webpacked JS.
@pytest.fixture(scope="session", autouse=True)
def run_webpack():
    # Note that Windows requires ``shell=True``, since the command to execute is ``npm.cmd``.
    p = subprocess.run(["npm", "run", "build"], text=True, shell=IS_WINDOWS, capture_output=True)
    print(p.stderr + p.stdout)
    assert not p.returncode


# Provide access to the module fixture, for tests with specific needs.
@pytest.fixture(scope="module")
def selenium_module_fixture(request):
    # Allow tests to specify the ``exit_status_success`` parameter passed to the ModuleFixture constructor by adding the ``@pytest.mark.exit_status_success(False)`` decorator to a test. (Marking it True instead is equivalent to the unmarked, default value.) See the `example <https://docs.pytest.org/en/stable/fixture.html#using-markers-to-pass-data-to-fixtures>`_ and the API docs <https://docs.pytest.org/en/stable/reference.html#pytest.nodes.Node.get_closest_marker>`_.
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
