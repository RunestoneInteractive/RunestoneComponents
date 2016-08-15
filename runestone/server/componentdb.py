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
from sqlalchemy import create_engine, Table, MetaData, select, delete, update, and_


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
    if all(name in os.environ for name in ['DBHOST', 'DBPASS', 'DBUSER', 'DBNAME']):
        dburl = 'postgresql://{DBUSER}:{DBPASS}@{DBHOST}/{DBNAME}'.format(**os.environ)
    else:
        dburl = None

    if dburl:
        basecourse = self.state.document.settings.env.config.html_context.get('basecourse', "unknown")
        if basecourse == "unknown":
            raise self.severe("Cannot update database because basecourse is unknown")
            return

        last_changed = datetime.now()

        engine = create_engine(dburl)
        meta = MetaData()
        questions = Table('questions', meta, autoload=True, autoload_with=engine)
        if 'difficulty' in self.options:
            difficulty = self.options['difficulty']
        else:
            difficulty = 3

        if 'author' in self.options:
            author = self.options['author']
        else:
            author = os.environ.get('USER','Brad Miller')

        srcpath, line = self.state_machine.get_source_and_line()
        subchapter = os.path.basename(srcpath).replace('.rst','')
        chapter = srcpath.split(os.path.sep)[-2]

        sel = select([questions]).where(and_(questions.c.name == self.arguments[0],
                                              questions.c.base_course == basecourse))
        res = engine.execute(sel).first()
        try:
            if res:
                if res['question'] != self.block_text:
                    stmt = questions.update().where(questions.c.id == res['id']).values(question = self.block_text.encode('utf8'), timestamp=last_changed)
                    engine.execute(stmt)
            else:
                ins = questions.insert().values(base_course=basecourse, name=self.arguments[0],
                                                question=self.block_text.encode('utf8'), timestamp=last_changed, is_private='F',
                                                question_type=self.name, subchapter=subchapter,
                                                author=author,difficulty=difficulty,chapter=chapter)
                engine.execute(ins)
        except UnicodeEncodeError:
            raise self.severe("Bad character in directive {} in {}/{} this will not be saved to the DB".format(self.arguments[0], self.chapter, self.subchapter))

def addHTMLToDB(divid, basecourse, htmlsrc):
    if all(name in os.environ for name in ['DBHOST', 'DBPASS', 'DBUSER', 'DBNAME']):
        dburl = 'postgresql://{DBUSER}:{DBPASS}@{DBHOST}/{DBNAME}'.format(**os.environ)
    else:
        dburl = None

    if dburl:
        last_changed = datetime.now()
        engine = create_engine(dburl)
        meta = MetaData()
        questions = Table('questions', meta, autoload=True, autoload_with=engine)
        sel = select([questions]).where(and_(questions.c.name == divid,
                                              questions.c.base_course == basecourse))
        res = engine.execute(sel).first()
        try:
            if res:
                if res['htmlsrc'] != htmlsrc:
                    stmt = questions.update().where(questions.c.id == res['id']).values(htmlsrc = htmlsrc.encode('utf8'), timestamp=last_changed)
                    engine.execute(stmt)
        except UnicodeEncodeError:
            print("Bad character in directive {}".format(divid))
        except:
            print("Error while trying to add directive {} to the DB".format(divid))

