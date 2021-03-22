# ****************************************************
# |docname| - Basic tests for the Cellbotics component
# ****************************************************
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from runestone.unittest_base import module_fixture_maker, RunestoneTestCase

setUpModule, tearDownModule = module_fixture_maker(__file__)


class CellboticsTests(RunestoneTestCase):
    def test_1(self):
        """
        #.  Get the outer div id of the activecode component
        #.  Find the run button using its class name
        #.  Run the example
        #.  Check the output from the ac_output element
        """
        self.driver.get(self.host + "/index.html")
        try:
            self.wait.until(EC.presence_of_element_located((By.ID, "test1")))
        except TimeoutException:
            text = self.driver.page_source
            print(text[:300])
        t1 = self.driver.find_element_by_id("test1")
        self.assertIsNotNone(t1)
        rb = t1.find_element_by_class_name("run-button")
        self.assertIsNotNone(rb)
        rb.click()
        self.wait.until(
            EC.text_to_be_present_in_element((By.ID, "test1_stdout"), "Pass."),
            message="Did not find expected text",
        )
