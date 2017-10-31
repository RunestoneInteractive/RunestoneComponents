# Copyright (C) 2015  Paul Resnick
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
from __future__ import print_function

__author__ = 'Paul Resnick'

from docutils import nodes
from docutils.parsers.rst import directives
from runestone.server.componentdb import addAssignmentToDB, addAssignmentQuestionToDB, getCourseID, getOrCreateAssignmentType, getQuestionID, get_HTML_from_DB
from runestone.common.runestonedirective import RunestoneDirective, RunestoneNode
from datetime import datetime

def setup(app):
    app.add_directive('assignment',Assignment)
    app.add_node(AssignmentNode, html=(visit_a_node, depart_a_node))

    app.connect('doctree-resolved',process_nodes)
    app.connect('env-purge-doc', purge)

class AssignmentNode(nodes.General, nodes.Element, RunestoneNode):
    def __init__(self, content, **kwargs):
        """

        Arguments:
        - `self`:
        - `content`:
        """
        super(AssignmentNode, self).__init__(name=content['name'], **kwargs)
        self.a_components = content


def visit_a_node(self, node):
    pass

def depart_a_node(self, node):
    question_ids = node.a_components['question_ids']
    basecourse = node.a_components['basecourse']
    for q_id in question_ids:
        src = get_HTML_from_DB(q_id, basecourse)
        if src:
            self.body.append(src)
        else:
            self.body.append("<p>Missing HTML source for {}</p>".format(q_id))
            print("No HTML source saved for {}; can't include that kind of question until code writing to HTML is implemented for that directive".format(q_id))

def process_nodes(app,env,docname):
    pass


def purge(app,env,docname):
    pass



class Assignment(RunestoneDirective):
    """
        .. assignment:
            :name: Problem Set 1
            :assignment_type: formative
            :questions: (divid_1 50), (divid_2 100), ...
            :deadline: 23-09-2016 15:30
            :points: integer
    """
    required_arguments = 0 # not a sphinx_id for these; just a name parameter
    optional_arguments = 0
    has_content = False
    option_spec = RunestoneDirective.option_spec.copy()
    option_spec.update({
        'name': directives.unchanged,
        'assignment_type': directives.unchanged,
        'questions': directives.unchanged,
        'deadline':directives.unchanged,
        'points':directives.positive_int,
        'threshold': directives.positive_int,
        'autograde': directives.unchanged,
        'generate_html': directives.flag
    })

    def run(self):
        """
            .. assignment:
                :name: Problem Set 1
                :assignment_type: formative
                :questions: (divid_1 50), (divid_2 100), ...
                :deadline: 23-09-2016 15:30
                :points: integer
                :threshold: integer
                :autograde: visited
                :generate_html:
        """

        course_name = self.state.document.settings.env.config.html_context['course_id']
        self.options['course_name'] = course_name

        ## No longer doing DB operations
        # course_id = getCourseID(course_name)
        # basecourse_name = self.state.document.settings.env.config.html_context.get('basecourse', "unknown")
        # self.options['basecourse'] = self.state.document.settings.env.config.html_context.get('basecourse', "unknown")

        name = self.options.get('name') # required; error if missing
        # assignment_type_name = self.options.get('assignment_type')
        # assignment_type_id = getOrCreateAssignmentType(assignment_type_name)
        #
        # deadline = None
        #
        # if 'deadline' in self.options:
        #     try:
        #         deadline = datetime.strptime(self.options['deadline'], '%Y-%m-%d %H:%M')
        #     except:
        #         try:
        #             deadline = datetime.strptime(self.options['deadline'], '%Y-%m-%d %H:%M:%S')
        #             self.state.document.settings.env.warn(self.state.document.settings.env.docname, "deadline not in preferred format %Y-%m-%d %H:%M but accepting alternate format with seconds")
        #         except:
        #             self.state.document.settings.env.warn(self.state.document.settings.env.docname, "deadline missing or incorrectly formatted; Omitting deadline")
        #
        # points = self.options.get('points', 0)
        # threshold = self.options.get('threshold', None)
        # if threshold:
        #     threshold = int(threshold)
        # autograde = self.options.get('autograde', None)
        #
        # assignment_id = addAssignmentToDB(name = name,
        #                   course_id = course_id,
        #                   assignment_type_id = assignment_type_id,
        #                   deadline = deadline,
        #                   points = points)

        unparsed = self.options.get('questions', None)
        question_names = []
        if unparsed:
            q_strings = unparsed.split(',')
            for q in q_strings:
                (question_name, points) = q.strip().split()
                question_names.append(question_name)
                # first get the question_id associated with question_name
                # question_id = getQuestionID(basecourse_name, question_name)
                # if question_id:
                #     addAssignmentQuestionToDB(question_id, assignment_id, points, autograde = autograde)
                # else:
                #     self.state.document.settings.env.warn(self.state.document.settings.env.docname, "Question {} is not in the database for basecourse {}".format(question_name, basecourse_name))
        else:
            self.state.document.settings.env.warn(self.state.document.settings.env.docname, "No questions for assignment {}".format(name))
        self.options['question_ids'] = question_names

        if 'generate_html' in self.options:
            assignment_node = AssignmentNode(self.options, rawsource=self.block_text)
            assignment_node.source, assignment_node.line = self.state_machine.get_source_and_line(self.lineno)
            return [assignment_node]
        else:
            return []
