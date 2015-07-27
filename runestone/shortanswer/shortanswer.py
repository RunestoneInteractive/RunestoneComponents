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
__author__ = 'isaiahmayerchak'
#acbart did most of this code, I mostly just changed the template
import os

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
from runestone.assess import Assessment

def setup(app):
    app.add_directive('shortanswer', JournalDirective)

    app.add_node(JournalNode, html=(visit_journal_node, depart_journal_node))

    app.add_javascript('shortanswer.js')


TEXT = """
<p data-component="shortanswer" id=%(divid)s %(optional)s>%(qnum)s: %(content)s</p>
"""

class JournalNode(nodes.General, nodes.Element):
    def __init__(self, options):
        super(JournalNode, self).__init__()
        self.journalnode_components = options

def visit_journal_node(self, node):
    div_id = node.journalnode_components['divid']
    back, subchapter = os.path.split(os.path.splitext(node.source.lower())[0])
    back, chapter = os.path.split(back)
    content = ''
    components = dict(node.journalnode_components)
    components.update({'divid': div_id,
                       'subchapter': subchapter,
                       'chapter': chapter})
    res = TEXT % components
    self.body.append(res)

def depart_journal_node(self,node):
    pass


class JournalDirective(Assessment):
    required_arguments = 1  # the div id
    optional_arguments = 0
    final_argument_whitespace = True
    has_content = True
    option_spec = {'optional': directives.flag}

    node_class = JournalNode

    def run(self):
        # Raise an error if the directive does not have contents.

        self.assert_has_content()

        self.options['optional'] = 'data-optional' if 'optional' in self.options else ''
        self.options['divid'] = self.arguments[0]
        self.options['content'] = "<p>".join(self.content)
        self.options['qnum'] = self.getNumber()
        journal_node = JournalNode(self.options)

        return [journal_node]
