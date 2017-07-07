from ...unittest_base import module_fixture_maker, RunestoneTestCase

setUpModule, tearDownModule = module_fixture_maker(__file__)

class FITBtests(RunestoneTestCase):
    # One of two correct answers
    def test_fitb(self):
        '''
        http://runestoneinteractive.org/build/html/directives.html#fill-in-the-blank for documentation
        '''
        self.driver.get(self.host + "/index.html") # Access page
        quest = self.driver.find_element_by_id("fill-in-the-blank")
        blank1 = quest.find_element_by_id("fill1412_blank0")
        blank1.send_keys("red")
        # inp = blank1.get_attribute("input")
        checkme = quest.find_element_by_tag_name('button')
        checkme.click()
        feedback = quest.find_element_by_id("fill1412_feedback")
        self.assertIsNotNone(feedback.text)

    # No answers yet -- Incorrect feedback
    def test_fitb2(self):
        self.driver.get(self.host + "/index.html") # Access page
        quest = self.driver.find_element_by_id("fill-in-the-blank")
        blank1 = quest.find_element_by_id("fill1412_blank0")
        checkme = quest.find_element_by_tag_name('button')
        checkme.click()
        feedback = quest.find_element_by_id("fill1412_feedback")
        self.assertIn("Incorrect",feedback.text)


    # Both correct answers
    def test_fitb3(self):
        self.driver.get(self.host + "/index.html") # Access page
        quest = self.driver.find_element_by_id("fill-in-the-blank")

        blank1 = quest.find_element_by_id("fill1412_blank0")
        blank2 = quest.find_element_by_id("fill1412_blank1")
        blank1.send_keys("red")
        blank2.send_keys("away")
        checkme = quest.find_element_by_tag_name('button')
        checkme.click()
        feedback = quest.find_element_by_id("fill1412_feedback")
        self.assertIn("Correct", feedback.text)

    def test_fitb4(self):
        self.driver.get(self.host + "/index.html") # Access page
        quest = self.driver.find_element_by_id("fill-in-the-blank")
        blank1 = quest.find_element_by_id("fill1412_blank0")
        blank2 = quest.find_element_by_id("fill1412_blank1")
        blank1.send_keys("reds") # Type something wrong
        blank1.clear() # Delete the wrong thing
        blank1.send_keys("red") # Type the right thing
        blank2.send_keys("away") # Type another correct answer in another blank
        checkme = quest.find_element_by_tag_name('button')
        checkme.click()
        feedback = quest.find_element_by_id("fill1412_feedback")
        self.assertIn("Correct",feedback.text)
