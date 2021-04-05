"""
Test Clickable Area question directive
"""

import pytest
from selenium.webdriver.common.action_chains import ActionChains

__author__ = "yasinovskyy"

# make two variations on Red Orange Yellow row for sphinx 1.x and 2.x
ANSWERS = [
    "Red\nOrange\nYellow",
    "Red Orange Yellow",
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Indigo",
    "Violet",
]


@pytest.fixture
def selenium_utils_1(selenium_utils):
    selenium_utils.get("index.html")
    selenium_utils.wait_until_ready("test_clickablearea_1")
    selenium_utils.wait_until_ready("test_clickablearea_2")
    return selenium_utils


def test_ca1(selenium_utils_1):
    """Text/Code: Nothing selected"""
    t1 = selenium_utils_1.driver.find_element_by_id("test_clickablearea_1")

    btn_check = t1.find_element_by_class_name("btn-success")
    btn_check.click()

    fb = t1.find_element_by_class_name("alert")
    assert fb is not None
    cnamestr = fb.get_attribute("class")
    assert "alert-danger" in cnamestr


def test_ca2(selenium_utils_1):
    """Text/Code: Correct answer(s) selected"""
    t1 = selenium_utils_1.driver.find_element_by_id("test_clickablearea_1")

    targets = t1.find_elements_by_class_name("clickable")
    for target in targets:
        if target.text in ANSWERS:
            target.click()

    btn_check = t1.find_element_by_class_name("btn-success")
    ActionChains(selenium_utils_1.driver).move_to_element(btn_check).perform()
    btn_check.click()

    for target in targets:
        if target.text in ANSWERS:
            cnamestr = target.get_attribute("class")
            assert "clickable-clicked" in cnamestr

    fb = t1.find_element_by_class_name("alert")
    assert fb is not None
    ActionChains(selenium_utils_1.driver).move_to_element(fb).perform()
    cnamestr = fb.get_attribute("class")
    assert "alert-info" in cnamestr


def test_ca3(selenium_utils_1):
    """Text/Code: Incorrect answer selected"""
    t1 = selenium_utils_1.driver.find_element_by_id("test_clickablearea_1")

    targets = t1.find_elements_by_class_name("clickable")
    for target in targets:
        if target.text not in ANSWERS:
            target.click()

    btn_check = t1.find_element_by_class_name("btn-success")
    btn_check.click()

    for target in targets:
        if target.text not in ANSWERS:
            cnamestr = target.get_attribute("class")
            assert "clickable-incorrect" in cnamestr

    fb = t1.find_element_by_class_name("alert")
    assert fb is not None
    cnamestr = fb.get_attribute("class")
    assert "alert-danger" in cnamestr


def test_ca4(selenium_utils_1):
    """Text/Code: All options clicked one by one"""
    t1 = selenium_utils_1.driver.find_element_by_id("test_clickablearea_1")

    targets = t1.find_elements_by_class_name("clickable")
    for target in targets:
        target.click()

    btn_check = t1.find_element_by_class_name("btn-success")
    btn_check.click()

    for target in targets:
        cnamestr = target.get_attribute("class")
        if target.text in ANSWERS:
            assert "clickable-clicked" in cnamestr
        else:
            assert "clickable-incorrect" in cnamestr

    fb = t1.find_element_by_class_name("alert")
    assert fb is not None
    cnamestr = fb.get_attribute("class")
    assert "alert-danger" in cnamestr


def test_ca5(selenium_utils_1):
    """Text/Code: Correct answer selected and unselected"""
    t1 = selenium_utils_1.driver.find_element_by_id("test_clickablearea_1")

    targets = t1.find_elements_by_class_name("clickable")
    for target in targets:
        if target.text in ANSWERS:
            target.click()
            target.click()

    for target in targets:
        if target.text in ANSWERS:
            cnamestr = target.get_attribute("class")
            assert "clickable-clicked" not in cnamestr


def test_ca6(selenium_utils_1):
    """Table: Nothing selected"""
    t1 = selenium_utils_1.driver.find_element_by_id("test_clickablearea_2")

    btn_check = t1.find_element_by_class_name("btn-success")
    btn_check.click()

    fb = t1.find_element_by_class_name("alert")
    assert fb is not None
    cnamestr = fb.get_attribute("class")
    assert "alert-danger" in cnamestr


def test_ca7(selenium_utils_1):
    """Table: Correct answer(s) selected"""
    t1 = selenium_utils_1.driver.find_element_by_id("test_clickablearea_2")

    targets = t1.find_elements_by_class_name("clickable")
    for target in targets:
        if target.text in ANSWERS:
            target.click()

    btn_check = t1.find_element_by_class_name("btn-success")
    btn_check.click()

    for target in targets:
        if target.text in ANSWERS:
            cnamestr = target.get_attribute("class")
            assert "clickable-clicked" in cnamestr

    fb = t1.find_element_by_class_name("alert")
    assert fb is not None
    cnamestr = fb.get_attribute("class")
    assert "alert-info" in cnamestr


def test_ca8(selenium_utils_1):
    """Table: Incorrect answer selected"""
    t1 = selenium_utils_1.driver.find_element_by_id("test_clickablearea_2")

    targets = t1.find_elements_by_class_name("clickable")
    for target in targets:
        if target.text not in ANSWERS:
            target.click()

    btn_check = t1.find_element_by_class_name("btn-success")
    btn_check.click()

    for target in targets:
        if target.text not in ANSWERS:
            cnamestr = target.get_attribute("class")
            assert "clickable-incorrect" in cnamestr

    fb = t1.find_element_by_class_name("alert")
    assert fb is not None
    cnamestr = fb.get_attribute("class")
    assert "alert-danger" in cnamestr


def test_ca9(selenium_utils_1):
    """Table: All options clicked one by one"""
    t1 = selenium_utils_1.driver.find_element_by_id("test_clickablearea_2")

    targets = t1.find_elements_by_class_name("clickable")
    for target in targets:
        target.click()

    btn_check = t1.find_element_by_class_name("btn-success")
    btn_check.click()

    for target in targets:
        cnamestr = target.get_attribute("class")
        if target.text in ANSWERS:
            assert "clickable-clicked" in cnamestr
        else:
            assert "clickable-incorrect" in cnamestr

    fb = t1.find_element_by_class_name("alert")
    assert fb is not None
    cnamestr = fb.get_attribute("class")
    assert "alert-danger" in cnamestr


def test_ca10(selenium_utils_1):
    """Table: Correct answer selected and unselected"""
    t1 = selenium_utils_1.driver.find_element_by_id("test_clickablearea_2")

    targets = t1.find_elements_by_class_name("clickable")
    for target in targets:
        if target.text in ANSWERS:
            target.click()
            target.click()

    for target in targets:
        if target.text in ANSWERS:
            cnamestr = target.get_attribute("class")
            assert "clickable-clicked" not in cnamestr
