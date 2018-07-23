# Copyright (C) 2013  Bradley N. Miller, Barabara Ericson
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
from .assessbase import Assessment
from runestone.common.runestonedirective import RunestoneNode, get_node_line
from runestone.server.componentdb import addQuestionToDB, addHTMLToDB


class MChoiceNode(nodes.General, nodes.Element, RunestoneNode):
    def __init__(self, content, **kwargs):
        """

        Arguments:
        - `self`:
        - `content`:
        """
        super(MChoiceNode, self).__init__(**kwargs)
        self.mc_options = content

def visit_mc_node(self,node):

    node.delimiter = "_start__{}_".format(node.mc_options['divid'])
    self.body.append(node.delimiter)

    res = ""
    if 'random' in node.mc_options:
        node.mc_options['random'] = 'data-random'
    else:
        node.mc_options['random'] = ''
    # Use multiple_answers behavior if explicitly required or if multiple correct answers were provided.
    if ('multiple_answers' in node.mc_options) or (',' in node.mc_options['correct']):
        node.mc_options['multipleAnswers'] = 'true'
    else:
        node.mc_options['multipleAnswers'] = 'false'
    res = node.template_start % node.mc_options

    self.body.append(res)

def depart_mc_node(self,node):
    res = ""
    currFeedback = ""
    # Add all of the possible answers
    okeys = list(node.mc_options.keys())
    okeys.sort()
    for k in okeys:
        if 'answer_' in k:
            x,label = k.split('_')
            node.mc_options['alabel'] = label
            node.mc_options['atext'] = node.mc_options[k]
            currFeedback = "feedback_" + label
            node.mc_options['feedtext'] = node.mc_options.get(currFeedback,"") #node.mc_options[currFeedback]
            if label in node.mc_options['correct']:
                node.mc_options["is_correct"] = "data-correct"
            else:
                node.mc_options["is_correct"] = ""
            res += node.template_option % node.mc_options


    res += node.template_end % node.mc_options
    self.body.append(res)

    addHTMLToDB(node.mc_options['divid'],
                node.mc_options['basecourse'],
                "".join(self.body[self.body.index(node.delimiter) + 1:]))

    self.body.remove(node.delimiter)






#####################
# multiple choice question with multiple feedback
# author - Barb Ericson
# author - Anusha
class MChoice(Assessment):
    """
    The syntax for a multiple-choice question is:

    .. mchoice:: uniqueid
        :multiple_answers: [optional]. Implied if ``:correct:`` contains a list.
        :random: [optional]

        The following arguments supply answers and feedback. See below for an alternative method of specification.

        :correct: letter of correct answer or list of correct answer letters (in case of multiple answers)
        :answer_a: possible answer  -- what follows the _ is the answer's label.
        :answer_b: possible answer
        :answer_c: possible answer
        :answer_d: possible answer
        :answer_e: possible answer
        :feedback_a: displayed if a is picked
        :feedback_b: displayed if b is picked
        :feedback_c: displayed if c is picked
        :feedback_d: displayed if d is picked
        :feedback_e: displayed if e is picked

        Question text; this may contain multiple paragraphs with any markup.

        An alternative method of specifying answers and feedback: Place an `unordered list <http://www.sphinx-doc.org/en/stable/rest.html#lists-and-quote-like-blocks>`_ at the end of the question text, in the following format. Note: If your question text happens to end with an unordered list, then place a comment, consisting of a paragraph containing only ``..`` at the end of the list. For example:

        -   This list is still part of the question text.

        ..

        -   Text for answer A.

            Your text may be multiple paragraphs, including `images <http://www.sphinx-doc.org/en/stable/rest.html#images>`_
            and any other `inline <http://www.sphinx-doc.org/en/stable/rest.html#inline-markup>`_ or block markup. For example: :math:`\sqrt(2)/2`. As earlier, if your feedback contains an unordered list, end it with a comment.

            -   For example, this is part of the answer text.

            ..

            +   This is feedback for answer A. This is a correct answer because the bullet is a ``+``.

                This may also span multiple paragraphs and include any markup.
                However, there can be only one item in this unordered list.

        -   Text for answer B.

            -   Feedback for answer B. This is an incorrect answer, because the bullet is not a ``+``.
        -   Text for answer C. Note that the empty line between a sublist and a list may be omitted.

            +   Feedback for answer C, which is a correct answer. However, the empty line is required between a list and a sublist.

        -   ... and so on.

            -   Up to 26 answers and feedback pairs may be provided.

    config values (conf.py): 

    - mchoice_div_class - custom CSS class of the component's outermost div
    """
    required_arguments = 1
    optional_arguments = 1
    final_argument_whitespace = True
    has_content = True
    option_spec = Assessment.option_spec.copy()
    option_spec.update({'answer_a':directives.unchanged,
        'answer_b':directives.unchanged,
        'answer_c':directives.unchanged,
        'answer_d':directives.unchanged,
        'answer_e':directives.unchanged,
        'correct':directives.unchanged,
        'feedback_a':directives.unchanged,
        'feedback_b':directives.unchanged,
        'feedback_c':directives.unchanged,
        'feedback_d':directives.unchanged,
        'feedback_e':directives.unchanged,
        'random':directives.flag,
        'multiple_answers':directives.flag,
    })

    def run(self):
        """
            process the multiplechoice directive and generate html for output.

            :param self:
            :return: An MChoiceNode.
            """

        super(MChoice, self).run()

        TEMPLATE_START = '''
            <div class="%(divclass)s">
            <ul data-component="multiplechoice" data-multipleanswers="%(multipleAnswers)s" %(random)s id="%(divid)s">
            '''

        OPTION = '''
            <li data-component="answer" %(is_correct)s id="%(divid)s_opt_%(alabel)s">%(atext)s</li><li data-component="feedback" id="%(divid)s_opt_%(alabel)s">%(feedtext)s</li>
            '''

        TEMPLATE_END = '''

            </ul>
            </div>
            '''
        addQuestionToDB(self)

        mcNode = MChoiceNode(self.options, rawsource=self.block_text)
        mcNode.source, mcNode.line = self.state_machine.get_source_and_line(self.lineno)
        mcNode.template_start = TEMPLATE_START
        mcNode.template_option = OPTION
        mcNode.template_end = TEMPLATE_END

        # For MChoice its better to insert the qnum into the content before further processing.
        self.updateContent()

        self.state.nested_parse(self.content, self.content_offset, mcNode)
        env = self.state.document.settings.env
        self.options['divclass'] = env.config.mchoice_div_class
        # Expected _`structure`, with assigned variable names and transformations made:
        #
        # .. code-block::
        #   :number-lines:
        #
        #   mcNode = MChoiceNode()
        #       Item 1 of problem text
        #       ...
        #       Item n of problem text
        #       answers_bullet_list = bullet_list() -> AnswersBulletList() <-- last item of mcNode may be a bulleted list of answers and feedback.
        #           answer_list_item = list_item() -> AnswerListItem()
        #               Item 1 of text for answer A
        #               ...
        #               Item n of text for answer A
        #               feedback_bullet_list = bullet_list() -> FeedbackBulletList() <-- last item must be a bulleted list containing feedback.
        #                   feedback_list_item = list_item() -> FeedbackListItem()   <-- A single item in the list, which contains the feedback.
        #           answer_list_item = list_item() -> AnswerListItem()
        #               Item 1 of text for answer B
        #               ...and so on...
        #
        # See if the last item is a list. If so, and questions/answers weren't specified as options, assume it contains questions and answers.
        answers_bullet_list = mcNode[-1] if len(mcNode) else None
        if isinstance(answers_bullet_list, nodes.bullet_list) and ('answer_a' not in self.options and ('correct' not in self.options)):
            # Accumulate the correct answers.
            correct_answers = []

            # Walk it, processing each answer and its associated feedback.
            for answer_list_item in answers_bullet_list:
                assert isinstance(answer_list_item, nodes.list_item)

                # Look for the feedback for this answer -- the last child of this answer list item.
                feedback_bullet_list = answer_list_item[-1]
                if ((not isinstance(feedback_bullet_list, nodes.bullet_list) or
                  # It should have just one item (the feedback itself).
                  (len(feedback_bullet_list) != 1))):
                    raise self.error('On line {}, a single-item list must be nested under each answer.'.format(get_node_line(feedback_bullet_list)))

                # Check for a correct answer.
                feedback_list_item = feedback_bullet_list[0]
                assert isinstance(feedback_list_item, nodes.list_item)
                if feedback_bullet_list['bullet'] == '+':
                    correct_answers.append(chr(answer_list_item.parent.index(answer_list_item) + ord('a')))

                # Change the feedback list item (which is currently a generic list_item) to our special node class (a FeedbackListItem).
                feedback_list_item.replace_self(FeedbackListItem(feedback_list_item.rawsource, *feedback_list_item.children, **feedback_list_item.attributes))

                # Change the feedback bulleted list (currently a bullet_list) to our class (a FeedbackBulletList).
                feedback_bullet_list.replace_self(FeedbackBulletList(feedback_bullet_list.rawsource, *feedback_bullet_list.children, **feedback_bullet_list.attributes))

                # Change the answer list item (currently a list_item) to an AnswerListItem.
                answer_list_item.replace_self(AnswerListItem(answer_list_item.rawsource, *answer_list_item.children, **answer_list_item.attributes))

            # Change the answer bulleted list (currently a bullet_list) to an AnswersBulletList.
            answers_bullet_list.replace_self(AnswersBulletList(answers_bullet_list.rawsource, *answers_bullet_list.children, **answers_bullet_list.attributes))
            # Store the correct answers.
            self.options['correct'] = ','.join(correct_answers)

        # Check that a correct answer was provided.
        if not self.options.get('correct'):
            raise self.error('No correct answer specified.')
        return [mcNode]


# Define a bullet_list which contains answers (see the structure_).
class AnswersBulletList(nodes.bullet_list, RunestoneNode):
    pass

# Define a list_item which contains answers (see the structure_).
class AnswerListItem(nodes.list_item, RunestoneNode):
    pass

# Define a bullet_list which contains feedback (see the structure_).
class FeedbackBulletList(nodes.bullet_list, RunestoneNode):
    pass

# Define a list_item which contains answers (see the structure_).
class FeedbackListItem(nodes.list_item, RunestoneNode):
    pass

# The ``<ul>`` tag will be generated already -- don't output it.
def visit_answers_bullet_node(self, node):
    # Prevent the list items, which are wrapped in ``<paragraph>`` tags, from emitting the ``<p>``. See similar code in ``docutils.writers._html_base.HTMLTranslator.visit_bullet_list`` and its use in ``docutils.writer.html4css1.HTMLTranslator.visit_paragraph``.
    self.context.append((self.compact_simple, self.compact_p))
    self.compact_p = None
    self.compact_simple = True

# The ``</ul>`` tag will be generated already -- don't output it.
def depart_answers_bullet_node(self, node):
    # Restore the state modified in ``visit_answers_bullet_node``.
    self.compact_simple, self.compact_p = self.context.pop()

# Write out the special attributes needed by the ``<li>`` tag.
def visit_answer_list_item(self, node):
    # See the structure_.
    mcNode = node.parent.parent

    # _`label`: Turn the index of this item in the answer_bullet_list (see structure_) into a letter.
    label = chr(node.parent.index(node) + ord('a'))
    # Update dict for formatting the HTML.
    mcNode.mc_options['alabel'] = label
    if label in mcNode.mc_options['correct']:
        mcNode.mc_options['is_correct'] = 'data-correct'
    else:
        mcNode.mc_options['is_correct'] = ''

    # Format the HTML.
    self.body.append('<li data-component="answer" %(is_correct)s id="%(divid)s_opt_%(alabel)s">' % mcNode.mc_options)

# Although the feedback for an answer is given as a sublist, the HTML is just a list. So, let the feedback list item close this list.
def depart_answer_list_item(self, node):
    pass

# Nothing to output, since feedback isn't nested under an answer in the HTML.
def visit_feedback_bullet_node(self, node):
    pass

# Nothing to output, since feedback isn't nested under an answer in the HTML.
def depart_feedback_bullet_node(self, node):
    pass

def visit_feedback_list_item(self, node):
    # See label_ and structure_.
    answer_list_item = node.parent.parent
    mcNode = answer_list_item.parent.parent
    label = chr(answer_list_item.parent.index(answer_list_item) + ord('a'))
    mcNode.mc_options['alabel'] = label
    self.body.append('</li><li data-component="feedback" id="%(divid)s_opt_%(alabel)s">\n' % mcNode.mc_options)

def depart_feedback_list_item(self, node):
    self.body.append('</li>')



#backwards compatibility
class MChoiceMF(MChoice):
    def run(self):
        raise self.error("This directive has been depreciated. Please convert to the new directive 'mchoice'")
        mcmfNode = super(MChoiceMF,self).run()[0]

        return [mcmfNode]

class MChoiceMA(MChoice):
    def run(self):
        self.options['multiple_answers'] = 'multipleAnswers'
        raise self.error("This directive has been depreciated. Please convert to the new directive 'mchoice'")
        mchoicemaNode = super(MChoiceMA,self).run()[0]

        return [mchoicemaNode]

class MChoiceRandomMF(MChoice):
    def run(self):
        self.options['random'] = 'random'
        raise self.error("This directive has been depreciated. Please convert to the new directive 'mchoice'")
        mchoicerandommfNode = super(MChoiceRandomMF,self).run()[0]

        return[mchoicerandommfNode]
