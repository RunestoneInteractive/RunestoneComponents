import time

from runestone.unittest_base import module_fixture_maker, RunestoneTestCase
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

setUpModule, tearDownModule = module_fixture_maker(__file__)


class TimedTests(RunestoneTestCase):
    def start(self, timed_divid):
        self.driver.execute_script("window.localStorage.clear();")
        ##self.wait_until_ready(timed_divid)
        time.sleep(1)
        start = self.driver.find_element_by_id("start")
        start.click()

    def finish(self):
        finish = self.wait.until(
            EC.element_to_be_clickable((By.ID, "finish"))
        )
        self.assertIsNotNone(finish)
        finish.click()

        alert = self.driver.switch_to_alert()
        alert.accept()

    def dragndrop(self, src, dest):
        ActionChains(self.driver).drag_and_drop(src, dest).perform()

    def js_dragndrop(self):
        with open("../../dragndrop/test/drag_and_drop_helper.js") as f:
            self.driver.execute_script(f.read())

    def test_one_question_timed_exam(self):
        self.driver.get(self.host + "/index.html")
        self.start("time_q1")

        t1 = self.driver.find_element_by_id("time_test_1_q1_form")
        t1.find_element_by_id("time_test_1_q1_opt_0").click()
        t1.find_element_by_id("time_test_1_q1_opt_1").click()
        t1.find_element_by_id("time_test_1_q1_opt_2").click()
        t1.find_element_by_id("time_test_1_q1_opt_3").click()

        self.finish()

        fb = t1.find_element_by_id("time_test_1_q1_eachFeedback_1")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertEqual(cnamestr, "eachFeedback alert alert-danger")

    def test_1(self):
        self.driver.get(self.host + "/multiquestion.html")
        self.start("timed1")
        next = self.driver.find_element_by_id("next")

        # Select answer A in the mchoice question (which is correct).
        self.driver.find_element_by_id("questiontimed1_1_opt_0").click()
        next.click()

        # Click the correct cells in the table. There should be only one table.
        time.sleep(1)
        next.click()

        # The drag and drop question.
        time.sleep(1)
        next.click()

        # Fill in the blank question
        ##self.wait_until_ready("fill1412")
        time.sleep(1)
        filb = self.driver.find_element_by_id("fill1412")
        blank1, blank2 = filb.find_elements_by_tag_name("input")
        blank1.send_keys("red")
        blank2.send_keys("away")
        next.click()

        # ActiveCode question
        ##self.wait_until_ready("units2")
        time.sleep(1)
        code_mirror = self.driver.find_element_by_class_name("CodeMirror")
        code_mirror.find_elements_by_class_name("CodeMirror-line")[1].click()
        code_mirror.find_element_by_css_selector("textarea").send_keys(" - 4 + a + b")
        next.click()

        # The Parson's problem.
        ##self.wait_until_ready("morning")
        time.sleep(1)
        source = self.driver.find_element_by_id("parsons-1-source")
        answer = self.driver.find_element_by_id("parsons-1-answer")
        self.dragndrop(source.find_element_by_id("parsons-1-block-0"), answer)
        time.sleep(1)
        self.dragndrop(source.find_element_by_id("parsons-1-block-2"), answer)
        time.sleep(1)
        self.dragndrop(source.find_element_by_id("parsons-1-block-1"), answer)
        next.click()

        # The short answer question.
        ##self.wait_until_ready("question2")
        time.sleep(1)
        self.driver.find_element_by_id("question2_solution").send_keys("ROYGBIV circle area")

        self.finish()
        results = self.driver.find_element_by_id("timed1results")
        assert "Num Correct: 4" in results.text
        assert "Num Wrong: 0" in results.text
        assert "Num Skipped: 3" in results.text
