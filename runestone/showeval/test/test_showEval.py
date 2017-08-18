import unittest
import time
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys

class ShowEvalTest_TraceMode(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.get("http://127.0.0.1:8000/trace.html")

    def test_Next_Step(self):
        driver = self.driver
        self.assertIn("ShowEval", driver.title)
        evalDiv = driver.find_element_by_id("showEval_0")

        prevList = driver.find_elements_by_class_name("previousStep")
        prevListLen = len(prevList)
        assert prevListLen == 0
        assert len(evalDiv.find_elements_by_tag_name("span")) == 3

        driver.find_element_by_id("showEval_0_nextStep").click()
        time.sleep(3)
        assert len(evalDiv.find_elements_by_tag_name("span")) == 3
        assert len(driver.find_elements_by_class_name("previousStep")) > prevListLen

    def test_Reset_Step(self):
        driver = self.driver
        self.assertIn("ShowEval", driver.title)
        evalDiv = driver.find_element_by_id("showEval_0")

        for i in range(3):
            driver.find_element_by_id("showEval_0_nextStep").click()
            time.sleep(3)

        assert len(evalDiv.find_elements_by_class_name("previousStep")) > 0
        driver.find_element_by_id("showEval_0_reset").click()
        assert len(evalDiv.find_elements_by_class_name("previousStep")) == 0

    def test_Comment(self):
        driver = self.driver
        self.assertIn("ShowEval", driver.title)
        evalDiv = driver.find_element_by_id("showEval_0")
        commentDiv = evalDiv.find_element_by_class_name("anno")

        assert commentDiv.is_displayed() == False

        driver.find_element_by_id("showEval_0_nextStep").click()
        time.sleep(4)

        assert commentDiv.is_displayed() == True

        driver.find_element_by_id("showEval_0_nextStep").click()
        time.sleep(4)

        assert commentDiv.is_displayed() == False

    def tearDown(self):
        self.driver.close()

class ShowEvalTest_ReplaceMode(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.get("http://127.0.0.1:8000/replace.html")

    def test_Next_Step(self):
        driver = self.driver
        self.assertIn("ShowEval", driver.title)
        evalDiv = driver.find_element_by_id("showEval_0")

        assert len(evalDiv.find_elements_by_tag_name("span")) == 3
        evalText = driver.find_element_by_class_name("eval").text
        assert evalText != ""

        driver.find_element_by_id("showEval_0_nextStep").click()
        time.sleep(3)
        assert len(evalDiv.find_elements_by_tag_name("span")) == 3
        assert driver.find_element_by_class_name("eval").text != evalText

    def test_Reset_Step(self):
        driver = self.driver
        self.assertIn("ShowEval", driver.title)
        evalDiv = driver.find_element_by_id("showEval_0")
        evalText1 = driver.find_element_by_class_name("eval").text

        for i in range(4):
            driver.find_element_by_id("showEval_0_nextStep").click()
            time.sleep(3)

        assert driver.find_element_by_class_name("eval").text != evalText1
        driver.find_element_by_id("showEval_0_reset").click()
        assert driver.find_element_by_class_name("eval").text == evalText1

    def test_Comment(self):
        driver = self.driver
        self.assertIn("ShowEval", driver.title)
        evalDiv = driver.find_element_by_id("showEval_0")
        commentDiv = evalDiv.find_element_by_class_name("anno")

        assert commentDiv.is_displayed() == False

        driver.find_element_by_id("showEval_0_nextStep").click()
        time.sleep(4)

        assert commentDiv.is_displayed() == True

        driver.find_element_by_id("showEval_0_nextStep").click()
        time.sleep(4)

        assert commentDiv.is_displayed() == False

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
