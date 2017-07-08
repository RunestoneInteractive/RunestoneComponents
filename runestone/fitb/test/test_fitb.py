from ...unittest_base import module_fixture_maker, RunestoneTestCase

setUpModule, tearDownModule = module_fixture_maker(__file__)

class FITBtests(RunestoneTestCase):
    ## Helpers
    ## =======
    def setUp(self):
        super(FITBtests, self).setUp()
        self.driver.get(self.host + "/index.html") # Access page

    # Return the DIV containing a FITB question.
    def find_fitb(self):
        self.fitb = self.driver.find_element_by_id("fill1412")
        return self.fitb

    # Find one of the blanks, based on the given index.
    def find_blank(self, index):
        return self.fitb.find_elements_by_tag_name("input")[index]

    # Click the "Check me" button.
    def click_checkme(self):
        self.fitb.find_element_by_tag_name('button').click()

    # Find the question's feedback element.
    def find_feedback(self):
        return self.fitb.find_element_by_id("fill1412_feedback")

    ## Tests
    ## =====
    # One of two correct answers
    def test_fitb(self):
        '''
        http://runestoneinteractive.org/build/html/directives.html#fill-in-the-blank for documentation
        '''
        self.find_fitb()
        self.find_blank(0).send_keys("red")
        self.click_checkme()
        feedback = self.find_feedback()
        self.assertIsNotNone(feedback.text)

    # No answers yet -- Incorrect feedback
    def test_fitb2(self):
        self.find_fitb()
        self.click_checkme()
        feedback = self.find_feedback()
        self.assertIsNotNone(feedback.text)
        self.assertIn("Incorrect",feedback.text)


    # Both correct answers
    def test_fitb3(self):
        self.find_fitb()
        self.find_blank(0).send_keys("red")
        self.find_blank(1).send_keys("away")
        self.click_checkme()
        feedback = self.find_feedback()
        self.assertIn("Correct", feedback.text)

    def test_fitb4(self):
        self.find_fitb()
        blank0 = self.find_blank(0)
        # Type an incorrect answer.
        blank0.send_keys("red")
        # Delete it.
        blank0.clear()
        # Type the correct answer.
        blank0.send_keys("red")
        self.find_blank(1).send_keys("away")
        self.click_checkme()
        feedback = self.find_feedback()
        self.assertIn("Correct", feedback.text)
