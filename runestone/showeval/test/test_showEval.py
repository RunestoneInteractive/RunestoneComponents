import time

import pytest

__author__ = "wayne brown"


def se_prep(selenium_utils, div_id):
    driver = selenium_utils.driver
    assert "ShowEval" in driver.title
    selenium_utils.wait_until_ready(div_id)
    return driver, driver.find_element_by_id(div_id)


def se1_prep(selenium_utils):
    return se_prep(selenium_utils, "showEval_3")


@pytest.fixture
def selenium_utils_trace(selenium_utils):
    selenium_utils.get("trace.html")
    return selenium_utils


def test_Next_Step_1(selenium_utils_trace):
    driver, evalDiv = se1_prep(selenium_utils_trace)
    evalDiv = driver.find_element_by_id("showEval_3")

    prevList = driver.find_elements_by_class_name("previousStep")
    prevListLen = len(prevList)
    assert prevListLen == 0
    assert len(evalDiv.find_elements_by_tag_name("span")) == 4

    driver.find_element_by_id("showEval_3_nextStep").click()
    time.sleep(3)
    assert len(evalDiv.find_elements_by_tag_name("span")) == 4
    assert len(driver.find_elements_by_class_name("previousStep")) > prevListLen


def test_Reset_Step_1(selenium_utils_trace):
    driver, evalDiv = se1_prep(selenium_utils_trace)

    for i in range(3):
        driver.find_element_by_id("showEval_3_nextStep").click()
        time.sleep(3)

    assert len(evalDiv.find_elements_by_class_name("previousStep")) > 0
    driver.find_element_by_id("showEval_3_reset").click()
    assert len(evalDiv.find_elements_by_class_name("previousStep")) == 0


def se2_prep(selenium_utils):
    return se_prep(selenium_utils, "showEval_2")


@pytest.fixture
def selenium_utils_replace(selenium_utils):
    selenium_utils.get("replace.html")
    return selenium_utils


def test_Next_Step_2(selenium_utils_replace):
    driver, evalDiv = se2_prep(selenium_utils_replace)

    assert len(evalDiv.find_elements_by_tag_name("span")) == 4
    evalText = driver.find_element_by_class_name("eval").text
    assert evalText != ""

    driver.find_element_by_id("showEval_2_nextStep").click()
    time.sleep(3)
    assert len(evalDiv.find_elements_by_tag_name("span")) == 4
    assert driver.find_element_by_class_name("eval").text != evalText


def test_Reset_Step_2(selenium_utils_replace):
    driver, evalDiv = se2_prep(selenium_utils_replace)
    evalText1 = evalDiv.find_element_by_class_name("eval").text

    for i in range(4):
        driver.find_element_by_id("showEval_2_nextStep").click()
        time.sleep(3)

    assert driver.find_element_by_class_name("eval").text != evalText1
    driver.find_element_by_id("showEval_2_reset").click()
    assert driver.find_element_by_class_name("eval").text == evalText1
