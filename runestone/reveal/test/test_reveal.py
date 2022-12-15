"""
Test Reveal Answer question directive
"""

__author__ = "yasinovskyy"


def test_r1(selenium_utils_get):
    """Initial view. Content is hidden"""
    su = selenium_utils_get
    su.wait_until_ready("question1")

    q1 = su.driver.find_element_by_css_selector("#question1 div")
    cnamestr = q1.get_attribute("style")
    assert "display: none;" == cnamestr


def test_r2(selenium_utils_get):
    """Reveal button clicked"""
    su = selenium_utils_get
    su.wait_until_ready("question1")
    t1 = su.driver.find_element_by_id("reveal")

    btn_show = t1.find_element_by_id("question1_show")
    btn_show.click()

    q1 = t1.find_element_by_id("question1")

    cnamestr = q1.get_attribute("style")
    assert "display: none;" != cnamestr


def test_r3(selenium_utils_get):
    """Content is revealed, then hidden again"""
    su = selenium_utils_get
    su.wait_until_ready("question1")
    t1 = su.driver.find_element_by_id("reveal")

    btn_show = t1.find_element_by_id("question1_show")
    btn_show.click()
    btn_hide = t1.find_element_by_id("question1_hide")
    btn_hide.click()

    q1 = su.driver.find_element_by_css_selector("#question1 div")
    cnamestr = q1.get_attribute("style")
    assert "display: none;" == cnamestr


def test_r4(selenium_utils_get):
    """Check for is_instructor test """
    su = selenium_utils_get
    su.wait_until_ready("question1")
    t1 = su.driver.find_element_by_id("reveal")
    assert "{% if is_instructor: %}" in t1.get_attribute("innerHTML")
