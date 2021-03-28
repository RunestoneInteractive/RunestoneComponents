import time
import pytest

__author__ = "wayne brown"


@pytest.fixture
def selenium_utils_1(selenium_utils):
    selenium_utils.get("trace.html")
    selenium_utils.wait_until_ready("showEval_3")
    return selenium_utils


def test_Next_Step_1(selenium_utils_1):
    driver = selenium_utils_1.driver
    assert "ShowEval" in driver.title
    evalDiv = driver.find_element_by_id("showEval_3")

    prevList = driver.find_elements_by_class_name("previousStep")
    prevListLen = len(prevList)
    assert prevListLen == 0
    assert len(evalDiv.find_elements_by_tag_name("span")) == 4

    driver.find_element_by_id("showEval_3_nextStep").click()
    time.sleep(3)
    assert len(evalDiv.find_elements_by_tag_name("span")) == 4
    assert len(driver.find_elements_by_class_name("previousStep")) > prevListLen


def test_Reset_Step_1(selenium_utils_1):
    driver = selenium_utils_1.driver
    assert "ShowEval" in driver.title
    evalDiv = driver.find_element_by_id("showEval_3")

    for i in range(3):
        driver.find_element_by_id("showEval_3_nextStep").click()
        time.sleep(3)

    assert len(evalDiv.find_elements_by_class_name("previousStep")) > 0
    driver.find_element_by_id("showEval_3_reset").click()
    assert len(evalDiv.find_elements_by_class_name("previousStep")) == 0


@pytest.fixture
def selenium_utils_2(selenium_utils):
    selenium_utils.get("replace.html")
    selenium_utils.wait_until_ready("showEval_2")
    return selenium_utils


def test_Next_Step_2(selenium_utils_2):
    driver = selenium_utils_2.driver
    assert "ShowEval" in driver.title
    evalDiv = driver.find_element_by_id("showEval_2")

    assert len(evalDiv.find_elements_by_tag_name("span")) == 4
    evalText = driver.find_element_by_class_name("eval").text
    assert evalText != ""

    driver.find_element_by_id("showEval_2_nextStep").click()
    time.sleep(3)
    assert len(evalDiv.find_elements_by_tag_name("span")) == 4
    assert driver.find_element_by_class_name("eval").text != evalText


def test_Reset_Step_2(selenium_utils_2):
    driver = selenium_utils_2.driver
    assert "ShowEval" in driver.title
    evalText1 = driver.find_element_by_class_name("eval").text

    for i in range(4):
        driver.find_element_by_id("showEval_2_nextStep").click()
        time.sleep(3)

    assert driver.find_element_by_class_name("eval").text != evalText1
    driver.find_element_by_id("showEval_2_reset").click()
    assert driver.find_element_by_class_name("eval").text == evalText1
