from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC


def test_1(selenium_module_fixture):
    mf = selenium_module_fixture

    # Check for the following directive-level errors.
    directive_level_errors = (
        # Produced my fitb id error1_no_content,
        (
            38,
            'Content block expected for the "fillintheblank" directive; none found.',
            "ERROR",
        ),
        (37, "Not enough feedback for the number of blanks supplied.", "WARNING"),
    )
    for error_line, error_string, mtype in directive_level_errors:
        assert (
            ":{}: {}: {}".format(error_line, mtype, error_string)
            in mf.build_stderr_data
        )

    # Check for the following error inside the directive.
    inside_directive_errors = (
        # error2,
        (
            42,
            "the last item in a fill-in-the-blank question must be a bulleted list.",
        ),
        # error3,
        (
            48,
            "each list item in a fill-in-the-blank problems must contain only one item, a field list.",
        ),
    )
    for error_line, error_string in inside_directive_errors:
        assert (
            ": ERROR: On line {}, {}".format(error_line, error_string)
            in mf.build_stderr_data
        )

    assert (
        "WARNING: while setting up extension runestone.lp: role 'docname' is already registered, it will be overridden"
        in mf.build_stderr_data
    )

    # Make sure we saw all errors.
    assert len(inside_directive_errors) + 1 == mf.build_stderr_data.count("ERROR")


# Check that numbering works correctly.
def test_2():
    with open("build/testfitb/index.html", encoding="utf-8") as f:
        assert "Before-5-After: Fill in the blanks" in f.read()


## Helpers
## =======
# Load the web page, then return the DIV containing a FITB question.
def find_fitb(selenium_utils, div_id):
    selenium_utils.wait_until_ready(div_id)
    return selenium_utils.driver.find_element_by_id(div_id)


# Find one of the blanks, based on the given index.
def find_blank(fitb_element, index, clear=True):
    blank = fitb_element.find_elements_by_tag_name("input")[index]
    if clear:
        blank.clear()
    return blank


# Click the "Check me" button.
def click_checkme(selenium_utils, fitb_element):
    selenium_utils.scroll_to_top()
    # It's the first button in the component's div.
    fitb_element.find_element_by_tag_name("button").click()


# Click the "Randomize" button.
def click_randomize(fitb_element):
    fitb_element.find_element_by_css_selector("button[name=randomize]").click()


# Require the expected text in the question's feedback element.
def check_feedback(selenium_utils, fitb_element, expected_text):
    div_id = fitb_element.get_attribute("id")
    selenium_utils.wait.until(
        EC.text_to_be_present_in_element((By.ID, div_id + "_feedback"), expected_text)
    )


# Require the expected text in the question's description.
def check_description(selenium_utils, fitb_element, expected_text):
    div_id = fitb_element.get_attribute("id")
    css_sel = f"#{div_id} > div:nth-child(1)"
    try:
        selenium_utils.wait.until(
            EC.text_to_be_present_in_element((By.CSS_SELECTOR, css_sel), expected_text)
        )
    except TimeoutException:
        # Provide an error message that shows actual vs. expected text, instead of the more generic TimeoutException.
        actual_text = fitb_element.find_element_by_css_selector(css_sel).text
        assert expected_text == actual_text


## Tests
## =====
# One of two correct answers
def test_fitb1(selenium_utils_get):
    """
    http://runestoneinteractive.org/build/html/directives.html#fill-in-the-blank for documentation
    """
    fitb = find_fitb(selenium_utils_get, "test_fitb_string")
    find_blank(fitb, 0)
    find_blank(fitb, 1)
    click_checkme(selenium_utils_get, fitb)
    # Get desired response from .i18n file loaded based on language attribute in the HTML tag initially set in conf.py
    msg_no_answer = selenium_utils_get.driver.execute_script(
        "return $.i18n('msg_no_answer')"
    )
    check_feedback(selenium_utils_get, fitb, msg_no_answer)


# No answers yet -- no answer provided feedback.
def test_fitb2(selenium_utils_get):
    fitb = find_fitb(selenium_utils_get, "test_fitb_string")
    find_blank(fitb, 0).send_keys("red")
    find_blank(fitb, 1)
    click_checkme(selenium_utils_get, fitb)
    check_feedback(selenium_utils_get, fitb, "Correct")
    # Get desired response from .i18n file loaded based on language attribute in the HTML tag initially set in conf.py
    msg_no_answer = selenium_utils_get.driver.execute_script(
        "return $.i18n('msg_no_answer')"
    )
    check_feedback(selenium_utils_get, fitb, msg_no_answer)


# Both correct answers
def test_fitb3(selenium_utils_get):
    fitb = find_fitb(selenium_utils_get, "test_fitb_string")
    find_blank(fitb, 0).send_keys("red")
    find_blank(fitb, 1).send_keys("away")
    click_checkme(selenium_utils_get, fitb)
    check_feedback(selenium_utils_get, fitb, "Correct")


def test_fitb4(selenium_utils_get):
    fitb = find_fitb(selenium_utils_get, "test_fitb_string")
    blank0 = find_blank(fitb, 0)
    # Type an incorrect answer.
    blank0.send_keys("red")
    # Delete it.
    blank0.clear()
    # Type the correct answer.
    blank0.send_keys("red")
    find_blank(fitb, 1).send_keys("away")
    click_checkme(selenium_utils_get, fitb)
    check_feedback(selenium_utils_get, fitb, "Correct")


def test_fitboneblank_too_low(selenium_utils_get):
    fitb = find_fitb(selenium_utils_get, "test_fitb_number")
    find_blank(fitb, 0).send_keys(" 6")
    click_checkme(selenium_utils_get, fitb)
    check_feedback(selenium_utils_get, fitb, "Try higher.")


def test_fitboneblank_wildcard(selenium_utils_get):
    fitb = find_fitb(selenium_utils_get, "test_fitb_number")
    find_blank(fitb, 0).send_keys("I give up")
    click_checkme(selenium_utils_get, fitb)
    check_feedback(selenium_utils_get, fitb, "Incorrect. Try again.")


def test_fitbfillrange(selenium_utils_get):
    fitb = find_fitb(selenium_utils_get, "test_fitb_number")
    find_blank(fitb, 0).send_keys(" 6.28 ")
    click_checkme(selenium_utils_get, fitb)
    check_feedback(selenium_utils_get, fitb, "Good job.")


def test_fitbregex(selenium_utils_get):
    fitb = find_fitb(selenium_utils_get, "test_fitb_regex_1")
    find_blank(fitb, 0).send_keys(" maire ")
    # find_blank(fitb, 0).send_keys(" mARy ")
    find_blank(fitb, 1).send_keys("LITTLE")
    find_blank(fitb, 2).send_keys("2")
    click_checkme(selenium_utils_get, fitb)
    check_feedback(selenium_utils_get, fitb, "Correct")


def test_regexescapes1(selenium_utils_get):
    fitb = find_fitb(selenium_utils_get, "test_fitb_regex_2")
    find_blank(fitb, 0).send_keys(r"C:\windows\system")
    click_checkme(selenium_utils_get, fitb)
    check_feedback(selenium_utils_get, fitb, "Correct")


def test_regexescapes2(selenium_utils_get):
    fitb = find_fitb(selenium_utils_get, "test_fitb_regex_3")
    find_blank(fitb, 0).send_keys("[]")
    click_checkme(selenium_utils_get, fitb)
    check_feedback(selenium_utils_get, fitb, "Correct")


# _`dynamic problem value repetition`: define it like this so that the server can provide a different sequence of random values. On the server, it asks for random value each time the server grades a problem and when the "randomize" button is clicked, so it needs lots of repetition. The client only asks for random values when the "randomize" button is clicked.
def test_dynamic_1(selenium_utils_get):
    _test_dynamic_1(selenium_utils_get, [0.2, 0.1, 0.3, 0.4])


def _test_dynamic_1(selenium_utils_get, test_values):
    fitb = find_fitb(selenium_utils_get, "test_fitb_dynamic_1")

    # Inject controlled values to the RNG for dynamic problems.
    selenium_utils_get.inject_random_values(test_values)
    click_randomize(fitb)

    # Try all the different answers. Include whitespace, various numeric formats, etc.
    check_description(selenium_utils_get, fitb, "What is 2 + 1?")
    # Dynamic problems re-create the blanks after receiving new HTML. Wait for this to be ready before typing in a blank to avoid errors.
    import time

    time.sleep(0.1)
    find_blank(fitb, 0).send_keys(" 3")
    click_checkme(selenium_utils_get, fitb)
    check_feedback(selenium_utils_get, fitb, "Correct")
    find_blank(fitb, 0).send_keys("1.0 ")
    click_checkme(selenium_utils_get, fitb)
    check_feedback(selenium_utils_get, fitb, "subtraction")
    find_blank(fitb, 0).send_keys(" 0x2 ")
    click_checkme(selenium_utils_get, fitb)
    check_feedback(selenium_utils_get, fitb, "multiplication")
    find_blank(fitb, 0).send_keys(" 4e0")
    click_checkme(selenium_utils_get, fitb)
    check_feedback(selenium_utils_get, fitb, "know what")

    # Verify the feedback is removed.
    click_randomize(fitb)
    # Put this before the assertions, since it will wait until the text appears (implying the problem has been updated).
    check_description(selenium_utils_get, fitb, "What is 3 + 4?")
    assert (
        selenium_utils_get.driver.find_element_by_id(
            "test_fitb_dynamic_1_feedback"
        ).text
        == ""
    )
    assert fitb.find_element_by_tag_name("input").text == ""

    # Run another check to make sure a new problem appeared.
    find_blank(fitb, 0).send_keys("  0b111 ")
    click_checkme(selenium_utils_get, fitb)
    check_feedback(selenium_utils_get, fitb, "Correct")
