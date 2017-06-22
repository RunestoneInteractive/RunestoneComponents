"""
Test Tabbed stuff directive
"""

__author__ = 'yasinovskyy'

from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.common.exceptions import WebDriverException
import unittest
import sys

PORT = '8081'

class TabbedQuestion_Tests(unittest.TestCase):
    def setUp(self):
        #self.driver = webdriver.Chrome()
        #self.driver = webdriver.Firefox()  # good for development
        self.driver = webdriver.PhantomJS() # use this for Jenkins auto testing
        self.host = 'http://127.0.0.1:' + PORT

    
    def test_t1(self):
        '''Initial view. Tab 1 is visible, tab 2 is hidden'''
        self.driver.get(self.host + "/index.html")
        e1 = self.driver.find_element_by_id("exercise1")

        t1 = e1.find_element_by_class_name('active')
        tp1 = e1.find_element_by_id('exercise1-0')

        self.assertEqual("Tab 1", t1.text)
        self.assertEqual("Hello!", tp1.text)

    
    def test_t2(self):
        '''Tab 2 is visible, tab 1 is hidden'''
        self.driver.get(self.host + "/index.html")
        e1 = self.driver.find_element_by_id("exercise1")

        btn_tab2 = e1.find_element_by_link_text('Tab 2')
        btn_tab2.click()

        t1 = e1.find_element_by_class_name('active')
        tp1 = e1.find_element_by_id('exercise1-1')

        self.assertEqual("Tab 2", t1.text)
        self.assertEqual("Goodbye!", tp1.text)

    
    def test_t3(self):
        '''Tab 2 is selected, then tab 1'''
        self.driver.get(self.host + "/index.html")
        e1 = self.driver.find_element_by_id("exercise1")

        btn_tab2 = e1.find_element_by_link_text('Tab 2')
        btn_tab2.click()

        btn_tab1 = e1.find_element_by_link_text('Tab 1')
        btn_tab1.click()

        t1 = e1.find_element_by_class_name('active')
        tp1 = e1.find_element_by_id('exercise1-0')

        self.assertEqual("Tab 1", t1.text)
        self.assertEqual("Hello!", tp1.text)
    

    def tearDown(self):
        self.driver.quit()


if __name__ == '__main__':
    if len(sys.argv) > 1:
        PORT = sys.argv.pop()
    unittest.main(verbosity=2)
