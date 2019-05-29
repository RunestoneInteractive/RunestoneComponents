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
# ********************************************************************************
# lp_common_lib.py - Definitions of shared data in the literate programming system
# ********************************************************************************
# This file contains a definition and supporting classes for a data structure used to export data from Sphinx to the Flask database for the books.
#
# Imports
# =======
# These are listed in the order prescribed by `PEP 8
# <http://www.python.org/dev/peps/pep-0008/#imports>`_.
#
# Standard library
# ----------------
import os.path
import io
import json


# Given a file, return the inline comment token based on the file extension.
def commentForExt(file_name):
    return {
        '.py': '# ',
        '.c': '// ',
        '.h': '// ',
        '.js': '// ',
        '.s': '; ',
        '.rst': '',
        '.css': '/* ',  # Will need some hand editing...
        '.ini': '; ',
    }[os.path.splitext(file_name)[1]]


# Relative to the Sphinx output directory, the path to student source (which has all feedback and code solutions removed).
STUDENT_SOURCE_PATH = '../student_source'

# Relative to the Sphinx output directory, the path to the build system's output (which provides will be used to build and link student source).
BUILD_SYSTEM_PATH = '../build_system'

# Define a file in which Sphinx config values will be stored in the root directory of a Sphinx project.
SPHINX_CONFIG_NAME = 'sphinx_settings.json'


def read_sphinx_config(
    # The directory in which the ``SPHINX_CONFIG_NAME`` file is located.
    dir_='.'
):

    try:
        with io.open(os.path.join(dir_, SPHINX_CONFIG_NAME), encoding='utf-8') as f:
            return json.loads(f.read())
    except IOError:
        return None


# Add the appropriate line comment delimiters to the ``CODE_HERE_STRING``.
def code_here_comment(file_name):
    return (_add_line_comment_delimiter(CODE_HERE_STRING, file_name)
        # Don't add a comment character for the trailing newline.
        + '\n')


# A string which replaces code solutions in student source code.
CODE_HERE_STRING = (
"""``*******************************************``
Add your code after this line.

Add your code before this line.
``*******************************************``""")


# Given a string and the file name it will be added to, add the line comment delimiter followed by a space to each line of the string.
def _add_line_comment_delimiter(
    # The string to which line comment delimiters should be added.
    str_,
    # The file name into which this string will be inserted.
    file_name
):

    delim = commentForExt(file_name)
    # Add a comment for to every newline.
    str_ = str_.replace('\n', '\n' + delim)
    # Begin the string with a comment as well.
    return delim + str_


# Shared between waf and web2py
# =============================
# Return the string needed to run a SIM30 simulation.
def get_sim_str_sim30(
    # A string giving the MCU to simulate.
    sim_mcu,
    # The ELF file to load and simulate.
    elf_file,
    # The name of an output file for UART output.
    uart_out_file
):

    return (
        # In SIM30, type ? to get help. See also :alink:`the manual <asmguide#page=218>`.
        #
        # .. _supported devices:
        #
        # Select the dsPIC33E. From the help:
        # ``LD <devicename> -Load Device: dspic30super dspic33epsuper pic24epsuper pic24fpsuper pic24super``
        'LD {}\n'

        # Load in the pic24_intro.elf. From the help:
        # ``LC <filename> -Load COFF/ELF File``
        'LC {}\n'

        # Have the simulator save UART1 IO to a file. From the help:
        # ``IO [stdin [stdout]] -Input/Output On (use nul if no stdin and/or stdout)``
        'IO nul {}\n'

        # Reset the processor. From the help:
        # ``RP -Reset processor POR``
        'RP\n'

        # Set a breakpoint at the end of the program (the label ``done``).
        # From the help:
        # ``BS <location> ...[locations] -Breakpoint Set``
        'BS done\n'

        # Run the program. From the help:
        # ; ``E  -Execute``
        'E 10000\n'

        # Quit. From the help:
        # ``Q  -Quit``
        'Q\n'
    ).format(sim_mcu, elf_file, uart_out_file)


# Return the string needed to run a simulation under MDB.
def get_sim_str_mdb(
    # A string giving the MCU to simulate.
    sim_mcu,
    # The ELF file to load and simulate.
    elf_file,
    # The name of an output file for UART output.
    uart_out_file,
    # Additional, optional commands.
    optional_commands=''
):

    return (
        # See :alink:`the MDB manual <http://ww1.microchip.com/downloads/en/DeviceDoc/50002102D.pdf>` for more information.
        #
        # Select the device to simulate.
        'device {}\n'

        # Specify the simulator (as opposed to a PICKit3, etc.)
        'hwtool sim\n'

        # Set up to capture UART 1 output to a file.
        'set uart1io.output file\n'
        'set uart1io.uartioenabled true\n'
        'set uart1io.outputfile "{}"\n'

        # Load in the program.
        'program "{}"\n'

        # Set a breakpoint at the end of the program (the label ``done``).
        'break done\n'

        # Include any other setup (stimulus file, pin assignments, etc.).
        '{}\n'

        # Run the program. Wait a time in ms for it to finish.
        'run\n'
        'wait 6000\n'

        # Exit the simulator.
        'quit\n'
    ).format(sim_mcu, uart_out_file, elf_file, optional_commands)
