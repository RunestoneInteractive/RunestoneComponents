"""
Test Short Answer question directive
"""

import pytest

__author__ = "yasinovskyy"

DIV_ID = "test_short_answer_1"


@pytest.fixture
def selenium_utils_1(selenium_utils):
    selenium_utils.get("index.html")
    selenium_utils.wait_until_ready(DIV_ID)
    return selenium_utils


def test_sa1(selenium_utils_1):
    """No input. Button not clicked"""
    self = selenium_utils_1
    t1 = self.driver.find_element_by_id(DIV_ID)

    fb = t1.find_element_by_id(f"{DIV_ID}_feedback")
    assert "alert-danger" in fb.get_attribute("class")


def test_sa2(selenium_utils_1):
    """No input. Button clicked"""
    t1 = selenium_utils_1.driver.find_element_by_id(DIV_ID)

    btn_check = t1.find_element_by_tag_name("button")
    btn_check.click()

    fb = t1.find_element_by_id(f"{DIV_ID}_feedback")
    assert "alert-success" in fb.get_attribute("class")


def test_sa3(selenium_utils_1):
    """Answer entered"""
    t1 = selenium_utils_1.driver.find_element_by_id(DIV_ID)
    ta = t1.find_element_by_id(f"{DIV_ID}_solution")
    ta.clear()
    ta.send_keys("My answer")

    btn_check = t1.find_element_by_tag_name("button")
    btn_check.click()

    fb = t1.find_element_by_id(f"{DIV_ID}_feedback")
    assert fb is not None
    assert "alert-success" in fb.get_attribute("class")


# TODO: this is the same as ``_test_sa3``.
def test_sa4(selenium_utils_1):
    """Answer entered and cleared"""
    t1 = selenium_utils_1.driver.find_element_by_id(DIV_ID)
    ta = t1.find_element_by_id(f"{DIV_ID}_solution")
    ta.clear()
    ta.send_keys("My answer")

    btn_check = t1.find_element_by_tag_name("button")
    btn_check.click()

    fb = t1.find_element_by_id(f"{DIV_ID}_feedback")
    assert fb is not None
    assert "alert-success" in fb.get_attribute("class")
