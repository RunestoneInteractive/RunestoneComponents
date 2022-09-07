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

# This files runs during runestone build. It generates the node data
# that is used to render the component by the  quizly.js script.

# Note: An import entry for quizly must be included in runestone/__init__.py

# Note: The content files for the khanex component must be stored in the
# course's _static folder. Download the following file and unzip it in _static:
# https://github.com/ram8647/khanex/blob/16398fd496fad5b93fdf4d72c274064db8d1d1ac/khanex-runestone.zip

import shutil
import os
from pathlib import Path
from runestone.server.componentdb import addQuestionToDB, addHTMLToDB
from runestone.common import RunestoneIdDirective, RunestoneIdNode
from docutils import nodes

__author__ = "rmorelli"

# Debug flags
DEBUG = False
VERBOSE = False


# Template that will load index.html?quizname=the-quiz-name into an <iframe>
# NOTE: Hardcoding the container class.  Temporarily??
KHANEX_TEMPLATE = """
    <div class="runestone alert alert-warning %(optclass)s">
     <div  data-component="khanex" id="%(divid)s" data-question_label="%(question_label)s" style="visibility: visible;">
       <iframe style="transform:scale(0.7,1);transform-origin:0 0;" width="990px" height="490px" src="../_static/khanex/qs/###.html"></iframe>
     </div>
    </div>
       """

# Define the khanex directive


def setup(app):
    app.add_directive("khanex", Khanex)
    app.add_node(KhanexNode, html=(visit_khanex_html, depart_khanex_html))


# The only content needed from khanex.py is the exercise name


class KhanexNode(nodes.General, nodes.Element, RunestoneIdNode):
    pass


# self for these functions is an instance of the writer class.  For example
# in html, self is sphinx.writers.html.SmartyPantsHTMLTranslator
# The node that is passed as a parameter is an instance of our node class.


def visit_khanex_html(self, node):

    node["delimiter"] = "_start__{}_".format(node["runestone_options"]["divid"])
    self.body.append(node["delimiter"])

    print("DEBUG: visit_khanex_html exername = " + node["exername"]) if DEBUG else None
    print("DEBUG: visit_khanex_html template = " + node["template"]) if DEBUG else None
    print(
        "DEBUG: visit_khanex_html options = " + str(node["runestone_options"])
    ) if DEBUG else None

    res = node["template"] % (node["runestone_options"])
    print("DEBUG: visit_khanex_html res = " + res) if DEBUG else None
    self.body.append(res)


def depart_khanex_html(self, node):
    """This is called at the start of processing an activecode node.  If activecode had recursive nodes
    etc and did not want to do all of the processing in visit_ac_html any finishing touches could be
    added here.
    """
    print("DEBUG: depart_khanex_html") if DEBUG else None
    bc = node["runestone_options"]["basecourse"]
    addHTMLToDB(
        node["runestone_options"]["divid"],
        bc,
        "".join(self.body[self.body.index(node["delimiter"]) + 1 :]).replace(
            "../_static", f"/ns/books/published/{bc}/_static"
        ),
    )
    self.body.remove(node["delimiter"])
    pass


def process_activcode_nodes(app, env, docname):
    pass


def purge_activecodes(app, env, docname):
    pass


# The object created when the khanex directive is parsed in an RST.
# The exername is the only required argument.
class Khanex(RunestoneIdDirective):
    """
    .. khanex:: some_unique_id, e.g., ex1

       :exercise: unique-ex-name:
    """

    required_arguments = 1
    optional_arguments = 0
    has_content = True
    option_spec = RunestoneIdDirective.option_spec.copy()
    option_spec.update({})

    # This invokes the rendering code in js/khanex.js
    def run(self):
        super(Khanex, self).run()
        print("DEBUG; Khanex.run()") if DEBUG else None

        addQuestionToDB(self)  # Not sure whether this works?
        document = self.state.document
        rel_filename, filename = document.settings.env.relfn2path(self.arguments[0])

        pathDepth = rel_filename.count("/")
        self.options["khanexHomePrefix"] = "./" * pathDepth

        plstart = len(self.content)
        if self.content:
            self.options["controls"] = self.content[:plstart]

        khanex_node = KhanexNode()
        khanex_node["runestone_options"] = self.options
        khanex_node["exername"] = str(self.options["controls"][0])
        khanex_node["exername"] = str.strip(khanex_node["exername"][10:])
        khanex_node["template"] = KHANEX_TEMPLATE.replace(
            "###", khanex_node["exername"]
        )

        (
            khanex_node["source"],
            khanex_node["line"],
        ) = self.state_machine.get_source_and_line(self.lineno)
        return [khanex_node]
