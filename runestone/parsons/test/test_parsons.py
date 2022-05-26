"""
Test Parsons Problem question directive
"""

__author__ = "cabowers"

import time
from selenium.webdriver import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException


def test_general(selenium_utils_get):
    selenium_utils_get.wait_until_ready("test_parsons_1")

    # Source has correct number of blocks and each block has a label
    source = selenium_utils_get.driver.find_element_by_id("parsons-1-source")
    answer = selenium_utils_get.driver.find_element_by_id("parsons-1-answer")
    blocks = source.find_elements_by_class_name("block")
    assert source
    assert len(blocks) == 5

    # check that messages appear correctly
    checkme = selenium_utils_get.driver.find_element_by_id("parsons-1-check")
    reset = selenium_utils_get.driver.find_element_by_id("parsons-1-reset")
    message = selenium_utils_get.driver.find_element_by_id("parsons-1-message")
    assert message.get_attribute("style") == "display: none;"
    checkme.click()
    assert message.get_attribute("class") == "alert alert-danger"
    reset.click()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-3"), answer
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-2"),
        answer.find_element_by_id("parsons-1-block-3"),
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-1"),
        answer.find_element_by_id("parsons-1-block-2"),
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-0"),
        answer.find_element_by_id("parsons-1-block-1"),
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop_by_offset(
        answer.find_element_by_id("parsons-1-block-0"), -50, 0
    ).perform()
    wait_for_animation(selenium_utils_get, "#parsons-1-block-0")
    checkme.click()
    message = selenium_utils_get.driver.find_element_by_id("parsons-1-message")
    assert message.get_attribute("class") == "alert alert-info"

    # check that reset works
    reset.click()
    blocks = source.find_elements_by_class_name("block")
    assert len(blocks) == 5


def test_help(selenium_utils_get):
    selenium_utils_get.wait_until_ready("test_parsons_1")

    source = selenium_utils_get.driver.find_element_by_id("parsons-1-source")
    answer = selenium_utils_get.driver.find_element_by_id("parsons-1-answer")
    reset = selenium_utils_get.driver.find_element_by_id("parsons-1-reset")
    reset.click()
    checkme = selenium_utils_get.driver.find_element_by_id("parsons-1-check")
    # click help, should cause pop up
    helpBtn = selenium_utils_get.driver.find_element_by_id("parsons-1-help")
    helpBtn.click()
    assert wait_and_close_alert(selenium_utils_get)

    # try three distinct full attempts => help should cause pop up then cause stuff to happen
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-4"), answer
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-2"),
        answer.find_element_by_id("parsons-1-block-4"),
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-1"),
        answer.find_element_by_id("parsons-1-block-2"),
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-0"),
        answer.find_element_by_id("parsons-1-block-1"),
    ).perform()
    wait_for_animation(selenium_utils_get, "#parsons-1-block-0")
    checkme.click()
    reset.click()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-2"), answer
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-4"),
        answer.find_element_by_id("parsons-1-block-2"),
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-1"),
        answer.find_element_by_id("parsons-1-block-2"),
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-0"),
        answer.find_element_by_id("parsons-1-block-1"),
    ).perform()
    wait_for_animation(selenium_utils_get, "#parsons-1-block-0")
    checkme.click()
    reset.click()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-2"), answer
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-4"),
        answer.find_element_by_id("parsons-1-block-2"),
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-0"),
        answer.find_element_by_id("parsons-1-block-4"),
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-1"),
        answer.find_element_by_id("parsons-1-block-0"),
    ).perform()
    wait_for_animation(selenium_utils_get, "#parsons-1-block-1")
    checkme.click()
    assert wait_and_close_alert(selenium_utils_get)
    helpBtn.click()  # remove the incorrect block
    assert wait_and_close_alert(selenium_utils_get)
    wait_for_animation(selenium_utils_get, "#parsons-1-block-4")
    b4 = source.find_element_by_id("parsons-1-block-4")
    assert b4.get_attribute("class") == "block disabled"

    helpBtn.click()  # Combine blocks
    assert wait_and_close_alert(selenium_utils_get)
    wait_for_animation(selenium_utils_get, "#parsons-1-block-3")
    l5 = answer.find_element_by_id("parsons-1-line-5")
    # There seems to be a timing issue -- a bit of delay makes this pass.
    time.sleep(0.1)
    assert l5.get_attribute("class") == "prettyprint lang-py"
    try:
        selenium_utils_get.driver.find_element_by_id("parsons-1-block-3")
    except NoSuchElementException:
        pass
    else:
        assert False
    b2 = answer.find_element_by_id("parsons-1-block-2")
    l3 = b2.find_element_by_id("parsons-1-line-3")
    l4 = b2.find_element_by_id("parsons-1-line-4")
    l5 = b2.find_element_by_id("parsons-1-line-5")
    assert l3
    assert l4
    assert l5

    # Help is finished helping
    wait_for_animation(selenium_utils_get, "#parsons-1-block-2")
    answer_initial = answer.get_attribute("innerHTML")
    source_initial = source.get_attribute("innerHTML")
    helpBtn.click()
    assert wait_and_close_alert(selenium_utils_get)
    answer_after = answer.get_attribute("innerHTML")
    assert answer_initial == answer_after
    source_after = source.get_attribute("innerHTML")
    assert source_initial == source_after


def test_numbering(selenium_utils_get):
    selenium_utils_get.wait_until_ready("test_parsons_2")

    # right label block
    rlb = selenium_utils_get.driver.find_element_by_id("parsons-2-block-1")
    assert len(rlb.find_elements_by_class_name("labels")) == 1  # has label
    assert len(rlb.find_elements_by_class_name("lines")) == 1  # has lines
    children = rlb.find_elements_by_xpath("*")
    assert "lines" in children[0].get_attribute("class").split()
    assert "labels" in children[1].get_attribute("class").split()
    # label on right

    # left label block
    llb = selenium_utils_get.driver.find_element_by_id("parsons-3-block-1")
    assert len(llb.find_elements_by_class_name("labels")) == 1  # has label
    assert len(llb.find_elements_by_class_name("lines")) == 1  # has lines
    children = llb.find_elements_by_xpath("*")
    assert "lines" in children[1].get_attribute("class").split()
    assert "labels" in children[0].get_attribute("class").split()
    # label on left

    # no label block
    nlb = selenium_utils_get.driver.find_element_by_id("parsons-4-block-1")
    assert len(nlb.find_elements_by_class_name("labels")) == 0  # no label
    assert len(nlb.find_elements_by_class_name("lines")) == 1  # has lines


def test_indentation(selenium_utils_get):
    selenium_utils_get.wait_until_ready("test_parsons_1")

    source = selenium_utils_get.driver.find_element_by_id("parsons-1-source")
    answer = selenium_utils_get.driver.find_element_by_id("parsons-1-answer")
    reset = selenium_utils_get.driver.find_element_by_id("parsons-1-reset")
    reset.click()
    checkme = selenium_utils_get.driver.find_element_by_id("parsons-1-check")

    # try three distinct full attempts => help should cause pop up then cause stuff to happen
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-4"), answer
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-2"),
        answer.find_element_by_id("parsons-1-block-4"),
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-1"),
        answer.find_element_by_id("parsons-1-block-2"),
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-0"),
        answer.find_element_by_id("parsons-1-block-1"),
    ).perform()
    wait_for_animation(selenium_utils_get, "#parsons-1-block-0")
    checkme.click()
    reset.click()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-2"), answer
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-4"),
        answer.find_element_by_id("parsons-1-block-2"),
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-1"),
        answer.find_element_by_id("parsons-1-block-2"),
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-0"),
        answer.find_element_by_id("parsons-1-block-1"),
    ).perform()
    wait_for_animation(selenium_utils_get, "#parsons-1-block-0")
    checkme.click()
    reset.click()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-3"), answer
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-2"),
        answer.find_element_by_id("parsons-1-block-3"),
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-1"),
        answer.find_element_by_id("parsons-1-block-2"),
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-1-block-0"),
        answer.find_element_by_id("parsons-1-block-1"),
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop_by_offset(
        answer.find_element_by_id("parsons-1-block-0"), -50, 0
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop_by_offset(
        answer.find_element_by_id("parsons-1-block-1"), -50, 0
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop_by_offset(
        answer.find_element_by_id("parsons-1-block-2"), -50, 0
    ).perform()
    ActionChains(selenium_utils_get.driver).drag_and_drop_by_offset(
        answer.find_element_by_id("parsons-1-block-3"), -50, 0
    ).perform()
    wait_for_animation(selenium_utils_get, "#parsons-1-block-3")
    checkme.click()
    assert wait_and_close_alert(selenium_utils_get)
    b1 = answer.find_element_by_id("parsons-1-block-1")
    b2 = answer.find_element_by_id("parsons-1-block-2")
    b3 = answer.find_element_by_id("parsons-1-block-3")
    assert b1.get_attribute("class") == "block indentRight"
    assert b2.get_attribute("class") == "block indentRight"
    assert b3.get_attribute("class") == "block indentRight"

    helpBtn = selenium_utils_get.driver.find_element_by_id("parsons-1-help")
    helpBtn.click()  # Combine blocks
    assert wait_and_close_alert(selenium_utils_get)
    wait_for_animation(selenium_utils_get, "#parsons-1-block-1")
    wait_for_animation(selenium_utils_get, "#parsons-1-block-0")
    checkme.click()
    assert b2.get_attribute("class") == "block indentRight"
    assert b3.get_attribute("class") == "block indentRight"

    helpBtn.click()  # No more change
    assert wait_and_close_alert(selenium_utils_get)
    checkme.click()
    assert b2.get_attribute("class") == "block indentRight"
    assert b3.get_attribute("class") == "block indentRight"


def test_dag_grader(selenium_utils_get):
    selenium_utils_get.wait_until_ready("test_proof_blocks_1")

    source = selenium_utils_get.driver.find_element_by_id("parsons-6-source")
    answer = selenium_utils_get.driver.find_element_by_id("parsons-6-answer")
    checkme = selenium_utils_get.driver.find_element_by_id("parsons-6-check")
    reset = selenium_utils_get.driver.find_element_by_id("parsons-6-reset")

    def drag_block(block, before_block):
        ActionChains(selenium_utils_get.driver).drag_and_drop(
            source.find_element_by_id("parsons-6-block-" + str(block)),
            answer.find_element_by_id("parsons-6-block-" + str(before_block)),
        ).perform()

    reset.click()

    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-6-block-8"), answer
    ).perform()

    for i in range(8, 0, -1):
        drag_block(i - 1, i)
    wait_for_animation(selenium_utils_get, "#parsons-6-block-0")
    checkme.click()
    message = selenium_utils_get.driver.find_element_by_id("parsons-6-message")
    assert message.get_attribute("class") == "alert alert-info"

    reset.click()

    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-6-block-3"), answer
    ).perform()
    drag_block(7, 3)
    drag_block(6, 7)
    drag_block(8, 6)
    drag_block(4, 8)
    drag_block(1, 4)
    drag_block(2, 1)
    drag_block(0, 2)
    drag_block(5, 1)
    wait_for_animation(selenium_utils_get, "#parsons-6-block-5")
    checkme.click()
    message = selenium_utils_get.driver.find_element_by_id("parsons-6-message")
    assert message.get_attribute("class") == "alert alert-danger"

    reset.click()

    ActionChains(selenium_utils_get.driver).drag_and_drop(
        source.find_element_by_id("parsons-6-block-8"), answer
    ).perform()
    drag_block(7, 8)
    drag_block(6, 7)
    drag_block(3, 6)
    drag_block(4, 3)
    drag_block(1, 4)
    drag_block(2, 1)
    drag_block(0, 2)
    drag_block(5, 3)
    wait_for_animation(selenium_utils_get, "#parsons-6-block-5")
    checkme.click()
    message = selenium_utils_get.driver.find_element_by_id("parsons-6-message")
    assert message.get_attribute("class") == "alert alert-info"


def wait_for_animation(selenium_utils, selector):
    while is_element_animated(selenium_utils, selector):
        time.sleep(0.5)


def is_element_animated(selenium_utils, selector):
    return selenium_utils.driver.execute_script(
        "return jQuery('" + selector + "').is(':animated');"
    )


def wait_and_close_alert(selenium_utils, timeout=3):
    try:
        WebDriverWait(selenium_utils.driver, timeout).until(
            EC.alert_is_present(),
            "Timed out waiting for PA creation " + "confirmation popup to appear.",
        )
        alert = selenium_utils.driver.switch_to.alert
        alert.accept()
        return True
    except TimeoutException:
        return False
