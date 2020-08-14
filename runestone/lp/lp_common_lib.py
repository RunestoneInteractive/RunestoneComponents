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
from pathlib import Path
import random


# Seed the random number generator.
random.seed()


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


# Shared between waf and web2py
# =============================
# Return the string needed to run a SIM30 simulation.
def get_sim_str_sim30(
    # A string giving the MCU to simulate.
    sim_mcu,
    # The ELF file to load and simulate.
    elf_file,
    # The name of an output file for UART output.
    uart_out_file,
    # Additional, optional commands.
    optional_commands="",
):

    return (
        # In SIM30, type ? to get help. See also :alink:`the manual <asmguide#page=218>`.
        #
        # .. _supported devices:
        #
        # Select the dsPIC33E. From the help:
        # ``LD <devicename> -Load Device: dspic30super dspic33epsuper pic24epsuper pic24fpsuper pic24super``
        "LD {}\n"
        # Load in the pic24_intro.elf. From the help:
        # ``LC <filename> -Load COFF/ELF File``
        "LC {}\n"
        # Have the simulator save UART1 IO to a file. From the help:
        # ``IO [stdin [stdout]] -Input/Output On (use nul if no stdin and/or stdout)``
        "IO nul {}\n"
        # Reset the processor. From the help:
        # ``RP -Reset processor POR``
        "RP\n"
        # Set a breakpoint at the end of the program (the label ``_done``).
        # From the help:
        # ``BS <location> ...[locations] -Breakpoint Set``
        "BS _done\n"
        # Include any other setup (stimulus file, pin assignments, etc.).
        "{}\n"
        # Run the program. From the help:
        # ; ``E  -Execute``
        "E 10000\n"
        # Quit. From the help:
        # ``Q  -Quit``
        "Q\n"
    ).format(sim_mcu, elf_file, uart_out_file, optional_commands)


# Return the string needed to run a simulation under MDB.
def get_sim_str_mdb(
    # A string giving the MCU to simulate.
    sim_mcu,
    # The ELF file to load and simulate.
    elf_file,
    # The name of an output file for UART output.
    uart_out_file,
    # Additional, optional commands.
    optional_commands="",
):

    return (
        # See :alink:`the MDB manual <http://ww1.microchip.com/downloads/en/DeviceDoc/50002102D.pdf>` for more information.
        #
        # Select the device to simulate.
        "device {}\n"
        # Specify the simulator (as opposed to a PICKit3, etc.)
        "hwtool sim\n"
        # Set up to capture UART 1 output to a file.
        "set uart1io.output file\n"
        "set uart1io.uartioenabled true\n"
        'set uart1io.outputfile "{}"\n'
        # Configure the clock to match the setup in the PIC24 library ``lib/include/pic24_clockfreq.h`` named ``SIM_CLOCK``.
        "set oscillator.frequency 1\n"
        "set oscillator.frequencyunit Mega\n"
        # Load in the program.
        'program "{}"\n'
        # Set a breakpoint at the end of the program (the label ``_done``).
        "break _done\n"
        # Include any other setup (stimulus file, pin assignments, etc.).
        "{}\n"
        # Run the program. Wait a time in ms for it to finish.
        "run\n"
        "wait 6000\n"
        # Exit the simulator.
        "quit\n"
    ).format(
        sim_mcu,
        # MDB starting in MPLAB X v5.35 doesn't understand Windows-style paths (although using \\ instead of \ does work). It does work with Posix paths.
        Path(uart_out_file).as_posix(),
        Path(elf_file).as_posix(),
        optional_commands,
    )


# Get a verification code (a random, 32-bit value).
def get_verification_code():
    return random.randrange(0, 2 ** 32)


# Returns True if a simulation produced the correct answer.
def check_sim_out(out_str, verification_code):
    sl = out_str.splitlines()
    second_to_last_line = sl[-2] if len(sl) >= 1 else ""
    third_to_last_line = sl[-3] if len(sl) >= 2 else ""
    return (third_to_last_line == "Correct.") and (
        second_to_last_line == "{}".format(verification_code)
    )
