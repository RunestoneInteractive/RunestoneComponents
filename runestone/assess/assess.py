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
__author__ = 'bmiller'

from docutils import nodes
from docutils.parsers.rst import directives
from runestone.common.runestonedirective import RunestoneDirective, RunestoneIdDirective
from .assessbase import Assessment
from .multiplechoice import *
from .timedassessment import *


def setup(app):
    app.add_directive('mchoice', MChoice)
    app.add_directive('mchoicemf', MChoiceMF)
    app.add_directive('mchoicema', MChoiceMA)
    app.add_directive('mchoicerandommf', MChoiceRandomMF)
    app.add_directive('addbutton', AddButton)
    app.add_directive('qnum', QuestionNumber)
    app.add_directive('timed', TimedDirective)

    app.add_config_value('mchoice_div_class', 'runestone alert alert-warning', 'html')

    app.add_autoversioned_javascript('mchoice.js')
    app.add_autoversioned_javascript('timedmc.js')
    app.add_autoversioned_javascript('timed.js')

    app.add_node(TimedNode, html=(visit_timed_node, depart_timed_node))
    app.add_node(MChoiceNode, html=(visit_mc_node, depart_mc_node))

    app.add_node(AnswersBulletList, html=(visit_answers_bullet_node, depart_answers_bullet_node))
    app.add_node(AnswerListItem, html=(visit_answer_list_item, depart_answer_list_item))
    app.add_node(FeedbackBulletList, html=(visit_feedback_bullet_node, depart_feedback_bullet_node))
    app.add_node(FeedbackListItem, html=(visit_feedback_list_item, depart_feedback_list_item))




class AddButton(RunestoneIdDirective):
    required_arguments = 1
    optional_arguments = 1
    final_argument_whitespace = True
    has_content = True

    def run(self):
        """
            :param self:
            :return:
            .. addbutton:: bname

            ...
            """
        super(AddButton, self).run()

        TEMPLATE_START = '''
            <div id="%(divid)s" class="alert alert-warning">
            <form name="%(divid)s_form" method="get" action="" onsubmit="return false;">
            '''

        TEMPLATE_END = '''
            <button class='btn btn-inverse' name="reset" onclick="resetPage('%(divid)s')">Forget My Answers</button>
            </form>
            </div>
            '''

        res = ""
        res = TEMPLATE_START % self.options

        res += TEMPLATE_END % self.options
        rawnode = nodes.raw(self.block_text, res, format='html')
        rawnode.source, rawnode.line = self.state_machine.get_source_and_line(self.lineno)
        return [rawnode]


class QuestionNumber(RunestoneDirective):
    """Set Parameters for Question Numbering
.. qnum::
   'prefix': character prefix before the number
   'suffix': character prefix after the number
   'start': start numbering with this value

.. qnum::
   :prefix: turtle-
   :start: 10
    """
    required_arguments = 0
    optional_arguments = 3
    has_content = False
    option_spec = {'prefix': directives.unchanged,
                   'suffix': directives.unchanged,
                   'start': directives.positive_int
                   }

    def run(self):
        env = self.state.document.settings.env

        if 'start' in self.options:
            env.assesscounter = self.options['start'] - 1

        if 'prefix' in self.options:
            env.assessprefix = self.options['prefix']

        if 'suffix' in self.options:
            env.assesssuffix = self.options['suffix']

        return []
