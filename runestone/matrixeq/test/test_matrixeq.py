"""
Test Matrix Equations directive (matrixeq)
"""

from unittest import TestCase
from runestone.unittest_base import module_fixture_maker, RunestoneTestCase

__author__ = 'wayne brown'

mf, setUpModule, tearDownModule = module_fixture_maker(__file__, True)


class Matrixeq_Tests(RunestoneTestCase):

    def test_ma1(self):
        ''' matrixeq - test the click of a mutliplication operator '''
        self.driver.get(self.host + "/index.html")
        # t1 = self.driver.find_element_by_id("question1")
        #
        # btn_check = t1.find_element_by_tag_name('button')
        # btn_check.click()
        #
        # fb = t1.find_element_by_id("question1_feedback")
        # self.assertIsNotNone(fb)
        # cnamestr = fb.get_attribute("class")
        # self.assertIn("alert-danger", cnamestr)

    # Testing time in dominated by browser startup/shutdown. So, simply run all tests in a single browser instance to speed things up. On failures, uncomment test functions to diagnose.
    def test_ma2(self):
        '''
        matrixeq - test the click of an equal operator
        '''
        self.driver.get(self.host + "/index.html")

