from selenium import webdriver
from selenium.common.exceptions import WebDriverException
import unittest


class ActiveCodeTests(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.host = 'http://127.0.0.1:8080'

    def runTest(self):
        '''
        1. Get a list of all the chapters/pages in all the courses specified in self.courses_to_test
        2. Find and run every ActiveCode block on each page
        3. Print out information about any ActiveCode that results in an error.
        :return:
        '''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("test1")
        self.assertIsNotNone(t1)
        rb = t1.find_element_by_class_name("run-button")
        self.assertIsNotNone(rb)
        rb.click()
        output = t1.find_element_by_class_name("ac_output")
        self.assertEqual(output.text.strip(),"Hello World")

    def tearDown(self):
        self.driver.quit()

