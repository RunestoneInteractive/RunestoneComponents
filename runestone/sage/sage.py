# *********
# |docname|
# *********
# Copyright (C) 2021  Bradley N. Miller
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
    get_engine_meta,
    maybeAddToAssignment,
)
from runestone.common.runestonedirective import (
    RunestoneIdDirective,
    RunestoneIdNode,
)

TEMPLATE_START = """
<div id={divid} data-component="sage" class="runestone">
    <div class="runestone-sage">
    <script type="text/x-sage">{initialcode}</script>
    </div>
"""

TEMPLATE_END = """
</div>
"""


def setup(app):
    app.add_directive("sage", ActiveCodeSage)
#    app.add_javascript('http://localhost:8888/static/embedded_sagecell.js')
#    app.add_javascript('https://sagecell.sagemath.org/static/embedded_sagecell.js')
    app.add_node(SageNode, html=(visit_sage_node, depart_sage_node))


class SageNode(nodes.General, nodes.Element, RunestoneIdNode):
    def __init__(self, content, **kwargs):
        """

        Arguments:
        - `self`:
        - `content`:
        """
        super(SageNode, self).__init__(name=content["name"], **kwargs)
        self.runestone_options = content


def visit_sage_node(self, node):
    start = TEMPLATE_START.format(**node.runestone_options)
    self.body.append(start)

def depart_sage_node(self,node):
    self.body.append(TEMPLATE_END)

class ActiveCodeSage(RunestoneIdDirective):
    required_arguments = 1
    optional_arguments = 0
    has_content = True
    option_spec = RunestoneIdDirective.option_spec.copy()



    def run(self):
        super(ActiveCodeSage, self).run()

        env = self.state.document.settings.env

        self.options["initialcode"] = "\n".join(self.content)
        self.options["name"] = self.arguments[0].strip()
        sagenode = SageNode(self.options, rawsource=self.block_text)

        return [sagenode]


