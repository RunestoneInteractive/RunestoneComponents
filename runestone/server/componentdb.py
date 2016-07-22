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
from sqlalchemy import create_engine, Table, MetaData, select, delete, update


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
        sl = ""
        sl += ".. {}:: {}\n".format(self.name, " ".join(self.arguments))
        for k, v in self.options.items():
            sl += "   :{}: {}\n".format(k, v)
        sl += "   \n"
        sl += "   " + "   \n".join(self.content)
        sl += "\n"

        basecourse = self.state.document.settings.env.config.html_context.get('basecourse', "unknown")
        last_changed = datetime.now()

        engine = create_engine(dburl)
        meta = MetaData()
        questions = Table('questions', meta, autoload=True, autoload_with=engine)

        sel = select([questions]).where(questions.c.name == self.arguments[0])
        res = engine.execute(sel).first()
        if res:
            if res['question'] != sl:
                stmt = questions.update().where(questions.c.id == res['id']).values(question = sl, timestamp=last_changed)
                engine.execute(stmt)
        else:
            ins = questions.insert().values(base_course=basecourse, name=self.arguments[0],
                                            question=sl, timestamp=last_changed,
                                            question_type=self.name)
            engine.execute(ins)



