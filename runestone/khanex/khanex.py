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

__author__ = "rmorelli"

# Debug flags
DEBUG = False
VERBOSE = False

import os, shutil
from docutils import nodes
from runestone.common import RunestoneIdDirective, RunestoneIdNode
from runestone.server.componentdb import addQuestionToDB, addHTMLToDB
from pathlib import Path

# Template that will load index.html?quizname=the-quiz-name into an <iframe>
# NOTE: Hardcoding the container class.  Temporarily??
KHANEX_TEMPLATE = """
    <div class="runestone alert alert-warning">
     <div  data-component="khanex" id="%(divid)s" data-question_label="%(question_label)s" style="visibility: visible;">
       <iframe style="transform:scale(0.7,1);transform-origin:0 0;" width="990px" height="490px" src="../_static/khanex/qs/###.html"></iframe>
     </div>
    </div>
       """

# Resource files should be stored in the X/_static directory, from where they
# will be automatically copied into build/x/_static, where 'x' is the project name
STATIC_DIR = "./_static"

# Copy the resource files into the _static folder, maintaining proper folder hierarchy
# The resources should be organized as follows:
# _static
# |-khanex
#   |- jquery.js - 
#   |- jquery-ui.js     
#   |- khan-exericse.js  - main source code
#   |- khan.html       - test case
#   |- khanex.js       - runestone js 
#   |- qs/             - our exercises directroy
#   |- css/            - css files and images
#   |- exercises/       - khan exercises
#   |- utils/           - js utilities
# Perhaps there's a runestone routine to copy files?
# TODO: Test this with MobileCSP units
def copyfiles():
    CURR_DIR = os.path.dirname(os.path.realpath(__file__))
    KHANEX_DIR = STATIC_DIR+'/khanex'
    CSS_DIR = KHANEX_DIR+'/css'
    IMG_DIR = KHANEX_DIR+'/css/images'
    QS_DIR = KHANEX_DIR+'/qs'
    UTILS_DIR = KHANEX_DIR+'/utils'
    UTEST_DIR = KHANEX_DIR+'/utils/test'
    EX_DIR = KHANEX_DIR+'/exercises'
    if os.path.exists(KHANEX_DIR):
        shutil.rmtree(KHANEX_DIR)
    os.mkdir(KHANEX_DIR, mode=0o755)
    os.mkdir(CSS_DIR, mode=0o755)
    os.mkdir(IMG_DIR, mode=0o755)
    os.mkdir(UTILS_DIR, mode=0o755)
    os.mkdir(UTEST_DIR, mode=0o755)
    os.mkdir(EX_DIR, mode=0o755)
    os.mkdir(QS_DIR, mode=0o755)
    js_folder = Path(CURR_DIR).glob('js/*.js')
    html_folder = Path(CURR_DIR).glob('js/*.html')
    css_folder = Path(CURR_DIR).glob('js/css/*.css')
    img_folder = Path(CURR_DIR).glob('js/css/images/*')
    utils_folder = Path(CURR_DIR).glob('js/utils/*.js')
    utest_folder = Path(CURR_DIR).glob('js/utils/test/*.js')
    qs_folder = Path(CURR_DIR).glob('js/qs/*')
    ex_folder = Path(CURR_DIR).glob('js/exercises/*')
    print('Copying resource files to ' + STATIC_DIR) if VERBOSE else None
    files = [x for x in js_folder]
    for f in files:
        print(str(f) + ' --> ' + KHANEX_DIR) if VERBOSE else None
        shutil.copy(f, KHANEX_DIR)
    files = [x for x in html_folder]
    for f in files:
        print(str(f) + ' --> ' + KHANEX_DIR) if VERBOSE else None 
        shutil.copy(f, KHANEX_DIR)
    files = [x for x in css_folder]
    for f in files:
        print(str(f) + ' --> ' + CSS_DIR) if VERBOSE else None 
        shutil.copy(f, CSS_DIR)
    files = [x for x in img_folder]
    for f in files:
        print(str(f) + ' --> ' + IMG_DIR) if VERBOSE else None 
        shutil.copy(f, IMG_DIR)
    files = [x for x in utils_folder]
    for f in files:
        print(str(f) + ' --> ' + UTILS_DIR) if VERBOSE else None
        shutil.copy(f, UTILS_DIR)
    shutil.copytree(CURR_DIR + '/js/utils/MathJax', UTILS_DIR + '/MathJax')  

    files = [x for x in utest_folder]
    for f in files:
        print(str(f) + ' --> ' + UTEST_DIR) if VERBOSE else None
        shutil.copy(f, UTEST_DIR)
    files = [x for x in qs_folder]
    for f in files:
        print(str(f) + ' --> ' + QS_DIR) if VERBOSE else None
        shutil.copy(f, QS_DIR)
    files = [x for x in ex_folder]
    for f in files:
        print(str(f) + ' --> ' + EX_DIR) if VERBOSE else None
        shutil.copy(f, EX_DIR)

# Define the khanex directive
def setup(app):
    app.add_directive("khanex", Khanex)
    app.add_node(KhanexNode, html=(visit_khanex_node, depart_khanex_node))

# The only content needed from khanex.py is the exercise name
class KhanexNode(nodes.General, nodes.Element, RunestoneIdNode):
    def __init__(self, content, **kwargs):
        """
        Arguments:
        - `self`:
        - `content`:
        """
        super(KhanexNode, self).__init__(**kwargs)
        self.runestone_options = content
        print('DEBUG: KhanexNode content = ' + str(content)) if DEBUG else None
        self.exername = str(content['controls'][0])
        self.exername = str.strip(self.exername[10:])
        self.template = KHANEX_TEMPLATE.replace('###', self.exername)
        print('DEBUG: KhanexNode self.exername = ' + self.exername) if DEBUG else None
        print('DEBUG: KhanexNode self.template = ' + self.template) if DEBUG else None

# self for these functions is an instance of the writer class.  For example
# in html, self is sphinx.writers.html.SmartyPantsHTMLTranslator
# The node that is passed as a parameter is an instance of our node class.
def visit_khanex_node(self, node):

    node.delimiter = "_start__{}_".format(node.runestone_options["divid"])
    self.body.append(node.delimiter)

    print('DEBUG: visit_khanex_node exername = ' + node.exername) if DEBUG else None
    print('DEBUG: visit_khanex_node template = ' + node.template) if DEBUG else None
    print('DEBUG: visit_khanex_node options = ' + str(node.runestone_options)) if DEBUG else None

    res = node.template % (node.runestone_options)
    copyfiles()  # Copy resource files
    print('DEBUG: visit_khanex_node res = ' + res) if DEBUG else None
    self.body.append(res)


def depart_khanex_node(self, node):
    """ This is called at the start of processing an activecode node.  If activecode had recursive nodes
        etc and did not want to do all of the processing in visit_ac_node any finishing touches could be
        added here.
    """
    print('DEBUG: depart_khanex_node') if DEBUG else None
    addHTMLToDB(
        node.runestone_options["divid"],
        node.runestone_options["basecourse"],
        "".join(self.body[self.body.index(node.delimiter) + 1 :]),
    )
    self.body.remove(node.delimiter)
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
    option_spec = {}

    # This invokes the rendering code in js/khanex.js
    def run(self):
        super(Khanex, self).run()
        print('DEBUG; Khanex.run()') if DEBUG else None

        addQuestionToDB(self)   # Not sure whether this works?
        document = self.state.document
        rel_filename, filename = document.settings.env.relfn2path(self.arguments[0])

        pathDepth = rel_filename.count("/")
        self.options["khanexHomePrefix"] = "./" * pathDepth

        plstart = len(self.content)
        if self.content:
            self.options["controls"] = self.content[:plstart]

        khanex_node = KhanexNode(self.options, rawsource=self.block_text)
        khanex_node.source, khanex_node.line = self.state_machine.get_source_and_line(
            self.lineno
        )
        print('DEBUG: run() self.content = ' + str(self.content)) if DEBUG else None
        print('DEBUG: run() khanex_node = ' + str(khanex_node)) if DEBUG else None
        return [khanex_node]

