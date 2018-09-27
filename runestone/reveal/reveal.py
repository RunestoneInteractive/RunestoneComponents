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

from docutils import nodes
from docutils.parsers.rst import directives
from runestone.common.runestonedirective import RunestoneIdDirective, RunestoneNode

#add directives/javascript/css
def setup(app):
    app.add_directive('reveal', RevealDirective)

    app.add_javascript('reveal.js')
    app.add_stylesheet('reveal.css')

    app.add_node(RevealNode, html=(visit_reveal_node, depart_reveal_node))

class RevealNode(nodes.General, nodes.Element, RunestoneNode):
    def __init__(self,content, **kwargs):
        super(RevealNode,self).__init__(**kwargs)
        self.reveal_options = content


def visit_reveal_node(self, node):
#Set options and format templates accordingly

    if 'modal' in node.reveal_options:
        node.reveal_options['modal'] = 'data-modal'
    else:
        node.reveal_options['modal'] = ''

    if 'modaltitle' in node.reveal_options:
        temp = node.reveal_options['modaltitle']
        node.reveal_options['modaltitle'] = '''data-title=''' + '"' + temp + '"'
    else:
        node.reveal_options['modaltitle'] = ''

    res = TEMPLATE_START % node.reveal_options
    self.body.append(res)

def depart_reveal_node(self,node):
#Set options and format templates accordingly
    res = TEMPLATE_END % node.reveal_options

    self.body.append(res)

#Templates to be formatted by node options
TEMPLATE_START = '''
    <div data-component="reveal" id="%(divid)s" %(modal)s %(modaltitle)s %(showtitle)s %(hidetitle)s %(instructoronly)s>
    '''
TEMPLATE_END = '''
    </div>
    '''
class RevealDirective(RunestoneIdDirective):
    """
.. reveal:: identifier
   :showtitle: Text on the 'show' button--default is "Show"
   :hidetitle: Text on the 'hide' button--default is "Hide"
   :modal: Boolean--if included, revealed display will be a modal
   :modaltitle: Title of modal dialog window--default is "Message from the author"

   Content  everything here will be hidden until revealed
   Content  It can be a lot...
    """
    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = True
    has_content = True
    option_spec = RunestoneIdDirective.option_spec.copy()
    option_spec.update({"showtitle":directives.unchanged,
                   "hidetitle":directives.unchanged,
                   "modal":directives.flag,
                   "modaltitle":directives.unchanged,
                   "instructoronly": directives.flag
                   })

    def run(self):
        """
            process the reveal directive and generate html for output.
            :param self:
            :return:
            .. reveal:: identifier
            :showtitle: Text on the 'show' button--default is "Show"
            :hidetitle: Text on the 'hide' button--default is "Hide"
            :modal: Boolean--if included, revealed display will be a modal
            :modaltitle: Title of modal dialog window--default is "Message from the author"
            :instructoronly: only reveal content to instructors

            Content
            ...
            """
        super(RevealDirective, self).run()
        self.assert_has_content() # make sure reveal has something in it

        if not 'showtitle' in self.options:
            self.options['showtitle'] = 'data-showtitle="Show"'
        else:
            self.options['showtitle'] = '''data-showtitle=''' + '"' + self.options['showtitle'] + '"'
        if not 'hidetitle' in self.options:
            self.options['hidetitle'] = 'data-hidetitle="Hide"'
        else:
            self.options['hidetitle'] = '''data-hidetitle=''' + '"' + self.options['hidetitle'] + '"'

        if 'instructoronly' in self.options:
            self.options['instructoronly'] = '''data-instructoronly style="display: none;"'''
        else:
            self.options['instructoronly'] = ""

        reveal_node = RevealNode(self.options, rawsource=self.block_text)
        reveal_node.source, reveal_node.line = self.state_machine.get_source_and_line(self.lineno)

        self.state.nested_parse(self.content, self.content_offset, reveal_node)

        return [reveal_node]
