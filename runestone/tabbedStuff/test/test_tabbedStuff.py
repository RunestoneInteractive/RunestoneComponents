"""
Test Tabbed stuff directive
"""

__author__ = 'yasinovskyy'

from runestone.unittest_base import module_fixture_maker, RunestoneTestCase
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By

setUpModule, tearDownModule = module_fixture_maker(__file__)

class TabbedQuestion_Tests(RunestoneTestCase):
    def test_t1(self):
        '''Initial view. Tab 1 is visible, tab 2 is hidden'''
        self.driver.get(self.host + "/index.html")
        wait = WebDriverWait(self.driver, 10)
        try:
            wait.until(
                EC.presence_of_element_located((By.ID, "exercise1"))
            )
        except:
            text = self.driver.page_source
            print(text)


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
