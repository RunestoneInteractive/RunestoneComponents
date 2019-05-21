from unittest import TestCase
import codecs
from selenium.webdriver.common.alert import Alert
from runestone.unittest_base import module_fixture_maker, RunestoneTestCase

mf, setUpModule, tearDownModule = module_fixture_maker(__file__, True)


class AddJsTestsWorking(TestCase):
    # Verify the CRC was added.
    def test_1(self):
        with codecs.open('build/test_add_js/index.html', encoding='utf-8') as f:
            self.assertIn('<script type="text/javascript" src="_static/runestonebase.js?v=', f.read())
