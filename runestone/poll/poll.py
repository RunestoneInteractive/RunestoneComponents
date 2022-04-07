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

from asyncore import write
from docutils import nodes
from docutils.parsers.rst import directives
from runestone.common.runestonedirective import RunestoneIdDirective, RunestoneIdNode
from runestone.server.componentdb import addQuestionToDB, addHTMLToDB
from runestone.common.xmlcommon import write_substitute, substitute_departure


def setup(app):
    app.add_directive("poll", Poll)
    app.add_node(PollNode, html=(visit_poll_html, depart_poll_html),
                 xml=(visit_poll_xml, substitute_departure))

    app.add_config_value("poll_div_class", "", "html")


TEMPLATE_START = """
<div class="runestone %(optclass)s">
<ul data-component="poll" id=%(divid)s %(comment)s class='%(divclass)s' data-results='%(results)s' data-question_label="%(question_label)s" %(optional)s>
%(question)s
"""

TEMPLATE_OPTION = """
<li>%(optiontext)s</li>
"""

TEMPLATE_END = """</ul></div>"""


class PollNode(nodes.General, nodes.Element, RunestoneIdNode):
    pass


# self for these functions is an instance of the writer class.  For example
# in html, self is sphinx.writers.html.SmartyPantsHTMLTranslator
# The node that is passed as a parameter is an instance of our node class.
def visit_poll_html(self, node):
    res = visit_poll_common(self, node)
    addHTMLToDB(
        node["runestone_options"]["divid"], node["runestone_options"]["basecourse"], res
    )
    self.body.append(res)


def visit_poll_xml(self, node):
    html = visit_poll_common(self, node)
    write_substitute(self, node, html)


def depart_poll_html(self, node):
    """ This is called at the start of processing a poll node.  If poll had recursive nodes
        etc and did not want to do all of the processing in visit_poll_html any finishing touches could be
        added here.
    """
    pass


def visit_poll_common(self, node):
    res = TEMPLATE_START
    res = res % node["runestone_options"]

    if node["runestone_options"]["scale"] == "":
        okeys = list(node["runestone_options"].keys())
        okeys.sort()
        i = 1
        for k in okeys:
            if "option_" in k:
                node["runestone_options"]["optiontext"] = (
                    f"{i}. " + node["runestone_options"][k]
                )
                i += 1
                res += TEMPLATE_OPTION % node["runestone_options"]
    else:
        for i in range(node["runestone_options"]["scale"]):
            node["runestone_options"]["optiontext"] = i + 1
            res += TEMPLATE_OPTION % node["runestone_options"]
    res += TEMPLATE_END

    return res


class Poll(RunestoneIdDirective):
    """
.. poll:: identifier
    :scale: <X>  Setting the scale creates an "On a scale of 1 to <X>" type of question
    :allowcomment: Boolean--provides comment box
    :option_1: Providing Question text for each option creates a "Choose one of these options" type of poll.
    :option_2: Option 2
    :option_3: Option 3    ...etc...(Up to 10 options in mode 2)
    :results: One of all, instructor, superuser - who should see results?


config values (conf.py):

- poll_div_class - custom CSS class of the component's outermost div
    """

    required_arguments = 1
    optional_arguments = 0
    has_content = True
    option_spec = RunestoneIdDirective.option_spec.copy()
    option_spec.update(
        {
            "scale": directives.positive_int,
            "allowcomment": directives.flag,
            "option_1": directives.unchanged,
            "option_2": directives.unchanged,
            "option_3": directives.unchanged,
            "option_4": directives.unchanged,
            "option_5": directives.unchanged,
            "option_6": directives.unchanged,
            "option_7": directives.unchanged,
            "option_8": directives.unchanged,
            "option_9": directives.unchanged,
            "option_10": directives.unchanged,
            "results": directives.unchanged,
        }
    )

    def run(self):
        """
            process the multiplechoice directive and generate html for output.
            :param self:
            :return:
            .. poll:: id
                :scale: <X>  Setting the scale creates an "On a scale of 1 to <X>" type of question
                :allowcomment: Boolean--provides comment box
                :option_1: Providing Question text for each option creates a "Choose one of these options" type of poll.
                :option_2: Option 2
                :option_3: Option 3    ...etc...(Up to 10 options in mode 2)
                :results: One of all, instructor, superuser - who should see results?
        """
        super(Poll, self).run()
        addQuestionToDB(self)

        if self.content:
            source = "\n".join(self.content)
        else:
            source = "\n"
        self.options["question"] = source

        if not "scale" in self.options:
            self.options["scale"] = ""
        if "allowcomment" in self.options:
            self.options["comment"] = "data-comment"
        else:
            self.options["comment"] = ""

        if not "results" in self.options:
            self.options["results"] = "instructor"

        env = self.state.document.settings.env
        self.options["divclass"] = env.config.poll_div_class

        poll_node = PollNode()
        poll_node["runestone_options"] = self.options
        poll_node["source"], poll_node["line"] = self.state_machine.get_source_and_line(
            self.lineno
        )
        return [poll_node]
