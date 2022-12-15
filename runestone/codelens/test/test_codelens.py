__author__ = "Brad Miller"


def test_Next_Step(selenium_utils_get):
    driver = selenium_utils_get.driver
    assert "CodeLens" in driver.title
    for tdiv in [
        "test_codelens_1",
        "test_codelens_2",
        "test_codelens_3",
        "test_codelens_4",
        "test_codelens_5",
        "test_codelens_6",
    ]:
        print(tdiv)
        selenium_utils_get.wait_until_ready(tdiv)
        clDiv = driver.find_element_by_id(tdiv)
        assert clDiv
        fwd = clDiv.find_element_by_id("jmpStepFwd")
        assert fwd
        bak = clDiv.find_element_by_id("jmpStepBack")
        assert bak
        assert bak.get_property("disabled") is True
