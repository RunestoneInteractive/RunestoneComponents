def _test_poll(selenium_utils, id):
    """ test the poll directive """
    self = selenium_utils
    self.wait_until_ready(id)

    poll_div = self.driver.find_element_by_id(id)

    opts = poll_div.find_elements_by_css_selector("input[type='radio']")

    # the poll in overview should be on a scale 1-10.
    assert len(opts) == 10, "Not enough poll options present!"

    # just choose option 4
    poll_div.find_element_by_id(f"{id}_opt_4").click()

    el = poll_div.find_element_by_id(f"{id}_sent")  # check for results span
    assert el.text[:6] == "Thanks"

    # just make sure we can find the results div - an exception will be raised if the div cannot be found
    poll_div.find_element_by_id(f"{id}_results")


def test_poll(selenium_utils):
    selenium_utils.get("index.html")
    _test_poll(selenium_utils, "pollid1")
