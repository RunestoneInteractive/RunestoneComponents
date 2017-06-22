"""
Test Short Answer question directive
"""

__author__ = 'yasinovskyy'

from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.common.exceptions import WebDriverException
import unittest
import sys

PORT = '8081'

class ShortAnswerQuestion_Tests(unittest.TestCase):
    def setUp(self):
        #self.driver = webdriver.Firefox()  # good for development
        self.driver = webdriver.PhantomJS() # use this for Jenkins auto testing
        self.host = 'http://127.0.0.1:' + PORT


    def test_sa1(self):
        '''No input. Button not clicked'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("question1")

        fb = t1.find_element_by_id("question1_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-danger", cnamestr)


    def test_sa2(self):
        '''No input. Button clicked'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("question1")

        btn_check = t1.find_element_by_tag_name('button')
        btn_check.click()

        fb = t1.find_element_by_id("question1_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-success", cnamestr)


    def test_sa3(self):
        '''Answer entered'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("question1")
        ta = t1.find_element_by_id("question1_solution")
        ta.send_keys("My answer")

        btn_check = t1.find_element_by_tag_name('button')
        btn_check.click()

        fb = t1.find_element_by_id("question1_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-success", cnamestr)


    def test_sa4(self):
        '''Answer entered and cleared'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("question1")
        ta = t1.find_element_by_id("question1_solution")
        ta.send_keys("My answer")

        btn_check = t1.find_element_by_tag_name('button')
        btn_check.click()
        
        ta.clear()

        fb = t1.find_element_by_id("question1_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-success", cnamestr)


    def tearDown(self):
        self.driver.quit()


if __name__ == '__main__':
    if len(sys.argv) > 1:
        PORT = sys.argv.pop()
    unittest.main(verbosity=2)
