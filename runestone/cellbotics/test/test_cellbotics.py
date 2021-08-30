# ****************************************************
# |docname| - Basic tests for the Cellbotics component
# ****************************************************
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


def test_1(selenium_utils_get):
    """
    #.  Get the outer div id of the activecode component
    #.  Find the run button using its class name
    #.  Run the example
    #.  Check the output from the ac_output element
    """
    div_id = "test_cellbotics_1"
    selenium_utils_get.wait_until_ready(div_id)
    t1 = selenium_utils_get.driver.find_element_by_id(div_id)
    rb = t1.find_element_by_class_name("run-button")
    rb.click()
    selenium_utils_get.wait.until(
        EC.text_to_be_present_in_element((By.ID, f"{div_id}_stdout"), "Pass."),
        message="Did not find expected text",
    )
