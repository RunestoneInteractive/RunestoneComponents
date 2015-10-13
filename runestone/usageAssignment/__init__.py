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

__author__ = 'Paul Resnick'

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
from sqlalchemy import create_engine, Table, MetaData, select, delete
from sqlalchemy.orm import sessionmaker


def setup(app):
    app.add_directive('usageassignment',usageAssignment)

    # app.add_node(usageAssignmentNode, html=(visit_df_node, depart_df_node))

    app.connect('doctree-resolved',process_nodes)
    app.connect('env-purge-doc', purge)


# class usageAssignmentNode(nodes.General, nodes.Element):
#     def __init__(self,content):
#         """
#         Arguments:
#         - `self`:
#         - `content`:
#         """
#         super(DataFileNode,self).__init__()
#         self.df_content = content

# self for these functions is an instance of the writer class.  For example
# in html, self is sphinx.writers.html.SmartyPantsHTMLTranslator
# The node that is passed as a parameter is an instance of our node class.
# def visit_df_node(self,node):
#     res = TEMPLATE
#     res = res % node.df_content
#
#     res = res.replace("u'","'")  # hack:  there must be a better way to include the list and avoid unicode strings
#
#     self.body.append(res)
#
# def depart_df_node(self,node):
#     ''' This is called at the start of processing an datafile node.  If datafile had recursive nodes
#         etc and did not want to do all of the processing in visit_ac_node any finishing touches could be
#         added here.
#     '''
#     pass


def process_nodes(app,env,docname):
    pass


def purge(app,env,docname):
    pass
class usageAssignment(Directive):
    required_arguments = 1  # requires an id for the directive
    optional_arguments = 0
    has_content = False
    option_spec = {
        'assignment_type': directives.positive_int,
        'sections':directives.unchanged,
        'chapters':directives.unchanged,
        'subchapters':directives.unchanged,
        'assignment_name':directives.unchanged,
        'deadline':directives.unchanged,
        'pct_required':directives.positive_int,
        'points':directives.positive_int
    }

    def get_or_make_assignment_type(self, engine, session, AssignmentType):
        # There will normally be only one "usage" type of assignment; we'll take that, or create it if it doesn't exist
        a = session.query(AssignmentType).filter(AssignmentType.c.grade_type == 'use').first()
        if not a:
            print "creating Lecture Prep assignment type"
            engine.execute(AssignmentType.insert().values(
                name = 'Lecture Prep',
                grade_type = 'use',
                points_possible = '50',
                assignments_count = 23,
                assignments_dropped = 3))
            a = session.query(AssignmentType).filter(AssignmentType.c.grade_type == 'use').first()
        return a.id

    def get_or_make_course_section(self, course_id, engine, session, Section):
        # Currently only works with a single default section for the whole course
        # Could add sections to the directive to allow different sections to get different deadlines
        a = session.query(Section).filter(Section.c.course_id == course_id).first()
        if not a:
            print "creating default course section"
            engine.execute(Section.insert().values(
                course_id = course_id,
                name = 'Default Section'))
            a = session.query(Section).filter(Section.c.course_id == course_id).first()
        return a.id

    def run(self):
        """
          .. usageassignment:: prep_1
            :chapters: chap_name1[, chapname2]*
            :subchapter: subchapter_name[, subchaptername2]*
            :assignment_name: <str>
            :assignment_type: <int id of the assignment type object; kind of a hack>
            :deadline: <str>
            :sections: <comma separated int ids of the section objects; kind of a hack>
            :pct_required: <int>
            :points: <int>
        """
        self.options['divid'] = self.arguments[0]
        try:
            env = self.state.document.settings.env
            engine = create_engine(env.config.html_context['dburl'])
            meta = MetaData()
            Assignment = Table('assignments', meta, autoload=True, autoload_with=engine)
            Chapter = Table('chapters', meta, autoload=True, autoload_with=engine)
            SubChapter = Table('sub_chapters', meta, autoload=True, autoload_with=engine)
            Problem = Table('problems', meta, autoload=True, autoload_with=engine)
            Div = Table('div_ids', meta, autoload=True, autoload_with=engine)
            Course = Table('courses', meta, autoload=True, autoload_with=engine)
            PIPDeadline = Table('pipactex_deadline', meta, autoload=True, autoload_with=engine)
            Deadline = Table('deadlines', meta, autoload=True, autoload_with=engine)
            AssignmentType = Table('assignment_types', meta, autoload=True, autoload_with=engine)
            Section = Table('sections', meta, autoload=True, autoload_with=engine)
            # create a configured "Session" class
            Session = sessionmaker(bind=engine)
        except:
            print "Unable to create and save usage assignment. Possible problems:"
            print "  1. dburl or project_name are not set in pavement.py for your book"
            print "  2. unable to connect to the database using dburl"
            print
            print "This should only affect the grading interface. Everything else should be fine."


        # create a Session
        session = Session()

        course_name = env.config.html_context['course_id']
        course_id = str(session.query(Course).filter(Course.c.course_name == course_name).first().id)

        # Accumulate all the Chapters and SubChapters that are to be visited
        # For each chapter, accumulate all subchapters
        sub_chs = []
        for nm in self.options.get('chapters', '').split(','):
            ch = session.query(Chapter).filter(Chapter.c.course_id == course_name, Chapter.c.chapter_label == nm.strip()).first()
            results = session.query(SubChapter).filter(SubChapter.c.chapter_id == str(ch.id)).all()
            sub_chs += results
        # Add any explicit subchapters
        if 'sub_chapter' in self.options:
            for nm in self.options.get('sub_chapters').split(','):
                (ch_dir, subch_name) = nm.strip().split('/')
                ch_id = session.query(Chapter).filter(Chapter.c.course_id == course_id, Chapter.chapter_label == ch_dir).first()
                sub_chs += session.query(SubChapter).filter(SubChapter.c.chapter_id == ch_id, SubChapter.c.chapter_label == subch).first()

        # Accumulate all the ActiveCodes that are to be run and URL paths to be visited
        divs = []
        paths = []
        for subch in sub_chs:
            ch_name = session.query(Chapter).filter(Chapter.c.id == subch.chapter_id).first().chapter_label
            divs += session.query(Div).filter(Div.c.course_name == course_name,
                                              Div.c.chapter == ch_name,
                                              Div.c.subchapter == subch.sub_chapter_label).all()
            paths.append('/runestone/static/%s/%s/%s.html' % (course_name, ch_name, subch.sub_chapter_label))
        tracked_div_types = ['activecode', 'actex']
        active_codes = [d.div_id for d in divs if d.div_type in tracked_div_types]



        min_activities = (len(paths) + len(active_codes)) * self.options.get('pct_required', 0) / 100
        assignment_type = self.get_or_make_assignment_type(engine, session, AssignmentType)

        # Add or update Assignment
        a = session.query(Assignment).filter(Assignment.c.name == self.options.get('assignment_name', 'dummy_assignment'), Assignment.c.course == course_id).first()
        if a:
            engine.execute(Assignment.update()\
                           .where(Assignment.c.name == self.options.get('assignment_name', 'dummy_assignment'))\
                           .where(Assignment.c.course == course_id)\
                           .values(
                                name = self.options.get('assignment_name', 'dummy_assignment'),
                                assignment_type = assignment_type,
                                points = self.options.get('points', 0),
                                threshold = min_activities,
            ))

        else:
            engine.execute(Assignment.insert().values(
                course = course_id,
                assignment_type = assignment_type,
                name = self.options.get('assignment_name', 'dummy_assignment'),
                points = self.options.get('points', 0),
                threshold = min_activities
            ))
            a = session.query(Assignment).filter(Assignment.c.name == self.options.get('assignment_name', 'dummy_assignment'), Assignment.c.course == course_id).first()

        # Replace any existing deadlines
        section_id = self.get_or_make_course_section(course_id, engine, session, Section)
        engine.execute(Deadline.delete()\
                      .where(Deadline.c.section == section_id)\
                      .where(Deadline.c.assignment == a.id))
        if 'deadline' in self.options:
            engine.execute(Deadline.insert()\
                          .values(section = section_id,
                                  assignment = a.id,
                                  deadline = self.options.get('deadline')))
        #I think pipactex_deadlines are deprected; let's see if anything breaks by just deleting them
        for acid in active_codes:
            engine.execute(PIPDeadline.delete()\
                          .where(PIPDeadline.c.section == section_id)\
                          .where(PIPDeadline.c.acid_prefix == acid))
            # if 'deadline' in self.options:
            #     engine.execute(Deadline.insert()\
            #                   .values(section = section_id,
            #                           acid_prefix = acid,
            #                           deadline = self.options.get('deadline')))
            #
        # replace any existing problems for this assignment with the new ones
        engine.execute(Problem.delete()\
                       .where(Problem.c.assignment == a.id))
        for acid in paths + active_codes:
            engine.execute(Problem.insert()\
                .values(acid = acid, assignment = a.id))

        session.commit()

        return []
