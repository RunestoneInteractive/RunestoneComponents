"""
Selenium's Drag and Drop does not work with HTML5
ActionChains(driver).drag_and_drop(element, target) # does not work
Workaround with jquery used
https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/3604
https://stackoverflow.com/questions/29381233/how-to-simulate-html5-drag-and-drop-in-selenium-webdriver/29381532#29381532
https://api.jquery.com/contains-selector/
For some reason, question id had to be 3 or above
"""

__author__ = "yasinovskyy"


from pathlib import Path


def dnd_helper():
    dnd_helper_path = Path(__file__).parent / "drag_and_drop_helper.js"
    with open(dnd_helper_path, encoding="utf-8") as f:
        return f.read()


def get_dnd_div(selenium_utils):
    selenium_utils.wait_until_ready("test_dnd_1")
    div = selenium_utils.driver.find_element_by_id("test_dnd_1")
    return div, div.find_elements_by_class_name("draggable-drop")


def find_feedback(dnd_element):
    div_id = dnd_element.get_attribute("id")
    fb = dnd_element.find_element_by_id(f"{div_id}_feedback")
    return fb.get_attribute("class")


def click_button(dnd_element):
    btn_check = dnd_element.find_element_by_class_name("btn-success")
    btn_check.click()


def test_dnd1(selenium_utils_get):
    """No selection. Button clicked"""
    t1, targets = get_dnd_div(selenium_utils_get)

    click_button(t1)
    assert "alert-danger" in find_feedback(t1)

    for item in targets:
        assert "drop-incorrect" in item.get_attribute("class")


def test_dnd2(selenium_utils_get):
    """Terms matched correctly"""
    t1, targets = get_dnd_div(selenium_utils_get)
    div_id = t1.get_attribute("id")

    for target in targets:
        div_id = t1.get_attribute("id")
        if target.text == "cpp":
            element_id = f"{div_id}{div_id}_drag1"
        elif target.text == "java":
            element_id = f"{div_id}{div_id}_drag2"
        elif target.text == "py":
            element_id = f"{div_id}{div_id}_drag3"

        selenium_utils_get.driver.execute_script(
            dnd_helper()
            + "$('#"
            + element_id
            + "').simulateDragDrop({ dropTarget: 'span:contains(\""
            + target.text
            + "\")' });"
        )

    click_button(t1)
    assert "alert-info" in find_feedback(t1)


def test_dnd3(selenium_utils_get):
    """Reset button clicked"""
    t1, targets = get_dnd_div(selenium_utils_get)

    for target in targets:
        div_id = t1.get_attribute("id")
        if target.text == "cpp":
            element_id = f"{div_id}{div_id}_drag1"
        elif target.text == "java":
            element_id = f"{div_id}{div_id}_drag2"
        elif target.text == "py":
            element_id = f"{div_id}{div_id}_drag3"

        selenium_utils_get.driver.execute_script(
            dnd_helper()
            + "$('#"
            + element_id
            + "').simulateDragDrop({ dropTarget: 'span:contains(\""
            + target.text
            + "\")' });"
        )

    for target in targets:
        element = target.find_element_by_class_name("draggable-drag")
        # Expected: draggable-drag inside a draggable-drop
        assert element

    t1.find_element_by_class_name("drag-reset").click()
    for target in targets:
        element = target.find_elements_by_class_name("draggable-drag")
        # Expected: empty list of elements
        assert not element


def test_dnd4(selenium_utils_get):
    """Incorrect answer changed to correct"""
    t1, targets = get_dnd_div(selenium_utils_get)

    for target in targets:
        div_id = t1.get_attribute("id")
        if target.text == "cpp":
            element_id = f"{div_id}{div_id}_drag1"
        elif target.text == "java":
            element_id = f"{div_id}{div_id}_drag2"
        elif target.text == "py":
            element_id = ""

        if element_id:
            selenium_utils_get.driver.execute_script(
                dnd_helper()
                + "$('#"
                + element_id
                + "').simulateDragDrop({ dropTarget: 'span:contains(\""
                + target.text
                + "\")' });"
            )

    click_button(t1)
    assert "alert-danger" in find_feedback(t1)

    selenium_utils_get.driver.execute_script(
        dnd_helper()
        + f"$('#{div_id}{div_id}_drag3').simulateDragDrop({{ dropTarget: 'span:contains(\"py\")' }});"
    )
    click_button(t1)
    assert "alert-info" in find_feedback(t1)
