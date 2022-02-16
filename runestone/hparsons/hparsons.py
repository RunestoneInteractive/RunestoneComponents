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
__author__ = "ziwu"

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
    app.add_directive("hparsons", HParsonsDirective)
    # adding the html
    app.add_node(HParsonsNode, html=(visit_hparsons_node, depart_hparsons_node))
    # TODO: figure out what these means
    # app.add_config_value("shortanswer_div_class", "journal alert alert-warning", "html")
    # app.add_config_value(
    #     "shortanswer_optional_div_class", "journal alert alert-success", "html"
    # )


# TODO: what is the alert and alert-warnings?
TEMPLATE_START = """
        <div style="max-width: none;">
        <div data-component="hparsons" id="%(divid)s" data-question_label="%(question_label)s" class="alert alert-warning hparsons" >
        <div class="hparsons_question hparsons-text" >
    """

TEMPLATE_END = """
        </div>
        <div class="hparsons">
        </div>
        </div>
        </div>
    """


# seems to be the same for all
class HParsonsNode(nodes.General, nodes.Element, RunestoneIdNode):
    def __init__(self, options, **kwargs):
        super(HParsonsNode, self).__init__(**kwargs)
        self.runestone_options = options

# generate the first part of the html
def visit_hparsons_node(self, node):
    div_id = node.runestone_options["divid"]
    components = dict(node.runestone_options)
    components.update({"divid": div_id})
    node.delimiter = "_start__{}_".format(node.runestone_options["divid"])
    self.body.append(node.delimiter)
    res = TEMPLATE_START % components
    self.body.append(res)


# generate the second part of the html
def depart_hparsons_node(self, node):
    components = dict(node.runestone_options)
    res = TEMPLATE_END % components
    self.body.append(res)
    addHTMLToDB(
        node.runestone_options["divid"],
        components["basecourse"],
        "".join(self.body[self.body.index(node.delimiter) + 1 :]),
    )
    self.body.remove(node.delimiter)


class HParsonsDirective(Assessment):
    """
    .. hparsons:: uniqueid

        nothing makes sense at all.

    """

    required_arguments = 1  # the div id
    optional_arguments = 0 
    final_argument_whitespace = True
    has_content = True 
    option_spec = Assessment.option_spec.copy()
    # seem to be defining the type of the options
    # option_spec.update({"mathjax": directives.flag})

    # just fill it with the name
    node_class = HParsonsNode 

    def run(self):
        # same
        super(HParsonsDirective, self).run()
        addQuestionToDB(self)
        # Raise an error if the directive does not have contents.
        self.assert_has_content()

        # specifying default for option?
        # TODO: ignoring for now
        # self.options["mathjax"] = "data-mathjax" if "mathjax" in self.options else ""

        # same
        hparsons_node = HParsonsNode(self.options, rawsource=self.block_text)
        hparsons_node.source, hparsons_node.line = self.state_machine.get_source_and_line(
            self.lineno
        )

        # exist in short answer and mchoice but not parsons
        # For MChoice its better to insert the qnum into the content before further processing.
        self.updateContent()

        # same as mchoice, different from parsons. i think it is for generating instructions.
        self.state.nested_parse(self.content, self.content_offset, hparsons_node)
        # parsons:
        # self.state.nested_parse(
        #     self.options["instructions"], self.content_offset, parsons_node
        # )

        # adding classes outside of the div based on the options
        env = self.state.document.settings.env
        if self.options["optional"]:
            self.options["divclass"] = env.config.shortanswer_optional_div_class
        else:
            self.options["divclass"] = env.config.shortanswer_div_class

        # same
        maybeAddToAssignment(self)

        # same
        return [hparsons_node]
