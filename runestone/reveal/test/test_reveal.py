"""
Test Reveal Answer question directive
"""

__author__ = 'yasinovskyy'

from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.common.exceptions import WebDriverException
import unittest
import sys

PORT = '8081'

class RevealQuestion_Tests(unittest.TestCase):
    def setUp(self):
        #self.driver = webdriver.Chrome()
        #self.driver = webdriver.Firefox()  # good for development
        self.driver = webdriver.PhantomJS() # use this for Jenkins auto testing
        self.host = 'http://127.0.0.1:' + PORT

    
    def test_r1(self):
        '''Initial view. Content is hidden'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("reveal")

        q1 = t1.find_element_by_id('question1')

        cnamestr = q1.get_attribute("style")
        self.assertEqual("display: none;", cnamestr)


    def test_r2(self):
        '''Reveal button clicked'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("reveal")

        btn_show = t1.find_element_by_id('question1_show')
        btn_show.click()

        q1 = t1.find_element_by_id('question1')

        cnamestr = q1.get_attribute("style")
        self.assertNotEqual("display: none;", cnamestr)

    def test_r3(self):
        '''Content is revealed, then hidden again'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("reveal")

        btn_show = t1.find_element_by_id('question1_show')
        btn_show.click()
        btn_hide = t1.find_element_by_id('question1_hide')
        btn_hide.click()

        q1 = t1.find_element_by_id('question1')

        cnamestr = q1.get_attribute("style")
        self.assertEqual("display: none;", cnamestr)


    def tearDown(self):
        self.driver.quit()


if __name__ == '__main__':
    if len(sys.argv) > 1:
        PORT = sys.argv.pop()
    unittest.main(verbosity=2)
