def test_ss_autograde(selenium_utils_get):
    selenium_utils_get.wait_until_ready("test_spreadsheet_1")

    t2 = selenium_utils_get.driver.find_element_by_id("test_spreadsheet_1")
    rb = t2.find_element_by_class_name("run-button")
    rb.click()
    out = selenium_utils_get.driver.find_element_by_id("test_spreadsheet_1_stdout")
    assert "You passed 2 out of 2 tests" in out.text

    selenium_utils_get.wait_until_ready("test_spreadsheet_2")
    t2 = selenium_utils_get.driver.find_element_by_id("test_spreadsheet_2")
    rb = t2.find_element_by_class_name("run-button")
    rb.click()
    out = selenium_utils_get.driver.find_element_by_id("test_spreadsheet_2_stdout")
    assert "You passed 1 out of 1 tests" in out.text
