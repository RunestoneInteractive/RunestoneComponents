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
# None.
#
# Third-party imports
# -------------------
import pytest


# Local imports
# -------------
# This is necessary to bring in the shared pytest fixture.
from runestone.shared_conftest import _SeleniumUtils, selenium_driver  # noqa: F401
from runestone.unittest_base import ModuleFixture, HOST_URL, run_webpack  # noqa: F401


# Fixtures
# ========
@pytest.fixture(scope="module")
def selenium_driver_session(request):
    mf = ModuleFixture(request.fspath, True)
    mf.setUpModule()
    yield mf.driver
    mf.tearDownModule()


# Present ``_SeleniumUser`` as a fixture. To use, provide it with a ``_TestUser`` instance.
@pytest.fixture
def selenium_utils(selenium_driver):  # noqa: F811
    return _SeleniumUtils(selenium_driver, HOST_URL)
