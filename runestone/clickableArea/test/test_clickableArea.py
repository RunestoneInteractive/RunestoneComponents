"""
Test Clickable Area question directive
"""

from selenium.webdriver.common.action_chains import ActionChains

__author__ = "yasinovskyy"

ANSWERS = [
    "Red\nOrange\nYellow",
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Indigo",
    "Violet",
]


# Utilities
# =========
def ca_prep(selenium_utils, div_id):
    selenium_utils.wait_until_ready(div_id)
    return selenium_utils.driver.find_element_by_id(div_id)


def click_check_button(selenium_element):
    btn_check = selenium_element.find_element_by_class_name("btn-success")
    btn_check.click()


def ca_feedback(selenium_element):
    fb = selenium_element.find_element_by_class_name("alert")
    return fb.get_attribute("class")


# Tests of clickable area 1 problem
# =================================
def ca1_prep(selenium_utils_get):
    return ca_prep(selenium_utils_get, "test_clickablearea_1")


def test_ca1(selenium_utils_get):
    """Text/Code: Nothing selected"""
    t1 = ca1_prep(selenium_utils_get)
    click_check_button(t1)

    assert "alert-danger" in ca_feedback(t1)


def test_ca2(selenium_utils_get):
    """Text/Code: Correct answer(s) selected"""
    t1 = ca1_prep(selenium_utils_get)

    targets = t1.find_elements_by_class_name("clickable")
    for target in targets:
        if target.text in ANSWERS:
            target.click()

    btn_check = t1.find_element_by_class_name("btn-success")
    ActionChains(selenium_utils_get.driver).move_to_element(btn_check).perform()
    btn_check.click()

    for target in targets:
        if target.text in ANSWERS:
            cnamestr = target.get_attribute("class")
            assert "clickable-clicked" in cnamestr

    fb = t1.find_element_by_class_name("alert")
    ActionChains(selenium_utils_get.driver).move_to_element(fb).perform()
    assert "alert-info" in ca_feedback(t1)


def test_ca3(selenium_utils_get):
    """Text/Code: Incorrect answer selected"""
    t1 = ca1_prep(selenium_utils_get)

    targets = t1.find_elements_by_class_name("clickable")
    for target in targets:
        if target.text not in ANSWERS:
            target.click()

    click_check_button(t1)

    for target in targets:
        if target.text not in ANSWERS:
            cnamestr = target.get_attribute("class")
            assert "clickable-incorrect" in cnamestr

    assert "alert-danger" in ca_feedback(t1)


def test_ca4(selenium_utils_get):
    """Text/Code: All options clicked one by one"""
    t1 = ca1_prep(selenium_utils_get)

    targets = t1.find_elements_by_class_name("clickable")
    for target in targets:
        target.click()

    click_check_button(t1)

    for target in targets:
        cnamestr = target.get_attribute("class")
        if target.text in ANSWERS:
            assert "clickable-clicked" in cnamestr
        else:
            assert "clickable-incorrect" in cnamestr

    assert "alert-danger" in ca_feedback(t1)


def test_ca5(selenium_utils_get):
    """Text/Code: Correct answer selected and unselected"""
    t1 = ca1_prep(selenium_utils_get)

    targets = t1.find_elements_by_class_name("clickable")
    for target in targets:
        if target.text in ANSWERS:
            target.click()
            target.click()

    for target in targets:
        if target.text in ANSWERS:
            cnamestr = target.get_attribute("class")
            assert "clickable-clicked" not in cnamestr


# Tests of clickable area 2 problem
# =================================
def ca2_prep(selenium_utils_get):
    return ca_prep(selenium_utils_get, "test_clickablearea_2")


def test_ca6(selenium_utils_get):
    """Table: Nothing selected"""
    t1 = ca2_prep(selenium_utils_get)
    click_check_button(t1)
    assert "alert-danger" in ca_feedback(t1)


def test_ca7(selenium_utils_get):
    """Table: Correct answer(s) selected"""
    t1 = ca2_prep(selenium_utils_get)

    targets = t1.find_elements_by_class_name("clickable")
    for target in targets:
        if target.text in ANSWERS:
            target.click()

    click_check_button(t1)

    for target in targets:
        if target.text in ANSWERS:
            cnamestr = target.get_attribute("class")
            assert "clickable-clicked" in cnamestr

    assert "alert-info" in ca_feedback(t1)


def test_ca8(selenium_utils_get):
    """Table: Incorrect answer selected"""
    t1 = ca2_prep(selenium_utils_get)

    targets = t1.find_elements_by_class_name("clickable")
    for target in targets:
        if target.text not in ANSWERS:
            target.click()

    click_check_button(t1)

    for target in targets:
        if target.text not in ANSWERS:
            cnamestr = target.get_attribute("class")
            assert "clickable-incorrect" in cnamestr

    assert "alert-danger" in ca_feedback(t1)


def test_ca9(selenium_utils_get):
    """Table: All options clicked one by one"""
    t1 = ca2_prep(selenium_utils_get)

    targets = t1.find_elements_by_class_name("clickable")
    for target in targets:
        target.click()

    click_check_button(t1)

    for target in targets:
        cnamestr = target.get_attribute("class")
        if target.text in ANSWERS:
            assert "clickable-clicked" in cnamestr
        else:
            assert "clickable-incorrect" in cnamestr

    assert "alert-danger" in ca_feedback(t1)


def test_ca10(selenium_utils_get):
    """Table: Correct answer selected and unselected"""
    t1 = ca2_prep(selenium_utils_get)

    targets = t1.find_elements_by_class_name("clickable")
    for target in targets:
        if target.text in ANSWERS:
            target.click()
            target.click()

    for target in targets:
        if target.text in ANSWERS:
            cnamestr = target.get_attribute("class")
            assert "clickable-clicked" not in cnamestr
