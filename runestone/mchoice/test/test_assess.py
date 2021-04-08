# ****************************************************
# |docname| - Test Multiple Choice question directive
# ****************************************************

__author__ = "yasinovskyy"

import pytest
from runestone.unittest_base import (
    element_has_css_class,
)
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC


# Look for errors producted by invalid questions.
def test_1(selenium_module_fixture):
    mf = selenium_module_fixture

    # Check for the following directive-level errors.
    directive_level_errors = (
        # Produced my mchoice id: error1_no_content,
        (47, "No correct answer specified"),
        # error2,
        (49, "No correct answer specified."),
        # error7,
        (102, "No correct answer specified."),
    )
    for error_line, error_string in directive_level_errors:
        assert ":{}: WARNING: {}".format(error_line, error_string) in mf.build_stderr_data

    # Check for the following error inside the directive.
    inside_directive_lines = (
        # Produced my mchoice id error3,
        61,
        # error4,
        70,
        # error6
        95,
    )
    for error_line in inside_directive_lines:
        assert ": WARNING: On line {}, a single-item list must be nested under each answer.".format(
            error_line
        ) in mf.build_stderr_data

    assert "WARNING: while setting up extension runestone.lp: role 'docname' is already registered, it will be overridden" in mf.build_stderr_data

    # Make sure we saw all errors.
    assert (len(directive_level_errors) + len(inside_directive_lines) + 1) == mf.build_stderr_data.count("WARNING")


@pytest.fixture
def selenium_utils_get(selenium_utils):
    selenium_utils.get("index.html")
    return selenium_utils


def test_ma1(selenium_utils_get):
    """Multiple Answer: Nothing selected, Check button clicked"""
    div_id = "question1"
    selenium_utils_get.wait_until_ready(div_id)
    t1 = selenium_utils_get.driver.find_element_by_id(div_id)

    btn_check = t1.find_element_by_tag_name("button")
    btn_check.click()

    fb = t1.find_element_by_id(f"{div_id}_feedback")
    cnamestr = fb.get_attribute("class")
    assert "alert-danger" in cnamestr


def test_ma2(selenium_utils_get):
    """Multiple Answer: Correct answer(s) selected"""
    div_id = "question1"
    selenium_utils_get.wait_until_ready(div_id)
    t1 = selenium_utils_get.driver.find_element_by_id(div_id)

    t1.find_element_by_id("question1_opt_0").click()
    t1.find_element_by_id("question1_opt_2").click()

    btn_check = t1.find_element_by_tag_name("button")
    btn_check.click()

    fb = t1.find_element_by_id("question1_feedback")
    cnamestr = fb.get_attribute("class")
    assert "alert-info" in cnamestr


def test_ma3(selenium_utils_get):
    """Multiple Answer: Incorrect answer(s) selected"""
    div_id = "question1"
    selenium_utils_get.wait_until_ready(div_id)
    t1 = selenium_utils_get.driver.find_element_by_id(div_id)

    t1.find_element_by_id(f"{div_id}_opt_1").click()
    t1.find_element_by_id(f"{div_id}_opt_3").click()

    btn_check = t1.find_element_by_tag_name("button")
    btn_check.click()

    fb = t1.find_element_by_id("question1_feedback")
    cnamestr = fb.get_attribute("class")
    assert "alert-danger" in cnamestr


def test_ma4(selenium_utils_get):
    """Multiple Answer: All options clicked one by one"""
    div_id = "question1"
    selenium_utils_get.wait_until_ready(div_id)
    t1 = selenium_utils_get.driver.find_element_by_id(div_id)

    answers = t1.find_elements_by_tag_name("label")
    for el in answers:
        el.click()

    btn_check = t1.find_element_by_tag_name("button")
    btn_check.click()

    fb = t1.find_element_by_id(f"{div_id}_feedback")
    cnamestr = fb.get_attribute("class")
    assert "alert-danger" in cnamestr


def test_mc1(selenium_utils_get):
    """Multiple Choice: Nothing selected"""
    div_id = "question2"
    selenium_utils_get.wait_until_ready(div_id)
    t1 = selenium_utils_get.driver.find_element_by_id(div_id)
    btn_check = t1.find_element_by_tag_name("button")
    btn_check.click()
    selenium_utils_get.wait.until(
        element_has_css_class((By.ID, f"{div_id}_feedback"), "alert-danger")
    )


def test_mc2(selenium_utils_get):
    """Multiple Choice: Correct answer selected"""
    div_id = "question2"
    selenium_utils_get.wait_until_ready(div_id)
    t1 = selenium_utils_get.driver.find_element_by_id(div_id)

    t1.find_element_by_id(f"{div_id}_opt_0").click()

    btn_check = t1.find_element_by_tag_name("button")
    btn_check.click()

    selenium_utils_get.wait.until(
        EC.text_to_be_present_in_element((By.ID, f"{div_id}_feedback"), "Red"),
        message="Did not find expected text",
    )
    fb = t1.find_element_by_id(f"{div_id}_feedback")
    cnamestr = fb.get_attribute("class")
    assert "alert-info" in cnamestr


def test_mc3(selenium_utils_get):
    """Multiple Choice: Incorrect answer selected"""
    div_id = "question2"
    selenium_utils_get.wait_until_ready(div_id)
    t1 = selenium_utils_get.driver.find_element_by_id(div_id)

    t1.find_element_by_id(f"{div_id}_opt_1").click()

    btn_check = t1.find_element_by_tag_name("button")
    btn_check.click()

    fb = t1.find_element_by_id("question2_feedback")
    cnamestr = fb.get_attribute("class")
    assert "alert-danger" in cnamestr


def test_mc4(selenium_utils_get):
    """Multiple Choice: All options clicked one by one"""
    div_id = "question2"
    selenium_utils_get.wait_until_ready(div_id)
    t1 = selenium_utils_get.driver.find_element_by_id(div_id)

    answers = t1.find_elements_by_tag_name("li")
    for el in answers:
        el.click()

    btn_check = t1.find_element_by_tag_name("button")
    btn_check.click()

    answer = t1.find_element_by_id(f"{div_id}_opt_0")
    assert not answer.is_selected()

    fb = t1.find_element_by_id(f"{div_id}_feedback")
    cnamestr = fb.get_attribute("class")
    assert "alert-danger" in cnamestr
