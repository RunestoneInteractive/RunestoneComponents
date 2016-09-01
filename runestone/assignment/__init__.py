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
from docutils.parsers.rst import Directive
from runestone.server.componentdb import addAssignmentToDB, addAssignmentQuestionToDB, getCourseID, getOrCreateAssignmentType, getQuestionID
from runestone.common.runestonedirective import RunestoneDirective
from datetime import datetime

def setup(app):
    app.add_directive('assignment',Assignment)

    app.connect('doctree-resolved',process_nodes)
    app.connect('env-purge-doc', purge)

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
        'points':directives.positive_int
    })

    def run(self):
        """
            .. assignment:
                :name: Problem Set 1
                :assignment_type: formative
                :questions: (divid_1 50), (divid_2 100), ...
                :deadline: 23-09-2016 15:30
                :points: integer
        """

        course_name = self.state.document.settings.env.config.html_context['course_id']
        self.options['course_name'] = course_name
        course_id = getCourseID(course_name)
        basecourse_name = self.state.document.settings.env.config.html_context.get('basecourse', "unknown")

        name = self.options.get('name') # required; error if missing
        assignment_type_name = self.options.get('assignment_type')
        assignment_type_id = getOrCreateAssignmentType(assignment_type_name)

        if 'deadline' in self.options:
            deadline = datetime.strptime(self.options['deadline'], '%Y-%m-%d %H:%M')
        else:
            deadline = None
        points = self.options.get('points', 0)

        assignment_id = addAssignmentToDB(name = name,
                          course_id = course_id,
                          assignment_type_id = assignment_type_id,
                          deadline = deadline,
                          points = points)

        unparsed = self.options.get('questions', None)
        if unparsed:
            q_strings = unparsed.split(',')
            for q in q_strings:
                (question_name, points) = q.strip().split()

                # first get the question_id associated with question_name
                question_id = getQuestionID(basecourse_name, question_name)
                if question_id:
                    addAssignmentQuestionToDB(question_id, assignment_id, points)
                else:
                    raise self.warn("Question {} is not in the database for basecourse {}".format(question_name, basecourse_name))
        else:
            raise self.warn("No questions for assignment {}".format(name))

        return []
