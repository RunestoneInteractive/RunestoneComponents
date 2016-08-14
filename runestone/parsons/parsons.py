# Copyright (C) 2012  Michael Hewner, Isaiah Mayerchak
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
from runestone.server.componentdb import addQuestionToDB
from runestone.common.runestonedirective import RunestoneDirective

def setup(app):
    app.add_directive('parsonsprob', ParsonsProblem)
    app.add_stylesheet('parsons.css')
    app.add_stylesheet('lib/prettify.css')
    app.add_javascript('lib/prettify.js')
    app.add_javascript('lib/hammer.min.js')
    app.add_javascript('parsons.js')
    app.add_javascript('timedparsons.js')

class ParsonsProblem(Assessment):
    """
.. parsonsprob:: unqiue_problem_id_here
   :maxdist:
   :order:
   :language:
   :noindent:

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
    required_arguments = 1
    optional_arguments = 1
    final_argument_whitespace = False
    option_spec = RunestoneDirective.option_spec.copy()
    option_spec.update({
        'maxdist' : directives.unchanged,
        'order' : directives.unchanged,
        'language' : directives.unchanged,
        'noindent' : directives.flag
    })
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

        addQuestionToDB(self)

        TEMPLATE = '''
    <pre data-component="parsons" id="%(divid)s"%(maxdist)s%(order)s%(noindent)s%(language)s>
        <span data-question>%(qnumber)s: %(instructions)s</span>%(code)s</pre>
    '''
        self.options['divid'] = self.arguments[0]
        self.options['qnumber'] = self.getNumber()
        self.options['instructions'] = ""
        self.options['code'] = self.content
        
        if 'maxdist' in self.options:
            self.options['maxdist'] = ' data-maxdist="' + self.options['maxdist'] + '"'
        else:
            self.options['maxdist'] = ''
        if 'order' in self.options:
            self.options['order'] = ' data-order="' + self.options['order'] + '"'
        else:
            self.options['order'] = ''
        if 'noindent' in self.options:
            self.options['noindent'] = ' data-noindent="true"'
        else:
            self.options['noindent'] = ''
        if 'language' in self.options:
            self.options['language'] = ' data-language="' + self.options['language'] + '"'
        else:
            self.options['language'] = ''
         
          
        if '-----' in self.content:
            index = self.content.index('-----')
            self.options['instructions'] = "\n".join(self.content[:index])
            self.options['code'] = self.content[index + 1:]

        if '=====' in self.options['code']:
            self.options['code'] = "\n".join(self.options['code'])

            self.options['code'] = self.options['code'].replace('=====', '---')
        else:
            self.options['code'] = "\n".join(self.options['code'])

        self.options['divid'] = self.arguments[0]

        self.assert_has_content()
        return [nodes.raw('', TEMPLATE % self.options, format='html')]
