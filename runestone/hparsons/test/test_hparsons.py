"""
Test horizontal Parsons problems directive
"""

__author__ = "zihan wu"

import time
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By

def find_hp_question(selenium_utils, div_id):
    selenium_utils.wait_until_ready(div_id)
    return selenium_utils.driver.find_element(By.ID, div_id)


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
    

# # Test adding and removing blocks by clicking in non-duplicating blocks
# """
# 1. Click on the first block and make sure it is moved to the bottom
# 2. Click on the first block in the bottom and make sure it is put back
# """
# def test_add_and_remove_blocks(selenium_utils_get):
#     div_id = "test_hparsons_sql_1"
#     hp = find_hp_question(selenium_utils_get, div_id).find_element(By.CSS_SELECTOR, 'horizontal-parsons')
#     drag_area = hp.shadow_root.find_element(By.CSS_SELECTOR, '.drag-area')
#     drop_area = hp.shadow_root.find_element(By.CSS_SELECTOR, '.drop-area')

#     # 1. Click on the first block and make sure it is added to the bottom
#     block1 = drag_area.find_elements(By.CSS_SELECTOR, '.parsons-block')[0]
#     block1.click()
#     assert block1 not in drag_area.find_elements(By.CSS_SELECTOR, '.parsons-block')
#     assert block1 == drop_area.find_elements(By.CSS_SELECTOR, '.parsons-block')[-1]
    
    
#     # 2. Drag the remaining first block and make sure it is added to the bottom 
#     drag = [x.text for x in drag_area.find_elements(By.CSS_SELECTOR, '.parsons-block')]
#     print(drag)
#     block2 = drag_area.find_elements(By.CSS_SELECTOR, '.parsons-block')[0]
#     # ActionChains(selenium_utils_get.driver).drag_and_drop(
#     #     block2, drop_area.find_elements(By.CSS_SELECTOR, '.parsons-block')[-1]
#     # ).perform()
#     ActionChains(selenium_utils_get.driver).drag_and_drop(
#         block2, drag_area.find_elements(By.CSS_SELECTOR, '.parsons-block')[-1]
#     ).perform()
#     time.sleep(2)

#     drag = [x.text for x in drag_area.find_elements(By.CSS_SELECTOR, '.parsons-block')]
#     print(drag)
    
#     # assert block2 not in drag_area.find_elements(By.CSS_SELECTOR, '.parsons-block')
#     # assert block2 == drop_area.find_elements(By.CSS_SELECTOR, '.parsons-block')[-1]
#     assert block2 in drop_area.find_elements(By.CSS_SELECTOR, '.parsons-block')

#     # 2. Click on the moved block and make sure it is returned to the top
#     # block2 and block1 are the same object
#     block2 = drop_area.find_elements(By.CSS_SELECTOR, '.parsons-block')[0]
#     block2.click()
#     assert block2 not in drop_area.find_elements(By.CSS_SELECTOR, '.parsons-block')
#     assert block2 == drag_area.find_elements(By.CSS_SELECTOR, '.parsons-block')[-1]