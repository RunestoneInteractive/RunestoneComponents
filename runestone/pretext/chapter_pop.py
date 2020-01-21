import datetime
import os
import xml.etree.ElementTree as ET

from sqlalchemy import create_engine, Table, MetaData, select
from sqlalchemy.orm.session import sessionmaker

if os.environ["WEB2PY_CONFIG"] == "development":
    DBURL = os.environ["DEV_DBURL"]
elif os.environ["WEB2PY_CONFIG"] == "production":
    DBURL = os.environ["DBURL"]

course_name = "fcla"

engine = create_engine(DBURL)
Session = sessionmaker()
engine.connect()
Session.configure(bind=engine)
sess = Session()
meta = MetaData()
courses = Table("courses", meta, autoload=True, autoload_with=engine)
chapters = Table("chapters", meta, autoload=True, autoload_with=engine)
subchapters = Table("sub_chapters", meta, autoload=True, autoload_with=engine)
questions = Table("questions", meta, autoload=True, autoload_with=engine)

tree = ET.parse("runestone-manifest.xml")
root = tree.getroot()
chap = 0
for chapter in root:
    chap += 1
    print(chapter.tag, chapter.find("./id").text, chapter.find("./title").text)
    ins = chapters.insert().values(
        chapter_name=chapter.find("./title").text,
        course_id=course_name,
        chapter_label=chapter.find("./id").text,
        chapter_num=chap,
    )
    res = sess.execute(ins)
    chapid = res.inserted_primary_key[0]
    subchap = 0
    #  sub_chapter_name   | character varying(512)
    #  chapter_id         | integer
    #  sub_chapter_label  | character varying(512)
    #  skipreading        | character(1)
    #  sub_chapter_num    | integer
    for subchapter in chapter.findall("./subchapter"):
        subchap += 1
        print(subchapter.find("./id").text, subchapter.find("./title").text)
        ins = subchapters.insert().values(
            sub_chapter_name=subchapter.find("./title").text,
            chapter_id=chapid,
            sub_chapter_label=subchapter.find("./id").text,
            skipreading="F",
            sub_chapter_num=subchap,
        )
        sess.execute(ins)

        ins = questions.insert().values(
            base_course=course_name,
            name="{}/{}".format(
                chapter.find("./title").text, subchapter.find("./title").text
            ),
            timestamp=datetime.datetime.now(),
            is_private="F",
            question_type="page",
            subchapter=subchapter.find("./id").text,
            chapter=chapter.find("./id").text,
            from_source="T",
        )
        sess.execute(ins)

        for question in subchapter.findall("./question"):
            dbtext = ET.tostring(question.find("./"))
            print(dbtext.decode("utf8"))
            el = question.find(".//*[@data-component]")
            idchild = el.attrib["id"]
            res = sess.execute(
                """select * from questions where name='{idchild}' and base_course='{course_name}'"""
            ).first()
            if res:
                pass
                # update
            else:
                ins = questions.insert().values(
                    base_course=course_name,
                    name=idchild,
                    timestamp=datetime.datetime.now(),
                    is_private="F",
                    question_type=el.attrib["data-component"],
                    htmlsrc=dbtext.decode("utf8"),
                    from_source="T",
                    subchapter=subchapter.find("./id").text,
                    chapter=chapter.find("./id").text,
                )
                sess.execute(ins)


sess.commit()
