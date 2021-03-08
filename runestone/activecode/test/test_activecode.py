from selenium.webdriver import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import (
    ElementClickInterceptedException,
)
import time
from runestone.unittest_base import module_fixture_maker, RunestoneTestCase

setUpModule, tearDownModule = module_fixture_maker(__file__)


class ActiveCodeTests(RunestoneTestCase):
    def test_hello(self):
        """
        1. Get the outer div id of the activecode component
        2. Find the run button using its class name
        3. Run the example
        4. Check the output from the ac_output element
        :return:
        """
        self.driver.get(self.host + "/index.html")
        self.wait_until_ready("test1")
        t1 = self.driver.find_element_by_id("test1")
        self.assertIsNotNone(t1)
        rb = t1.find_element_by_class_name("run-button")
        self.assertIsNotNone(rb)
        rb.click()
        self.wait.until(
            EC.text_to_be_present_in_element((By.ID, "test1_stdout"), "Hello World"),
            message="Did not find expected text",
        )
        output = t1.find_element_by_class_name("ac_output")
        self.assertEqual(output.text.strip(), "Hello World")

    def test_hidden(self):
        """
        1. Get the outer div id of the activecode component
        2. Find the run button using its class name
        3. Run the example
        4. Check the output from the ac_output element
        :return:
        """
        self.driver.get(self.host + "/index.html")
        self.wait_until_ready("testprefixcode")
        t1 = self.driver.find_element_by_id("testprefixcode")
        self.assertIsNotNone(t1)
        rb = t1.find_element_by_class_name("run-button")
        self.assertIsNotNone(rb)
        rb.click()
        self.wait.until(
            EC.text_to_be_present_in_element(
                (By.ID, "testprefixcode_stdout"), "My Code"
            )
        )
        output = t1.find_element_by_class_name("ac_output")
        self.assertIn("hidden code", output.text.strip())
        self.assertIn("i\nx", output.text.strip())

    def test_history(self):
        """
        1. Get the outer div id of the activecode component
        2. Find the run button using its class name
        3. Run the example
        4. Check the output from the ac_output element
        :return:
        """
        self.driver.get(self.host + "/index.html")
        self.wait_until_ready("test1")
        t1 = self.driver.find_element_by_id("test1")
        self.assertIsNotNone(t1)
        rb = t1.find_element_by_class_name("run-button")
        self.assertIsNotNone(rb)
        try:
            rb.click()
        except ElementClickInterceptedException:
            # interceptor = self.driver.find_element_by_class_name("navbar-collapse")
            # self.driver.execute_script(
            #     """
            # var el = arguments[0];
            # el.parentNode.removeChild(el);
            # """,
            #     interceptor,
            # )
            self.driver.execute_script("window.scrollTo(0, 0);")
            rb.click()

        ta = t1.find_element_by_class_name("cm-s-default")
        self.assertIsNotNone(ta)
        self.driver.execute_script(
            """window.edList['test1'].editor.setValue("print('GoodBye')")"""
        )
        self.wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "run-button")))
        try:
            rb.click()
        except ElementClickInterceptedException:
            interceptor = self.driver.find_element_by_class_name("navbar-collapse")
            self.driver.executed_script(
                """
            var el = arguments[0];
            el.parentNode.removeChild(el);
            """,
                interceptor,
            )
            rb.click()

        output = t1.find_element_by_class_name("ac_output")
        self.assertEqual(output.text.strip(), "GoodBye")
        move = ActionChains(self.driver)
        slider = t1.find_element_by_class_name("ui-slider")
        width = slider.size["width"]
        slider = t1.find_element_by_class_name("ui-slider-handle")
        move.click_and_hold(slider).move_by_offset(-width, 0).release().perform()
        rb.click()
        output = t1.find_element_by_class_name("ac_output")
        self.assertEqual(output.text.strip(), "Hello World")

    def test_livecode_datafile(self):
        """
        Runs test2 example
        Code is dependent on supplementary file
        """
        self.driver.get(self.host + "/index.html")
        self.wait_until_ready("test2")
        t2 = self.driver.find_element_by_id("test2")
        self.assertIsNotNone(t2)
        rb = t2.find_element_by_class_name("run-button")
        self.assertIsNotNone(rb)
        rb.click()
        output = t2.find_element_by_class_name("ac_output")

        count = 0
        # Give it some time run
        print(output.text)
        while output.text.strip() != "Width: 25.0" and count < 20:
            count += 1
            time.sleep(0.5)
            print("Ouput so far:", output.text)
        try:
            self.assertLess(count, 20)
        except Exception:
            print("WARNING - No response from JOBE server")

    def test_activity_count(self):
        self.driver.get(self.host + "/progresspage.html")
        self.wait_until_ready("test_p1")
        t2 = self.driver.find_element_by_id("test_p1")
        self.assertIsNotNone(t2)
        rb = t2.find_element_by_class_name("run-button")
        self.assertIsNotNone(rb)
        rb.click()
        pb = self.driver.find_element_by_id("subchapterprogress")
        self.assertIsNotNone(pb)
        # Wait for the JS to run. Increase this delay if the next assertion fails.
        time.sleep(2)
        total = self.driver.find_element_by_id("scprogresstotal").text.strip()
        self.assertEqual(2, int(total))
        possible = self.driver.find_element_by_id("scprogressposs").text.strip()
        # expect only 1 because the page isn't included when not using services
        self.assertEqual(2, int(possible))
        # count should not increment after a second click
        rb.click()
        total = self.driver.find_element_by_id("scprogresstotal").text.strip()
        self.assertEqual(2, int(total))

    def test_sql_activecode(self):
        self.driver.get(self.host + "/index.html")
        self.wait_until_ready("sql1")
        t2 = self.driver.find_element_by_id("sql1")
        self.assertIsNotNone(t2)
        time.sleep(1)
        rb = t2.find_element_by_class_name("run-button")
        self.assertIsNotNone(rb)
        rb.click()
        self.wait.until(EC.text_to_be_present_in_element((By.ID, "sql1_stdout"), "You"))
        res = self.driver.find_element_by_id("sql1_sql_out")
        self.assertIsNotNone(res)
        out = self.driver.find_element_by_id("sql1_stdout")
        self.assertTrue("You passed 2 out of 3 tests" in out.text)

        t2 = self.driver.find_element_by_id("sql2")
        self.assertIsNotNone(t2)
        time.sleep(1)
        rb = t2.find_element_by_class_name("run-button")
        self.assertIsNotNone(rb)
        rb.click()
        out = self.driver.find_element_by_id("sql2_stdout")
        self.assertEqual("", out.text.strip())

    def test_readfiles(self):
        self.driver.get(self.host + "/skulptfeatures.html")
        self.wait_until_ready("ac9_13_1")
        t2 = self.driver.find_element_by_id("ac9_13_1")
        self.assertIsNotNone(t2)
        rb = t2.find_element_by_class_name("run-button")
        self.assertIsNotNone(rb)
        rb.click()
        self.wait.until(
            EC.text_to_be_present_in_element((By.ID, "ac9_13_1_stdout"), "Lind")
        )
        out = t2.find_element_by_id("ac9_13_1_stdout")
        self.assertIsNotNone(out)
        self.assertTrue("Lindenau" in out.text)

    def test_altair(self):
        self.driver.get(self.host + "/skulptfeatures.html")
        self.wait_until_ready("alt_kiva_bar1")
        t2 = self.driver.find_element_by_id("alt_kiva_bar1")
        self.assertIsNotNone(t2)
        rb = t2.find_element_by_class_name("run-button")
        self.assertIsNotNone(rb)
        rb.click()
        out = t2.find_element_by_id("alt_kiva_bar1_stdout")
        self.assertIsNotNone(out)
        self.wait.until(
            EC.text_to_be_present_in_element(
                (By.ID, "alt_kiva_bar1_stdout"), "mark = bar"
            )
        )
        self.assertIn("{'field': 'customer', 'type': 'nominal'}", out.text)
        can = t2.find_element_by_tag_name("canvas")
        self.assertIsNotNone(can)

    def test_image(self):
        self.driver.get(self.host + "/skulptfeatures.html")
        self.wait_until_ready("ac14_7_2")
        t2 = self.driver.find_element_by_id("ac14_7_2")
        self.assertIsNotNone(t2)
        rb = t2.find_element_by_class_name("run-button")
        self.assertIsNotNone(rb)
        rb.click()
        self.wait.until(
            EC.text_to_be_present_in_element((By.ID, "ac14_7_2_stdout"), "400")
        )
        out = t2.find_element_by_id("ac14_7_2_stdout")
        self.assertIsNotNone(out)
        self.assertTrue("244" in out.text)
        self.assertTrue(("165 161 158" in out.text) or ("165 162 157" in out.text))
        can = t2.find_element_by_tag_name("canvas")
        self.assertIsNotNone(can)
