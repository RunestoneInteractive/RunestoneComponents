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
import docutils
from sqlalchemy import Table, select, and_
from runestone.server.componentdb import engine, meta

def setup(app):
    """
    The setup function ensures that we install this module as a Sphinx extension. Even though
    we are not going for a new directive or role we can use the extension mechanism to add
    specific event handlers.
    """
    app.connect('doctree-resolved', doctree_resolved)
    app.connect('build-finished', build_finished)

chap_order = [] # correct chapter order from the index.rst
sub_ids_for_chapter = {} # list of subchapter ids fromthe doctree for each chapter
chaptitles = {} # chapter titles from the doctree
subtitles = {} # The proper title of each sub chapter from the doctree
subchap_order = {}  # order of the subchapters, gleaned from the toctree.rst file

def doctree_resolved(app, doctree, docname):
    """
    Called in response to the doctree-resolved even in Sphinx.  This means that for
    a given document the doctree is complete and the TOC is fully realized.

    * Walk the sections in this document, grabbing the nicely formatted title, in fact we only
      want the first title as we don't track sub-sub sections.
    * If this is a toctree document then read that document to get the correct order.abs
    * If this is the top level index document then do the same for the toctree inclusions

    """
    for section in doctree.traverse(docutils.nodes.section):
        #print(section.source ,dir(section.document))
        title = section.next_node(docutils.nodes.Titular)
        # Section.source is something like ``/abs/path/to/chap/subchap.rst``. Set ``chap_id = 'chap'`` and ``subchap_id = 'subchap'``.
        chap_id = os.path.basename(os.path.dirname(section.source))
        subchap_id = os.path.splitext(os.path.basename(section.source))[0]
        if subchap_id == 'index' and chap_order == []:
            chap_order.extend(get_top_toc(section.source))
        if chap_id not in sub_ids_for_chapter:
            sub_ids_for_chapter[chap_id] = []
        if chap_id not in subtitles:
            subtitles[chap_id] = {}
        if title:
            if subchap_id == 'toctree':
                subchap_order[chap_id] = get_toctree(section.source)
                chaptitles[chap_id] = title.astext()
            if subchap_id not in sub_ids_for_chapter[chap_id]:
                sub_ids_for_chapter[chap_id].append(subchap_id)
            if subchap_id not in subtitles[chap_id]:
                subtitles[chap_id][subchap_id] = title.astext()


def build_finished(app, ex):
    """
    When the build is completely finished output the information gathered about
    chapters and subchapters into the database.
    """
    if not engine:
        print("You need to install a DBAPI module - psycopg2 for Postgres")
        return
    print("Populating the database with Chapter information")
    course_id = app.env.config.html_context.get('course_id', "unknown")
    chapters = Table('chapters', meta, autoload=True, autoload_with=engine)
    sub_chapters = Table('sub_chapters', meta, autoload=True, autoload_with=engine)
    questions = Table('questions', meta, autoload=True, autoload_with=engine)
    basecourse = app.config.html_context.get('basecourse',"unknown")
    print("Cleaning up old chapters info")
    engine.execute(chapters.delete().where(chapters.c.course_id == course_id))
    if 'Labs' in sub_ids_for_chapter:
        chap_order.append('Labs')
        subchap_order['Labs'] = sub_ids_for_chapter['Labs']
    for chap in chap_order:
        # insert row for chapter in the chapter table and get the id
        print(u"Adding chapter subchapter info for {}".format(chap))
        ins = chapters.insert().values(chapter_name=chaptitles.get(chap, chap),
                                       course_id=course_id, chapter_label=chap)
        res = engine.execute(ins)
        currentRowId = res.inserted_primary_key[0]
        for sub in subchap_order[chap]:
            # insert row for subchapter
            q_name = u"{}/{}".format(chaptitles.get(chap,chap), subtitles[chap][sub])
            ins = sub_chapters.insert().values(sub_chapter_name=subtitles[chap][sub],
                                               chapter_id=str(currentRowId),
                                               sub_chapter_label=sub)
            engine.execute(ins)
            sel = select([questions]).where(and_(questions.c.chapter == chap,
                                              questions.c.subchapter == sub,
                                              questions.c.question_type == 'page',
                                              questions.c.base_course == basecourse))
            res = engine.execute(sel).first()
            if res and res.name != q_name:
                # In this case the title has changed
                upd = questions.update().where(questions.c.id == res['id']).values(name=q_name)
                engine.execute(upd)
            if not res:
                # this is a new subchapter
                ins = questions.insert().values(chapter=chap, subchapter=sub,
                                            question_type='page',
                                            name=q_name,
                                            timestamp=datetime.datetime.now(),   
                                            base_course=basecourse)
                engine.execute(ins)
    

def get_toctree(path):
    """
    Process the toctree for a chapter.
    """
    all_lines = open(path, 'r').readlines()
    ix = -1
    found = False
    # find the toctree directive
    for ix, line in enumerate(all_lines):
        if ".. toctree::" in line:
            found = True
            break

    if ix == -1 or not found:
        raise TypeError("This file does not appear to contain a toctree directive")

    # now read parameter line until we find a blank.
    iy = 0
    for iy, line in enumerate(all_lines[ix+1:]):
        if re.match(r'^\s*$', line):
            break

    return [x.strip().replace('.rst', '') for x in all_lines[ix+iy+2:] if not re.match(r'^\s*$', x)]


def get_top_toc(path):
    """
    Process the top level toctree for the index.rst file.
    """
    all_lines = open(path, 'r').readlines()

    return [x.strip().replace('/toctree.rst', '') for x in all_lines if "toctree.rst" in x]
