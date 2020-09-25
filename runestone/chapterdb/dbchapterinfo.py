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

import os.path
from collections import OrderedDict
import docutils
import pdb
from sphinx.util import logging

logger = logging.getLogger(__name__)
logger.setLevel(30)

ignored_chapters = ["", "FrontBackMatter", "Appendices"]


def setup(app):
    """
    The setup function ensures that we install this module as a Sphinx extension. Even though
    we are not going for a new directive or role we can use the extension mechanism to add
    specific event handlers.
    """
    global dburl, engine, meta, sess, questions, assignments, assignment_questions, courses, competency, chapters, sub_chapters, cname
    # app.connect("env-get-updated", test_updated)
    app.connect("doctree-resolved", env_updated)


def env_updated(app, doctree, docname):
    """
    This may be the best place to walk the completed document with TOC
    """
    # pdb.set_trace()
    # ``docname`` is stored with Unix-style forward slashes, even on Windows. Therefore, we can't use ``os.path.basename`` or ``os.sep``.
    splits = docname.split("/")
    # If the docname is ``'index'``, then set ``chap_id`` to an empty string.
    chap_id = splits[-2] if len(splits) > 1 else ""
    subchap_id = splits[-1]

    if not hasattr(app.env, "chap_titles"):
        app.env.chap_titles = {}
        app.env.chap_numbers = {}
        app.env.subchap_titles = {}
        app.env.subchap_numbers = {}
        app.env.skips = {}

    if "toctree" in docname:
        secnum_tuple = app.env.toc_secnumbers.get(docname, {}).get("")
        chap_num = secnum_tuple[0] if secnum_tuple else 999
        app.env.chap_numbers[chap_id] = chap_num
        chap_title = (
            list(doctree.traverse(docutils.nodes.section))[0]
            .next_node(docutils.nodes.Titular)
            .astext()
        )
        app.env.chap_titles[chap_id] = f"{chap_num}. {chap_title}"
        return []

    for section in doctree.traverse(docutils.nodes.section):
        # Find the section number of the current document. See `../common/question_number.py` for details.
        secnum_tuple = app.env.toc_secnumbers.get(docname, {}).get("")
        # Gievn a section number as a tuple, such as ``(1, 2, 3)``, turn this into the string "1.2.3 ".
        secnum_str = ".".join(map(str, secnum_tuple)) + " " if secnum_tuple else ""
        # Prepend it to the title.
        title = secnum_str + section.next_node(docutils.nodes.Titular).astext()
        # pdb.set_trace()

        if hasattr(app.env, "skipreading") and docname in app.env.skipreading:
            app.env.skips[(chap_id, subchap_id)] = True

        if chap_id in ignored_chapters or subchap_id == "index":
            continue
        if chap_id not in app.env.chap_titles:
            chap_num = secnum_tuple[0] if secnum_tuple else 999
            # Make sure we have at least the default chapter title for this chapter
            # otherwise it will be set properly in the toctree processing above.
            if not app.env.chap_titles.get(chap_id, False):
                app.env.chap_titles[chap_id] = f"{chap_num}. {chap_id}"
            app.env.chap_numbers[chap_id] = chap_num

        if chap_id not in app.env.subchap_titles:
            app.env.subchap_titles[chap_id] = OrderedDict()
            app.env.subchap_numbers[chap_id] = OrderedDict()
        if subchap_id not in app.env.subchap_titles[chap_id]:
            app.env.subchap_titles[chap_id][subchap_id] = title
            app.env.subchap_numbers[chap_id][subchap_id] = make_subchap_num(
                secnum_tuple
            )
            logger.debug(
                f"{chap_id} - {subchap_id} {app.env.subchap_numbers[chap_id][subchap_id]}    {secnum_tuple}                "
            )

    return []


def make_subchap_num(sn_tuple):
    if not sn_tuple:
        return 0

    if len(sn_tuple) > 2:
        return sn_tuple[1] * 100 + sn_tuple[2]
    elif len(sn_tuple) == 2:
        return sn_tuple[1] * 100
