# .. Copyright (C) 2021 Bryan A. Jones.
#
# *********************************************************
# |docname| - A Runestone extension supporting cellbotics
# *********************************************************
# This extension provides one new directive, ``ble-pair-button``, to add the Bluetooth Low Energy "Pair" button and status display to a page where users will be using the Cellbotics Python module and associated BLE functionality. The extension also includes all the supporting JavaScript files needed for the Cellbotics Python module.
#
#
# Imports
# =======
# These are listed in the order prescribed by `PEP 8
# <http://www.python.org/dev/peps/pep-0008/#imports>`_.
#
# Standard library
# ----------------
# None.
#
# Third-party imports
# -------------------
from docutils import nodes
from docutils.parsers.rst import Directive

# Local imports
# -------------
# None


# Code
# ====
class BlePairNode(nodes.General, nodes.Element):
    pass


def visit_ble_pair_html(self, node):
    self.body.append(
        '<div data-component="ble">\n'
        '   <script>runestone_import("ble");</script>\n'
        '   <button id="ble_pair_button" type="button" disabled>Pair</button>\n'
        '   <span id="ble_pair_status"></span>\n'
        '</div>\n'
    )


def depart_ble_pair_html(self, node):
    pass


class BlePairDirective(Directive):
    has_content = False
    required_arguments = 0
    optional_arguments = 0
    option_spec = {}

    def run(self):
        return [BlePairNode()]


def setup(app):
    # Add the Pair button directive.
    app.add_node(BlePairNode, html=(visit_ble_pair_html, depart_ble_pair_html))
    app.add_directive('ble-pair-button', BlePairDirective)
