# Copyright (C) 2017  Tyler Conzett
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
__author__ = 'tconzett'

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
from runestone.server.componentdb import addQuestionToDB, addHTMLToDB
from runestone.common.runestonedirective import RunestoneDirective

def setup(app):
    app.add_directive('showeval', ShowEval)
    app.add_javascript('showEval.js')
    app.add_stylesheet('showEval.css')

CODE = """\
<div data-childcomponent="showeval" class="runestone explainer alert alert-warning">
    <button class="btn btn-success" id="%(divid)s_nextStep">Next Step</button>
    <button class="btn btn-default" id ="%(divid)s_reset">Reset</button>
    <div class="evalCont" style="background-color: #FDFDFD;">%(preReqLines)s</div>
    <div class="evalCont" id="%(divid)s" class="evalCont"></div>
</div>
"""

SCRIPT = """\
<script>
    $(document).ready(function() {
      steps = %(steps)s;
      %(divid)s_object = new SHOWEVAL.ShowEval($('#%(divid)s'), steps, %(trace_mode)s);
      %(divid)s_object.setNextButton('#%(divid)s_nextStep');
      %(divid)s_object.setResetButton('#%(divid)s_reset');
    });
</script>
"""

class ShowEval(RunestoneDirective):
    """
.. showeval:: unique_id_goes_here
   :trace_mode: boolean  <- Required option that enables 'Trace Mode'

   ~~Prerequisite Information~~

   ~~~~

   ~~Steps~~

    """
    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = True
    has_content = True
    option_spec = {'trace_mode':directives.unchanged_required}

    def run(self):
        """
        All prerequisite information that should be displayed above the directive,
        such as variable declaration, are separated from the step strings by "-----".

        The step animations follow the "-----" and are written one per line. Use
        "{{" and "}}" braces to surround the part of the line that should be replaced,
        followed by the replacement text also in "{{" and "}}".

    Example:

    .. showeval:: showEval_0
       :trace_mode: false

       eggs = ['dogs', 'cats', 'moose']
       ~~~~

       ''.join({{eggs}}{{['dogs', 'cats', 'moose']}}).upper().join(eggs)
       {{''.join(['dogs', 'cats', 'moose'])}}{{'dogscatsmoose'}}.upper().join(eggs)
       {{'dogscatsmoose'.upper()}}{{'DOGSCATSMOOSE'}}.join(eggs)
       'DOGSCATSMOOSE'.join({{eggs}}{{['dogs', 'cats', 'moose']}})
       {{'DOGSCATSMOOSE'.join(['dogs', 'cats', 'moose'])}}{{'dogsDOGSCATSMOOSEcatsDOGSCATSMOOSEmoose'}}

        """

        addQuestionToDB(self)

        self.options['divid'] = self.arguments[0]
        self.options['trace_mode'] = self.options['trace_mode'].lower()
        self.options['preReqLines'] = ''
        self.options['steps'] = []

        step = False
        count = 0
        for line in self.content:
            if step == True:
                if line != '':
                    self.options['steps'].append(str(line))
            elif '~~~~' in line:
                step = True
            else:
                self.options['preReqLines'] += line + '<br />\n'


        res = (CODE + SCRIPT) % self.options

        addHTMLToDB(self.options['divid'], self.options['basecourse'], res)
        return [nodes.raw(self.block_text, res, format='html')]
