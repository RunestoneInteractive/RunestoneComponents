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

import docutils
import re
from sqlalchemy import Table
from runestone.server.componentdb import engine, meta

def setup(app):
    app.connect('doctree-resolved', doctree_resolved)
    app.connect('build-finished', build_finished)

chapOrder = [] # correct chapter order from the index.rst
chapId = '' # current chapter not sure this needs to be global
chapsubs = {} # list of subchapter ids fromthe doctree for each chapter
chaptitles = {} # chapter titles from the doctree
subtitles = {} # The proper title of each sub chapter from the doctree
subchap_order = {}  # order of the subchapters, gleaned from the toctree.rst file

def doctree_resolved(app, doctree, docname):
    global chapId
    for section in doctree.traverse(docutils.nodes.section):
        #print(section.source,dir(section.document))
        title = section.next_node(docutils.nodes.Titular)
        pl = section.source.split('/')
        chapId = pl[-2]
        subchapId = pl[-1].replace('.rst','')
        if subchapId == 'index':
            chapOrder.extend(get_top_toc(section.source))
        if chapId not in chapsubs:
            chapsubs[chapId] = []
        if chapId not in subtitles:
            subtitles[chapId] = {}
        if title:
            if subchapId == 'toctree':
                subchap_order[chapId] = get_toctree(section.source)
                chaptitles[chapId] = title.astext()
            if subchapId not in chapsubs[chapId]:
                chapsubs[chapId].append(subchapId)
            if subchapId not in subtitles:
                subtitles[chapId][subchapId] = title.astext()


def build_finished(app, ex):
    if not engine:
        print("You need to install a DBAPI module - psycopg2 for Postgres")
        return

    course_id = app.env.config.html_context.get('course_id', "unknown")
    chapters = Table('chapters', meta, autoload=True, autoload_with=engine)
    sub_chapters = Table('sub_chapters', meta, autoload=True, autoload_with=engine)

    engine.execute(chapters.delete().where(chapters.c.course_id == course_id))


    if 'Labs' in chapsubs:
        chapOrder.append('Labs')
        subchap_order['Labs'] = chapsubs['Labs']
    for chap in chapOrder:
        # insert row for chapter in the chapter table and get the id
        ins = chapters.insert().values(chapter_name=chaptitles.get(chap,chap),
                                  course_id=course_id, chapter_label=chap)
        res = engine.execute(ins)
        currentRowId = res.inserted_primary_key[0]
        for sub in subchap_order[chap]:
            # insert row for subchapter
            print(chap, chaptitles.get(chap,chap), sub, subtitles[chap][sub])
            ins = sub_chapters.insert().values(sub_chapter_name=subtitles[chap][sub],
                                    chapter_id=str(currentRowId),
                                    sub_chapter_label=sub)
            engine.execute(ins)

    
def get_toctree(path):
    all = open(path, 'r').readlines()

    for ix, line in enumerate(all):
        if ".. toctree::" in line:
            break

    for iy, line in enumerate(all[ix+1:]):
        if re.match(r'^\s*$', line):
            break

    return [x.strip().replace('.rst','') for x in all[ix+iy+2:] if not re.match(r'^\s*$', x)]

def get_top_toc(path):
    all = open(path, 'r').readlines()

    return [x.strip().replace('/toctree.rst','') for x in all if "toctree.rst" in x]

