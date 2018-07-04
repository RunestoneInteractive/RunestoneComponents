# Copyright (C) 2016  Bradley N. Miller
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

from datetime import datetime

__author__ = 'bmiller'

import os
from sqlalchemy import create_engine, Table, MetaData, select, and_
from . import get_dburl
from runestone.common.runestonedirective import RunestoneDirective

# create a global DB query engine to share for the rest of the file
try:
    dburl = get_dburl()
    engine = create_engine(dburl, client_encoding='utf8', convert_unicode=True)
except RuntimeError as e:
    dburl = None
    engine = None
    meta = None
    print("Skipping all DB operations because environment variables not set up")
else:
    # If no exceptions are raised, then set up the database.
    meta = MetaData()
    questions = Table('questions', meta, autoload=True, autoload_with=engine)
    assignment_types = Table('assignment_types', meta, autoload=True, autoload_with=engine)
    assignment_questions = Table('assignment_questions', meta, autoload=True, autoload_with=engine)
    courses = Table('courses', meta, autoload=True, autoload_with=engine)

def logSource(self):
    sourcelog = self.state.document.settings.env.config.html_context.get('dsource', None)
    if sourcelog:
        with open(sourcelog, 'a') as sl:
            sl.write("--------{}--------\n".format(self.arguments[0]))
            sl.write(".. {}:: {}\n".format(self.name, " ".join(self.arguments)))
            for k, v in self.options.items():
                sl.write("   :{}: {}\n".format(k, v))
            sl.write("   \n")
            sl.write("   " + "   \n".join(self.content))
            sl.write("\n")


def addQuestionToDB(self):
    # ``self`` must be a RunestoneDirective.
    assert isinstance(self, RunestoneDirective)

    if dburl:
        basecourse = self.state.document.settings.env.config.html_context.get('basecourse', "unknown")
        if basecourse == "unknown":
            raise self.severe("Cannot update database because basecourse is unknown")
            return

        last_changed = datetime.now()

        if 'difficulty' in self.options:
            difficulty = self.options['difficulty']
        else:
            difficulty = 3

        if 'author' in self.options:
            author = self.options['author']
        else:
            author = os.environ.get('USER', 'Brad Miller')

        autograde = self.options.get('autograde', None)
        practice = self.options.get('practice', None)
        if ('topics' in self.options) and  (self.options['topics'] != ''):
            topics = self.options['topics']
        else:
            topics = "{}/{}".format(self.chapter, self.subchapter)
#        topics = self.options.get('topics', "{}/{}".format(self.chapter, self.subchapter))

        id_ = self.options['divid']
        sel = select([questions]).where(and_(questions.c.name == id_,
                                              questions.c.base_course == basecourse))
        res = engine.execute(sel).first()
        try:
            if res:
                stmt = questions.update().where(questions.c.id == res['id']).values(question = self.block_text, timestamp=last_changed, is_private='F', question_type=self.name, subchapter=self.subchapter, autograde=autograde, author=author,difficulty=difficulty,chapter=self.chapter, practice=practice, topic=topics)
                engine.execute(stmt)
            else:
                ins = questions.insert().values(base_course=basecourse, name=id_, question=self.block_text, timestamp=last_changed, is_private='F', question_type=self.name, subchapter=self.subchapter, autograde=autograde, author=author,difficulty=difficulty,chapter=self.chapter, practice=practice, topic=topics)

                engine.execute(ins)
        except UnicodeEncodeError:
            raise self.severe("Bad character in directive {} in {}/{}. This will not be saved to the DB".format(id_, self.chapter, self.subchapter))

def getQuestionID(base_course, name):

    sel = select([questions]).where(and_(questions.c.name == name,
                                          questions.c.base_course == base_course))
    res = engine.execute(sel).first()
    if res:
        return res['id']
    else:
        return None

def getOrInsertQuestionForPage(base_course=None, name=None, is_private='F', question_type="page", autograde = "visited", author=None, difficulty=1,chapter=None):
    last_changed = datetime.now()

    sel = select([questions]).where(and_(questions.c.name == name,
                                          questions.c.base_course == base_course))
    res = engine.execute(sel).first()

    if res:
        id = res['id']
        stmt = questions.update().where(questions.c.id == id).values(
            timestamp=last_changed,
            is_private= is_private,
            question_type=question_type,
            autograde = autograde,
            author=author,
            difficulty=difficulty,
            chapter=chapter)
        res = engine.execute(stmt)
        return id
    else:
        ins = questions.insert().values(
            base_course= base_course,
            name= name,
            timestamp=last_changed,
            is_private= is_private,
            question_type=question_type,
            autograde = autograde,
            author=author,
            difficulty=difficulty,
            chapter=chapter)
        res = engine.execute(ins)
        return res.inserted_primary_key[0]

def getOrCreateAssignmentType(assignment_type_name, grade_type = None, points_possible = None, assignments_count = None, assignments_dropped = None):


    # search for it in the DB
    sel = select([assignment_types]).where(assignment_types.c.name == assignment_type_name)
    res = engine.execute(sel).first()
    if res:
        return res['id']
    else:
        # create the assignment type
        ins = assignment_types.insert().values(
            name=assignment_type_name,
            grade_type = grade_type,
            points_possible = points_possible,
            assignments_count = assignments_count,
            assignments_dropped = assignments_dropped)
        res = engine.execute(ins)
        return res.inserted_primary_key[0]

def addAssignmentQuestionToDB(question_id, assignment_id, points, activities_required = 0, autograde=None, which_to_grade = None, reading_assignment=None, sorting_priority=0):
    # now insert or update the assignment_questions row
    sel = select([assignment_questions]).where(and_(assignment_questions.c.assignment_id == assignment_id,
                                          assignment_questions.c.question_id == question_id))
    res = engine.execute(sel).first()
    vals = dict(
            assignment_id = assignment_id,
            question_id = question_id,
            activities_required=activities_required,
            points=points,
            autograde=autograde,
            which_to_grade = which_to_grade,
            reading_assignment = reading_assignment,
            sorting_priority = sorting_priority)
    if res:
        #update
        stmt = assignment_questions.update().where(assignment_questions.c.id == res['id']).values(**vals)
        engine.execute(stmt)
    else:
        #insert
        ins = assignment_questions.insert().values(**vals)
        engine.execute(ins)

def getCourseID(coursename):
    sel = select([courses]).where(courses.c.course_name == coursename)
    res = engine.execute(sel).first()
    return res['id']

def addAssignmentToDB(name = None, course_id = None, assignment_type_id = None, deadline = None, points = None):

    last_changed = datetime.now()
    sel = select([assignments]).where(and_(assignments.c.name == name,
                                          assignments.c.course == course_id))
    res = engine.execute(sel).first()
    if res:
        stmt = assignments.update().where(assignments.c.id == res['id']).values(
            assignment_type = assignment_type_id,
            duedate = deadline,
            points = points
        )
        engine.execute(stmt)
        a_id = res['id']
        # delete all existing AssignmentQuestions, so that you don't have any leftovers
        # this is safe because grades and comments are associated with div_ids and course_names, not assignment_questions rows.
        stmt2 = assignment_questions.delete().where(assignment_questions.c.assignment_id == a_id)
        engine.execute(stmt2)

    else:
        ins = assignments.insert().values(
            course=course_id,
            name=name,
            assignment_type = assignment_type_id,
            duedate = deadline,
            points = points)
        res = engine.execute(ins)
        a_id = res.inserted_primary_key[0]

    return a_id

def addHTMLToDB(divid, basecourse, htmlsrc):
    if dburl:
        last_changed = datetime.now()
        sel = select([questions]).where(and_(questions.c.name == divid,
                                              questions.c.base_course == basecourse))
        res = engine.execute(sel).first()
        try:
            if res:
                if res['htmlsrc'] != htmlsrc:
                    stmt = questions.update().where(questions.c.id == res['id']).values(htmlsrc = htmlsrc, timestamp=last_changed)
                    engine.execute(stmt)
        except UnicodeEncodeError:
            print("Bad character in directive {}".format(divid))
        except:
            print("Error while trying to add directive {} to the DB".format(divid))

def get_HTML_from_DB(divid, basecourse):
    sel = select([questions]).where(and_(questions.c.name == divid,
                                          questions.c.base_course == basecourse))
    res = engine.execute(sel).first()
    if res:
        return res['htmlsrc']
    else:
        return ""
