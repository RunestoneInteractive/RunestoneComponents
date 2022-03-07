# *********
# |docname|
# *********
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

__author__ = "bmiller"

from docutils import nodes
from docutils.parsers.rst import directives
from .textfield import textfield_role
from sqlalchemy import Table
from runestone.server.componentdb import (
    addQuestionToDB,
    addHTMLToDB,
    get_engine_meta,
    maybeAddToAssignment,
)
from runestone.common.runestonedirective import (
    RunestoneIdDirective,
    RunestoneIdNode,
)

try:
    from html import escape  # py3
except ImportError:
    from cgi import escape  # py2


def setup(app):
    app.add_directive("hparsons", HParsonsDirective)
    app.add_node(HParsonsNode, html=(visit_ac_node, depart_ac_node))


TEMPLATE_START = """
<div>
<div data-component="hparsons" id=%(divid)s data-question_label="%(question_label)s">
<div id=%(divid)s_question class="ac_question col-md-12">
"""

TEMPLATE_END = """
</div>
<textarea data-lang="%(language)s" id="%(divid)s_editor" 
    %(optional)s
    %(dburl)s
    %(showlastsql)s style="visibility: hidden;">
%(initialcode)s
</textarea>
</div>
</div>
"""


class HParsonsNode(nodes.General, nodes.Element, RunestoneIdNode):
    def __init__(self, options, **kwargs):
        super(HParsonsNode, self).__init__(**kwargs)
        self.runestone_options = options


# self for these functions is an instance of the writer class.  For example
# in html, self is sphinx.writers.html.SmartyPantsHTMLTranslator
# The node that is passed as a parameter is an instance of our node class.
def visit_ac_node(self, node):
    # print self.settings.env.activecodecounter

    # todo:  handle above in node.runestone_options

    node.delimiter = "_start__{}_".format(node.runestone_options["divid"])

    self.body.append(node.delimiter)

    res = TEMPLATE_START % node.runestone_options
    self.body.append(res)


def depart_ac_node(self, node):
    """This is called at the start of processing an activecode node.  If activecode had recursive nodes
    etc and did not want to do all of the processing in visit_ac_node any finishing touches could be
    added here.
    """
    res = TEMPLATE_END % node.runestone_options
    self.body.append(res)

    addHTMLToDB(
        node.runestone_options["divid"],
        node.runestone_options["basecourse"],
        "".join(self.body[self.body.index(node.delimiter) + 1 :]),
    )

    self.body.remove(node.delimiter)


def process_activcode_nodes(app, env, docname):
    pass


def purge_activecodes(app, env, docname):
    pass


class HParsonsDirective(RunestoneIdDirective):
    # only keep: language, autograde, dburl
    """
    .. activecode:: uniqueid
       :autograde: unittest
       :language: python, html, javascript, java, python2, python3
       :dburl: url to load database for sql mode
       :showlastsql: -- Only show the last sql result in output

        If this is a homework problem instead of an example in the text
        then the assignment text should go here.  The assignment text ends with
        the line containing four tilde ~
        ~~~~
        print("Hidden code before students code - good for scaffolding")
        ^^^^
        print("hello world")
        ====
        print("Hidden code, such as unit tests come after the four = signs")

    config values (conf.py):

    - activecode_div_class - custom CSS class of the component's outermost div
    - activecode_hide_load_history - if True, hide the load history button
    """

    required_arguments = 1
    optional_arguments = 1
    has_content = True
    option_spec = RunestoneIdDirective.option_spec.copy()
    option_spec.update(
        {
            "language": directives.unchanged,
            "dburl": directives.unchanged,
            "showlastsql": directives.flag,
        }
    )

    def run(self):
        super(HParsonsDirective, self).run()

        env = self.state.document.settings.env
        # keep track of how many activecodes we have....
        # could be used to automatically make a unique id for them.
        if not hasattr(env, "activecodecounter"):
            env.activecodecounter = 0
        env.activecodecounter += 1
        self.options["name"] = self.arguments[0].strip()

        explain_text = None
        if self.content:
            if "~~~~" in self.content:
                idx = self.content.index("~~~~")
                explain_text = self.content[:idx]
                self.content = self.content[idx + 1 :]
            source = "\n".join(self.content)
        else:
            source = "\n"

        self.explain_text = explain_text or ["Not an Exercise"]
        addQuestionToDB(self)

        self.options["initialcode"] = source
        str = source.replace("\n", "*nline*")
        str0 = str.replace('"', "*doubleq*")
        str1 = str0.replace("(", "*open*")
        str2 = str1.replace(")", "*close*")
        str3 = str2.replace("'", "*singleq*")
        self.options["argu"] = str3

        if "language" not in self.options:
            self.options["language"] = "python"

        # SQL Options
        if "dburl" in self.options:
            self.options["dburl"] = "data-dburl='{}'".format(self.options["dburl"])
        else:
            self.options["dburl"] = ""

        if "showlastsql" in self.options:
            self.options["showlastsql"] = 'data-showlastsql="true"'
        else:
            self.options["showlastsql"] = ""

        course_name = env.config.html_context["course_id"]
        divid = self.options["divid"]

        engine, meta, sess = get_engine_meta()

        if engine:
            Source_code = Table(
                "source_code", meta, autoload=True, autoload_with=engine
            )
            engine.execute(
                Source_code.delete()
                .where(Source_code.c.acid == divid)
                .where(Source_code.c.course_id == course_name)
            )
            engine.execute(
                Source_code.insert().values(
                    acid=divid,
                    course_id=course_name,
                    main_code=source,
                    suffix_code=suffix,
                )
            )
        else:
            if (
                not hasattr(env, "dberr_activecode_reported")
                or not env.dberr_activecode_reported
            ):
                env.dberr_activecode_reported = True
                print(
                    "Unable to save to source_code table in activecode.py. Possible problems:"
                )
                print("  1. dburl or course_id are not set in conf.py for your book")
                print("  2. unable to connect to the database using dburl")
                print("")
                print(
                    "This should only affect the grading interface. Everything else should be fine."
                )

        acnode = HParsonsNode(self.options, rawsource=self.block_text)
        acnode.source, acnode.line = self.state_machine.get_source_and_line(self.lineno)
        self.add_name(acnode)  # make this divid available as a target for :ref:

        maybeAddToAssignment(self)
        if explain_text:
            self.state.nested_parse(explain_text, self.content_offset, acnode)

        return [acnode]
