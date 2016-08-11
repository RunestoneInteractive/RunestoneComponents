from selenium import webdriver
import unittest
import sys

PORT = '8081'

class PollTests(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.PhantomJS() # use this for Jenkins auto testing
        self.host = 'http://127.0.0.1:' + PORT


    def tearDown(self):
        self.driver.quit()


    #################################################################################################
    def test_poll(self):
        ''' test the poll directive '''
        self.driver.get(self.host + '/index.html')

        poll_div = self.driver.find_element_by_id('pollid1_container')

        opts = poll_div.find_elements_by_css_selector("input[type='radio']")

        # the poll in overview should be on a scale 1-10.
        self.assertTrue(len(opts) == 10, "Not enough poll options present!")

        # just choose option 4
        poll_div.find_element_by_id('pollid1_opt_4').click()

        # submit
        poll_div.find_element_by_name('Submit Poll').click()


        # just make sure we can find the results div - an exception will be raised if the div cannot be found
        poll_div.find_element_by_id('pollid1_results')



if __name__ == '__main__':
    if len(sys.argv) > 1:
        PORT = sys.argv.pop()
    unittest.main()