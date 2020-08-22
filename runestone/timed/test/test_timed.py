import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning) 
import unittest
import time
from runestone.unittest_base import module_fixture_maker, RunestoneTestCase
from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException

setUpModule, tearDownModule = module_fixture_maker(__file__)

class TimedTests(RunestoneTestCase):
    def test_one_question_timed_exam(self):
        self.driver.get(self.host + "/index.html")
        self.driver.execute_script("window.localStorage.clear();")

        start = self.driver.find_element_by_id("start")
        start.click()

        t1 = self.driver.find_element_by_id("time_test_1_q1_form")
        t1.find_element_by_id("time_test_1_q1_opt_0").click()
        t1.find_element_by_id("time_test_1_q1_opt_1").click()
        t1.find_element_by_id("time_test_1_q1_opt_2").click()
        t1.find_element_by_id("time_test_1_q1_opt_3").click()

        finish = self.driver.find_element_by_id("finish")
        #finish.click()

        #alert = self.driver.switch_to_alert()
        #alert.accept()

        #fb = t1.find_element_by_id("time_test_1_q1_eachFeedback_1")
        #self.assertIsNotNone(fb)
        #cnamestr = fb.get_attribute("class")
        #self.assertEqual(cnamestr, "eachFeedback alert alert-danger")