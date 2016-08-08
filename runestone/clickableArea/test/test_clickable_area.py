from selenium import webdriver
import unittest


class ClickableAreaTests(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()  # good for development
        # self.driver = webdriver.PhantomJS()  # use this for Jenkins auto testing
        self.host = "http://127.0.0.1:8081"

    def test_correct(self):
        self.driver.get(self.host + "/index.html")
        assignment1 = self.driver.find_element_by_xpath('//*[@id="clickable-area"]/div/div[1]/pre/span[2]')
        assignment1.click()
        assignment2 = self.driver.find_element_by_xpath('//*[@id="clickable-area"]/div/div[1]/pre/span[3]')
        assignment2.click()
        check_button = self.driver.find_element_by_xpath('//*[@id="clickable-area"]/div/button')
        check_button.click()
        text = self.driver.find_element_by_xpath('//*[@id="clickable-area"]/div/div[2]').text.strip()

        self.assertEqual(text, 'You are Correct!')

    def test_incorrect(self):
        self.driver.get(self.host + "/index.html")
        assignment1= self.driver.find_element_by_xpath('//*[@id="clickable-area"]/div/div[1]/pre/span[2]')
        assignment1.click()
        check_button = self.driver.find_element_by_xpath('//*[@id="clickable-area"]/div/button')
        check_button.click()
        text = self.driver.find_element_by_xpath('//*[@id="clickable-area"]/div/div[2]').text.strip()

        self.assertEqual(text, "Incorrect. You clicked on 1 of the 2 correct elements and 0 of the 2 incorrect elements. Remember, the operator '=' is used for assignment.")

    def tearDown(self):
        self.driver.quit()

if __name__ == '__main__':
    unittest.main()

