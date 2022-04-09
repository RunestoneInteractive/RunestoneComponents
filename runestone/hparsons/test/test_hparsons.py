"""
Test horizontal Parsons problems directive
"""

__author__ = "zihan wu"

import time
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

def find_hp_question(selenium_utils, div_id):
    selenium_utils.wait_until_ready(div_id)
    return selenium_utils.driver.find_element(By.ID, div_id)

def click_control(hp_question, button_name):
    css = '.btn-success.run-button' if button_name == 'Run' else '.btn-warning.run-button'
    btn = hp_question.find_element(By.CSS_SELECTOR, css)
    btn.click()

'''
Test if the blocks are properly randomized.
1. Assert the sequence of the blocks is not the same as set in .rst file.
'''
def test_randomize_block(selenium_utils_get):
    div_id = "test_hparsons_sql_1"
    hp = find_hp_question(selenium_utils_get, div_id).find_element(By.CSS_SELECTOR, 'horizontal-parsons')
    original_sequence = ['SELECT','*','FROM','test']
    randomized_sequence = []
    for block in hp.shadow_root.find_element(By.CSS_SELECTOR,'.drag-area').find_elements(By.CSS_SELECTOR, '.parsons-block'):
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
    hp = find_hp_question(selenium_utils_get, div_id).find_element(By.CSS_SELECTOR, 'horizontal-parsons')
    drag_area = hp.shadow_root.find_element(By.CSS_SELECTOR, '.drag-area')
    drop_area = hp.shadow_root.find_element(By.CSS_SELECTOR, '.drop-area')

    # 1. Click on the first block and make sure it is added to the bottom
    block1 = drag_area.find_elements(By.CSS_SELECTOR, '.parsons-block')[0]
    block1.click()
    assert block1 not in drag_area.find_elements(By.CSS_SELECTOR, '.parsons-block')
    assert block1 == drop_area.find_elements(By.CSS_SELECTOR, '.parsons-block')[-1]
    
    # 2. Click on the moved block and make sure it is returned to the top
    # block2 and block1 are the same object
    block2 = drop_area.find_elements(By.CSS_SELECTOR, '.parsons-block')[0]
    block2.click()
    assert block2 not in drop_area.find_elements(By.CSS_SELECTOR, '.parsons-block')
    assert block2 == drag_area.find_elements(By.CSS_SELECTOR, '.parsons-block')[-1]

    # For reusable blocks
    div_id = "test_hparsons_sql_2"
    hp = find_hp_question(selenium_utils_get, div_id).find_element(By.CSS_SELECTOR, 'horizontal-parsons')
    drag_area = hp.shadow_root.find_element(By.CSS_SELECTOR, '.drag-area')
    drop_area = hp.shadow_root.find_element(By.CSS_SELECTOR, '.drop-area')

    # 1. Click on the first block and make sure it is copied to the bottom
    block1 = drag_area.find_elements(By.CSS_SELECTOR, '.parsons-block')[0]
    block1.click()
    assert len(drag_area.find_elements(By.CSS_SELECTOR, '.parsons-block')) == 4
    assert block1.text == drop_area.find_elements(By.CSS_SELECTOR, '.parsons-block')[-1].text
    
    # 2. Click on the moved block and make sure it is removed
    block2 = drop_area.find_elements(By.CSS_SELECTOR, '.parsons-block')[0]
    block2.click()
    assert block2 not in drop_area.find_elements(By.CSS_SELECTOR, '.parsons-block')
    assert len(drag_area.find_elements(By.CSS_SELECTOR, '.parsons-block')) == 4


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
    hp = hp_question.find_element(By.CSS_SELECTOR, 'horizontal-parsons')
    drag_area = hp.shadow_root.find_element(By.CSS_SELECTOR, '.drag-area')
    drop_area = hp.shadow_root.find_element(By.CSS_SELECTOR, '.drop-area')

    # 1. Click on each of the four blocks in second problem to form a solution
    blocks = drag_area.find_elements(By.CSS_SELECTOR, '.parsons-block')
    for block in blocks:
        block.click()
    
    # 2. Click on run button to run code and check the result
    click_control(hp_question, 'Run')
    selenium_utils_get.wait.until(EC.text_to_be_present_in_element((By.ID, f"{div_id}_stdout"), "You"))
    res = selenium_utils_get.driver.find_element(By.ID, f"{div_id}_sql_out")
    assert res
    out = selenium_utils_get.driver.find_element(By.ID, f"{div_id}_stdout")
    assert "You passed 2 out of 3 tests" in out.text