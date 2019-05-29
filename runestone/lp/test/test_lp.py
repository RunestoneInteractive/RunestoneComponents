# .. Copyright (C) 2017 Bryan A. Jones.
#
#    This file is part of E-Book Binder.
#
#    E-Book Binder is free software: you can redistribute it and/or modify it
#    under the terms of the GNU General Public License as published by the Free
#    Software Foundation, either version 3 of the License, or (at your option)
#    any later version.
#
#    E-Book Binder is distributed in the hope that it will be useful, but WITHOUT
#    ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
#    FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
#    details.
#
#    You should have received a copy of the GNU General Public License along
#    with E-Book Binder.  If not, see <http://www.gnu.org/licenses/>.
#
# .. highlight:: python
#
# ***********************
# test_lp.py - Unit tests
# ***********************
# Require Python 3 to run tests.
import sys
from unittest import TestCase, skip
if sys.version_info < (3, 3):
    class TestOldPython(TestCase):
        @skip('Tests require Python 3.')
        def test_1():
            pass
else:
    #
    # Imports
    # =======
    # These are listed in the order prescribed by `PEP 8
    # <http://www.python.org/dev/peps/pep-0008/#imports>`_.
    #
    # Standard library
    # ----------------
    from pathlib import Path
    from time import sleep
    #
    # Third-party imports
    # -------------------
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    #
    # Local imports
    # -------------
    from runestone.lp.lp import (
        _remove_code_solutions, _textarea_replacement,
        TEXTAREA_REPLACEMENT_STRING, _source_read
    )
    from runestone.server.lp_common_lib import _add_line_comment_delimiter, STUDENT_SOURCE_PATH, read_sphinx_config, SPHINX_CONFIG_NAME
    from runestone.unittest_base import module_fixture_maker, RunestoneTestCase

    mf, setUpModule, tearDownModule = module_fixture_maker(__file__, True)
    #
    # Mock classes
    # ============
    class MockApp:
        def __init__(self, docname):
            self.builder = MockBuilder(docname)
            self.env = self.builder.env
            self.outdir = '_build/html'

    class MockBuilder:
        def __init__(self, docname):
            self.env = MockEnv(docname)

    class MockEnv:
        def __init__(self, docname):
            self.docname = docname
            self.srcdir = '_source'
            self.titles = {docname: 'A test file'}

        def doc2path(self, docname, *args):
            return docname
    #
    # Supporting utilities
    # ====================
    # Set up Sphinx mocks.
    def sphinx_setup():
        app = MockApp('test.c')
        env = app.builder.env
        return app, env
    #
    # Tests
    # =====
    # Test the code solution removal.
    class Unit_Test_Lp(TestCase):
        # Make sure there were no unexpected warnings in the build.
        def test_1(self):
            self.assertEqual(mf.build_stderr_data.count('WARNING'), 1)

        # Make sure that the student source files were generated.
        def test_1a(self):
            sphinx_config = read_sphinx_config()
            sphinx_source_path = sphinx_config['SPHINX_SOURCE_PATH']
            sphinx_out_path = sphinx_config['SPHINX_OUT_PATH']
            self.assertTrue(sphinx_source_path)

            # Check that a HTML version of the source was produced.
            self.assertTrue((Path(sphinx_out_path) / 'lp_tester.s-source.html').exists())

            # Check that the student source has answers removed.
            with open(str(Path(sphinx_out_path) / STUDENT_SOURCE_PATH / 'lp_tester.s'), encoding='utf-8') as f:
                student_source = f.read()
            self.assertNotIn('_u16_b: .space 2', student_source)
            self.assertNotIn('mov #0xA15F, W0', student_source)

        # Test _remove_code_solutions.
        def test_2(self):
            # Note: to avoid the tags being recognized when this file is parsed by Sphinx, they're broken apart in the strings below.
            self.assertEqual(_remove_code_solutions('foo.s', """# line 1
# line 2
# line 3
# SOLUTION_""" """BEGIN
Answer here.
And here.
Even more.
# SOLUTION_""" """END
# line 9
# line 10
# line 11
#  SOLUTION_""" """BEGIN
More answer stuff.
# SOLUTION_""" """END
# line 15""", lambda start_line, end_line, file_name: '# Snip ' + str(end_line) + '\n'), """# line 1
# line 2
# line 3
# Snip 8
# line 9
# line 10
# line 11
# Snip 14
# line 15""")

        # Test the addition of comments to a string.
        def test_3(self):
            self.assertEqual(_add_line_comment_delimiter('1\n2', 'foo.py'), '# 1\n# 2')
            self.assertEqual(_add_line_comment_delimiter('1\n2', 'foo.c'), '// 1\n// 2')

        # Test ``_textarea_replacement``.
        def test_4(self):
            # Check a mimimum-length replacement.
            self.assertEqual(_textarea_replacement(3, 4, 'foo.py'), TEXTAREA_REPLACEMENT_STRING.format(4))

            # Check a replcement with added lines.
            self.assertEqual(_textarea_replacement(3, 22, 'foo.py').count('\n'), 20)

        # Test the source-read event callback.
        def test_5(self):
            src = [
"""Line 1
Line 2
SOLUTION_""" """BEGIN
Line 4
Line 5
Line 6
Line 7
Line 8
Line 9
Line 10
SOLUTION_""" """END
Line 12"""]
            app, env = sphinx_setup()
            _source_read(app, env.docname, src)
            self.assertEqual(src,
    [
 """Line 1
Line 2

.. raw::
 html

 <textarea class="code_snippet"></textarea><br />

..


Line 12"""])

    class Functional_Test_Lp(RunestoneTestCase):
        def test_1(self):
            self.driver.get(self.host + "/lp_tester.s.html")
            snippets = self.driver.find_elements_by_class_name("code_snippet")
            self.assertEqual(len(snippets), 2)
            check_button = self.driver.find_element_by_id('e1')
            result_area = self.driver.find_element_by_id('lp-result')

            # Set snippets.
            self.driver.execute_script('LPList["e1"].textAreas[0].setValue("xxx"); LPList["e1"].textAreas[1].setValue("yyy");')
            self.assertFalse(result_area.text)

            # Click the test button.
            check_button.click()
            WebDriverWait(self.driver, 10).until(EC.text_to_be_present_in_element_value((By.ID, 'lp-result'), 'Building...'))

            # Refresh the page. See if saved snippets are restored.
            self.driver.get(self.host + "/lp_tester.s.html")
            # Wait for script to run. I don't see a wait condition what would work, unfortunately.
            sleep(0.5)
            self.assertEqual(self.driver.execute_script('return LPList["e1"].textAreas[0].getValue();'), 'xxx')
            self.assertEqual(self.driver.execute_script('return LPList["e1"].textAreas[1].getValue();'), 'yyy')
