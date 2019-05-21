"""
Selenium's Drag and Drop does not work with HTML5
ActionChains(driver).drag_and_drop(element, target) # does not work
Workaround with jquery used
https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/3604
https://stackoverflow.com/questions/29381233/how-to-simulate-html5-drag-and-drop-in-selenium-webdriver/29381532#29381532
https://api.jquery.com/contains-selector/
For some reason, question id had to be 3 or above
"""

__author__ = 'yasinovskyy'

from runestone.unittest_base import module_fixture_maker, RunestoneTestCase

setUpModule, tearDownModule = module_fixture_maker(__file__)
jquery_url = "http://code.jquery.com/jquery-1.12.4.min.js"

class DragAndDropQuestion_Tests(RunestoneTestCase):
    def setUp(self):
        super(DragAndDropQuestion_Tests, self).setUp()
        self.driver.set_script_timeout(5)
        with open("jquery_load_helper.js") as f:
            self.load_jquery_js = f.read()
        self.driver.execute_async_script(self.load_jquery_js, jquery_url)
        with open("drag_and_drop_helper.js") as f:
            self.js = f.read()

    def test_dnd1(self):
        '''No selection. Button clicked'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("drag-and-drop")

        btn_check = t1.find_element_by_class_name('btn-success')
        btn_check.click()

        fb = t1.find_element_by_id("question3_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-danger", cnamestr)

        targets = t1.find_elements_by_class_name("draggable-drop")
        for item in targets:
            self.assertIn("drop-incorrect", item.get_attribute("class"))


    def test_dnd2(self):
        '''Terms matched correctly'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("drag-and-drop")

        targets = self.driver.find_elements_by_class_name("draggable-drop")

        for target in targets:
            if target.text == "cpp":
                element_id = "question3question3_drag1"
            elif target.text == "java":
                element_id = "question3question3_drag2"
            elif target.text == "py":
                element_id = "question3question3_drag3"

            self.driver.execute_script(self.js + "$('#" + element_id + "').simulateDragDrop({ dropTarget: 'span:contains(\"" + target.text + "\")' });")

        btn_check = t1.find_element_by_class_name('btn-success')
        btn_check.click()

        fb = t1.find_element_by_id("question3_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-info", cnamestr)


    def test_dnd3(self):
        '''Reset button clicked'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("drag-and-drop")

        targets = self.driver.find_elements_by_class_name("draggable-drop")

        for target in targets:
            if target.text == "cpp":
                element_id = "question3question3_drag1"
            elif target.text == "java":
                element_id = "question3question3_drag2"
            elif target.text == "py":
                element_id = "question3question3_drag3"

            self.driver.execute_script(self.js + "$('#" + element_id + "').simulateDragDrop({ dropTarget: 'span:contains(\"" + target.text + "\")' });")

        for target in targets:
            element = target.find_element_by_class_name('draggable-drag')
            #Expected: draggable-drag inside a draggable-drop
            self.assertIsNotNone(element)

        btn_reset = t1.find_element_by_class_name('drag-reset')
        btn_reset.click()

        for target in targets:
            element = target.find_elements_by_class_name('draggable-drag')
            #Expected: empty list of elements
            self.assertFalse(element)


    def test_dnd4(self):
        '''Incorrect answer changed to correct'''
        self.driver.get(self.host + "/index.html")
        t1 = self.driver.find_element_by_id("drag-and-drop")

        targets = self.driver.find_elements_by_class_name("draggable-drop")

        for target in targets:
            if target.text == "cpp":
                element_id = "question3question3_drag1"
            elif target.text == "java":
                element_id = "question3question3_drag2"
            elif target.text == "py":
                element_id = ""

            self.driver.execute_script(self.js + "$('#" + element_id + "').simulateDragDrop({ dropTarget: 'span:contains(\"" + target.text + "\")' });")

        btn_check = t1.find_element_by_class_name('btn-success')
        btn_check.click()

        fb = t1.find_element_by_id("question3_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-danger", cnamestr)

        self.driver.execute_script(self.js + "$('#question3question3_drag3').simulateDragDrop({ dropTarget: 'span:contains(\"py\")' });")
        btn_check.click()

        fb = t1.find_element_by_id("question3_feedback")
        self.assertIsNotNone(fb)
        cnamestr = fb.get_attribute("class")
        self.assertIn("alert-info", cnamestr)
