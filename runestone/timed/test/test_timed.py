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
        finish = self.driver.find_element_by_id("finish")
        finish.click()
        alert = self.driver.switch_to_alert()
        alert.accept()