from runestone.unittest_base import module_fixture_maker, RunestoneTestCase

setUpModule, tearDownModule = module_fixture_maker(__file__)

class PollTests(RunestoneTestCase):
    def test_poll(self):
        ''' test the poll directive '''
        self.driver.get(self.host + '/index.html')

        poll_div = self.driver.find_element_by_id('pollid1_container')

        opts = poll_div.find_elements_by_css_selector("input[type='radio']")

        # the poll in overview should be on a scale 1-10.
        self.assertTrue(len(opts) == 10, "Not enough poll options present!")

        # just choose option 4
        poll_div.find_element_by_id('pollid1_opt_4').click()

        el = poll_div.find_element_by_id('pollid1_sent') # check for results span
        self.assertIsNotNone(el)
        self.assertEqual(el.text[:6], "Thanks")
        
        # just make sure we can find the results div - an exception will be raised if the div cannot be found
        poll_div.find_element_by_id('pollid1_results')
