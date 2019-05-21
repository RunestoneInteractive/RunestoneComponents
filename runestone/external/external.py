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

from docutils import nodes
from docutils.parsers.rst import directives
from runestone.server.componentdb import addQuestionToDB, addHTMLToDB
from runestone.common.runestonedirective import RunestoneIdDirective, RunestoneNode

try:
    from html import escape  # py3
except ImportError:
    from cgi import escape  # py2

__author__ = 'jczetta'
# Code template is directly from question.py at the moment, which is (c) Bradley N. Miller.
#This is intended as the basis for a potential new gradeable directive class, still potential TODO.


def setup(app):
    app.add_directive('external', ExternalDirective)

    app.add_node(ExternalNode, html=(visit_external_node, depart_external_node))


class ExternalNode(nodes.General, nodes.Element, RunestoneNode):
    def __init__(self, content, **kwargs):
        super(ExternalNode, self).__init__(**kwargs)
        self.external_options = content


def visit_external_node(self, node):
    # Set options and format templates accordingly
    # env = node.document.settings.env

    node.delimiter = "_start__{}_".format(node.external_options['divid'])

    self.body.append(node.delimiter)

    res = TEMPLATE_START % node.external_options
    self.body.append(res)


def depart_external_node(self, node):
    # Set options and format templates accordingly
    res = TEMPLATE_END % node.external_options

    self.body.append(res)

    addHTMLToDB(node.external_options['divid'],
                node.external_options['basecourse'],
                "".join(""))

    self.body.remove(node.delimiter)

# Templates to be formatted by node options
TEMPLATE_START = '''
    <div data-component="external" class="full-width container external" id="%(divid)s" >
    <li class="alert alert-warning">

    '''
TEMPLATE_END = '''
    </li>
    </div>
    '''


class ExternalDirective(RunestoneIdDirective):
    """
.. external:: identifier

   Content  Everything here is part of the activity
   Content  Can include links...
    """
    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = True
    has_content = True
    option_spec = RunestoneIdDirective.option_spec.copy()
    option_spec.update({'number': directives.positive_int})

    def run(self):
        super(ExternalDirective, self).run()
        addQuestionToDB(self)

        self.assert_has_content()  # make sure activity has something in it

        self.options['name'] = self.arguments[0].strip()

        external_node = ExternalNode(self.options, rawsource=self.block_text)
        external_node.source, external_node.line = self.state_machine.get_source_and_line(self.lineno)
        self.add_name(external_node)

        self.state.nested_parse(self.content, self.content_offset, external_node)

        return [external_node]
