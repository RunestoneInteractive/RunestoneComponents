from runestone.unittest_base import module_fixture_maker, RunestoneTestCase

setUpModule, tearDownModule = module_fixture_maker(__file__)

class QuestionTests(RunestoneTestCase):
    def test_hello(self):
        '''
        1. Get the outer div id of the activecode component
        2. Find the run button using its class name
        3. Run the example
        4. Check the output from the ac_output element
        :return:
        '''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("qtest_1")
        self.assertIsNotNone(t1)
        li = t1.find_element_by_tag_name("ol")
        self.assertIsNotNone(li)
        num = li.get_attribute("start")
        self.assertEqual(num,"1")

        class_string = t1.get_attribute("class")
        self.assertTrue("full-width container" in class_string)

        t1 = self.driver.find_element_by_id("qtest_2")
        self.assertIsNotNone(t1)
        li = t1.find_element_by_tag_name("ol")
        self.assertIsNotNone(li)
        num = li.get_attribute("start")
        self.assertEqual(num,"2")

    # def test_mc(self):
    #     self.driver.get(self.host + "/index.html")
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
    #     self.assertEqual(cnamestr, "alert alert-danger")
    #
    # def test_mc2(self):
    #     self.driver.get(self.host + "/index.html")
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
    #     self.assertEqual(cnamestr, "alert alert-success")

