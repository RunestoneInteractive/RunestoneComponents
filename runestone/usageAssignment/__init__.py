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
from sqlalchemy import create_engine, Table, MetaData, select, delete
from sqlalchemy.orm import sessionmaker
from runestone.common.runestonedirective import RunestoneDirective
from runestone.server.componentdb import addAssignmentToDB, getOrCreateAssignmentType, getCourseID, addAssignmentQuestionToDB, getOrInsertQuestionForPage
from datetime import datetime
from collections import OrderedDict
import os

def setup(app):
    app.add_directive('usageassignment',usageAssignment)

    app.add_node(usageAssignmentNode, html=(visit_ua_node, depart_ua_node))

    app.connect('doctree-resolved',process_nodes)
    app.connect('env-purge-doc', purge)

class usageAssignmentNode(nodes.General, nodes.Element):
    def __init__(self,content):
        """
        Arguments:
        - `self`:
        - `content`:
        """
        super(usageAssignmentNode,self).__init__()
        self.ua_content = content

# self for these functions is an instance of the writer class.  For example
# in html, self is sphinx.writers.html.SmartyPantsHTMLTranslator
# The node that is passed as a parameter is an instance of our node class.
def visit_ua_node(self,node):
    try:
        course_name = node.ua_content['course_name']
        chapter_data = node.ua_content['chapter_data']
    except:
        course_name = None
        chapter_data = None

    s = ""
    chapters_and_subchapters = OrderedDict()
    if chapter_data and course_name:
        for d in chapter_data: # Set up Chapter-Subchs dictionary
            ch_name, sub_chs = d['ch'], d['sub_chs']
            if d['ch'] not in chapters_and_subchapters:
                chapters_and_subchapters[d['ch']] = d['sub_chs']
            else:
                # The order matters with respect to the list wherein they're added to the dictionary. 
                for subch in d['sub_chs']:
                    chapters_and_subchapters[d['ch']].append(subch)

        for ch_name,sub_chs in chapters_and_subchapters.items():
            s += '<div style="margin-left:150px;" class="panel-heading">'
            s += ch_name
            s += '<ul class="list-group">'
            for sub_ch_name in sub_chs:
                s += '<li class="simple">'
                s += '<a href = "/runestone/static/%s/%s/%s.html">%s</a>' % (course_name, ch_name, sub_ch_name, sub_ch_name)
                s += '</li>'
            s += '</ul>'
            s += '</div>'

    # is this needed?? 
    s = s.replace("u'","'")  # hack:  there must be a better way to include the list and avoid unicode strings

    self.body.append(s)

def depart_ua_node(self,node):
    ''' This is called at the start of processing a ua node.  If ua had recursive nodes
        etc and did not want to do all of the processing in visit_ua_node any finishing touches could be
        added here.
    '''
    pass


def process_nodes(app,env,docname):
    pass


def purge(app,env,docname):
    pass


class usageAssignment(Directive):
    """
.. usageassignment:: prep_1
   :chapters: chap_name1[, chapname2]*
   :subchapters: subchapter_name[, subchaptername2]*
   :assignment_name: <str>
   :assignment_type: <int id of the assignment type object; kind of a hack>
   :deadline: <str>
   :sections: <comma separated int ids of the section objects; kind of a hack>
   :pct_required: <int>   :points: <int>

    """
    required_arguments = 0  # use assignment_name parameter
    optional_arguments = 0
    has_content = False
    option_spec = RunestoneDirective.option_spec.copy()
    option_spec.update({
        'assignment_type': directives.positive_int,
        'sections':directives.unchanged,
        'chapters':directives.unchanged,
        'subchapters':directives.unchanged,
        'assignment_name':directives.unchanged,
        'deadline':directives.unchanged,
        'pct_required':directives.positive_int,
        'points':directives.positive_int
    })

    def run(self):
        """
          .. usageassignment:: prep_1
            :chapters: chap_name1[, chapname2]*
            :subchapters: subchapter_name[, subchaptername2]*
            :assignment_name: <str>
            :assignment_type: <int id of the assignment type object; kind of a hack>
            :deadline: <str>
            :sections: <comma separated int ids of the section objects; kind of a hack>
            :pct_required: <int>
            :points: <int>
        """

        if all(name in os.environ for name in ['DBHOST', 'DBPASS', 'DBUSER', 'DBNAME']):
            dburl = 'postgresql://{DBUSER}:{DBPASS}@{DBHOST}/{DBNAME}'.format(**os.environ)
        else:
            dburl = None
            self.state.document.settings.env.warn(self.state.document.settings.env.docname, "Environment variables not set for DB access; can't save usageassignment to DB")
            return [usageAssignmentNode(self.options)]
        engine = create_engine(dburl)
        meta = MetaData()
        # create a configured "Session" class
        Session = sessionmaker(bind=engine)
        session = Session()

        Chapter = Table('chapters', meta, autoload=True, autoload_with=engine)
        SubChapter = Table('sub_chapters', meta, autoload=True, autoload_with=engine)
        Problem = Table('problems', meta, autoload=True, autoload_with=engine)
        Div = Table('div_ids', meta, autoload=True, autoload_with=engine)
        AssignmentType = Table('assignment_types', meta, autoload=True, autoload_with=engine)
        Section = Table('sections', meta, autoload=True, autoload_with=engine)

        assignment_type_id = getOrCreateAssignmentType("Lecture Prep",
                                  grade_type = 'use',
                                  points_possible = '50',
                                  assignments_count = 23,
                                  assignments_dropped = 3)


        course_name = self.state.document.settings.env.config.html_context['course_id']
        self.options['course_name'] = course_name
        course_id = getCourseID(course_name)
        basecourse_name = self.state.document.settings.env.config.html_context.get('basecourse', "unknown")

        # Accumulate all the Chapters and SubChapters that are to be visited
        # For each chapter, accumulate all subchapters
        self.options['chapter_data'] = []
        sub_chs = []
        if 'chapters' in self.options:
            try:
                for nm in self.options.get('chapters').split(','):
                    nm = nm.strip()
                    ch = session.query(Chapter).filter(Chapter.c.course_id == course_name,
                                                       Chapter.c.chapter_label == nm).first()

                    results = session.query(SubChapter).filter(SubChapter.c.chapter_id == str(ch.id)).all()
                    sub_chs += results
                    chapter_data = {'ch': nm, 'sub_chs': [r.sub_chapter_label for r in results]}
                    self.options['chapter_data'].append(chapter_data)

            except:
                self.state.document.settings.env.warn(self.state.document.settings.env.docname, "Chapters requested not found: %s" % (self.options.get('chapters')))
        # Add any explicit subchapters
        if 'subchapters' in self.options:
            try:
                for nm in self.options.get('subchapters').split(','):
                    (ch_dir, subch_name) = nm.strip().split('/')
                    ch_id = session.query(Chapter).filter(Chapter.c.course_id == course_name, Chapter.c.chapter_label == ch_dir).first().id
                    subch = session.query(SubChapter).filter(SubChapter.c.chapter_id == ch_id, SubChapter.c.sub_chapter_label == subch_name).first()
                    sub_chs.append(subch)
                    if not subch:
                        self.state.document.settings.env.warn(self.state.document.settings.env.docname, "problem with: %s" % nm)
                    self.options['chapter_data'].append({'ch': ch_dir, 'sub_chs': [subch_name]})
            except:
                self.state.document.settings.env.warn(self.state.document.settings.env.docname, "Subchapters requested not found: %s" % (self.options.get('subchapters')))

        # Accumulate all the ActiveCodes that are to be run and URL paths to be visited
        divs = []
        paths = []
        for subch in sub_chs:
            try:
                ch_name = session.query(Chapter).filter(Chapter.c.id == subch.chapter_id).first().chapter_label
                divs += session.query(Div).filter(Div.c.course_name == course_name,
                                                  Div.c.chapter == ch_name,
                                                  Div.c.subchapter == subch.sub_chapter_label).all()
                paths.append('/runestone/static/%s/%s/%s.html' % (course_name, ch_name, subch.sub_chapter_label))
            except:
                self.state.document.settings.env.warn(self.state.document.settings.env.docname, "Subchapter not found: %s" % (subch))
        tracked_div_types = ['activecode', 'actex']
        active_codes = [d.div_id for d in divs if d.div_type in tracked_div_types]



        min_activities = (len(paths) + len(active_codes)) * self.options.get('pct_required', 0) / 100

        deadline = None
        if 'deadline' in self.options:
            try:
                deadline = datetime.strptime(self.options['deadline'], '%Y-%m-%d %H:%M')
            except:
                try:
                    deadline = datetime.strptime(self.options['deadline'], '%Y-%m-%d %H:%M:%S')
                    self.state.document.settings.env.warn(self.state.document.settings.env.docname, "deadline not in preferred format %Y-%m-%d %H:%M but accepting alternate format with seconds")
                except:
                    self.state.document.settings.env.warn(self.state.document.settings.env.docname, "deadline missing or incorrectly formatted; Omitting deadline")

        points = self.options.get('points', 0)

        assignment_id = addAssignmentToDB(name = self.options.get('assignment_name', 'dummy_assignment'),
                          course_id = course_id,
                          assignment_type_id = assignment_type_id,
                          deadline = deadline,
                          points = points,
                          threshold = min_activities)

        for acid in paths + active_codes:
            q_id = getOrInsertQuestionForPage(base_course=basecourse_name, name=acid, is_private='F', question_type="page", autograde = "visited", difficulty=1,chapter=None)
            addAssignmentQuestionToDB(q_id, assignment_id, 1, autograde="visited")

        return [usageAssignmentNode(self.options)]
