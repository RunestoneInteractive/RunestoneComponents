import time
from runestone.unittest_base import module_fixture_maker, RunestoneTestCase

__author__ = 'wayne brown'

mf, setUpModule, tearDownModule = module_fixture_maker(__file__, True)


class ShowEvalTest_TraceMode(RunestoneTestCase):

    def setUp(self):
        super(ShowEvalTest_TraceMode, self).setUp()
        print(vars(self))
        self.driver.get(self.host + "/trace.html")

    def test_Next_Step(self):
        driver = self.driver
        self.assertIn("ShowEval", driver.title)
        evalDiv = driver.find_element_by_id("showEval_3")

        prevList = driver.find_elements_by_class_name("previousStep")
        prevListLen = len(prevList)
        assert prevListLen == 0
        assert len(evalDiv.find_elements_by_tag_name("span")) == 3

        driver.find_element_by_id("showEval_3_nextStep").click()
        time.sleep(3)
        assert len(evalDiv.find_elements_by_tag_name("span")) == 3
        assert len(driver.find_elements_by_class_name("previousStep")) > prevListLen

    def test_Reset_Step(self):
        driver = self.driver
        self.assertIn("ShowEval", driver.title)
        evalDiv = driver.find_element_by_id("showEval_3")

        for i in range(3):
            driver.find_element_by_id("showEval_3_nextStep").click()
            time.sleep(3)

        assert len(evalDiv.find_elements_by_class_name("previousStep")) > 0
        driver.find_element_by_id("showEval_3_reset").click()
        assert len(evalDiv.find_elements_by_class_name("previousStep")) == 0


class ShowEvalTest_ReplaceMode(RunestoneTestCase):

    def setUp(self):
        super(ShowEvalTest_ReplaceMode, self).setUp()
        self.driver.get(self.host + "/replace.html")

    def test_Next_Step(self):
        driver = self.driver
        self.assertIn("ShowEval", driver.title)
        evalDiv = driver.find_element_by_id("showEval_2")

        assert len(evalDiv.find_elements_by_tag_name("span")) == 3
        evalText = driver.find_element_by_class_name("eval").text
        assert evalText != ""

        driver.find_element_by_id("showEval_2_nextStep").click()
        time.sleep(3)
        assert len(evalDiv.find_elements_by_tag_name("span")) == 3
        assert driver.find_element_by_class_name("eval").text != evalText

    def test_Reset_Step(self):
        driver = self.driver
        self.assertIn("ShowEval", driver.title)
        evalText1 = driver.find_element_by_class_name("eval").text

        for i in range(4):
            driver.find_element_by_id("showEval_2_nextStep").click()
            time.sleep(3)

        assert driver.find_element_by_class_name("eval").text != evalText1
        driver.find_element_by_id("showEval_2_reset").click()
        assert driver.find_element_by_class_name("eval").text == evalText1
