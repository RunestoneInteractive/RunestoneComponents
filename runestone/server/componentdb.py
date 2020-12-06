# *******************************
# |docname| - Add Questions to DB
# *******************************
#
#

# License
# -------
# Copyright (C) 2016-2020  Bradley N. Miller
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

from datetime import datetime, timedelta

__author__ = "bmiller"

import os
from os import environ
import re
from sphinx.util import logging
from sqlalchemy import create_engine, Table, MetaData, select, and_, or_
from sqlalchemy.orm.session import sessionmaker

from runestone.common.runestonedirective import RunestoneDirective, RunestoneIdNode


logger = logging.getLogger(__name__)


def get_dburl(outer={}):
    """
    Return a nicely formatted database connection URL
    This function should not be used to configure a DAL db_uri for web2py that will already
    be configured in settings.

    :param outer:  pass locals from the calling environment
    :return:  string
    """
    # outer may contain the locals from the calling function
    # nonlocal env, settings # Python 3 only

    if "WEB2PY_CONFIG" in environ:
        w2py_config = environ["WEB2PY_CONFIG"]
        if w2py_config == "development":
            return environ["DEV_DBURL"]

        if w2py_config == "production":
            return environ["DBURL"]

        if w2py_config == "test":
            return environ["TEST_DBURL"]

    if "options" in outer:
        return outer["options"].build.template_args["dburl"]

    if "env" in outer:
        return outer["env"].config.html_context["dburl"]

    if "env" in globals():
        return globals()["env"].config.html_context["dburl"]

    ret = None
    if "settings" in outer:
        ret = outer["settings"].database_uri

    if "settings" in globals():
        ret = globals()["settings"].database_uri.replace("postgres:", "postgresql:")

    if ret:
        return re.sub(r"postgres:.*/", "postgresql:/", ret)

    raise RuntimeError("Cannot configure a Database URL!")


# Create a global DB query engine to share for the rest of the file
# We declare the variables here, but they don't get any values until setup is called.
# otherwise any import of runestone ends up trying to create database connections
# when it may not be necessary.
dburl = None
engine = None
meta = None
sess = None
questions = None
assignment_questions = None
courses = None
assignments = None
competency = None

# setup
# -----
#
# Here we connect two key functions to events in the build process.
# reset_questions and finalize updates
# this ensures that the database is in sync with the directives in the source
#

table_info = {}


def setup(app):
    global dburl, engine, meta, sess, questions, assignments, assignment_questions, courses, competency, chapters, sub_chapters, table_info

    app.connect("env-before-read-docs", reset_questions)
    app.connect("build-finished", finalize_updates)
    # the `qbank` option is for the QuestionBank
    # it allows us to populate the database from the question bank
    # but we don't care about populating chapter and subchapter tables and others
    # so we commit each question.
    app.add_config_value("qbank", False, "html")
    logger.info("Connecting to DB")
    try:
        dburl = get_dburl()
        engine = create_engine(dburl, client_encoding="utf8", convert_unicode=True)
        Session = sessionmaker()
        engine.connect()
        Session.configure(bind=engine)
        sess = Session()
    except Exception as e:  # psycopg2.OperationalError
        dburl = None
        engine = None
        sess = None
        print(e)
        print("Skipping all DB operations because environment variables not set up")
    else:
        # If no exceptions are raised, then set up the database.
        meta = MetaData()
        questions = Table("questions", meta, autoload=True, autoload_with=engine)
        assignments = Table("assignments", meta, autoload=True, autoload_with=engine)
        assignment_questions = Table(
            "assignment_questions", meta, autoload=True, autoload_with=engine
        )
        courses = Table("courses", meta, autoload=True, autoload_with=engine)
        competency = Table("competency", meta, autoload=True, autoload_with=engine)
        chapters = Table("chapters", meta, autoload=True, autoload_with=engine)
        sub_chapters = Table("sub_chapters", meta, autoload=True, autoload_with=engine)
        table_info = {
            "chapters": chapters,
            "sub_chapters": sub_chapters,
            "competency": competency,
            "courses": courses,
            "assignment_questions": assignment_questions,
            "assignments": assignments,
            "questions": questions,
        }


def get_engine_meta():
    return engine, meta, sess


def get_table_meta():
    return table_info


# Reset Questions
# ---------------
# We need to be able to tell the difference between questions that are
# part of the book and questions that are contributed by instructors
# so wheenver we build the book, we mark all questions for this base course
# with ``from_source = 'F'`` Then as the book is built and questions are updated
# those in the book get ``from_source = 'T'`` set.
def reset_questions(app, env, docnames):
    if sess:
        logger.info("Resetting questions")
        basecourse = env.config.html_context.get("basecourse")
        stmt = (
            questions.update()
            .where(
                and_(
                    questions.c.base_course == basecourse,
                    questions.c.question_type != "page",
                )
            )
            .values(from_source="F")
        )
        sess.execute(stmt)


# finalize updates
# ----------------
# If nothing has gone wrong during the build, then commit all the changes
# otherwise rollback to make sure we have everything consistent
def finalize_updates(app, excpt):

    if sess and excpt is None:
        if hasattr(app.env, "chap_titles"):
            try:
                update_chapter_subchapter(
                    app.env.chap_titles,
                    app.env.subchap_titles,
                    app.env.skips,
                    app.env.chap_numbers,
                    app.env.subchap_numbers,
                    app,
                )
                logger.info("Committing changes")
                sess.commit()
            except Exception as e:
                logger.error(f"Error while updating database -- details {e}")
                sess.rollback()
        else:
            logger.info("Skipping chapter DB update, no new information.")
    elif sess:
        logger.error("Rolling back database changes from build")
        sess.rollback()


def logSource(self):
    sourcelog = self.state.document.settings.env.config.html_context.get(
        "dsource", None
    )
    if sourcelog:
        with open(sourcelog, "a") as sl:
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
    question_id = False
    qbank = self.state.document.settings.env.config.qbank

    if dburl:
        if "basecourse" in self.options:
            basecourse = self.options["basecourse"]
        else:
            basecourse = self.state.document.settings.env.config.html_context.get(
                "basecourse", "unknown"
            )
        if basecourse == "unknown":
            raise self.severe("Cannot update database because basecourse is unknown")
            return

        last_changed = datetime.now()

        if "difficulty" in self.options:
            difficulty = self.options["difficulty"]
        else:
            difficulty = 3

        if "author" in self.options:
            author = self.options["author"]
        else:
            author = os.environ.get("USER", "Brad Miller")

        autograde = self.options.get("autograde", None)
        practice = self.options.get("practice", None)
        if ("topics" in self.options) and (self.options["topics"] != ""):
            topics = self.options["topics"]
        else:
            topics = "{}/{}".format(self.chapter, self.subchapter)
        #        topics = self.options.get('topics', "{}/{}".format(self.chapter, self.subchapter))
        if "data-optional" in self.options.get("optional", ""):
            optional = "T"
        else:
            optional = "F"

        from_source = self.options.get("from_source", "T")

        id_ = self.options["divid"]
        sel = select([questions]).where(
            and_(questions.c.name == id_, questions.c.base_course == basecourse)
        )
        res = sess.execute(sel).first()

        if not self.explain_text:
            self.explain_text = self.get_explain_text()
        et = " ".join(self.explain_text)[:80]

        # check for additional meta data to add
        meta_opts = {}
        if "pct_on_first" in self.options:
            meta_opts["pct_on_first"] = self.options["pct_on_first"]
        if "mean_clicks_to_correct" in self.options:
            meta_opts["mean_clicks_to_correct"] = self.options["mean_clicks_to_correct"]

        try:
            if res:
                stmt = (
                    questions.update()
                    .where(questions.c.id == res["id"])
                    .values(
                        question=self.block_text,
                        timestamp=last_changed,
                        is_private="F",
                        question_type=self.name,
                        subchapter=self.subchapter,
                        autograde=autograde,
                        author=author,
                        difficulty=round(float(difficulty)),
                        chapter=self.chapter,
                        practice=practice,
                        topic=topics,
                        from_source=from_source,
                        optional=optional,
                        description=et,
                        **meta_opts,
                    )
                )
                sess.execute(stmt)
                question_id = res["id"]
            else:
                ins = questions.insert().values(
                    base_course=basecourse,
                    name=id_,
                    question=self.block_text,
                    timestamp=last_changed,
                    is_private="F",
                    question_type=self.name,
                    subchapter=self.subchapter,
                    autograde=autograde,
                    author=author,
                    difficulty=round(float(difficulty)),
                    chapter=self.chapter,
                    practice=practice,
                    topic=topics,
                    from_source=from_source,
                    optional=optional,
                    description=et,
                    **meta_opts,
                )

                question_id = sess.execute(ins)
                question_id = question_id.inserted_primary_key[0]
            if qbank:
                sess.commit()
        except UnicodeEncodeError:
            raise self.severe(
                "Bad character in directive {} in {}/{}. This will not be saved to the DB".format(
                    id_, self.chapter, self.subchapter
                )
            )

        # check for prim_comp and supp_comp and add them to the competency table.
        prim_comps = []
        supp_comps = []
        if "prim_comp" in self.options:
            prim_comps = [
                x.strip() for x in self.options["prim_comp"].split(",") if x != ""
            ]
        if "supp_comp" in self.options:
            supp_comps = [
                x.strip() for x in self.options["supp_comp"].split(",") if x != ""
            ]

        if question_id:
            # Remove all competency info for this question,
            # then update it
            stmt2 = competency.delete().where(competency.c.question == question_id)
            sess.execute(stmt2)
            for comp in prim_comps:
                ins = competency.insert().values(
                    competency=comp,
                    question=question_id,
                    is_primary="T",
                    question_name=id_,
                )
                sess.execute(ins)
            for comp in supp_comps:
                ins = competency.insert().values(
                    competency=comp,
                    question=question_id,
                    is_primary="F",
                    question_name=id_,
                )
                sess.execute(ins)


def addQNumberToDB(app, node, qnumber):
    # ``self`` must be a RunestoneIdNode to contain a question number.
    assert isinstance(node, RunestoneIdNode)

    if not dburl:
        return

    basecourse = app.env.config.html_context.get("basecourse")
    if not basecourse:
        logger.error(
            "Cannot update database because basecourse is unknown.", location=node
        )
        return

    stmt = (
        questions.update()
        .where(
            and_(
                questions.c.name == node.runestone_options["divid"],
                questions.c.base_course == basecourse,
            )
        )
        .values(qnumber=qnumber,)
    )
    sess.execute(stmt)


def getQuestionID(base_course, name):

    sel = select([questions]).where(
        and_(questions.c.name == name, questions.c.base_course == base_course)
    )
    res = sess.execute(sel).first()
    if res:
        return res["id"]
    else:
        return None


def getAssignmentID(base_course, name):

    course = getCourseID(base_course)
    sel = select([assignments]).where(
        and_(assignments.c.name == name, assignments.c.course == course)
    )
    res = sess.execute(sel).first()
    if res:
        return res["id"]
    else:
        return None


def getOrInsertQuestionForPage(
    base_course=None,
    name=None,
    is_private="F",
    question_type="page",
    autograde="visited",
    author=None,
    difficulty=1,
    chapter=None,
):
    last_changed = datetime.now()

    sel = select([questions]).where(
        and_(questions.c.name == name, questions.c.base_course == base_course)
    )
    res = sess.execute(sel).first()

    if res:
        id = res["id"]
        stmt = (
            questions.update()
            .where(questions.c.id == id)
            .values(
                timestamp=last_changed,
                is_private=is_private,
                question_type=question_type,
                autograde=autograde,
                author=author,
                difficulty=difficulty,
                chapter=chapter,
            )
        )
        res = sess.execute(stmt)
        return id
    else:
        ins = questions.insert().values(
            base_course=base_course,
            name=name,
            timestamp=last_changed,
            is_private=is_private,
            question_type=question_type,
            autograde=autograde,
            author=author,
            difficulty=difficulty,
            chapter=chapter,
        )
        res = sess.execute(ins)
        return res.inserted_primary_key[0]


# Add a question to an Assignment
# -------------------------------
#
def addAssignmentQuestionToDB(
    question_name,
    assignment_name,
    points,
    basecourse,
    activities_required=0,
    autograde=None,
    which_to_grade=None,
    reading_assignment=None,
    sorting_priority=0,
):

    if not dburl:
        return

    question_id = getQuestionID(basecourse, question_name)
    assignment_id = getAssignmentID(basecourse, assignment_name)

    # now insert or update the assignment_questions row
    sel = select([assignment_questions]).where(
        and_(
            assignment_questions.c.assignment_id == assignment_id,
            assignment_questions.c.question_id == question_id,
        )
    )
    res = sess.execute(sel).first()
    vals = dict(
        assignment_id=assignment_id,
        question_id=question_id,
        activities_required=activities_required,
        points=points,
        autograde=autograde,
        which_to_grade=which_to_grade,
        reading_assignment=reading_assignment,
        sorting_priority=sorting_priority,
    )
    if res:
        # update
        stmt = (
            assignment_questions.update()
            .where(assignment_questions.c.id == res["id"])
            .values(**vals)
        )
        sess.execute(stmt)
    else:
        # insert
        ins = assignment_questions.insert().values(**vals)
        sess.execute(ins)


def maybeAddToAssignment(self):
    if self.in_exam:
        # this must come after this question has been added to the DB
        addAssignmentQuestionToDB(
            self.options["divid"],
            self.in_exam,  # assignment_name
            self.int_points,
            self.basecourse,
            autograde="pct_correct",
            which_to_grade="last_answer",
        )


def getCourseID(coursename):
    sel = select([courses]).where(courses.c.course_name == coursename)
    res = sess.execute(sel).first()
    return res["id"] if res else None


# Add an Assignment
# ------------------
# Historically we had two directives ``.. assignment::`` and ``.. usageassignment::``
# These allowed you to create assignments from the source for a book.
# However, these were deprecated in 2017. Version 3.0.4 is the most recent version
# prior to deprecation.  Recently (2020) work on the
# exam generator has renewed the need for similar functionality.
def addAssignmentToDB(
    name=None,
    course_name=None,
    deadline=None,
    points=None,
    is_timed="F",
    visible="F",
    time_limit=None,
):

    if not dburl:
        return

    course_id = getCourseID(course_name)
    last_changed = datetime.now()
    sel = select([assignments]).where(
        and_(assignments.c.name == name, assignments.c.course == course_id)
    )
    res = sess.execute(sel).first()
    if deadline is None:
        deadline = datetime.now() + timedelta(weeks=1)
    if res:
        stmt = (
            assignments.update()
            .where(assignments.c.id == res["id"])
            .values(
                duedate=deadline,
                points=points,
                is_timed=is_timed,
                visible=visible,
                time_limit=time_limit,
                from_source="T",
            )
        )
        sess.execute(stmt)
        a_id = res["id"]
        # delete all existing AssignmentQuestions, so that you don't have any leftovers
        # this is safe because grades and comments are associated with div_ids and course_names, not assignment_questions rows.
        stmt2 = assignment_questions.delete().where(
            assignment_questions.c.assignment_id == a_id
        )
        sess.execute(stmt2)

    else:
        ins = assignments.insert().values(
            course=course_id,
            name=name,
            duedate=deadline,
            points=points,
            is_timed=is_timed,
            visible=visible,
            time_limit=time_limit,
            from_source="T",
        )
        res = sess.execute(ins)
        a_id = res.inserted_primary_key[0]

    return a_id


def addHTMLToDB(divid, basecourse, htmlsrc, feedback=None):
    if dburl:
        last_changed = datetime.now()
        sel = select([questions]).where(
            and_(questions.c.name == divid, questions.c.base_course == basecourse)
        )
        res = sess.execute(sel).first()
        try:
            if res:
                if res["htmlsrc"] != htmlsrc or res["feedback"] != feedback:
                    stmt = (
                        questions.update()
                        .where(questions.c.id == res["id"])
                        .values(
                            htmlsrc=htmlsrc, feedback=feedback, timestamp=last_changed
                        )
                    )
                    sess.execute(stmt)
        except UnicodeEncodeError:
            print("Bad character in directive {}".format(divid))
        except:
            print("Error while trying to add directive {} to the DB".format(divid))


def get_HTML_from_DB(divid, basecourse):
    sel = select([questions]).where(
        and_(questions.c.name == divid, questions.c.base_course == basecourse)
    )
    res = sess.execute(sel).first()
    if res:
        return res["htmlsrc"]
    else:
        return ""


def update_chapter_subchapter(
    chaptitles, subtitles, skips, chap_numbers, subchap_numbers, app
):
    """
    When the build is completely finished output the information gathered about
    chapters and subchapters into the database.
    """

    engine, meta, sess = get_engine_meta()
    table_info = get_table_meta()

    if not sess:
        logger.info("You need to install a DBAPI module - psycopg2 for Postgres")
        logger.info("Or perhaps you have not set your DBURL environment variable")
        return

    chapters = table_info["chapters"]
    sub_chapters = table_info["sub_chapters"]
    questions = table_info["questions"]

    basecourse = app.config.html_context.get("basecourse", "unknown")

    # Remove the chapter / subchapter info
    logger.info("Deleteing Chapter / Subchapter info for {}".format(basecourse))
    logger.info(
        "Warning - always use build --all to ensure chapter info is consistent!"
    )
    sess.execute(chapters.delete().where(chapters.c.course_id == basecourse))

    # chapters = Table("chapters", meta, autoload=True, autoload_with=engine)
    # sub_chapters = Table("sub_chapters", meta, autoload=True, autoload_with=engine)
    # questions = Table("questions", meta, autoload=True, autoload_with=engine)

    dynamic_pages = app.config.html_context.get("dynamic_pages", False)
    if dynamic_pages:
        cname = basecourse
    else:
        cname = app.env.config.html_context.get("course_id", "unknown")

    for chap in chaptitles:
        logger.info(f"Updating Database for {chap}")

        # insert row for chapter in the chapter table and get the id
        # logger.info("Adding Chapter/subchapter info for {}".format(chap))
        # check if chapter is already there
        sel = select([chapters]).where(
            and_(chapters.c.course_id == cname, chapters.c.chapter_label == chap)
        )
        res = sess.execute(sel).first()
        if not res:
            ins = chapters.insert().values(
                chapter_name=chaptitles.get(chap, chap),
                course_id=cname,
                chapter_label=chap,
                chapter_num=chap_numbers[chap],
            )
            res = sess.execute(ins)
            currentRowId = res.inserted_primary_key[0]
        else:
            currentRowId = res.id

        # If this chapter doesn't have subchapters, then skip them -- hence, use ``subtitles.get(chap, [])`` instead of ``subtitles[chap]``.
        for sub in subtitles.get(chap, []):
            if (chap, sub) in skips:
                skipreading = "T"
            else:
                skipreading = "F"
            # insert row for subchapter
            # todo: check if this chapter/subchapter is in the non-reading list
            q_name = "{}/{}".format(chaptitles.get(chap, chap), subtitles[chap][sub])
            ins = sub_chapters.insert().values(
                sub_chapter_name=subtitles[chap][sub],
                chapter_id=str(currentRowId),
                sub_chapter_label=sub,
                skipreading=skipreading,
                sub_chapter_num=subchap_numbers[chap][sub],
            )
            sess.execute(ins)
            # Three possibilities:
            # 1) The chapter and subchapter labels match existing, but the q_name doesn't match; because you changed
            # heading in a file.
            # 2) The chapter and subchapter labels don't match (new file name), but there is an existing q_name match,
            # because you renamed the file
            # 3) Neither match, so insert a new question
            sel = select([questions]).where(
                or_(
                    and_(
                        questions.c.chapter == chap,
                        questions.c.subchapter == sub,
                        questions.c.question_type == "page",
                        questions.c.base_course == basecourse,
                    ),
                    and_(
                        questions.c.name == q_name,
                        questions.c.question_type == "page",
                        questions.c.base_course == basecourse,
                    ),
                )
            )
            res = sess.execute(sel).first()
            if res and (
                (res.name != q_name) or (res.chapter != chap) or (res.subchapter != sub)
            ):
                # Something changed
                upd = (
                    questions.update()
                    .where(questions.c.id == res["id"])
                    .values(name=q_name, chapter=chap, from_source="T", subchapter=sub)
                )
                sess.execute(upd)
            if not res:
                # this is a new subchapter
                ins = questions.insert().values(
                    chapter=chap,
                    subchapter=sub,
                    question_type="page",
                    from_source="T",
                    name=q_name,
                    timestamp=datetime.now(),
                    base_course=basecourse,
                )
                sess.execute(ins)
