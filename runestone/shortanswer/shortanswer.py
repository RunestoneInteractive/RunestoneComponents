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
# acbart did most of this code, I mostly just changed the template

from docutils import nodes
from docutils.parsers.rst import directives
from runestone.mchoice import Assessment
from runestone.server.componentdb import (
    addQuestionToDB,
    addHTMLToDB,
    maybeAddToAssignment,
)
from runestone.common.runestonedirective import RunestoneDirective, RunestoneIdNode


def setup(app):
    app.add_directive("shortanswer", JournalDirective)
    app.add_node(JournalNode, html=(visit_journal_node, depart_journal_node))
    app.add_config_value("shortanswer_div_class", "journal alert alert-warning", "html")
    app.add_config_value(
        "shortanswer_optional_div_class", "journal alert alert-success", "html"
    )


TEXT_START = """
<div class="runestone">
<div data-component="shortanswer" data-question_label="%(question_label)s" class="%(divclass)s" id=%(divid)s %(optional)s %(mathjax)s>
"""

TEXT_END = """
</div>
</div> <!-- end of runestone div -->
"""


class JournalNode(nodes.General, nodes.Element, RunestoneIdNode):
    def __init__(self, options, **kwargs):
        super(JournalNode, self).__init__(**kwargs)
        self.runestone_options = options


def visit_journal_node(self, node):
    div_id = node.runestone_options["divid"]
    components = dict(node.runestone_options)
    components.update({"divid": div_id})

    node.delimiter = "_start__{}_".format(node.runestone_options["divid"])
    self.body.append(node.delimiter)

    res = TEXT_START % components

    self.body.append(res)


def depart_journal_node(self, node):

    components = dict(node.runestone_options)

    res = TEXT_END % components
    self.body.append(res)

    addHTMLToDB(
        node.runestone_options["divid"],
        components["basecourse"],
        "".join(self.body[self.body.index(node.delimiter) + 1 :]),
    )

    self.body.remove(node.delimiter)


class JournalDirective(Assessment):
    """
.. shortanswer:: uniqueid
   :optional:

   text of the question goes here


config values (conf.py):

- shortanswer_div_class - custom CSS class of the component's outermost div
    """

    required_arguments = 1  # the div id
    optional_arguments = 0
    final_argument_whitespace = True
    has_content = True
    option_spec = Assessment.option_spec.copy()
    option_spec.update({"mathjax": directives.flag})

    node_class = JournalNode

    def run(self):
        super(JournalDirective, self).run()
        addQuestionToDB(self)
        # Raise an error if the directive does not have contents.
        self.assert_has_content()

        self.options["mathjax"] = "data-mathjax" if "mathjax" in self.options else ""

        journal_node = JournalNode(self.options, rawsource=self.block_text)
        journal_node.source, journal_node.line = self.state_machine.get_source_and_line(
            self.lineno
        )

        self.updateContent()

        self.state.nested_parse(self.content, self.content_offset, journal_node)

        env = self.state.document.settings.env
        if self.options["optional"]:
            self.options["divclass"] = env.config.shortanswer_optional_div_class
        else:
            self.options["divclass"] = env.config.shortanswer_div_class

        maybeAddToAssignment(self)

        return [journal_node]
