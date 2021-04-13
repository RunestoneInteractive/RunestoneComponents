import time

import pytest
from selenium.webdriver import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import (
    ElementClickInterceptedException,
)


def find_ac(selenium_utils, div_id):
    selenium_utils.wait_until_ready(div_id)
    return selenium_utils.driver.find_element_by_id(div_id)


def click_run(ac_selenium_element):
    rb = ac_selenium_element.find_element_by_class_name("run-button")
    rb.click()


def test_hello(selenium_utils_get):
    """
    1. Get the outer div id of the activecode component
    2. Find the run button using its class name
    3. Run the example
    4. Check the output from the ac_output element
    :return:
    """
    t1 = find_ac(selenium_utils_get, "test1")
    click_run(t1)
    selenium_utils_get.wait.until(
        EC.text_to_be_present_in_element((By.ID, "test1_stdout"), "Hello World"),
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
    click_run(t1)
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
    #import pdb; pdb.set_trace()
    t1 = find_ac(selenium_utils_get, "test1")
    selenium_utils_get.driver.execute_script("window.scrollTo(0, 0);")
    rb = t1.find_element_by_class_name("run-button")
    rb.click()
    time.sleep(2)

    ta = t1.find_element_by_class_name("cm-s-default")
    assert ta
    selenium_utils_get.driver.execute_script(
        """window.edList['test1'].editor.setValue("print('GoodBye')")"""
    )
    selenium_utils_get.wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "run-button")))
    try:
        rb.click()
    except ElementClickInterceptedException:
        interceptor = selenium_utils_get.driver.find_element_by_class_name("navbar-collapse")
        selenium_utils_get.driver.executed_script(
            """
        var el = arguments[0];
        el.parentNode.removeChild(el);
        """,
            interceptor,
        )
        rb.click()

    time.sleep(2)
    output = t1.find_element_by_class_name("ac_output")
    assert output.text.strip() == "GoodBye"
    move = ActionChains(selenium_utils_get.driver)
    slider = t1.find_element_by_class_name("ui-slider")
    width = slider.size["width"]
    slider = t1.find_element_by_class_name("ui-slider-handle")
    move.click_and_hold(slider).move_by_offset(-width, 0).release().perform()
    rb.click()
    output = t1.find_element_by_class_name("ac_output")
    assert output.text.strip() == "Hello World"


def test_livecode_datafile(selenium_utils_get):
    """
    Runs test2 example
    Code is dependent on supplementary file
    """
    t2 = find_ac(selenium_utils_get, "test2")
    click_run(t2)
    output = t2.find_element_by_class_name("ac_output")

    count = 0
    # Give it some time run
    print(output.text)
    while output.text.strip() != "Width: 25.0" and count < 20:
        count += 1
        time.sleep(0.5)
        print("Ouput so far:", output.text)
    try:
        assert count < 20
    except Exception:
        print("WARNING - No response from JOBE server")


@pytest.fixture
def selenium_utils_progress(selenium_utils):
    selenium_utils.get("progresspage.html")
    return selenium_utils


def test_activity_count(selenium_utils_progress):
    t2 = find_ac(selenium_utils_progress, "test_p1")
    click_run(t2)
    pb = selenium_utils_progress.driver.find_element_by_id("subchapterprogress")
    assert pb
    # Wait for the JS to run. Increase this delay if the next assertion fails.
    time.sleep(3)
    total = selenium_utils_progress.driver.find_element_by_id("scprogresstotal").text.strip()
    assert 2 == int(total)
    possible = selenium_utils_progress.driver.find_element_by_id("scprogressposs").text.strip()
    # expect only 1 because the page isn't included when not using services
    assert 2 == int(possible)
    # count should not increment after a second click
    click_run(t2)
    total = selenium_utils_progress.driver.find_element_by_id("scprogresstotal").text.strip()
    assert 2 == int(total)


def test_sql_activecode(selenium_utils_get):
    t2 = find_ac(selenium_utils_get, "sql1")
    click_run(t2)
    selenium_utils_get.wait.until(EC.text_to_be_present_in_element((By.ID, "sql1_stdout"), "You"))
    res = selenium_utils_get.driver.find_element_by_id("sql1_sql_out")
    assert res
    out = selenium_utils_get.driver.find_element_by_id("sql1_stdout")
    assert "You passed 2 out of 3 tests" in out.text

    t2 = selenium_utils_get.driver.find_element_by_id("sql2")
    time.sleep(1)
    click_run(t2)
    out = selenium_utils_get.driver.find_element_by_id("sql2_stdout")
    assert "" == out.text.strip()


@pytest.fixture
def selenium_utils_sf(selenium_utils):
    selenium_utils.get("skulptfeatures.html")
    return selenium_utils


def test_readfiles(selenium_utils_sf):
    t2 = find_ac(selenium_utils_sf, "ac9_13_1")
    click_run(t2)
    selenium_utils_sf.wait.until(
        EC.text_to_be_present_in_element((By.ID, "ac9_13_1_stdout"), "Lind")
    )
    out = t2.find_element_by_id("ac9_13_1_stdout")
    assert "Lindenau" in out.text


def test_altair(selenium_utils_sf):
    t2 = find_ac(selenium_utils_sf, "alt_kiva_bar1")
    click_run(t2)
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
    click_run(t2)
    selenium_utils_sf.wait.until(
        EC.text_to_be_present_in_element((By.ID, "ac14_7_2_stdout"), "400")
    )
    out = t2.find_element_by_id("ac14_7_2_stdout")
    assert "244" in out.text
    assert ("165 161 158" in out.text) or ("165 162 157" in out.text)
    can = t2.find_element_by_tag_name("canvas")
    assert can
