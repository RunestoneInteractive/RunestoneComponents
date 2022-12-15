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
from runestone.common.runestonedirective import (
    RunestoneIdDirective,
    RunestoneIdNode,
)
from runestone.common.xmlcommon import write_substitute


def setup(app):
    app.add_directive("dragndrop", DragNDrop)

    app.add_node(DragNDropNode, html=(visit_dnd_html, depart_dnd_html),
                 xml=(visit_dnd_xml, depart_dnd_xml))

    app.add_config_value("dragndrop_div_class", "runestone", "html")


TEMPLATE_START = """
<div class="%(divclass)s  %(optclass)s">
<ul data-component="dragndrop" data-question_label="%(question_label)s" id="%(divid)s" %(optional)s style="visibility: hidden;">
    <span data-subcomponent="question">%(qnumber)s: %(question)s</span>
	%(feedback)s
"""

TEMPLATE_OPTION = """
    <li data-subcomponent="draggable" id="%(divid)s_drag%(dnd_label)s">%(dragText)s</li>
    <li data-subcomponent="dropzone" for="%(divid)s_drag%(dnd_label)s">%(dropText)s</li>
"""
TEMPLATE_END = """</ul></div>"""

XML_START = """
<exercise label="{divid}">
    <statement><p>{question}</p></statement>
    {feedback}
"""


class DragNDropNode(nodes.General, nodes.Element, RunestoneIdNode):
    pass

# self for these functions is an instance of the writer class.  For example
# in html, self is sphinx.writers.html.SmartyPantsHTMLTranslator
# The node that is passed as a parameter is an instance of our node class.


def visit_dnd_xml(self, node):
    res = XML_START

    if "feedback" in node["runestone_options"]:
        node["runestone_options"]["feedback"] = (
            "<feedback><p>"
            + node["runestone_options"]["feedback"]
            + "</p></feedback>"
        )
    else:
        node["runestone_options"]["feedback"] = ""

    res = res.format(**node["runestone_options"])
    self.output.append(res)


def depart_dnd_xml(self, node):
    self.output.append("<matches>")
    okeys = list(node["runestone_options"].keys())
    okeys.sort()
    for k in okeys:
        if "match" in k:
            x, ix = k.split("_")
            dragE, dropE = node["runestone_options"][k].split("|||")
            self.output.append(f'<match order="{ix}">')
            self.output.append(f"<premise>{dragE}</premise>")
            self.output.append(f"<response>{dropE}</response>")
            self.output.append("</match>")
    self.output.append("</matches></exercise>")


def visit_dnd_html(self, node):

    node["delimiter"] = "_start__{}_".format(node["runestone_options"]["divid"])
    self.body.append(node["delimiter"])

    res = visit_dnd_common(self, node)

    self.body.append(res)


def depart_dnd_html(self, node):
    res = depart_dnd_common(self, node)
    self.body.append(res)

    addHTMLToDB(
        node["runestone_options"]["divid"],
        node["runestone_options"]["basecourse"],
        "".join(self.body[self.body.index(node["delimiter"]) + 1 :]),
    )

    self.body.remove(node["delimiter"])


def visit_dnd_common(self, node):
    res = TEMPLATE_START

    if "feedback" in node["runestone_options"]:
        node["runestone_options"]["feedback"] = (
            "<span data-subcomponent=feedback>"
            + node["runestone_options"]["feedback"]
            + "</span>"
        )
    else:
        node["runestone_options"]["feedback"] = ""

    res = res % node["runestone_options"]
    return res


def depart_dnd_common(self, node):
    res = ""
    # Add all of the possible answers
    okeys = list(node["runestone_options"].keys())
    okeys.sort()
    for k in okeys:
        if "match" in k:
            x, label = k.split("_")
            node["runestone_options"]["dnd_label"] = label
            dragE, dropE = node["runestone_options"][k].split("|||")
            node["runestone_options"]["dragText"] = dragE
            node["runestone_options"]["dropText"] = dropE
            res += node["template_option"] % node["runestone_options"]
    res += node["template_end"] % node["runestone_options"]

    return res


class DragNDrop(RunestoneIdDirective):
    """
.. dragndrop:: identifier
    :feedback: Feedback that is displayed if things are incorrectly matched--is optional
    :match_1: Draggable element text|||Dropzone to be matched with text
    :match_2: Drag to Answer B|||Answer B
    :match_3: Draggable text|||Text of dropzone
    etc. (up to 20 matches)

    The question goes here.

config values (conf.py):

- dragndrop_div_class - custom CSS class of the component's outermost div
    """

    required_arguments = 1
    optional_arguments = 0
    has_content = True
    option_spec = RunestoneIdDirective.option_spec.copy()
    option_spec.update(
        {
            "feedback": directives.unchanged,
            "match_1": directives.unchanged,
            "match_2": directives.unchanged,
            "match_3": directives.unchanged,
            "match_4": directives.unchanged,
            "match_5": directives.unchanged,
            "match_6": directives.unchanged,
            "match_7": directives.unchanged,
            "match_8": directives.unchanged,
            "match_9": directives.unchanged,
            "match_10": directives.unchanged,
            "match_11": directives.unchanged,
            "match_12": directives.unchanged,
            "match_13": directives.unchanged,
            "match_14": directives.unchanged,
            "match_15": directives.unchanged,
            "match_16": directives.unchanged,
            "match_17": directives.unchanged,
            "match_18": directives.unchanged,
            "match_19": directives.unchanged,
            "match_20": directives.unchanged,
        }
    )

    def run(self):
        """
            process the multiplechoice directive and generate html for output.
            :param self:
            :return:
            .. dragndrop:: identifier
                :feedback: Feedback that is displayed if things are incorrectly matched--is optional
                :match_1: Draggable element text|||Dropzone to be matched with text
                :match_2: Drag to Answer B|||Answer B
                :match_3: Draggable text|||Text of dropzone
                ...etc...(up to 20 matches)

                The question goes here.
        """
        super(DragNDrop, self).run()
        addQuestionToDB(self)

        if self.content:
            source = "\n".join(self.content)
        else:
            source = "\n"

        self.options["question"] = source
        env = self.state.document.settings.env
        self.options["divclass"] = env.config.dragndrop_div_class

        dndNode = DragNDropNode()
        dndNode["runestone_options"] = self.options
        dndNode["source"], dndNode["line"] = self.state_machine.get_source_and_line(
            self.lineno
        )
        dndNode["template_start"] = TEMPLATE_START
        dndNode["template_option"] = TEMPLATE_OPTION
        dndNode["template_end"] = TEMPLATE_END

        maybeAddToAssignment(self)

        return [dndNode]
