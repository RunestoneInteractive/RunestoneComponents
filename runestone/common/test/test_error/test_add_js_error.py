import pytest


# This test causes Sphinx to produce an error, so don't abort the test when this happens. See `selenium_module_fixture`.
pytestmark = pytest.mark.exit_status_success(False)


def test_1(selenium_module_fixture):
    assert(
        "Extension error:\nUnable to find this_file_does_not_exist.js in html_static_path." in
        selenium_module_fixture.build_stderr_data,
    )
