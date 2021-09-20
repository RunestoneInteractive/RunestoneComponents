from pathlib import Path
import time

import pytest
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC


def start(selenium_utils, timed_divid):
    selenium_utils.wait_until_ready(timed_divid)
    start_element = selenium_utils.driver.find_element_by_id("start")
    start_element.click()


def finish(selenium_utils):
    selenium_utils.scroll_to_top()
    finish = selenium_utils.wait.until(
        EC.element_to_be_clickable((By.ID, "finish"))
    )
    finish.click()

    alert = selenium_utils.driver.switch_to.alert
    alert.accept()


def dragndrop(selenium_utils, src, dest):
    ActionChains(selenium_utils.driver).drag_and_drop(src, dest).perform()


def js_dragndrop(selenium_utils):
    with open(Path(__file__).parent / "../../dragndrop/test/drag_and_drop_helper.js") as f:
        selenium_utils.driver.execute_script(f.read())


def get_divid(selenium_utils, div_id):
    selenium_utils.wait_until_ready(div_id)
    return selenium_utils.driver.find_element_by_id(div_id)


def test_one_question_timed_exam(selenium_utils_get):
    start(selenium_utils_get, "time_q1")

    t1 = selenium_utils_get.driver.find_element_by_id("time_test_1_q1_form")
    t1.find_element_by_id("time_test_1_q1_opt_0").click()
    t1.find_element_by_id("time_test_1_q1_opt_1").click()
    t1.find_element_by_id("time_test_1_q1_opt_2").click()
    t1.find_element_by_id("time_test_1_q1_opt_3").click()

    finish(selenium_utils_get)

    fb = t1.find_element_by_id("time_test_1_q1_eachFeedback_1")
    cnamestr = fb.get_attribute("class")
    assert cnamestr == "eachFeedback alert alert-danger"


@pytest.fixture
def selenium_utils_mq(selenium_utils):
    selenium_utils.get("multiquestion.html")
    return selenium_utils


# Split the test this way so that server-side tests can use a different div_id for the selectquestion timed problem.
def test_1(selenium_utils_mq):
    _test_1(selenium_utils_mq, "test_timed_1")


def _test_1(selenium_utils_mq, timed_divid):
    start(selenium_utils_mq, timed_divid)
    next = selenium_utils_mq.driver.find_element_by_id("next")

    # Select answer A in the mchoice question (which is correct).
    div_id = "test_timed_mchoice_1"
    selenium_utils_mq.wait_until_ready(div_id)
    selenium_utils_mq.driver.find_element_by_id(f"{div_id}_opt_0").click()
    next.click()

    # Click the correct cells in the table. There should be only one table.
    table = get_divid(selenium_utils_mq, "test_timed_clickablearea_1")
    first_ellipsis = True
    for elem in table.find_elements_by_css_selector("p"):
        if elem.text == "correct":
            elem.click()
        if "…" in elem.text:
            if first_ellipsis:
                first_ellipsis = False
            else:
                elem.click()
    next.click()

    # The drag and drop question.
    div_id = "test_timed_dnd_1"
    dnd = get_divid(selenium_utils_mq, div_id)
    js_dragndrop(selenium_utils_mq)
    src, dest = dnd.find_elements_by_class_name("rsdraggable")
    src_items = src.find_elements_by_tag_name("span")
    for i in range(3):
        selenium_utils_mq.driver.execute_script(f"""$("#{src_items[i].get_attribute('id')}").simulateDragDrop({{ dropTarget: 'span:contains("Answer {src_items[i].text[8:]}")' }})""")
    selenium_utils_mq.scroll_to_top()
    next.click()

    # Fill in the blank question
    filb = get_divid(selenium_utils_mq, "test_timed_fitb_1")
    blank1, blank2 = filb.find_elements_by_tag_name("input")
    blank1.send_keys("red")
    blank2.send_keys("away")
    next.click()

    # ActiveCode question
    div_id = "test_timed_activecode_1"
    selenium_utils_mq.wait_until_ready(div_id)
    selenium_utils_mq.driver.execute_script(
        f"""window.edList['{div_id}'].editor.setValue("def add(a, b): return a + b")"""
    )
    next.click()

    # The Parson's problem.
    selenium_utils_mq.wait_until_ready("test_timed_parsons_1")
    # This is an ugly hack, since Parson's problems number problems sequentially instead of based on the problem's ID. The div_id happens to match the ordering of Parson's problems...
    parsons_counter = timed_divid[-1]
    source = selenium_utils_mq.driver.find_element_by_id(f"parsons-{parsons_counter}-source")
    answer = selenium_utils_mq.driver.find_element_by_id(f"parsons-{parsons_counter}-answer")
    dragndrop(selenium_utils_mq, source.find_element_by_id(f"parsons-{parsons_counter}-block-0"), answer)
    time.sleep(1)
    dragndrop(selenium_utils_mq, source.find_element_by_id(f"parsons-{parsons_counter}-block-2"), answer)
    time.sleep(1)
    dragndrop(selenium_utils_mq, source.find_element_by_id(f"parsons-{parsons_counter}-block-1"), answer)
    next.click()

    # The short answer question.
    div_id = "test_timed_shortanswer_1"
    selenium_utils_mq.wait_until_ready(div_id)
    selenium_utils_mq.driver.find_element_by_id(f"{div_id}_solution").send_keys("ROYGBIV circle area")

    finish(selenium_utils_mq)
    div_id = f"{timed_divid}results"
    # Wait for the initial text to appear.
    selenium_utils_mq.wait.until(
        EC.text_to_be_present_in_element((By.ID, div_id), "Num Correct: 6")
    )
    # We can check the rest of the text without waiting, since it's all assigned at the same time.
    results = selenium_utils_mq.driver.find_element_by_id(div_id)
    assert "Num Wrong: 0" in results.text
    assert "Num Skipped: 1" in results.text
