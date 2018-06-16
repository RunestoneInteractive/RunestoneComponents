from unittest import TestCase
from runestone.unittest_base import module_fixture_maker, RunestoneTestCase

mf, setUpModule, tearDownModule = module_fixture_maker(__file__, True)
# Look for errors producted by invalid questions.
class FITB_Error_Tests(TestCase):
    def test_1(self):
        # Check for the following directive-level errors.
        directive_level_errors =  (
            # Produced my fitb id error1_no_content,
            (34, 'Content block expected for the "fillintheblank" directive; none found.'),
            (46, 'Not enough feedback for the number of blanks supplied.'),
        )
        for error_line, error_string in directive_level_errors:
            self.assertIn(':{}: WARNING: {}'.format(error_line, error_string), mf.build_stderr_data)

        # Check for the following error inside the directive.
        inside_directive_errors = (
            # error2,
            (38, 'the last item in a fill-in-the-blank question must be a bulleted list.'),
            # error3,
            (44, 'each list item in a fill-in-the-blank problems must contain only one item, a field list.'),
        )
        for error_line, error_string in inside_directive_errors:
            self.assertIn(': WARNING: On line {}, {}'.format(error_line, error_string), mf.build_stderr_data)

        # Make sure we saw all errors.
        self.assertEqual(len(directive_level_errors) + len(inside_directive_errors), mf.build_stderr_data.count('WARNING'))


class FITBtests(RunestoneTestCase):
    ## Helpers
    ## =======
    # Load the web page, then return the DIV containing a FITB question.
    def find_fitb(self, elem_id):
        self.driver.get(self.host + "/index.html")
        self.fitb = self.driver.find_element_by_id(elem_id)
        return self.fitb

    # Find one of the blanks, based on the given index.
    def find_blank(self, index):
        return self.fitb.find_elements_by_tag_name("input")[index]

    # Click the "Check me" button.
    def click_checkme(self):
        self.fitb.find_element_by_tag_name('button').click()

    # Find the question's feedback element.
    def find_feedback(self, elem_id):
        return self.fitb.find_element_by_id(elem_id + "_feedback")

    ## Tests
    ## =====
    # One of two correct answers
    def test_fitb(self):
        '''
        http://runestoneinteractive.org/build/html/directives.html#fill-in-the-blank for documentation
        '''
        self.find_fitb("fill1412")
        self.find_blank(0).send_keys("red")
        self.click_checkme()
        feedback = self.find_feedback("fill1412")
        self.assertIn('Correct', feedback.text)

    # No answers yet -- no answer provided feedback.
    def test_fitb2(self):
        self.find_fitb("fill1412")
        self.click_checkme()
        feedback = self.find_feedback("fill1412")
        self.assertIsNotNone(feedback.text)
        self.assertIn("No answer provided.", feedback.text)


    # Both correct answers
    def test_fitb3(self):
        self.find_fitb("fill1412")
        self.find_blank(0).send_keys("red")
        self.find_blank(1).send_keys("away")
        self.click_checkme()
        feedback = self.find_feedback("fill1412")
        self.assertIn("Correct", feedback.text)

    def test_fitb4(self):
        self.find_fitb("fill1412")
        blank0 = self.find_blank(0)
        # Type an incorrect answer.
        blank0.send_keys("red")
        # Delete it.
        blank0.clear()
        # Type the correct answer.
        blank0.send_keys("red")
        self.find_blank(1).send_keys("away")
        self.click_checkme()
        feedback = self.find_feedback("fill1412")
        self.assertIn("Correct", feedback.text)

    def test_fitboneblank_too_low(self):
        self.find_fitb("fill_2pi")
        self.find_blank(0).send_keys(" 6")
        self.click_checkme()
        feedback = self.find_feedback("fill_2pi")
        self.assertIn('Try higher.', feedback.text)

    def test_fitboneblank_wildcard(self):
        self.find_fitb("fill_2pi")
        self.find_blank(0).send_keys("I give up")
        self.click_checkme()
        feedback = self.find_feedback("fill_2pi")
        self.assertIn('Incorrect. Try again.', feedback.text)

    def test_fitbfillrange(self):
        self.find_fitb("fill_2pi")
        self.find_blank(0).send_keys(" 6.28 ")
        self.click_checkme()
        feedback = self.find_feedback("fill_2pi")
        self.assertIn('Good job.', feedback.text)

    def test_fitbregex(self):
        self.find_fitb("fillregex")
        self.find_blank(0).send_keys(" maire ")
        #self.find_blank(0).send_keys(" mARy ")
        self.find_blank(1).send_keys("LITTLE")
        self.find_blank(2).send_keys("2")
        self.click_checkme()
        feedback = self.find_feedback("fillregex")
        self.assertIn('Correct.', feedback.text)

    def test_regexescapes1(self):
        self.find_fitb("regexescapes1")
        self.find_blank(0).send_keys("C:\windows\system")
        self.click_checkme()
        feedback = self.find_feedback("regexescapes1")
        self.assertIn('Correct.', feedback.text)

    def test_regexescapes2(self):
        self.find_fitb("regexescapes2")
        self.find_blank(0).send_keys("[]")
        self.click_checkme()
        feedback = self.find_feedback("regexescapes2")
        self.assertIn('Correct.', feedback.text)

