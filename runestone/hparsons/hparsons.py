# *********
# |docname|
# *********
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
__author__ = "bmiller"

from docutils import nodes
from docutils.parsers.rst import directives
from sqlalchemy import Table
from runestone.server.componentdb import (
    addQuestionToDB,
    addHTMLToDB,
    maybeAddToAssignment,
)
from runestone.common.runestonedirective import (
    RunestoneIdDirective,
    RunestoneIdNode,
)

def setup(app):
    app.add_directive("hparsons", HParsonsDirective)
    app.add_node(HParsonsNode, html=(visit_hp_html, depart_hp_html))


TEMPLATE_START = """
<div>
<div data-component="hparsons" id=%(divid)s data-question_label="%(question_label)s" class="alert alert-warning hparsons_section">
<div class="hp_question col-md-12">
"""

TEMPLATE_END = """
</div>
<div class='hparsons'></div>
<textarea
    %(language)s
    %(optional)s
    %(dburl)s
    %(reuse)s
    %(randomize)s
    %(blockanswer)s
    style="visibility: hidden;">
%(initialsetting)s
</textarea>
</div>
</div>
"""


class HParsonsNode(nodes.General, nodes.Element, RunestoneIdNode):
    pass


# self for these functions is an instance of the writer class.  For example
# in html, self is sphinx.writers.html.SmartyPantsHTMLTranslator
# The node that is passed as a parameter is an instance of our node class.
def visit_hp_html(self, node):

    node["delimiter"] = "_start__{}_".format(node["runestone_options"]["divid"])

    self.body.append(node["delimiter"])

    res = TEMPLATE_START % node["runestone_options"]
    self.body.append(res)


def depart_hp_html(self, node):
    res = TEMPLATE_END % node["runestone_options"]
    self.body.append(res)

    addHTMLToDB(
        node["runestone_options"]["divid"],
        node["runestone_options"]["basecourse"],
        "".join(self.body[self.body.index(node["delimiter"]) + 1 :]),
    )

    self.body.remove(node["delimiter"])


class HParsonsDirective(RunestoneIdDirective):
    """
    .. hparsons:: uniqueid
       :language: python, java, javscript, sql, html: only for highlighting purpose.
       :dburl: only for sql -- url to load database
       :randomize: randomize the order of horizontal parsons
       :reuse: only for parsons -- make the blocks reusable
       :blockanswer: 0 1 2 3 # Provide answer for block-based feedback. Please note that the number of block start from 0. If not provided, will use execution based feedback.

        Here is the problem description. It must ends with the tildes.
        Make sure you use the correct delimitier for each section below.
        ~~~~
        --blocks--
        block 1
        block 2
        block 3
        --unittest--
        assert 1,1 == world
        assert 0,1 == hello
        assert 2,1 == 42
    """

    required_arguments = 1
    optional_arguments = 1
    has_content = True
    option_spec = RunestoneIdDirective.option_spec.copy()
    option_spec.update(
        {
            "dburl": directives.unchanged,
            "language": directives.unchanged,
            "reuse": directives.flag,
            "randomize": directives.flag,
            "blockanswer": directives.unchanged,
        }
    )

    def run(self):
        super(HParsonsDirective, self).run()
        addQuestionToDB(self)

        env = self.state.document.settings.env

        if "language" in self.options:
            self.options["language"] = "data-language='{}'".format(self.options["language"])
        else:
            self.options["language"] = ""

        if "reuse" in self.options:
            self.options['reuse'] = ' data-reuse="true"'
        else:
            self.options['reuse'] = ''

        if "randomize" in self.options:
            self.options['randomize'] = ' data-randomize="true"'
        else:
            self.options['randomize'] = ''

        if "blockanswer" in self.options:
            self.options["blockanswer"] = "data-blockanswer='{}'".format(self.options["blockanswer"])
        else:
            self.options['blockanswer'] = ''

        explain_text = None
        if self.content:
            if "~~~~" in self.content:
                idx = self.content.index("~~~~")
                explain_text = self.content[:idx]
                self.content = self.content[idx + 1 :]
            source = "\n".join(self.content)
        else:
            source = "\n"

        self.explain_text = explain_text or ["Not an Exercise"]

        self.options["initialsetting"] = source

        # SQL Options
        if "dburl" in self.options:
            self.options["dburl"] = "data-dburl='{}'".format(self.options["dburl"])
        else:
            self.options["dburl"] = ""

        course_name = env.config.html_context["course_id"]
        divid = self.options["divid"]

        hpnode = HParsonsNode()
        hpnode["runestone_options"] = self.options
        hpnode["source"], hpnode["line"] = self.state_machine.get_source_and_line(self.lineno)
        self.add_name(hpnode)  # make this divid available as a target for :ref:

        maybeAddToAssignment(self)
        if explain_text:
            self.updateContent()
            self.state.nested_parse(explain_text, self.content_offset, hpnode)

        return [hpnode]
