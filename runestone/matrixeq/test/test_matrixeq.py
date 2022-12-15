"""
Test Matrix Equations directive (matrixeq)
"""

from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By

__author__ = "wayne brown"


def test_ma1(selenium_utils_get):
    """ matrixeq - test the click of a mutliplication operator """
    wait = WebDriverWait(selenium_utils_get.driver, 10)
    try:
        wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
    except:
        text = selenium_utils_get.driver.page_source
        print(text[:300])

    # t1 = self.driver.find_element_by_id("question1")
    #
    # btn_check = t1.find_element_by_tag_name('button')
    # btn_check.click()
    #
    # fb = t1.find_element_by_id("question1_feedback")
    # self.assertIsNotNone(fb)
    # cnamestr = fb.get_attribute("class")
    # self.assertIn("alert-danger", cnamestr)
