"""
Test Parsons Problem question directive
"""

__author__ = 'cabowers'

import unittest
import time
from unittest import TestCase
from runestone.unittest_base import module_fixture_maker, RunestoneTestCase
from selenium.webdriver import ActionChains
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
import selenium.webdriver.support.ui as ui

mf, setUpModule, tearDownModule = module_fixture_maker(__file__, True)


class ParsonsTests(RunestoneTestCase):
     
    def test_general(self):
        
        self.driver.get(self.host + "/index.html")
        
        # Source has correct number of blocks and each block has a label
        source = self.driver.find_element_by_id("parsons-1-source")
        answer = self.driver.find_element_by_id("parsons-1-answer")
        self.assertIsNotNone(source)
        blocks = source.find_elements_by_class_name("block")
        self.assertIsNotNone(source)
        self.assertEquals(len(blocks), 5)
        
        # check that messages appear correctly
        checkme = self.driver.find_element_by_id('parsons-1-check')
        reset = self.driver.find_element_by_id('parsons-1-reset')
        message = self.driver.find_element_by_id("parsons-1-message")
        self.assertIsNotNone(message, None)
        self.assertEquals(message.get_attribute("style"), "display: none;")
        checkme.click()
        self.assertEquals(message.get_attribute("class"),"alert alert-danger")
        reset.click()
        ActionChains(self.driver).drag_and_drop(source.find_element_by_id("parsons-1-block-3"), answer).perform()
        ActionChains(self.driver).drag_and_drop(source.find_element_by_id("parsons-1-block-2"), answer.find_element_by_id("parsons-1-block-3")).perform()
        ActionChains(self.driver).drag_and_drop(source.find_element_by_id("parsons-1-block-1"), answer.find_element_by_id("parsons-1-block-2")).perform()
        ActionChains(self.driver).drag_and_drop(source.find_element_by_id("parsons-1-block-0"), answer.find_element_by_id("parsons-1-block-1")).perform()
        ActionChains(self.driver).drag_and_drop_by_offset(answer.find_element_by_id("parsons-1-block-0"), -50, 0).perform()
        self.wait_for_animation("#parsons-1-block-0")
        checkme.click()
        message = self.driver.find_element_by_id("parsons-1-message")
        self.assertEquals(message.get_attribute("class"), "alert alert-success")

        # check that reset works
        reset.click()
        blocks = source.find_elements_by_class_name("block")
        self.assertEquals(len(blocks), 5)
      
    
    def test_help(self):
        self.driver.get(self.host + "/index.html")
        source = self.driver.find_element_by_id("parsons-1-source")
        answer = self.driver.find_element_by_id("parsons-1-answer")
        reset = self.driver.find_element_by_id('parsons-1-reset')
        reset.click()
        checkme = self.driver.find_element_by_id('parsons-1-check')
        # click help, should cause pop up
        helpBtn = self.driver.find_element_by_id('parsons-1-help')
        helpBtn.click()
        self.assertTrue(self.wait_and_close_alert())
    
        # try three distinct full attempts => help should casue pop up then cause stuff to happen
        ActionChains(self.driver).drag_and_drop(source.find_element_by_id("parsons-1-block-4"), answer).perform()
        ActionChains(self.driver).drag_and_drop(source.find_element_by_id("parsons-1-block-2"), answer.find_element_by_id("parsons-1-block-4")).perform()
        ActionChains(self.driver).drag_and_drop(source.find_element_by_id("parsons-1-block-1"), answer.find_element_by_id("parsons-1-block-2")).perform()
        ActionChains(self.driver).drag_and_drop(source.find_element_by_id("parsons-1-block-0"), answer.find_element_by_id("parsons-1-block-1")).perform()
        self.wait_for_animation("#parsons-1-block-0")
        checkme.click()
        ActionChains(self.driver).drag_and_drop(source.find_element_by_id("parsons-1-block-3"), answer.find_element_by_id("parsons-1-block-0")).perform()
        self.wait_for_animation("#parsons-1-block-3")
        checkme.click()
        ActionChains(self.driver).drag_and_drop(answer.find_element_by_id("parsons-1-block-3"), answer.find_element_by_id("parsons-1-block-4")).perform()
        self.wait_for_animation("#parsons-1-block-3")
        checkme.click()     
        self.assertTrue(self.wait_and_close_alert())
        ActionChains(self.driver).drag_and_drop(answer.find_element_by_id("parsons-1-block-3"), source).perform()
        self.wait_for_animation("#parsons-1-block-3")

        helpBtn.click() # remove incorrect
        self.assertTrue(self.wait_and_close_alert())    
        self.wait_for_animation("#parsons-1-block-4")
        b4 = source.find_element_by_id("parsons-1-block-4")
        self.assertEquals(b4.get_attribute("class"), "block disabled");

        helpBtn.click() # provide Indentation
        self.assertTrue(self.wait_and_close_alert())
        self.wait_for_animation("#parsons-1-block-4")
        helpBtn.click() # Combine blocks
        self.assertTrue(self.wait_and_close_alert())
        self.wait_for_animation("#parsons-1-block-1")
        l6 = source.find_element_by_id("parsons-1-line-6")
        self.assertEquals(l6.get_attribute("class"), "prettyprint lang-py indent1")
        self.assertFalse(self.f_exists("parsons-1-block-1"))
        b0 = answer.find_element_by_id("parsons-1-block-0")
        l1 = b0.find_element_by_id("parsons-1-line-1")
        l2 = b0.find_element_by_id("parsons-1-line-2")
        self.assertIsNotNone(l1)
        self.assertIsNotNone(l2)

        # Help is finished helping
        self.wait_for_animation("#parsons-1-block-0") 
        parsons_problem = self.driver.find_element_by_id("parsons-1")
        answer_initial = answer.get_attribute('innerHTML')
        source_initial = source.get_attribute('innerHTML')
        helpBtn.click() 
        self.assertTrue(self.wait_and_close_alert())
        answer_after = answer.get_attribute('innerHTML')
        self.assertEquals(answer_initial, answer_after)
        source_after = source.get_attribute('innerHTML')
        self.assertEquals(source_initial, source_after)


    def wait_for_animation(self, selector):
        is_animation_in_progress = self.is_element_animated(selector)
        while is_animation_in_progress is True:
            time.sleep(.5)
            is_animation_in_progress = self.is_element_animated(selector)


    def is_element_animated(self, selector):
        return self.driver.execute_script("return jQuery('" + selector + "').is(':animated');")


    def f_exists(self, selector_id):
        try:
            self.driver.find_element_by_id(selector_id)
        except NoSuchElementException:
            return False
        return True


    def wait_and_close_alert(self, timeout = 3):
        try:
            WebDriverWait(self.driver, timeout).until(EC.alert_is_present(),
                                   'Timed out waiting for PA creation ' +
                                   'confirmation popup to appear.')
            alert = self.driver.switch_to_alert()
            alert.accept()
            return True
        except TimeoutException:
            return False
        
        
if __name__ == '__main__':
    unittest.main()
