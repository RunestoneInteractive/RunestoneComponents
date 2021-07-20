def test_1(selenium_utils_get):
    # After the render, Wavedrom will create a div with a numbered ID. If this exists, then the render worked. Don't try waiting for the component to be ready, since this isn't a Runestone Component -- it doesn't emit a ready signal.
    selenium_utils_get.driver.find_element_by_id("WaveDrom_Display_0")
