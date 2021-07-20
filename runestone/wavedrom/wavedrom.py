# *************************************************
# |docname| - Support wavedrom diagrams from Sphinx
# *************************************************
# See https://wavedrom.com/ for full info. Briefly, this library transforms timing diagrams written in a JSON format into its graphical equivalent.
#
# Imports
# =======
# These are listed in the order prescribed by `PEP 8
# <http://www.python.org/dev/peps/pep-0008/#imports>`_.
#
# Standard library
# ----------------
from typing import List


# Third-party imports
# -------------------
from docutils.parsers.rst import directives
from docutils import nodes
from docutils.nodes import Node
from sphinx.ext.graphviz import figure_wrapper, align_spec
from sphinx.util.docutils import SphinxDirective
from sphinx.writers.html import HTMLTranslator

# Local imports
# -------------
# None.


# WaveDrom
# ========
# This code is based on parts of ``sphinx.ext.graphviz``. It basically stores WaveJSON in the appropriate HTML tag, then relies on the JS to turn this into a timing diagram.
class wavedrom(nodes.General, nodes.Inline, nodes.Element):
    pass


class WaveDromDirective(SphinxDirective):
    """
    Directive to insert arbitrary dot markup.
    """

    has_content = True
    required_arguments = 0
    optional_arguments = 0
    final_argument_whitespace = False
    option_spec = {
        "alt": directives.unchanged,
        "align": align_spec,
        "caption": directives.unchanged,
        "name": directives.unchanged,
        "class": directives.class_option,
    }

    def run(self) -> List[Node]:
        node = wavedrom()
        node["code"] = "\n".join(self.content)
        node["options"] = {"docname": self.env.docname}
        if "alt" in self.options:
            node["alt"] = self.options["alt"]
        if "align" in self.options:
            node["align"] = self.options["align"]
        if "class" in self.options:
            node["classes"] = self.options["class"]

        if "caption" not in self.options:
            self.add_name(node)
            return [node]
        else:
            figure = figure_wrapper(self, node, self.options["caption"])
            self.add_name(figure)
            return [figure]


# The core: store the waveJSON in the HTML then ask for a render.
def html_visit_wavedrom(self: HTMLTranslator, node: wavedrom) -> None:
    self.body.append(
        # Wrap this in a ``data-component`` tag so that wavedrom code will be dynamically loaded. See ``webpack.index.js``, which references ``js/wavedrom.js``.
        '<div data-component="wavedrom">'
        # Finally, insert the WaveJSON file for this diagram.
        '<script type="WaveDrom">{'
    )
    self.body.append(node["code"])
    self.body.append("}</script></div>")
    # Skip the depart visitor -- the HTML above is all we need.
    raise nodes.SkipNode


def setup(app):
    app.add_directive("wavedrom", WaveDromDirective)
    app.add_node(wavedrom, html=(html_visit_wavedrom, None))
