"""
Test horizontal Parsons problems directive
"""

__author__ = "zihan wu"

import time
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import pdb


def find_hp_question(selenium_utils, div_id):
    selenium_utils.wait_until_ready(div_id)
    return selenium_utils.driver.find_element(By.ID, div_id)


def click_control(hp_question, button_name):
    css = (
        ".btn-success.run-button" if button_name == "Run" else ".btn-warning.run-button"
    )
    btn = hp_question.find_element(By.CSS_SELECTOR, css)
    btn.click()


"""
Test Block Based feedback is correct:
1-1. Click on three blocks to form a solution that does not have enough blocks
1-2. Click on run button to check the result is hinting missing blocks
2-1. Click on more blocks to form an incorrect solution
2-2. Click on run button to check the result is hinting incorrect, and incorrect blocks are highlight correctly
3-1. Click to change to the correct answer
3-2. Click on run button to check the result is hinting that they completed in 3 attempts
3-3. Check the run button is disabled
4-1. Click on reset button
4-2. Form a correct solution
4-3. Click on run button to check the result is hinting completed in one attempt
"""


def test_run_block(selenium_utils_get):
    div_id = "test_hparsons_block_1"
    hp_question = find_hp_question(selenium_utils_get, div_id)
    hp = hp_question.find_element(By.CSS_SELECTOR, "micro-parsons")
    drag_area = hp.find_element(By.CSS_SELECTOR, ".drag-area")
    drop_area = hp.find_element(By.CSS_SELECTOR, ".drop-area")
    run_btn = hp_question.find_elements(By.TAG_NAME, "button")[0]
    reset_btn = hp_question.find_elements(By.TAG_NAME, "button")[1]

    time.sleep(5)
    # 1-1. Click on three blocks to form a solution that does not have enough blocks
    for code_piece in ["SELECT", "*", "test"]:
        blocks = drag_area.find_elements(By.CSS_SELECTOR, ".parsons-block")
        for block in blocks:
            if block.text == code_piece:
                time.sleep(1)
                block.click()
                break
    # 1-2. Click on run button to check the result is hinting missing blocks
    run_btn.click()
    feedback_area = hp_question.find_element(By.CLASS_NAME, "alert")
    assert "Your answer is too short." in feedback_area.text

    # 2-1. Click on more blocks to form an incorrect solution
    block = drag_area.find_element(By.CSS_SELECTOR, ".parsons-block")
    block.click()
    # 2-2. Click on run button to check the result is hinting incorrect, and incorrect blocks are highlight correctly
    run_btn.click()
    time.sleep(1)
    feedback_area = hp_question.find_element(By.CLASS_NAME, "alert")
    assert (
        "Highlighted blocks in your answer are wrong or are in the wrong order."
        in feedback_area.text
    )
    highlighted_blocks = []
    for block in drop_area.find_elements(
        By.CSS_SELECTOR, ".parsons-block.incorrectPosition"
    ):
        highlighted_blocks.append(block.text)
    assert set(highlighted_blocks) == set(["FROM"])

    # 3-1. Click to change to the correct answer
    drop_area.find_elements(By.CSS_SELECTOR, ".parsons-block")[2].click()
    drag_area.find_element(By.CSS_SELECTOR, ".parsons-block").click()
    # 3-2. Click on run button to check the result is hinting that they completed in 3 attempts
    run_btn.click()
    selenium_utils_get.wait.until(
        EC.text_to_be_present_in_element((By.CLASS_NAME, "alert"), "It")
    )
    feedback_area = hp_question.find_element(By.CLASS_NAME, "alert")
    assert "It took you 3 tries to solve this." in feedback_area.text
    # 3-3. Check the run button is disabled
    assert run_btn.get_attribute("disabled") == "true"

    # 4-1. Click on reset button
    reset_btn.click()
    # 4-2. Form a correct solution
    for code_piece in ["SELECT", "*", "FROM", "test"]:
        blocks = drag_area.find_elements(By.CSS_SELECTOR, ".parsons-block")
        for block in blocks:
            if block.text == code_piece:
                block.click()
    # 4-3. Click on run button to check the result is hinting completed in one attempt
    run_btn.click()
    feedback_area = hp_question.find_element(By.CLASS_NAME, "alert")
    selenium_utils_get.wait.until(
        EC.text_to_be_present_in_element((By.CLASS_NAME, "alert"), "It")
    )
    assert "Perfect" in feedback_area.text


"""
Test if the blocks are properly randomized.
1. Assert the sequence of the blocks is not the same as set in .rst file.
"""


def test_randomize_block(selenium_utils_get):
    div_id = "test_hparsons_sql_1"
    hp = find_hp_question(selenium_utils_get, div_id).find_element(
        By.CSS_SELECTOR, "micro-parsons"
    )
    original_sequence = ["SELECT", "*", "FROM", "test"]
    randomized_sequence = []
    for block in hp.find_element(By.CSS_SELECTOR, ".drag-area").find_elements(
        By.CSS_SELECTOR, ".parsons-block"
    ):
        randomized_sequence.append(block.text)
    assert len(original_sequence) == len(randomized_sequence)
    is_same_order = True
    for i in range(len(original_sequence)):
        if original_sequence[i] != randomized_sequence[i]:
            is_same_order = False
            break
    assert not is_same_order


"""
Test adding and removing blocks by clicking in non-duplicating blocks
For not reused blocks:
1. Click on the first block and make sure it is moved to the bottom
2. Click on the first block in the bottom and make sure it is put back
For reuseable blocks:
1. Click on the first block and make sure it is copied to the bottom
2. Click on the first block in the bottom and make sure it disappears
"""


def test_add_and_remove_blocks(selenium_utils_get):
    div_id = "test_hparsons_sql_1"
    hp = find_hp_question(selenium_utils_get, div_id).find_element(
        By.CSS_SELECTOR, "micro-parsons"
    )
    drag_area = hp.find_element(By.CSS_SELECTOR, ".drag-area")
    drop_area = hp.find_element(By.CSS_SELECTOR, ".drop-area")

    # 1. Click on the first block and make sure it is added to the bottom
    block1 = drag_area.find_elements(By.CSS_SELECTOR, ".parsons-block")[0]
    block1.click()
    assert block1 not in drag_area.find_elements(By.CSS_SELECTOR, ".parsons-block")
    assert block1 == drop_area.find_elements(By.CSS_SELECTOR, ".parsons-block")[-1]

    # 2. Click on the moved block and make sure it is returned to the top
    # block2 and block1 are the same object
    block2 = drop_area.find_elements(By.CSS_SELECTOR, ".parsons-block")[0]
    block2.click()
    assert block2 not in drop_area.find_elements(By.CSS_SELECTOR, ".parsons-block")
    assert block2 == drag_area.find_elements(By.CSS_SELECTOR, ".parsons-block")[-1]

    # For reusable blocks
    div_id = "test_hparsons_sql_2"
    hp = find_hp_question(selenium_utils_get, div_id).find_element(
        By.CSS_SELECTOR, "micro-parsons"
    )
    drag_area = hp.find_element(By.CSS_SELECTOR, ".drag-area")
    drop_area = hp.find_element(By.CSS_SELECTOR, ".drop-area")

    # 1. Click on the first block and make sure it is copied to the bottom
    block1 = drag_area.find_elements(By.CSS_SELECTOR, ".parsons-block")[0]
    block1.click()
    assert len(drag_area.find_elements(By.CSS_SELECTOR, ".parsons-block")) == 4
    assert (
        block1.text
        == drop_area.find_elements(By.CSS_SELECTOR, ".parsons-block")[-1].text
    )

    # 2. Click on the moved block and make sure it is removed
    block2 = drop_area.find_elements(By.CSS_SELECTOR, ".parsons-block")[0]
    block2.click()
    assert block2 not in drop_area.find_elements(By.CSS_SELECTOR, ".parsons-block")
    assert len(drag_area.find_elements(By.CSS_SELECTOR, ".parsons-block")) == 4


"""
Test SQL feedback is correct
1. Click on each of the four blocks in second problem to form a solution
2. Click on run button to run code and check the result
"""


def test_run_SQL(selenium_utils_get):
    # For reusable blocks
    div_id = "test_hparsons_sql_2"
    hp_question = find_hp_question(selenium_utils_get, div_id)
    time.sleep(2)
    hp = hp_question.find_element(By.CSS_SELECTOR, "micro-parsons")
    drag_area = hp.find_element(By.CSS_SELECTOR, ".drag-area")
    drop_area = hp.find_element(By.CSS_SELECTOR, ".drop-area")

    # 1. Click on each of the four blocks in second problem to form a solution
    blocks = drag_area.find_elements(By.CSS_SELECTOR, ".parsons-block")
    for block in blocks:
        block.click()

    # 2. Click on run button to run code and check the result
    click_control(hp_question, "Run")
    selenium_utils_get.wait.until(
        EC.text_to_be_present_in_element((By.ID, f"{div_id}_stdout"), "You")
    )
    res = selenium_utils_get.driver.find_element(By.ID, f"{div_id}_sql_out")
    assert res
    out = selenium_utils_get.driver.find_element(By.ID, f"{div_id}_stdout")
    assert "You passed 2 out of 3 tests" in out.text
