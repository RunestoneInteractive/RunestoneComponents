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

__author__ = "bmiller"

import re, datetime
import os.path
from collections import OrderedDict
import docutils
from sqlalchemy import Table, select, and_, or_
from runestone.server.componentdb import get_dburl, get_engine_meta, get_table_meta
from sqlalchemy import create_engine, Table, MetaData, select, and_
from sqlalchemy.orm.session import sessionmaker

from sphinx.util import logging

logger = logging.getLogger(__name__)

ignored_chapters = ["", "FrontBackMatter", "Appendices"]


def setup(app):
    """
    The setup function ensures that we install this module as a Sphinx extension. Even though
    we are not going for a new directive or role we can use the extension mechanism to add
    specific event handlers.
    """
    global dburl, engine, meta, sess, questions, assignments, assignment_questions, courses, competency, chapters, sub_chapters, cname
    # app.connect("env-updated", env_updated)
    app.connect("doctree-resolved", env_updated)


def update_database(chaptitles, subtitles, skips, chap_numbers, subchap_numbers, app):
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

    # chapters = Table("chapters", meta, autoload=True, autoload_with=engine)
    # sub_chapters = Table("sub_chapters", meta, autoload=True, autoload_with=engine)
    # questions = Table("questions", meta, autoload=True, autoload_with=engine)

    basecourse = app.config.html_context.get("basecourse", "unknown")
    dynamic_pages = app.config.html_context.get("dynamic_pages", False)
    if dynamic_pages:
        cname = basecourse
    else:
        cname = app.env.config.html_context.get("course_id", "unknown")

    for chap in chaptitles:
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

        for sub in subtitles[chap]:
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
                    timestamp=datetime.datetime.now(),
                    base_course=basecourse,
                )
                sess.execute(ins)
    # sess.commit()


import pdb


def env_updated(app, doctree, docname):
    """
    This may be the best place to walk the completed document with TOC
    """
    if "toctree" in docname:
        return []

    chap_titles = OrderedDict()
    chap_numbers = OrderedDict()
    subchap_titles = OrderedDict()
    subchap_numbers = OrderedDict()
    skips = OrderedDict()

    for section in doctree.traverse(docutils.nodes.section):
        # Find the section number of the current document. See `../common/question_number.py` for details.
        secnum_tuple = app.env.toc_secnumbers.get(docname, {}).get("")
        # Gievn a section number as a tuple, such as ``(1, 2, 3)``, turn this into the string "1.2.3 ".
        secnum_str = ".".join(map(str, secnum_tuple)) + " " if secnum_tuple else ""
        # Prepend it to the title.
        title = secnum_str + section.next_node(docutils.nodes.Titular).astext()
        # ``docname`` is stored with Unix-style forward slashes, even on Windows. Therefore, we can't use ``os.path.basename`` or ``os.sep``.
        splits = docname.split("/")
        # If the docname is ``'index'``, then set ``chap_id`` to an empty string.
        chap_id = splits[-2] if len(splits) > 1 else ""
        subchap_id = splits[-1]

        if hasattr(app.env, "skipreading") and docname in app.env.skipreading:
            skips[(chap_id, subchap_id)] = True

        if chap_id in ignored_chapters or subchap_id == "index":
            continue
        if chap_id not in chap_titles:
            chap_num = secnum_tuple[0] if secnum_tuple else 999
            chap_titles[chap_id] = f"{chap_num}. {chap_id}"
            chap_numbers[chap_id] = chap_num

        if chap_id not in subchap_titles:
            subchap_titles[chap_id] = OrderedDict()
            subchap_numbers[chap_id] = OrderedDict()
        if subchap_id not in subchap_titles[chap_id]:
            subchap_titles[chap_id][subchap_id] = title
            subchap_numbers[chap_id][subchap_id] = (
                secnum_tuple[1] if secnum_tuple else 0
            )

    # pdb.set_trace()
    update_database(
        chap_titles, subchap_titles, skips, chap_numbers, subchap_numbers, app
    )

    return []
