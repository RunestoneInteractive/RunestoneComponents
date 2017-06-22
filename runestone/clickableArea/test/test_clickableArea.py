"""
Test Clickable Area question directive
"""

__author__ = 'yasinovskyy'

from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.common.exceptions import WebDriverException
import unittest
import sys

PORT = '8081'
ANSWERS = ["Red Orange Yellow", "Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"]

class ClickableAreaQuestion_Tests(unittest.TestCase):
    def setUp(self):
        #self.driver = webdriver.Firefox()  # good for development
        self.driver = webdriver.PhantomJS() # use this for Jenkins auto testing
        self.host = 'http://127.0.0.1:' + PORT

    
    def test_ca1(self):
        '''Text/Code: Nothing selected'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_elements_by_class_name("alert-warning")[0]

        btn_check = t1.find_element_by_class_name('btn-success')
        btn_check.click()

        fb = t1.find_element_by_class_name("alert")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-danger", cnamestr)

    
    def test_ca2(self):
        '''Text/Code: Correct answer(s) selected'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_elements_by_class_name("alert-warning")[0]

        targets = t1.find_elements_by_class_name("clickable")
        for target in targets:
            if target.text in ANSWERS:
                target.click()

        btn_check = t1.find_element_by_class_name('btn-success')
        btn_check.click()

        for target in targets:
            if target.text in ANSWERS:
                cnamestr = target.get_attribute("class")
                self.assertIn("clickable-clicked", cnamestr)

        fb = t1.find_element_by_class_name("alert")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-success", cnamestr)
    
    
    def test_ca3(self):
        '''Text/Code: Incorrect answer selected'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_elements_by_class_name("alert-warning")[0]

        targets = t1.find_elements_by_class_name("clickable")
        for target in targets:
            if target.text not in ANSWERS:
                target.click()

        btn_check = t1.find_element_by_class_name('btn-success')
        btn_check.click()

        for target in targets:
            if target.text not in ANSWERS:
                cnamestr = target.get_attribute("class")
                self.assertIn("clickable-incorrect", cnamestr)

        fb = t1.find_element_by_class_name("alert")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-danger", cnamestr)

    
    def test_ca4(self):
        '''Text/Code: All options clicked one by one'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_elements_by_class_name("alert-warning")[0]

        targets = t1.find_elements_by_class_name("clickable")
        for target in targets:
            target.click()

        btn_check = t1.find_element_by_class_name('btn-success')
        btn_check.click()

        for target in targets:
            cnamestr = target.get_attribute("class")
            if target.text in ANSWERS:
                self.assertIn("clickable-clicked", cnamestr)
            else:
                self.assertIn("clickable-incorrect", cnamestr)

        fb = t1.find_element_by_class_name("alert")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-danger", cnamestr)

    
    def test_ca5(self):
        '''Text/Code: Correct answer selected and unselected'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_elements_by_class_name("alert-warning")[0]

        targets = t1.find_elements_by_class_name("clickable")
        for target in targets:
            if target.text in ANSWERS:
                target.click()
                target.click()

        for target in targets:
            if target.text in ANSWERS:
                cnamestr = target.get_attribute("class")
                self.assertNotIn("clickable-clicked", cnamestr)
    

    def test_ca6(self):
        '''Table: Nothing selected'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_elements_by_class_name("alert-warning")[1]

        btn_check = t1.find_element_by_class_name('btn-success')
        btn_check.click()

        fb = t1.find_element_by_class_name("alert")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-danger", cnamestr)
    
    
    def test_ca7(self):
        '''Table: Correct answer(s) selected'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_elements_by_class_name("alert-warning")[1]

        targets = t1.find_elements_by_class_name("clickable")
        for target in targets:
            if target.text in ANSWERS:
                target.click()

        btn_check = t1.find_element_by_class_name('btn-success')
        btn_check.click()

        for target in targets:
            if target.text in ANSWERS:
                cnamestr = target.get_attribute("class")
                self.assertIn("clickable-clicked", cnamestr)

        fb = t1.find_element_by_class_name("alert")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-success", cnamestr)
    

    def test_ca8(self):
        '''Table: Incorrect answer selected'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_elements_by_class_name("alert-warning")[1]

        targets = t1.find_elements_by_class_name("clickable")
        for target in targets:
            if target.text not in ANSWERS:
                target.click()

        btn_check = t1.find_element_by_class_name('btn-success')
        btn_check.click()

        for target in targets:
            if target.text not in ANSWERS:
                cnamestr = target.get_attribute("class")
                self.assertIn("clickable-incorrect", cnamestr)

        fb = t1.find_element_by_class_name("alert")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-danger", cnamestr)
    

    def test_ca9(self):
        '''Table: All options clicked one by one'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_elements_by_class_name("alert-warning")[1]

        targets = t1.find_elements_by_class_name("clickable")
        for target in targets:
            target.click()

        btn_check = t1.find_element_by_class_name('btn-success')
        btn_check.click()

        for target in targets:
            cnamestr = target.get_attribute("class")
            if target.text in ANSWERS:
                self.assertIn("clickable-clicked", cnamestr)
            else:
                self.assertIn("clickable-incorrect", cnamestr)

        fb = t1.find_element_by_class_name("alert")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-danger", cnamestr)
    

    def test_ca10(self):
        '''Table: Correct answer selected and unselected'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_elements_by_class_name("alert-warning")[1]

        targets = t1.find_elements_by_class_name("clickable")
        for target in targets:
            if target.text in ANSWERS:
                target.click()
                target.click()

        for target in targets:
            if target.text in ANSWERS:
                cnamestr = target.get_attribute("class")
                self.assertNotIn("clickable-clicked", cnamestr)


    def tearDown(self):
        self.driver.quit()


if __name__ == '__main__':
    if len(sys.argv) > 1:
        PORT = sys.argv.pop()
    unittest.main(verbosity=2)
