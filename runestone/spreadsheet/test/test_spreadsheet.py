from selenium.webdriver import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
import time
from runestone.unittest_base import module_fixture_maker, RunestoneTestCase

setUpModule, tearDownModule = module_fixture_maker(__file__)


class SpreadsheetTests(RunestoneTestCase):
    def test_ss_autograde(self):
        self.driver.get(self.host + "/index.html")
        wait = WebDriverWait(self.driver, 10)
        try:
            wait.until(EC.presence_of_element_located((By.ID, "ss1")))
        except:
            text = self.driver.page_source
            print(text[:300])

        t2 = self.driver.find_element_by_id("ss1")
        self.assertIsNotNone(t2)
        time.sleep(1)
        rb = t2.find_element_by_class_name("run-button")
        self.assertIsNotNone(rb)
        rb.click()
        out = self.driver.find_element_by_id("ss1_stdout")
        self.assertTrue("You passed 2 out of 2 tests" in out.text)

        t2 = self.driver.find_element_by_id("ss2")
        self.assertIsNotNone(t2)
        time.sleep(1)
        rb = t2.find_element_by_class_name("run-button")
        self.assertIsNotNone(rb)
        rb.click()
        out = self.driver.find_element_by_id("ss2_stdout")
        print(out.text)
        self.assertTrue("You passed 1 out of 1 tests" in out.text)
