"""
Test Tabbed stuff directive
"""

__author__ = "yasinovskyy"


def test_t1(selenium_utils):
    """Initial view. Tab 1 is visible, tab 2 is hidden"""
    su = selenium_utils
    su.get("index.html")
    su.wait_until_ready("exercise1")

    e1 = su.driver.find_element_by_id("exercise1")

    t1 = e1.find_element_by_class_name("active")
    tp1 = e1.find_element_by_id("exercise1-0")

    assert "Tab 1" == t1.text
    assert "Hello!" == tp1.text


def test_t2(selenium_utils):
    """Tab 2 is visible, tab 1 is hidden"""
    su = selenium_utils
    su.get("index.html")
    su.wait_until_ready("exercise1")
    e1 = su.driver.find_element_by_id("exercise1")

    btn_tab2 = e1.find_element_by_link_text("Tab 2")
    btn_tab2.click()

    t1 = e1.find_element_by_class_name("active")
    tp1 = e1.find_element_by_id("exercise1-1")

    assert "Tab 2" == t1.text
    assert "Goodbye!" == tp1.text


def test_t3(selenium_utils):
    """Tab 2 is selected, then tab 1"""
    su = selenium_utils
    su.get("index.html")
    su.wait_until_ready("exercise1")
    e1 = su.driver.find_element_by_id("exercise1")

    btn_tab2 = e1.find_element_by_link_text("Tab 2")
    btn_tab2.click()

    btn_tab1 = e1.find_element_by_link_text("Tab 1")
    btn_tab1.click()

    t1 = e1.find_element_by_class_name("active")
    tp1 = e1.find_element_by_id("exercise1-0")

    assert "Tab 1" == t1.text
    assert "Hello!" == tp1.text
