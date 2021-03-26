# ***********************
# test_lp.py - Unit tests
# ***********************
#
# Imports
# =======
# These are listed in the order prescribed by `PEP 8
# <http://www.python.org/dev/peps/pep-0008/#imports>`_.
#
# Standard library
# ----------------
from pathlib import Path

# Third-party imports
# -------------------
# None.
#
# Local imports
# -------------
from runestone.lp.lp import (
    _remove_code_solutions,
    _textarea_replacement,
    TEXTAREA_REPLACEMENT_STRING,
    _source_read,
)
from runestone.lp.lp_common_lib import (
    _add_line_comment_delimiter,
    STUDENT_SOURCE_PATH,
    read_sphinx_config,
)


# Mock classes
# ============
class MockApp:
    def __init__(self, docname):
        self.builder = MockBuilder(docname)
        self.env = self.builder.env
        self.outdir = "_build/html"


class MockBuilder:
    def __init__(self, docname):
        self.env = MockEnv(docname)


class MockEnv:
    def __init__(self, docname):
        self.docname = docname
        self.srcdir = "_source"
        self.titles = {docname: "A test file"}

    def doc2path(self, docname, *args):
        return docname


# Supporting utilities
# ====================
# Set up Sphinx mocks.
def sphinx_setup():
    app = MockApp("test.c")
    env = app.builder.env
    return app, env


# Tests
# =====
#
# Test the code solution removal.

# Make sure there were no unexpected warnings in the build.
def test_1(selenium_module_fixture):
    assert selenium_module_fixture.build_stderr_data.count("WARNING") == 4


# Make sure that the student source files were generated.
def test_1a(selenium_module_fixture):
    sphinx_config = read_sphinx_config()
    sphinx_source_path = sphinx_config["SPHINX_SOURCE_PATH"]
    sphinx_out_path = sphinx_config["SPHINX_OUT_PATH"]
    assert sphinx_source_path

    # Check that a HTML version of the source was produced.
    assert (Path(sphinx_out_path) / "lp_tester.s-source.html").exists()

    # Check that the student source has answers removed.
    with open(
        str(Path(sphinx_out_path) / STUDENT_SOURCE_PATH / "lp_tester.s"),
        encoding="utf-8",
    ) as f:
        student_source = f.read()
    assert "_u16_b: .space 2" not in student_source
    assert "mov #0xA15F, W0" not in student_source


# Test _remove_code_solutions.
def test_2():
    # Note: to avoid the tags being recognized when this file is parsed by Sphinx, they're broken apart in the strings below.
    assert (
        _remove_code_solutions(
            "foo.s",
            """# line 1
# line 2
# line 3
# SOLUTION_"""
            """BEGIN
Answer here.
And here.
Even more.
# SOLUTION_"""
            """END
# line 9
# line 10
# line 11
#  SOLUTION_"""
            """BEGIN
More answer stuff.
# SOLUTION_"""
            """END
# line 15""",
            lambda start_line, end_line, file_name: "# Snip "
            + str(end_line)
            + "\n",
        ) == """# line 1
# line 2
# line 3
# Snip 8
# line 9
# line 10
# line 11
# Snip 14
# line 15"""
    )


# Test the addition of comments to a string.
def test_3():
    assert _add_line_comment_delimiter("1\n2", "foo.py") == "# 1\n# 2"
    assert _add_line_comment_delimiter("1\n2", "foo.c") == "// 1\n// 2"


# Test ``_textarea_replacement``.
def test_4():
    # Check a mimimum-length replacement.
    assert (
        _textarea_replacement(3, 4, "foo.py") == TEXTAREA_REPLACEMENT_STRING.format(4)
    )

    # Check a replacement with added lines.
    assert _textarea_replacement(3, 22, "foo.py").count("\n") == 20


# Test the source-read event callback.
def test_5():
    src = [
        """Line 1
Line 2
SOLUTION_"""
        """BEGIN
Line 4
Line 5
Line 6
Line 7
Line 8
Line 9
Line 10
SOLUTION_"""
        """END
Line 12"""
    ]
    app, env = sphinx_setup()
    _source_read(app, env.docname, src)
    assert (
        src == [
            """Line 1
Line 2

.. raw::
 html

 <textarea class="code_snippet"></textarea><br />

..


Line 12"""
        ]
    )
