"""
Test Multiple Choice question directive
"""

__author__ = 'yasinovskyy'

from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.common.exceptions import WebDriverException
import unittest
import sys

PORT = '8081'

class MultipleChoiceQuestion_Tests(unittest.TestCase):
    def setUp(self):
        #self.driver = webdriver.Firefox()  # good for development
        self.driver = webdriver.PhantomJS() # use this for Jenkins auto testing
        self.host = 'http://127.0.0.1:' + PORT

    def test_ma1(self):
        '''Multiple Answer: Nothing selected, Check button clicked'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("question1")

        btn_check = t1.find_element_by_tag_name('button')
        btn_check.click()

        fb = t1.find_element_by_id("question1_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-danger", cnamestr)


    def test_ma2(self):
        '''Multiple Answer: Correct answer(s) selected'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("question1")

        t1.find_element_by_id("question1_opt_0").click()
        t1.find_element_by_id("question1_opt_2").click()

        btn_check = t1.find_element_by_tag_name('button')
        btn_check.click()

        fb = t1.find_element_by_id("question1_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-success", cnamestr)


    def test_ma3(self):
        '''Multiple Answer: Incorrect answer(s) selected'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("question1")

        t1.find_element_by_id("question1_opt_1").click()
        t1.find_element_by_id("question1_opt_3").click()

        btn_check = t1.find_element_by_tag_name('button')
        btn_check.click()

        fb = t1.find_element_by_id("question1_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-danger", cnamestr)


    def test_ma4(self):
        '''Multiple Answer: All options clicked one by one'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("question1")

        answers = t1.find_elements_by_tag_name("li")
        for el in answers:
            el.click()

        btn_check = t1.find_element_by_tag_name('button')
        btn_check.click()

        fb = t1.find_element_by_id("question1_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-danger", cnamestr)


    def test_ma5(self):
        '''Multiple Answer: Correct answer(s) selected and unselected'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("question1")

        t1.find_element_by_id("question1_opt_0").click()
        t1.find_element_by_id("question1_opt_0").click()

        cbs = t1.find_element_by_id("question1_opt_0")
        self.assertFalse(cbs.is_selected())


    def test_mc1(self):
        '''Multiple Choice: Nothing selected'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("question2")

        btn_check = t1.find_element_by_tag_name('button')
        btn_check.click()

        fb = t1.find_element_by_id("question2_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-danger", cnamestr)


    def test_mc2(self):
        '''Multiple Choice: Correct answer selected'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("question2")

        t1.find_element_by_id("question2_opt_0").click()

        btn_check = t1.find_element_by_tag_name('button')
        btn_check.click()

        fb = t1.find_element_by_id("question2_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-success", cnamestr)


    def test_mc3(self):
        '''Multiple Choice: Incorrect answer selected'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("question2")
        
        t1.find_element_by_id("question2_opt_1").click()

        btn_check = t1.find_element_by_tag_name('button')
        btn_check.click()

        fb = t1.find_element_by_id("question2_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-danger", cnamestr)


    def test_mc4(self):
        '''Multiple Choice: All options clicked one by one'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("question2")

        answers = t1.find_elements_by_tag_name("li")
        for el in answers:
            el.click()

        btn_check = t1.find_element_by_tag_name('button')
        btn_check.click()

        answer = t1.find_element_by_id("question2_opt_0")
        self.assertFalse(answer.is_selected())

        fb = t1.find_element_by_id("question2_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-danger", cnamestr)


    def tearDown(self):
        self.driver.quit()


if __name__ == '__main__':
    if len(sys.argv) > 1:
        PORT = sys.argv.pop()
    unittest.main(verbosity=2)
