"""
Test Short Answer question directive
"""

__author__ = "yasinovskyy"

DIV_ID = "test_short_answer_1"


def get_sa(selenium_utils):
    selenium_utils.wait_until_ready(DIV_ID)
    selenium_utils.scroll_to_top()
    return selenium_utils.driver.find_element_by_id(DIV_ID)


def click_button(sa_element):
    sa_element.find_element_by_tag_name("button").click()


def test_sa1(selenium_utils_get):
    """No input. Button not clicked"""
    t1 = get_sa(selenium_utils_get)
    fb = t1.find_element_by_id(f"{DIV_ID}_feedback")
    assert "alert-danger" in fb.get_attribute("class")


def test_sa2(selenium_utils_get):
    """No input. Button clicked"""
    t1 = get_sa(selenium_utils_get)
    click_button(t1)
    fb = t1.find_element_by_id(f"{DIV_ID}_feedback")
    assert "alert-success" in fb.get_attribute("class")


def test_sa3(selenium_utils_get):
    """Answer entered"""
    t1 = get_sa(selenium_utils_get)
    ta = t1.find_element_by_id(f"{DIV_ID}_solution")
    ta.clear()
    ta.send_keys("My answer")

    click_button(t1)

    fb = t1.find_element_by_id(f"{DIV_ID}_feedback")
    assert fb is not None
    assert "alert-success" in fb.get_attribute("class")


# TODO: this is the same as ``_test_sa3``.
def test_sa4(selenium_utils_get):
    """Answer entered and cleared"""
    t1 = get_sa(selenium_utils_get)
    ta = t1.find_element_by_id(f"{DIV_ID}_solution")
    ta.clear()
    ta.send_keys("My answer")

    click_button(t1)

    fb = t1.find_element_by_id(f"{DIV_ID}_feedback")
    assert fb is not None
    assert "alert-success" in fb.get_attribute("class")
