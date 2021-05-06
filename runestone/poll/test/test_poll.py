def test_poll(selenium_utils_get):
    """ test the poll directive """
    div_id = "test_poll_1"
    selenium_utils_get.wait_until_ready(div_id)

    poll_div = selenium_utils_get.driver.find_element_by_id(div_id)

    opts = poll_div.find_elements_by_css_selector("input[type='radio']")

    # the poll in overview should be on a scale 1-10.
    assert len(opts) == 10, "Not enough poll options present!"

    # just choose option 4
    poll_div.find_element_by_id(f"{div_id}_opt_4").click()

    el = poll_div.find_element_by_id(f"{div_id}_sent")  # check for results span
    assert el.text[:6] == "Thanks"

    # just make sure we can find the results div - an exception will be raised if the div cannot be found
    poll_div.find_element_by_id(f"{div_id}_results")
