"""
Test Short Answer question directive
"""

__author__ = "yasinovskyy"

from time import sleep
from runestone.unittest_base import module_fixture_maker, RunestoneTestCase

setUpModule, tearDownModule = module_fixture_maker(__file__)


class ShortAnswerQuestion_Tests(RunestoneTestCase):
    def test_sa1(self):
        """No input. Button not clicked"""
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("question1")

        fb = t1.find_element_by_id("question1_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-danger", cnamestr)

    def test_sa2(self):
        """No input. Button clicked"""
        self.driver.get(self.host + "/index.html")
        sleep(1)
        t1 = self.driver.find_element_by_id("question1")

        btn_check = t1.find_element_by_tag_name("button")
        btn_check.click()

        fb = t1.find_element_by_id("question1_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-success", cnamestr)

    def test_sa3(self):
        """Answer entered"""
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("question1")
        ta = t1.find_element_by_id("question1_solution")
        ta.send_keys("My answer")

        btn_check = t1.find_element_by_tag_name("button")
        btn_check.click()

        fb = t1.find_element_by_id("question1_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-success", cnamestr)

    def test_sa4(self):
        """Answer entered and cleared"""
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("question1")
        ta = t1.find_element_by_id("question1_solution")
        ta.send_keys("My answer")

        btn_check = t1.find_element_by_tag_name("button")
        btn_check.click()

        fb = t1.find_element_by_id("question1_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-success", cnamestr)
