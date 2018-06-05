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
from __future__ import print_function

__author__ = 'bmiller'

import re, datetime
import os.path
from collections import OrderedDict
import docutils
from sqlalchemy import Table, select, and_, or_
from runestone.server.componentdb import engine, meta
ignored_chapters = ["", "FrontBackMatter", "Appendices"]

def setup(app):
    """
    The setup function ensures that we install this module as a Sphinx extension. Even though
    we are not going for a new directive or role we can use the extension mechanism to add
    specific event handlers.
    """
    app.connect('env-updated', env_updated)


def update_database(chaptitles, subtitles, app):
    """
    When the build is completely finished output the information gathered about
    chapters and subchapters into the database.
    """
    if not engine:
        print("You need to install a DBAPI module - psycopg2 for Postgres")
        print("Or perhaps you have not set your DBURL environment variable")
        return

    course_id = app.env.config.html_context.get('course_id', "unknown")
    chapters = Table('chapters', meta, autoload=True, autoload_with=engine)
    sub_chapters = Table('sub_chapters', meta, autoload=True, autoload_with=engine)
    questions = Table('questions', meta, autoload=True, autoload_with=engine)
    basecourse = app.config.html_context.get('basecourse',"unknown")
    print("Cleaning up old chapters info")
    engine.execute(chapters.delete().where(chapters.c.course_id == course_id))

    print("Populating the database with Chapter information")
    for chap in chaptitles:
        # insert row for chapter in the chapter table and get the id
        print(u"Adding chapter subchapter info for {}".format(chap))
        ins = chapters.insert().values(chapter_name=chaptitles.get(chap, chap),
                                       course_id=course_id, chapter_label=chap)
        res = engine.execute(ins)
        currentRowId = res.inserted_primary_key[0]
        for sub in subtitles[chap]:
            # insert row for subchapter
            q_name = u"{}/{}".format(chaptitles.get(chap,chap), subtitles[chap][sub])
            ins = sub_chapters.insert().values(sub_chapter_name=subtitles[chap][sub],
                                               chapter_id=str(currentRowId),
                                               sub_chapter_label=sub)
            engine.execute(ins)
            # Three possibilities:
            # 1) The chapter and subchapter labels match existing, but the q_name doesn't match; because you changed
            # heading in a file.
            # 2) The chapter and subchapter labels don't match (new file name), but there is an existing q_name match,
            # because you renamed the file
            # 3) Neither match, so insert a new question
            sel = select([questions]).where(or_(and_(questions.c.chapter == chap,
                                                     questions.c.subchapter == sub,
                                                     questions.c.question_type == 'page',
                                                     questions.c.base_course == basecourse),
                                                and_(questions.c.name == q_name,
                                                     questions.c.question_type == 'page',
                                                     questions.c.base_course == basecourse))
                                            )
            res = engine.execute(sel).first()
            if res and ((res.name != q_name) or (res.chapter != chap) or (res.subchapter !=sub)):
                # Something changed
                upd = questions.update().where(questions.c.id == res['id']).values(name=q_name,
                                                                                   chapter = chap,
                                                                                   subchapter = sub)
                engine.execute(upd)
            if not res:
                # this is a new subchapter
                ins = questions.insert().values(chapter=chap, subchapter=sub,
                                            question_type='page',
                                            name=q_name,
                                            timestamp=datetime.datetime.now(),
                                            base_course=basecourse)
                engine.execute(ins)


def env_updated(app, env):
    """
    This may be the best place to walk the completed document with TOC
    """
    relations = env.collect_relations()
    included_docs = []
    updated_docs = []
    # Each relation is a list in the following order [parent, prev_doc, next_doc]
    cur_doc = env.config.master_doc
    while cur_doc:
        included_docs.append(cur_doc)
        doctree = env.get_doctree(cur_doc)
        cur_doc = relations[cur_doc][2]

    chap_titles = OrderedDict()
    subchap_titles = OrderedDict()

    for docname in included_docs:
        doctree = env.get_doctree(docname)
        for section in doctree.traverse(docutils.nodes.section):
            updated_docs.append(docname)
            title = section.next_node(docutils.nodes.Titular)
            # ``docname`` is stored with Unix-style forward slashes, even on Windows. Therefore, we can't use ``os.path.basename`` or ``os.sep``.
            splits = docname.split('/')
            # If the docname is ``'index'``, then set ``chap_id`` to an empty string.
            chap_id = splits[-2] if len(splits) > 1 else ''
            subchap_id = splits[-1]
            if chap_id in ignored_chapters or subchap_id == "index" :
                continue
            if chap_id not in chap_titles:
                if subchap_id == 'toctree':
                    chap_titles[chap_id] = title.astext()
                else:
                    chap_titles[chap_id] = chap_id
                    env.warn(docname, "Using a substandard chapter title")

            if chap_id not in subchap_titles:
                subchap_titles[chap_id] = OrderedDict()
            if subchap_id not in subchap_titles[chap_id] and subchap_id != 'toctree':
                subchap_titles[chap_id][subchap_id] = title.astext()

    update_database(chap_titles, subchap_titles, app)

    return []
