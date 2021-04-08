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

__author__ = "rmorelli"

# Debug flag
DEBUG = True

import os, shutil
from docutils import nodes
from runestone.common import RunestoneIdDirective, RunestoneIdNode
from runestone.server.componentdb import addQuestionToDB, addHTMLToDB
from pathlib import Path
from ..mchoice.assessbase import Assessment

# Template that will load index.html?quizname=the-quiz-name into an <iframe>
# The only placeholder in the template is the quizname=###
#         <div style="border: 1px solid black; margin: 5px; padding: 5px;">
#       <div class="%(divclass)s">
QUIZLY_TEMPLATE = """
       <div class="runestone alert alert-warning">
       <div data-component="quizly" id="%(divid)s" data-question_label="%(question_label)s" style="visibility: visible;">
         <iframe height="595" src="../_static/quizly/index.html?backpack=hidden&amp;selector=hidden&amp;quizname=###&amp;hints=true&amp;repeatable=false" style="border: 0px; margin: 1px; padding: 1px;" width="100%%">
         </iframe>
       </div>
       </div>
       """

# Resource files are stored in the _static directory, from where they
# are automatically copied into build/x/_static, where 'x' is the project name
STATIC_DIR = "./_static"

# Define the quizly directive
def setup(app):
    app.add_directive("quizly", Quizly)
    app.add_node(QuizlyNode, html=(visit_quizly_node, depart_quizly_node))
    app.connect("doctree-resolved", process_activcode_nodes)
    app.connect("env-purge-doc", purge_activecodes)

# Copy the resource files into the _static folder
# The resources should be organized as follows:
# _static
# |-quizly
#   |- all_appinventor.js - compressed js files
#   |- all_blockly.js     - compressed js files
#   |- all_quizly.js      - compressed js files
#   |- quizme-helper.js - main source code
#   |- quizzes.js       - quizly quizzes
#   |- index.html       - container for the iframe
#   |- blockly.html     - blockly iframe
#   |- media            - folder of images, etc.
# Perhaps there's a runestone routine to copy files?
# TODO: This may need to be generalized with better relative paths??
def copyfiles():
    CURR_DIR = os.path.dirname(os.path.realpath(__file__))
    QUIZLY_DIR = STATIC_DIR+'/quizly'
    MEDIA_DIR = QUIZLY_DIR+'/media'
    if os.path.exists(QUIZLY_DIR):
        shutil.rmtree(QUIZLY_DIR)
    os.mkdir(QUIZLY_DIR, mode=0o755)
    os.mkdir(QUIZLY_DIR+'/media', mode=0o755)
    js_folder = Path(CURR_DIR).rglob('js/*.js')
    html_folder = Path(CURR_DIR).rglob('js/*.html')
    media_folder = Path(CURR_DIR).rglob('js/media/*')
    files = [x for x in js_folder]
    print('Copying resource files to ' + STATIC_DIR) if DEBUG else None
    for f in files:
        print(str(f) + ' --> ' + QUIZLY_DIR) if DEBUG else None
        shutil.copy(f, QUIZLY_DIR)
    files = [x for x in html_folder]
    for f in files:
        print(str(f) + ' --> ' + QUIZLY_DIR) if DEBUG else None 
        shutil.copy(f, QUIZLY_DIR)
    files = [x for x in media_folder]
    for f in files:
        print(str(f) + ' --> ' + MEDIA_DIR) if DEBUG else None
        shutil.copy(f, MEDIA_DIR)

class QuizlyNode(nodes.General, nodes.Element, RunestoneIdNode):
    def __init__(self, content, **kwargs):
        """

        Arguments:
        - `self`:
        - `content`:
        """
        super(QuizlyNode, self).__init__(**kwargs)
        self.runestone_options = content
        print('DEBUG: QuizlyNode content = ' + str(content)) if DEBUG else None
        self.quizname = str(content['controls'][0])
        self.quizname = str.strip(self.quizname[10:])
        self.template = QUIZLY_TEMPLATE.replace('###', self.quizname)
        print('DEBUG: QuizlyNode self.quizname = ' + self.quizname) if DEBUG else None


# self for these functions is an instance of the writer class.  For example
# in html, self is sphinx.writers.html.SmartyPantsHTMLTranslator
# The node that is passed as a parameter is an instance of our node class.
def visit_quizly_node(self, node):

    node.delimiter = "_start__{}_".format(node.runestone_options["divid"])
    self.body.append(node.delimiter)

    print('DEBUG: visit_quizly_node quizname = ' + node.quizname) if DEBUG else None
    print('DEBUG: visit_quizly_node template = ' + node.template) if DEBUG else None
    print('DEBUG: visit_quizly_node options = ' + str(node.runestone_options)) if DEBUG else None
#    res = QUIZLY_TEMPLATE.replace("###", node.quizname)
    res = node.template % (node.runestone_options)
#    res = node.template
#     path = os.path.join(
#         node.runestone_options["quizlyHomePrefix"],
#         "_static",
#         node.runestone_options["divid"] + ".html",
#     )
#     print('DEBUG: visit_quizly_node  path = ' + path) if DEBUG else None

    copyfiles()  # Copy resource files

#     f = open(path, "w")
#     f.write(res)           # e.g., writes ./_static/q1.html
#     f.close()
    print('DEBUG: visit_quizly_node res = ' + res) if DEBUG else None
    self.body.append(res)


def depart_quizly_node(self, node):
    """ This is called at the start of processing an activecode node.  If activecode had recursive nodes
        etc and did not want to do all of the processing in visit_ac_node any finishing touches could be
        added here.
    """
    print('DEBUG: depart_quizly_node') if DEBUG else None
    self.body.remove(node.delimiter)
    pass


def process_activcode_nodes(app, env, docname):
    pass


def purge_activecodes(app, env, docname):
    pass


class Quizly(RunestoneIdDirective):
    """
    .. quizly:: some_unique_id, e.g., q1

       :quizname: quiz_eval_expression
    """
    required_arguments = 1
    optional_arguments = 0
    has_content = True
    option_spec = {}

    def run(self):
        super(Quizly, self).run()
        print('DEBUG; Quizly.run()') if DEBUG else None

        addQuestionToDB(self)
# Not sure where these settings are done??
# So I've hard coded a div_class into template
#        env = self.state.document.settings.env
#        print('DEBUG: run() divclass = ' + env.config.quizly_div_class) if DEBUG else None
#        self.options["divclass"] = env.config.quizly_div_class

        document = self.state.document
        rel_filename, filename = document.settings.env.relfn2path(self.arguments[0])

        pathDepth = rel_filename.count("/")
        self.options["quizlyHomePrefix"] = "./" * pathDepth

        plstart = len(self.content)
#         if "preload::" in self.content:
#             plstart = self.content.index("preload::")
#             self.options["preload"] = " ".join(self.content[plstart + 1 :])

        if self.content:
            self.options["controls"] = self.content[:plstart]

        quizly_node = QuizlyNode(self.options, rawsource=self.block_text)
        quizly_node.source, quizly_node.line = self.state_machine.get_source_and_line(
            self.lineno
        )
        print('DEBUG: run() self.content = ' + str(self.content)) if DEBUG else None
        print('DEBUG: run() quizly_node = ' + str(quizly_node)) if DEBUG else None
        return [quizly_node]

