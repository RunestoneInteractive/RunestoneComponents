def _test_ss_autograde(selenium_utils):
    selenium_utils.wait_until_ready("test_spreadsheet_1")

    t2 = selenium_utils.driver.find_element_by_id("ss1")
    rb = t2.find_element_by_class_name("run-button")
    rb.click()
    out = selenium_utils.driver.find_element_by_id("ss1_stdout")
    assert "You passed 2 out of 2 tests" in out.text

    selenium_utils.wait_until_ready("test_spreadsheet_2")
    t2 = selenium_utils.driver.find_element_by_id("ss2")
    rb = t2.find_element_by_class_name("run-button")
    rb.click()
    out = selenium_utils.driver.find_element_by_id("ss2_stdout")
    assert "You passed 1 out of 1 tests" in out.text


def test_ss_autograde(selenium_utils):
    selenium_utils.get("index.html")
