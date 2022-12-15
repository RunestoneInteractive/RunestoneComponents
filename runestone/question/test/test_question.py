def test_hello(selenium_utils_get):
    """
    1. Get the outer div id of the activecode component
    2. Find the run button using its class name
    3. Run the example
    4. Check the output from the ac_output element
    :return:
    """
    t1 = selenium_utils_get.driver.find_element_by_id("qtest_1")
    li = t1.find_element_by_tag_name("ol")
    num = li.get_attribute("start")
    assert num == "1"

    class_string = t1.get_attribute("class")
    assert "full-width container" in class_string

    t1 = selenium_utils_get.driver.find_element_by_id("qtest_2")
    li = t1.find_element_by_tag_name("ol")
    num = li.get_attribute("start")
    assert num == "2"


# def test_mc(self):
#     t1 = self.driver.find_element_by_id("qtest_2")
#     cbs = t1.find_elements_by_tag_name("li")
#     for el in cbs:
#         el.click()
#
#     checkme = t1.find_element_by_tag_name('button')
#     checkme.click()
#
#     fb = t1.find_element_by_id("question1_2_feedback")
#     self.assertIsNotNone(fb)
#     cnamestr = fb.get_attribute("class")
#     assert cnamestr, "alert alert-danger")
#
#
# def test_mc2(self):
#     t1 = self.driver.find_element_by_id("qtest_2")
#     t1.find_element_by_id("question1_2_opt_0").click()
#     t1.find_element_by_id("question1_2_opt_1").click()
#     t1.find_element_by_id("question1_2_opt_3").click()
#
#     checkme = t1.find_element_by_tag_name('button')
#     checkme.click()
#
#     fb = t1.find_element_by_id("question1_2_feedback")
#     self.assertIsNotNone(fb)
#     cnamestr = fb.get_attribute("class")
#     assert cnamestr, "alert alert-success")
