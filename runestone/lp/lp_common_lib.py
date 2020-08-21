# .. Copyright (C) 2019 Bryan A. Jones.
#
# *************************************************************************
# |docname| - Definitions of shared data in the literate programming system
# *************************************************************************
# # This file contains a definition and supporting classes for a data structure used to export data from Sphinx to the Flask database for the books.
#
# Imports
# =======
# These are listed in the order prescribed by `PEP 8
# <http://www.python.org/dev/peps/pep-0008/#imports>`_.
#
# Standard library
# ----------------
import json
import os.path


# Given a file, return the inline comment token based on the file extension.
def commentForExt(file_name):
    return {
        ".py": "# ",
        ".c": "// ",
        ".h": "// ",
        ".js": "// ",
        ".s": "; ",
        ".rst": "",
        ".css": "/* ",  # Will need some hand editing...
        ".ini": "; ",
    }[os.path.splitext(file_name)[1]]


# Relative to the Sphinx output directory, the path to student source (which has all feedback and code solutions removed).
STUDENT_SOURCE_PATH = "../student_source"

# Relative to the Sphinx output directory, the path to the build system's output (which provides will be used to build and link student source).
BUILD_SYSTEM_PATH = "../build_system"

# Define a file in which Sphinx config values will be stored in the root directory of a Sphinx project.
SPHINX_CONFIG_NAME = "sphinx_settings.json"


def read_sphinx_config(
    # The directory in which the ``SPHINX_CONFIG_NAME`` file is located.
    dir_=".",
):

    try:
        with open(os.path.join(dir_, SPHINX_CONFIG_NAME), encoding="utf-8") as f:
            return json.loads(f.read())
    except IOError:
        return None


# Add the appropriate line comment delimiters to the ``CODE_HERE_STRING``.
def code_here_comment(file_name):
    return (
        _add_line_comment_delimiter(CODE_HERE_STRING, file_name)
        # Don't add a comment character for the trailing newline.
        + "\n"
    )


# A string which replaces code solutions in student source code.
CODE_HERE_STRING = """``*******************************************``
Add your code after this line.

Add your code before this line.
``*******************************************``"""


# Given a string and the file name it will be added to, add the line comment delimiter followed by a space to each line of the string.
def _add_line_comment_delimiter(
    # The string to which line comment delimiters should be added.
    str_,
    # The file name into which this string will be inserted.
    file_name,
):

    delim = commentForExt(file_name)
    # Add a comment for to every newline.
    str_ = str_.replace("\n", "\n" + delim)
    # Begin the string with a comment as well.
    return delim + str_
