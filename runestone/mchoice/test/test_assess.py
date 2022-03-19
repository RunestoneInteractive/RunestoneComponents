# ****************************************************
# |docname| - Test Multiple Choice question directive
# ****************************************************

__author__ = "yasinovskyy"

from runestone.shared_conftest import (
    element_has_css_class,
)
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC


# Build checks
# ============
# Look for errors produced by invalid questions.
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
        assert ":{}: ERROR: {}".format(error_line, error_string) in mf.build_stderr_data

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
        assert ": ERROR: On line {}, a single-item list must be nested under each answer.".format(
            error_line
        ) in mf.build_stderr_data

    assert "WARNING: while setting up extension runestone.lp: role 'docname' is already registered, it will be overridden" in mf.build_stderr_data

    # Make sure we saw all errors.
    assert (len(directive_level_errors) + len(inside_directive_lines)
            ) == mf.build_stderr_data.count("ERROR")


# Run-time checks
# ===============
#
# Utilities
# ---------
# Check the feedback in the provided mchoice question.
def mchoice_feedback(selenium_element, div_id):
    fb = selenium_element.find_element_by_id(f"{div_id}_feedback")
    return fb.get_attribute("class")


def button_click(selenium_element):
    btn_check = selenium_element.find_element_by_tag_name("button")
    btn_check.click()


# Multiple-answer tests
# ---------------------
# The div_id for the multiple-answer mchoice question.
DIV_ID_MA = "test_mchoice_1"


# Prepare the multiple-answer question for testing.
def ma_prep(selenium_utils_get):
    selenium_utils_get.wait_until_ready(DIV_ID_MA)
    return selenium_utils_get.driver.find_element_by_id(DIV_ID_MA)


def test_ma1(selenium_utils_get):
    """Multiple Answer: Nothing selected, Check button clicked"""
    t1 = ma_prep(selenium_utils_get)
    button_click(t1)
    assert "alert-danger" in mchoice_feedback(t1, DIV_ID_MA)


def test_ma2(selenium_utils_get):
    """Multiple Answer: Correct answer(s) selected"""
    t1 = ma_prep(selenium_utils_get)

    t1.find_element_by_id(f"{DIV_ID_MA}_opt_0").click()
    t1.find_element_by_id(f"{DIV_ID_MA}_opt_2").click()

    button_click(t1)

    assert "alert-info" in mchoice_feedback(t1, DIV_ID_MA)


def test_ma3(selenium_utils_get):
    """Multiple Answer: Incorrect answer(s) selected"""
    t1 = ma_prep(selenium_utils_get)

    t1.find_element_by_id(f"{DIV_ID_MA}_opt_1").click()
    t1.find_element_by_id(f"{DIV_ID_MA}_opt_3").click()

    button_click(t1)

    assert "alert-danger" in mchoice_feedback(t1, DIV_ID_MA)


def test_ma4(selenium_utils_get):
    """Multiple Answer: All options clicked one by one"""
    t1 = ma_prep(selenium_utils_get)

    answers = t1.find_elements_by_tag_name("label")
    for el in answers:
        el.click()

    button_click(t1)

    assert "alert-danger" in mchoice_feedback(t1, DIV_ID_MA)


# Multiple-choice tests
# ---------------------
# The div_id for the mchoice multiple-choice question.
DIV_ID_MC = "test_mchoice_2"


# Prepare the multiple-answer question for testing.
def mc_prep(selenium_utils_get):
    selenium_utils_get.wait_until_ready(DIV_ID_MC)
    return selenium_utils_get.driver.find_element_by_id(DIV_ID_MC)


def test_mc1(selenium_utils_get):
    """Multiple Choice: Nothing selected"""
    t1 = mc_prep(selenium_utils_get)
    button_click(t1)
    selenium_utils_get.wait.until(
        element_has_css_class((By.ID, f"{DIV_ID_MC}_feedback"), "alert-danger")
    )


def test_mc2(selenium_utils_get):
    """Multiple Choice: Correct answer selected"""
    t1 = mc_prep(selenium_utils_get)
    t1.find_element_by_id(f"{DIV_ID_MC}_opt_0").click()
    button_click(t1)

    selenium_utils_get.wait.until(
        EC.text_to_be_present_in_element((By.ID, f"{DIV_ID_MC}_feedback"), "Red"),
        message="Did not find expected text",
    )
    assert "alert-info" in mchoice_feedback(t1, DIV_ID_MC)


def test_mc3(selenium_utils_get):
    """Multiple Choice: Incorrect answer selected"""
    t1 = mc_prep(selenium_utils_get)
    t1.find_element_by_id(f"{DIV_ID_MC}_opt_1").click()
    button_click(t1)

    assert "alert-danger" in mchoice_feedback(t1, DIV_ID_MC)


def test_mc4(selenium_utils_get):
    """Multiple Choice: All options clicked one by one"""
    t1 = mc_prep(selenium_utils_get)

    answers = t1.find_elements_by_tag_name("li")
    for el in answers:
        el.click()

    button_click(t1)

    answer = t1.find_element_by_id(f"{DIV_ID_MC}_opt_0")
    assert not answer.is_selected()

    assert "alert-danger" in mchoice_feedback(t1, DIV_ID_MC)
