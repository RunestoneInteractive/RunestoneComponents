"""
Test Multiple Choice question directive
"""

__author__ = 'yasinovskyy'

from unittest import TestCase
from runestone.unittest_base import module_fixture_maker, RunestoneTestCase

mf, setUpModule, tearDownModule = module_fixture_maker(__file__, True)

# Look for errors producted by invalid questions.
class MultipleChoiceQuestion_Error_Tests(TestCase):
    def test_1(self):
        # Check for the following directive-level errors.
        directive_level_errors =  (
            # Produced my mchoice id: error1_no_content,
            (47, 'No correct answer specified'),
            # error2,
            (49, 'No correct answer specified.'),
            # error7,
            (102, 'No correct answer specified.'),
        )
        for error_line, error_string in directive_level_errors:
            self.assertIn(':{}: WARNING: {}'.format(error_line, error_string), mf.build_stderr_data)

        # Check for the following error inside the directive.
        inside_directive_lines = (
            # Produced my mchoice id error3,
            61,
            # error4,
            70,
            # error6
            95,
        )
        for error_line in inside_directive_lines:
            self.assertIn(': WARNING: On line {}, a single-item list must be nested under each answer.'.format(error_line), mf.build_stderr_data)

        self.assertIn("WARNING: while setting up extension runestone.lp: role 'docname' is already registered, it will be overridden", mf.build_stderr_data)

        # Make sure we saw all errors.
        self.assertEqual(len(directive_level_errors) + len(inside_directive_lines) + 1, mf.build_stderr_data.count('WARNING'))

class MultipleChoiceQuestion_Tests(RunestoneTestCase):
    def test_ma1(self):
        '''Multiple Answer: Nothing selected, Check button clicked'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("question1")

        btn_check = t1.find_element_by_tag_name('button')
        self.assertIsNotNone(btn_check)
        try:
            btn_check.click()
        except:
            print("Warning -- Selenium Error on click")
            return

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
        self.assertIn("alert-info", cnamestr)

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

        answers = t1.find_elements_by_tag_name("label")
        for el in answers:
            el.click()

        btn_check = t1.find_element_by_tag_name('button')
        btn_check.click()

        fb = t1.find_element_by_id("question1_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-danger", cnamestr)

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
        self.assertIn("alert-info", cnamestr)

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
