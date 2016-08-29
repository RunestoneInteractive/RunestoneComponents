# Copyright (C) 2016  Bradley N. Miller
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
__author__ = 'jczetta'
# Most of the code from question.py and shortanswer.py, (c) Bradley N. Miller.
import os

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
from runestone.assess import Assessment
from runestone.server.componentdb import addQuestionToDB, addHTMLToDB
from runestone.common.runestonedirective import RunestoneDirective
try:
    from html import escape  # py3
except ImportError:
    from cgi import escape  # py2

def setup(app):
    app.add_directive('external', ExternalDirective)
    app.add_node(ExternalNode, html=(visit_external_node, depart_external_node))

# NOTE: This external questions directive is intended for pointing students to external exercises, yet still linking the instructions to a grade. There is no autograde capability, because the activity is entiely external to the textbook. 
# This directive and activecode by extension may be used as tpls during a refactor of a base class -> using inheritance in gradable directives. That's still a potential TODO.

TEXT = """
<p data-component="external" id=%(divid)s %(optional)s> %(content)s</p>
"""

class ExternalNode(nodes.General, nodes.Element):
    def __init__(self, options):
        super(ExternalNode, self).__init__()
        self.external_options = options

def visit_external_node(self, node):
    div_id = node.external_options['divid']
    components = dict(node.external_options)
    components.update({'divid': div_id})
    res = TEXT % components
    addHTMLToDB(div_id, components['basecourse'], res)

    self.body.append(res)

def depart_external_node(self,node):
    pass


class ExternalDirective(RunestoneDirective):
    """
.. external:: uniqueid

   text of the question goes here
    """
    required_arguments = 1  # the div id
    optional_arguments = 0
    final_argument_whitespace = True
    has_content = True
    option_spec = RunestoneDirective.option_spec.copy()
    option_spec.update({'optional': directives.flag})

    node_class = ExternalNode

    # This run method is also meant to be the basis for a class to be inherited from. We can build up from here, and continue to remove all unnecessary things.
    def run(self):
        # Raise an error if the directive does not have contents.
        self.assert_has_content()
        addQuestionToDB(self)
        # keeping the optional for now in case we want to use that designation for grading
        self.options['optional'] = 'data-optional' if 'optional' in self.options else '' # May be useful
        self.options['divid'] = self.arguments[0]
        self.options['content'] = "<p>".join(self.content)
    
        external_node = ExternalNode(self.options)

        return [external_node]
