from unittest import TestCase
import codecs
from selenium.webdriver.common.alert import Alert
from runestone.unittest_base import module_fixture_maker, RunestoneTestCase

mf, setUpModule, tearDownModule = module_fixture_maker(__file__, True, False)


class AddJsTestsError(TestCase):
    def test_1(self):
        self.assertIn('Extension error:\nUnable to find this_file_does_not_exist.js in html_static_path.', mf.build_stderr_data)
