"""
Test Reveal Answer question directive
"""

__author__ = 'yasinovskyy'

from runestone.unittest_base import module_fixture_maker, RunestoneTestCase

setUpModule, tearDownModule = module_fixture_maker(__file__)

class RevealQuestion_Tests(RunestoneTestCase):
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

    def test_r4(self):
        '''Check for is_instructor test '''
        t1 = self.driver.find_element_by_id("reveal")
        self.assertIn("{{ if is_instructor: }}", t1.get_attribute('innerHTML'))
