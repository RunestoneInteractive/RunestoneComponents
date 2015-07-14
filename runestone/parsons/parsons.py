# Copyright (C) 2012  Michael Hewner
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

import re
from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
from runestone.assess import Assessment


def setup(app):
    app.add_directive('parsonsprob', ParsonsProblem)

    app.add_stylesheet('parsons.css')
    app.add_stylesheet('lib/prettify.css')

    app.add_node(ParsonsNode, html=(visit_prs_node, depart_prs_node))

    # includes parsons specific javascript headers
    # parsons-noconflict reverts underscore and
    # jquery to their original versions
    app.add_javascript('lib/prettify.js')
    app.add_javascript('lib/underscore-min.js')
    app.add_javascript('lib/lis.js')
    app.add_javascript('parsons.js')
    app.add_javascript('parsonsaux.js')


TEMPLATE = '''
    <pre data-component="parsons" id="%(divid)s">
        <span data-question>%(qnumber)s: %(instructions)s</span>%(code)s</pre>
    '''

class ParsonsNode(nodes.General, nodes.Element):
    def __init__(self,content):
        """
        Arguments:
        - `self`:
        - `content`:
        """
        super(ParsonsNode,self).__init__()
        self.prs_options = content

def visit_prs_node(self,node):
    res = TEMPLATE % node.prs_options

    self.body.append(res)

def depart_prs_node(self,node):
    ''' This is called at the start of processing an datafile node. If parsons had recursive nodes
        etc and did not want to do all of the processing in visit_prs_node any finishing touches could be
        added here.
    '''
    pass

class ParsonsProblem(Assessment):
    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = False
    option_spec = {}
    has_content = True

    def run(self):
        """
   Instructions for solving the problem should be written and then a line with -----
   signals the beginning of the code.  If you want more than one line in a single
   code block, seperate your code blocks with =====.
   Both the instructions sections and code blocks are optional. If you don't include any
   =====, the code will assume you want each line to be its own code block.
Example:
.. parsonsprob:: unqiue_problem_id_here
   Solve my really cool parsons problem...if you can.
   -----
   def findmax(alist):
   =====
      if len(alist) == 0:
         return None
   =====
      curmax = alist[0]
      for item in alist:
   =====
         if item &gt; curmax:
   =====
            curmax = item
   =====
      return curmax
        """
        self.options['divid'] = self.arguments[0]
        self.options['qnumber'] = self.getNumber()
        self.options['instructions'] = ""
        self.options['code'] = self.content

        if '-----' in self.content:
            index = self.content.index('-----')
            self.options['instructions'] = "\n".join(self.content[:index])
            self.options['code'] = self.content[index + 1:]

        if '=====' in self.options['code']:
            self.options['code'] = self.options['code'].replace('====', '---')
        else:
            self.options['code'] = "\n".join(self.options['code'])

        self.options['divid'] = self.arguments[0]
        print(self.options)

        self.assert_has_content()
        return [ParsonsNode(self.options)]
