import time

import pytest
from selenium.webdriver import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


def find_ac(selenium_utils, div_id):
    selenium_utils.wait_until_ready(div_id)
    return selenium_utils.driver.find_element_by_id(div_id)


def click_run(selenium_utils, ac_selenium_element):
    # The run button can sometimes be scrolled to the top of the screen, where it's hidden by the navigation bar. In this case, we can't click it, since Selenium will complain ``Message: element click intercepted: Element <button class="btn btn-success run-button" type="button">...</button> is not clickable at point (460, 17). Other element would receive the click: <div class="navbar-collapse collapse navbar-ex1-collapse">...</div>``. To avoid this, always scroll to the top of the document, guaranteeing that the navbar won't be hiding the run button.
    selenium_utils.scroll_to_top()
    rb = ac_selenium_element.find_element_by_class_name("run-button")
    rb.click()
    # After clicking run, the browser may need some time to load and execute the code. Wait until the run button becomes clickable, indicating the code has finished running.
    div_id = ac_selenium_element.get_attribute("id")
    selenium_utils.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, f"#{div_id} .run-button")))


def test_hello(selenium_utils_get):
    """
    1. Get the outer div id of the activecode component
    2. Find the run button using its class name
    3. Run the example
    4. Check the output from the ac_output element
    :return:
    """
    div_id = "test_activecode_2"
    t1 = find_ac(selenium_utils_get, div_id)
    click_run(selenium_utils_get, t1)
    selenium_utils_get.wait.until(
        EC.text_to_be_present_in_element((By.ID, f"{div_id}_stdout"), "Hello World"),
        message="Did not find expected text",
    )
    output = t1.find_element_by_class_name("ac_output")
    assert output.text.strip() == "Hello World"


def test_hidden(selenium_utils_get):
    """
    1. Get the outer div id of the activecode component
    2. Find the run button using its class name
    3. Run the example
    4. Check the output from the ac_output element
    :return:
    """
    t1 = find_ac(selenium_utils_get, "testprefixcode")
    click_run(selenium_utils_get, t1)
    selenium_utils_get.wait.until(
        EC.text_to_be_present_in_element(
            (By.ID, "testprefixcode_stdout"), "My Code"
        )
    )
    output = t1.find_element_by_class_name("ac_output")
    assert "hidden code" in output.text.strip()
    assert "i\nx" in output.text.strip()


def test_history(selenium_utils_get):
    """
    1. Get the outer div id of the activecode component
    2. Find the run button using its class name
    3. Run the example
    4. Check the output from the ac_output element
    :return:
    """
    div_id = "test_activecode_2"
    t1 = find_ac(selenium_utils_get, div_id)
    click_run(selenium_utils_get, t1)

    ta = t1.find_element_by_class_name("cm-s-default")
    assert ta
    selenium_utils_get.driver.execute_script(
        f"""window.edList['{div_id}'].editor.setValue("print('Goodbye')")"""
    )
    click_run(selenium_utils_get, t1)
    output = t1.find_element_by_class_name("ac_output")
    assert output.text.strip() == "Goodbye"
    move = ActionChains(selenium_utils_get.driver)
    slider = t1.find_element_by_class_name("ui-slider")
    width = slider.size["width"]
    slider = t1.find_element_by_class_name("ui-slider-handle")
    move.click_and_hold(slider).move_by_offset(-width, 0).release().perform()
    click_run(selenium_utils_get, t1)
    output = t1.find_element_by_class_name("ac_output")
    assert output.text.strip() == "Hello World"


def test_livecode_datafile(selenium_utils_get):
    """
    Code is dependent on datafile directive.
    """
    t2 = find_ac(selenium_utils_get, "test_activecode_3")
    click_run(selenium_utils_get, t2)
    output = t2.find_element_by_class_name("ac_output")
    assert output.text.strip() == "Width: 25.0"


@pytest.fixture
def selenium_utils_progress(selenium_utils):
    selenium_utils.get("progresspage.html")
    return selenium_utils


def test_activity_count(selenium_utils_progress):
    t2 = find_ac(selenium_utils_progress, "test_activecode_5")
    click_run(selenium_utils_progress, t2)
    pb = selenium_utils_progress.driver.find_element_by_id("subchapterprogress")
    assert pb
    total = selenium_utils_progress.driver.find_element_by_id("scprogresstotal").text.strip()
    assert 2 == int(total)
    possible = selenium_utils_progress.driver.find_element_by_id("scprogressposs").text.strip()
    # expect only 1 because the page isn't included when not using services
    assert 2 == int(possible)
    # count should not increment after a second click
    click_run(selenium_utils_progress, t2)
    total = selenium_utils_progress.driver.find_element_by_id("scprogresstotal").text.strip()
    assert 2 == int(total)


def test_sql_activecode(selenium_utils_get):
    div_id = "test_activecode_6"
    t2 = find_ac(selenium_utils_get, div_id)
    # TODO: We don't yet have a way for async operations in ActiveCode constructors to signal when they're complete. So, insert a delay to guesstimate when the async load of the SQL WASM code and other async functions complete.
    time.sleep(2)
    click_run(selenium_utils_get, t2)
    selenium_utils_get.wait.until(EC.text_to_be_present_in_element((By.ID, f"{div_id}_stdout"), "You"))
    res = selenium_utils_get.driver.find_element_by_id(f"{div_id}_sql_out")
    assert res
    out = selenium_utils_get.driver.find_element_by_id(f"{div_id}_stdout")
    assert "You passed 2 out of 3 tests" in out.text

    div_id = "test_activecode_7"
    t2 = find_ac(selenium_utils_get, div_id)
    click_run(selenium_utils_get, t2)
    out = selenium_utils_get.driver.find_element_by_id(f"{div_id}_stdout")
    assert "" == out.text.strip()

    div_id = "test_activecode_6"
    t1 = find_ac(selenium_utils_get, div_id)
    click_run(selenium_utils_get, t1)
    ta = t1.find_element_by_class_name("cm-s-default")
    assert ta
    selenium_utils_get.driver.execute_script(
        f"""window.edList['{div_id}'].editor.setValue("CREATE TABLE created_table (x TEXT); INSERT INTO created_table VALUES ('itworks');")"""
    )
    click_run(selenium_utils_get, t1)

    div_id = "test_activecode_6b"
    t2 = find_ac(selenium_utils_get, div_id)
    # TODO: We don't yet have a way for async operations in ActiveCode constructors to signal when they're complete. So, insert a delay to guesstimate when the async load of the SQL WASM code and other async functions complete.
    time.sleep(2)
    click_run(selenium_utils_get, t2)
    selenium_utils_get.wait.until(EC.text_to_be_present_in_element((By.ID, f"{div_id}_stdout"), "You"))
    res = selenium_utils_get.driver.find_element_by_id(f"{div_id}_sql_out")
    assert res
    out = selenium_utils_get.driver.find_element_by_id(f"{div_id}_stdout")
    assert "You passed 1 out of 1 tests" in out.text

@pytest.fixture
def selenium_utils_sf(selenium_utils):
    selenium_utils.get("skulptfeatures.html")
    return selenium_utils


def test_readfiles(selenium_utils_sf):
    t2 = find_ac(selenium_utils_sf, "ac9_13_1")
    click_run(selenium_utils_sf, t2)
    selenium_utils_sf.wait.until(
        EC.text_to_be_present_in_element((By.ID, "ac9_13_1_stdout"), "Lind")
    )
    out = t2.find_element_by_id("ac9_13_1_stdout")
    assert "Lindenau" in out.text


def test_altair(selenium_utils_sf):
    t2 = find_ac(selenium_utils_sf, "alt_kiva_bar1")
    click_run(selenium_utils_sf, t2)
    out = t2.find_element_by_id("alt_kiva_bar1_stdout")
    selenium_utils_sf.wait.until(
        EC.text_to_be_present_in_element(
            (By.ID, "alt_kiva_bar1_stdout"), "mark = bar"
        )
    )
    assert "{'field': 'customer', 'type': 'nominal'}" in out.text
    can = t2.find_element_by_tag_name("canvas")
    assert can


def test_image(selenium_utils_sf):
    t2 = find_ac(selenium_utils_sf, "ac14_7_2")
    click_run(selenium_utils_sf, t2)
    selenium_utils_sf.wait.until(
        EC.text_to_be_present_in_element((By.ID, "ac14_7_2_stdout"), "400")
    )
    out = t2.find_element_by_id("ac14_7_2_stdout")
    assert "244" in out.text
    assert ("165 161 158" in out.text) or ("165 162 157" in out.text)
    can = t2.find_element_by_tag_name("canvas")
    assert can
