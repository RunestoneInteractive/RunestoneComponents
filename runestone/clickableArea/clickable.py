# Copyright (C) 2011  Bradley N. Miller
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#

__author__ = "isaiahmayerchak"

from docutils import nodes
from docutils.parsers.rst import directives
from runestone.server.componentdb import (
    addQuestionToDB,
    addHTMLToDB,
    maybeAddToAssignment,
)
from runestone.common.runestonedirective import RunestoneIdDirective, RunestoneIdNode


def setup(app):
    app.add_directive("clickablearea", ClickableArea)

    app.add_node(ClickableAreaNode, html=(visit_ca_node, depart_ca_node))

    app.add_config_value("clickable_div_class", "runestone alert alert-warning", "html")


TEMPLATE = """
<div class="runestone">
<div data-component="clickablearea" class="%(divclass)s" id="%(divid)s" data-question_label="%(question_label)s" %(optional)s %(table)s %(correct)s %(incorrect)s style="visibility: hidden;">
<span data-question>%(qnumber)s: %(question)s</span>%(feedback)s%(clickcode)s
"""
TEMPLATE_END = """
</div>
</div>
"""


class ClickableAreaNode(nodes.General, nodes.Element, RunestoneIdNode):
    def __init__(self, content, **kwargs):
        """
        Arguments:
        - `self`:
        - `content`:
        """
        super(ClickableAreaNode, self).__init__(**kwargs)
        self.runestone_options = content


# self for these functions is an instance of the writer class.  For example
# in html, self is sphinx.writers.html.SmartyPantsHTMLTranslator
# The node that is passed as a parameter is an instance of our node class.
def visit_ca_node(self, node):
    res = TEMPLATE

    node.delimiter = "_start__{}_".format(node.runestone_options["divid"])
    self.body.append(node.delimiter)

    if "feedback" in node.runestone_options:
        node.runestone_options["feedback"] = (
            "<span data-feedback>" + node.runestone_options["feedback"] + "</span>"
        )
    else:
        node.runestone_options["feedback"] = ""

    if "iscode" not in node.runestone_options:
        node.runestone_options["correct"] = (
            "data-cc=" + '"' + node.runestone_options["correct"] + '"'
        )
        node.runestone_options["incorrect"] = (
            "data-ci=" + '"' + node.runestone_options["incorrect"] + '"'
        )
    else:
        node.runestone_options["correct"] = ""
        node.runestone_options["incorrect"] = ""

    res = res % node.runestone_options

    self.body.append(res)


def depart_ca_node(self, node):
    res = ""
    res = TEMPLATE_END % node.runestone_options
    self.body.append(res)

    addHTMLToDB(
        node.runestone_options["divid"],
        node.runestone_options["basecourse"],
        "".join(self.body[self.body.index(node.delimiter) + 1 :]),
    )

    self.body.remove(node.delimiter)


class ClickableArea(RunestoneIdDirective):
    """
.. clickablearea:: identifier
    :question: Question text
    :feedback: Optional feedback for incorrect answer
    :iscode: Boolean that if present will put the content into a <pre>
    :table: Boolean that indicates that the content is a table.
    :correct: An array of the indices of the correct elements, separated by semicolons--if this is a table, each item in the array is a tuple
    with the first number being the row and the second number being the column--use a column number of 0 to make the whole row correct (ex: 1,2;3,0 makes the 2nd data cell in the first row correct as well as the entire 3rd row)
    :incorrect: An array of the indices of the incorrect elements--same format as the correct elements.

    --Content--


config values (conf.py):

- clickable_div_class - custom CSS class of the component's outermost div
    """

    required_arguments = 1
    optional_arguments = 0
    has_content = True
    final_argument_whitespace = True
    option_spec = RunestoneIdDirective.option_spec.copy()
    option_spec.update(
        {
            "question": directives.unchanged,
            "feedback": directives.unchanged,
            "iscode": directives.flag,
            "correct": directives.unchanged,
            "incorrect": directives.unchanged,
            "table": directives.flag,
        }
    )

    def run(self):
        """
            process the clickablearea directive and generate html for output.
            :param self:
            :return:
            .. clickablearea:: identifier
                :question: Question text
                :feedback: Optional feedback for incorrect answer
                :iscode: Boolean that if present will put the content into a <pre>
                :table: Boolean that indicates that the content is a table.
                :correct: An array of the indices of the correct elements, separated by semicolons--if this is a table, each item in the array is a tuple
                with the first number being the row and the second number being the column--use a column number of 0 to make the whole row correct (ex: 1,2;3,0 makes the 2nd data cell in the first row correct as well as the entire 3rd row)
                :incorrect: An array of the indices of the incorrect elements--same format as the correct elements.
                --Content--
        """
        super(ClickableArea, self).run()
        self.explain_text = [self.options["question"]]
        addQuestionToDB(self)

        self.assert_has_content()
        if "iscode" in self.options:
            source = "\n".join(self.content)
            source = source.replace(":click-correct:", "<span data-correct>")
            source = source.replace(":click-incorrect:", "<span data-incorrect>")
            source = source.replace(":endclick:", "</span>")
            source = "<pre>" + source + "</pre>"
            self.options["clickcode"] = source
        else:
            self.options["clickcode"] = ""
        clickNode = ClickableAreaNode(self.options, rawsource=self.block_text)
        clickNode.source, clickNode.line = self.state_machine.get_source_and_line(
            self.lineno
        )
        clickNode.template_start = TEMPLATE

        if "table" in self.options:
            self.options["table"] = "data-table"
        else:
            self.options["table"] = ""

        if "iscode" not in self.options:
            self.state.nested_parse(self.content, self.content_offset, clickNode)

        env = self.state.document.settings.env
        self.options["divclass"] = env.config.clickable_div_class

        maybeAddToAssignment(self)

        return [clickNode]
