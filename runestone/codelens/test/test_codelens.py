import time
from runestone.unittest_base import module_fixture_maker, RunestoneTestCase
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By

__author__ = "Brad Miller"

mf, setUpModule, tearDownModule = module_fixture_maker(__file__, True)


class ShowEvalTest_TraceMode(RunestoneTestCase):
    def setUp(self):
        super(ShowEvalTest_TraceMode, self).setUp()
        print(vars(self))
        self.driver.get(self.host + "/index.html")
        wait = WebDriverWait(self.driver, 10)
        try:
            wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        except Exception:
            text = self.driver.page_source
            print(text[:300])

    def test_Next_Step(self):
        driver = self.driver
        self.assertIn("CodeLens", driver.title)
        for tdiv in ["test1", "test2", "test3", "test4", "test5", "test6"]:
            clDiv = driver.find_element_by_id("test5")
            assert clDiv
            fwd = clDiv.find_element_by_id("jmpStepFwd")
            assert fwd
            bak = clDiv.find_element_by_id("jmpStepBack")
            assert bak
            assert bak.get_property("disabled") is True
