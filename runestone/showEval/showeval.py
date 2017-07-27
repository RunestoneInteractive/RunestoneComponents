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
    app.add_directive('showeval', showEval)
    app.add_javascript('showEval.js')
    app.add_javascript('jquery-1.11.1.min.js')

CODE = """\
<div data-childcomponent="%(divid)s" class="runestone explainer alert alert-warning">
    <button class="btn btn-success run-button" id="nextStep">Next Step</button>
    <button class="btn btn-default" id ="reset">Reset</button>
    <div id="%(divid)s"></div>
</div>
"""

INLINE = """\
<script>
    $(document).ready(function() {
      steps = [%(steps)s];
      s = new SHOWEVAL.ShowEval($('#showeval'), steps, %(shouldTrace)s);
      s.setNextButton('#nextStep');
      s.setResetButton('#reset');
    });
</script>
"""

class ShowEval(RunestoneDirective):
    """
.. showeval:: unique_id_goes_here
   :trace_mode: boolean  <- Required option that enables 'Trace Mode'

   ~~Prerequisite Information~~

   -----

   ~~Steps~~

    """
    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = True
    has_content = True
    option_spec = {'trace_mode':directives.flag}

    def run(self):
        """
        All prerequisite information that should be displayed above the directive,
        such as variable declaration, are separated from the step strings by "-----".

        The step animations follow the "-----" and are written one per line. Use
        "{{" and "}}" braces to surround the part of the line that should be replaced,
        followed by the replacement text also in "{{" and "}}".

    Example:

    .. showeval:: showEval_0
       :trace_mode: False

       eggs = ['dogs', 'cats', 'moose']
       -----

       ''.join({{eggs}}{{['dogs', 'cats', 'moose']}}).upper().join(eggs)
       {{''.join(['dogs', 'cats', 'moose'])}}{{'dogscatsmoose'}}.upper().join(eggs)
       {{'dogscatsmoose'.upper()}}{{'DOGSCATSMOOSE'}}.join(eggs)
       'DOGSCATSMOOSE'.join({{eggs}}{{['dogs', 'cats', 'moose']}})
       {{'DOGSCATSMOOSE'.join(['dogs', 'cats', 'moose'])}}{{'dogsDOGSCATSMOOSEcatsDOGSCATSMOOSEmoose'}}

        """


        addQuestionToDB(self)

        self.options['divid'] = self.arguments[0]
        if self.options['replace'] == True:
            code
