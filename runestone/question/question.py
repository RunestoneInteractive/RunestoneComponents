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
from runestone.common.runestonedirective import RunestoneIdDirective, RunestoneNode

__author__ = 'bmiller'


def setup(app):
    app.add_directive('question', QuestionDirective)

    app.add_node(QuestionNode, html=(visit_question_node, depart_question_node))


class QuestionNode(nodes.General, nodes.Element, RunestoneNode):
    def __init__(self, content, **kwargs):
        super(QuestionNode, self).__init__(**kwargs)
        self.question_options = content


def visit_question_node(self, node):
    # Set options and format templates accordingly
    env = node.document.settings.env
    if not hasattr(env, 'questioncounter'):
        env.questioncounter = 0

    if 'number' in node.question_options:
        env.questioncounter = int(node.question_options['number'])
    else:
        env.questioncounter += 1

    node.question_options['number'] = 'start={}'.format(env.questioncounter)

    res = TEMPLATE_START % node.question_options
    self.body.append(res)


def depart_question_node(self, node):
    # Set options and format templates accordingly
    res = TEMPLATE_END % node.question_options
    delimiter = "_start__{}_".format(node.question_options['divid'])

    self.body.append(res)


# Templates to be formatted by node options
TEMPLATE_START = '''
    <div data-component="question" class="full-width container question" id="%(divid)s" >
    <ol %(number)s class=arabic><li class="alert alert-warning">

    '''
TEMPLATE_END = '''
    </li></ol>
    </div>
    '''


class QuestionDirective(RunestoneIdDirective):
    """
.. question:: identifier
   :number: Force a number for this question

   Content  everything here is part of the question
   Content  It can be a lot...
    """
    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = True
    has_content = True
    option_spec = RunestoneIdDirective.option_spec.copy()
    option_spec.update({'number': directives.positive_int})

    def run(self):
        super(QuestionDirective, self).run()
        self.assert_has_content()  # make sure question has something in it

        self.options['name'] = self.arguments[0].strip()

        question_node = QuestionNode(self.options, rawsource=self.block_text)
        question_node.source, question_node.line = self.state_machine.get_source_and_line(self.lineno)
        self.add_name(question_node)

        self.state.nested_parse(self.content, self.content_offset, question_node)

        return [question_node]
