from selenium.webdriver import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
import time
from runestone.unittest_base import module_fixture_maker, RunestoneTestCase

setUpModule, tearDownModule = module_fixture_maker(__file__)
class UpdateConfigTests(RunestoneTestCase):
    def find_fitb(self, elem_id):
        self.driver.get(self.host + "/index.html")
        wait = WebDriverWait(self.driver, 10)
        try:
            wait.until(
                EC.presence_of_element_located((By.ID, elem_id))
            )
        except:
            text = self.driver.page_source
            print(text[:300])

        self.fitb = self.driver.find_element_by_id(elem_id)
        return self.fitb

    def test_updateconfig_fitb(self):
        self.driver.get(self.host + "/index.html")
        
        self.find_fitb("fill1")
        button_before_config_update = self.driver.find_element_by_id("question1_bcomp")

        self.find_fitb("fill2")
        assert not is_element_present_by_id(self,"question2_bcomp")
        
    
        self.find_fitb("fill3")
        button_after_second_config_update = self.driver.find_element_by_id("question3_bcomp")

        
        self.assertIsNotNone(button_before_config_update)
        self.assertIsNotNone(button_after_second_config_update)

    def test_updateconfig_multiplechoice(self):
        self.driver.get(self.host + "/index.html")
        
        self.find_fitb("question1")
        button_before_config_update = self.driver.find_element_by_id("fill1_bcomp")

        self.find_fitb("question2")
        assert not is_element_present_by_id(self,"fill2_bcomp")
    
        self.find_fitb("question3")
        button_after_second_config_update = self.driver.find_element_by_id("fill3_bcomp")

        
        self.assertIsNotNone(button_before_config_update)
        self.assertIsNotNone(button_after_second_config_update)

def is_element_present_by_id(self, id):
    try:
        self.driver.find_element_by_id(id)
        return True
    except NoSuchElementException:
        return False

 