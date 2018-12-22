# Copyright (C) 2017 Wayne Brown
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

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
import string
import re
import os
from runestone.common.runestonedirective import add_codemirror_css_and_js

__author__ = 'wayne brown'


# --------------------------------------------------------------------------
def setup(app):
    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    # Define a webgldemo directive
    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    app.add_directive('webgldemo', WebglDemo)

    app.add_autoversioned_stylesheet('webgldemo.css')

    app.add_node(WebglDemoNode, html=(visit_webgldemo_node, depart_webgldemo_node))

    app.connect('doctree-resolved', process_webgldemo_nodes)
    app.connect('env-purge-doc', purge_webgldemos)

    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    # Define a webglinteractive directive
    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    app.add_directive('webglinteractive', WebglInteractive)

    app.add_autoversioned_stylesheet('webglinteractive.css')

    # CodeMirror syntax highlighting for various types of code
    add_codemirror_css_and_js(app,'xml','css','htmlmixed','javascript')

    app.add_autoversioned_javascript('webglinteractive.js')

    # Javascript for saving files to the client's hard drive
    app.add_autoversioned_javascript('FileSaver.min.js')
    app.add_autoversioned_javascript('Blob.js')

    app.add_node(WebglInteractiveNode, html=(visit_webglinteractive_node, depart_webglinteractive_node))

    app.connect('doctree-resolved', process_webglinteractive_nodes)
    app.connect('env-purge-doc', purge_webglinteractive)


def find_relative_path(env, options):
    # Get the path to the current lesson being processed.
    documentName = env.temp_data['docname']
    documentPath, documentName = os.path.split(documentName)

    # Determine how deep this lesson is nested into the textbook folders.
    path_list = documentPath.split(os.sep)
    # If there is no path, it still returns one empty string
    if len(path_list) > 1:
        levels_deep = len(path_list)
    else:
        if len(path_list[0]) > 0:
            levels_deep = 1
        else:
            levels_deep = 0

    # For a WebGL program that is in a sub-folder of the "_static" folders:
    # "../" gets to the "_static" folder
    # If levels_deep is 0, then "../" must change to "_static/"
    # If levels_deep is 1, then "../" must change to "../_static"
    # if levels_deep is 2, then "../" must change to "../../_static"
    # etc.

    folder_prefix = "_static" + os.sep
    for j in range(levels_deep):
        folder_prefix = ".." + os.sep + folder_prefix

    options['lib_folder_prefix'] = folder_prefix

    # "./" gets to the WebGL program folder
    # If levels_deep is 0, then "./" must change to ""
    # If levels_deep is 1, then "./" must change to "../"
    # if levels_deep is 2, then "./" must change to "../../"
    # etc.

    folder_prefix = ""
    for j in range(levels_deep):
        folder_prefix = ".." + os.sep + folder_prefix

    options['program_folder_prefix'] = folder_prefix


# ==========================================================================
class WebglDemo(Directive):
    """
.. webgldemo:: uniqueid
    :htmlprogram: path/to/program/webgl_program.html
    :width: -- width of rendering canvas in pixels (default is value set in HTML)
    :height: -- height of rendering canvas in pixels (default is value set in HTML)
    :width2: -- width of secondary rendering canvas in pixels (default is value set in HTML)
    :height2: -- height of secondary rendering canvas in pixels (default is value set in HTML)

    The following assumptions are made about the structure of a textbook that
    uses this directive:
        * All WebGL programs are stored under the _static folder, each in a
          separate folder. (This causes the files to be automatically copied
          to the "build" folder when a "runestone build" is performed.)
          Therefore, the path to a WebGL program will always be some like:
          _static/example_folder/example.html
        * The parent folder of all WebGL HTML programs will always be
          "_static". Therefore, ".." always refers to the "_static" folder.
        * When a WebGL program is included into a lesson web page, the
          references to other files must be adjusted based on the path
          from the lesson page to the "_static" folder.
        * A specific lesson can contain one or more webgl programs.
            * HTML ids for tags must be unique for each separate program.
            * Each webgldemo must have a unique id, which is used to rename
              HTML element tags and Javascript variables.
            * Your HTML program should name id's and variables with a "my_" prefix.
              When the HTML program is included in the web page, the webgldemo
              unique id is put in every location of "my_". This allows a demo
              program to be used more than once on a page. For example,
              if you have a webgldemo named W1 and you have tags in your
              HTML like my_canvas, my_button, etc., then those names are
              converted to W1_canvas, W1_button, etc. when the program is
              loaded into the web page.
            * A webgl program embedded in a lesson page always includes a
              link to open the example program in a separate window. This
              allows a student to use a browser's "view page source"
              functionality to view only the webgl program, separate from
              the textbook's lesson page.

    Because of the above assumptions and conventions, the HTML description of
    a webgl program is written as if it is a single, standalone program that
    can be loaded into the student's web browser from a sub-folder of the _static
    folder of the textbook.

    When a webgl directive is executed, it does the following:
        * It extracts the body of the webgl HTML code and inserts the contents
          into the textbook page being built.
        * It modifies the file paths to the Javascript files, shader files,
            and model files so that they can be loaded from the lesson page's
            location, not the location of the program in the _static folder.
            These changes are summarized as follows:
            Changes:  "../learn_webgl"  to  "../_static/learn_webgl"
            Changes:  "../shaders"      to  "../_static/shaders"
            Changes:  "../models"       to  "../_static/models"
            Changes:  "src="./"         to  "src="../' + node.webgl_components['htmlprogrampath'] + "/")
        * The Javascript code at the bottom of a webgl program needs to be
          in the HTML code so that the runestone build process can modify
          the paths to these webgl program resources. The "Learn Computer Graphics
          using Webgl" textbook explains that in a "normal" webgl program, the
          Javascript code at the bottom would typically be moved into an
          appropriate Javascript code file.

    The default size for a webgl canvas is 400 by 400 pixels. The size of the
    canvas can be modified using the optional directive parameters.

    A typical webglcode directive will look like this:

        .. webgldemo:: W1
            :htmlprogram: _static/01_example01/scale_about_origin.html
            :width: 200
            :height: 200

    """

    required_arguments = 1
    optional_arguments = 0
    has_content = False
    option_spec = {
        # HTML description of the canvas and controls. This is a full
        # HTML page description. Only the body of the HTML page is
        # placed in the the webgldemo display area. This file is saved
        # in the _static hierarchy of the web site, so the path to
        # the static folder must be pretended to the name.
        'htmlprogram': directives.unchanged,
        'width': directives.unchanged,
        'height': directives.unchanged,
        'width2': directives.unchanged,
        'height2': directives.unchanged
    }

    def run(self):

        self.options['divid'] = self.arguments[0]

        if 'htmlprogram' in self.options:
            path, name = os.path.split(self.options['htmlprogram'])

            self.options['htmlprogrampath'] = path  # .encode('ascii', 'ignore')
            self.options['htmlprogram'] = name      # .encode('ascii', 'ignore')

            # Determine how much the path to resources must be adjusted.
            find_relative_path(self.state.document.settings.env, self.options)

            if 'width' in self.options:
                self.options['width'] = int(self.options['width'])
            else:
                self.options['width'] = 0

            if 'height' in self.options:
                self.options['height'] = int(self.options['height'])
            else:
                self.options['height'] = 0

            if 'width2' in self.options:
                self.options['width2'] = int(self.options['width2'])
            else:
                self.options['width2'] = 0

            if 'height2' in self.options:
                self.options['height2'] = int(self.options['height2'])
            else:
                self.options['height2'] = 0
        else:
            print('ERROR: An htmlprogram value is required for a webgldemo directive.')

        # print("self.options = ", self.options)

        return [WebglDemoNode(self.options)]


# ==========================================================================
class WebglDemoNode(nodes.General, nodes.Element):
    def __init__(self, content):
        """
        Arguments:
        - `self`:
        - `content`:
        """
        super(WebglDemoNode, self).__init__()
        self.webgl_components = content


# This creates HTML elements for a webgldemo program to execute.
# The elements include a webgldemo_canvas and some HTML
# interactive controls.
#
# -----------------------------------------------------------------
# |  css: webgldemo_canvas                                        |
# |  canvas                                                       |
# -----------------------------------------------------------------
# |  css: webgldemo_controls                                      |
# |  <input> controls                                             |
# |                                                               |
# -----------------------------------------------------------------
#
# HTML and CSS objects for the above design:
# <div class="webgldemo_container">
#   all of the HTML code here comes from the body of the htmlprogram
#   <canvas class="webgldemo_canvas"> .. <br />
#   <div class="webgldemo_controls"> .. </div>
# </div>
#

# self for these functions is an instance of the writer class.  For example
# in html, self is sphinx.writers.html.SmartyPantsHTMLTranslator
# The node that is passed as a parameter is an instance of our node class.
def visit_webgldemo_node(self, node):
    # print("In visit_webgldemo_node, node.webgl_components = ", node.webgl_components)

    # start of HTML
    res = "<!-- webgldemo start -->\n"
    res += "<div id='%(divid)s_webgldemo' class='webgldemo_container'>\n"

    # The HTML comes from the body of the HTMLprogram file
    # Read the HTML file
    filename = os.path.join(node.webgl_components['htmlprogrampath'], node.webgl_components['htmlprogram'])
    file = open(filename, 'r')
    fileContents = file.read()
    file.close()

    # Extract only the body of the HTML code
    startPos = fileContents.find('<body')
    startPos = fileContents.find('>', startPos) + 1
    endPos = fileContents.find('</body>')
    bodyCode = fileContents[startPos:endPos]

    # Update the paths to library files
    bodyCode = bodyCode.replace("../", node.webgl_components['lib_folder_prefix'])
    bodyCode = bodyCode.replace('src="./', 'src="' + node.webgl_components['program_folder_prefix'] + node.webgl_components['htmlprogrampath'] + os.sep)

    # make the canvas a specific size
    if node.webgl_components['width'] > 0 and node.webgl_components['height'] > 0:
        width_re = re.compile(r'<canvas id="my_canvas" class="webgldemo_canvas" width="(\d+)" height="(\d+)">')
        if width_re.search(bodyCode):
            new_text = r'<canvas id="my_canvas" class="webgldemo_canvas" width="' + str(node.webgl_components['width']) + \
                       '" height="' + str(node.webgl_components['height']) + r'">'
            bodyCode = width_re.sub(new_text, bodyCode)

    if node.webgl_components['width2'] > 0 and node.webgl_components['height2'] > 0:
        # make the secondary canvas a specific size
        width_re = re.compile(r'<canvas id="my_canvas_b" class="webgldemo_canvas" width="(\d+)" height="(\d+)">')
        if width_re.search(bodyCode):
            new_text = r'<canvas id="my_canvas_b" class="webgldemo_canvas" width="' + str(node.webgl_components['width2']) + \
                       '" height="' + str(node.webgl_components['height2']) + r'">'
            bodyCode = width_re.sub(new_text, bodyCode)

    # Make all the ids and variables unique for this embedded program.
    bodyCode = bodyCode.replace("my_", node.webgl_components['divid'] + '_')

    # Make the first parameter of the scene function be the ID of this webgldemo
    bodyCode = bodyCode.replace('"my",', '"' + node.webgl_components['divid'] + '",')

    # Add the HTML body code to the page in the "canvas" area.
    res += bodyCode

    # Add a link to open the webgldemo program in a separate browser tab.
    programPath = node.webgl_components['htmlprogrampath'].replace("_static/", "")
    myLink = os.path.join(node.webgl_components['lib_folder_prefix'], programPath, node.webgl_components['htmlprogram'])
    res += '<a href="' + myLink + '" target="_blank">Open this webgl demo program in a new tab or window</a>'

    # End of HTML
    res += "</div>\n"
    res += "<!-- webgldemo end -->"

    # Replace all of the placeholders in the HTML with the strings stored
    # in the node.webgl_components dictionary.
    res = res % node.webgl_components

    self.body.append(res)


# --------------------------------------------------------------------------
def depart_webgldemo_node(self, node):
    """
    This is called at the start of processing an activecode node.  If activecode had recursive nodes
    etc and did not want to do all of the processing in visit_webgldemo_node any finishing touches could be
    added here.
    """
    pass


# --------------------------------------------------------------------------
def process_webgldemo_nodes(app, env, docname):
    pass


# --------------------------------------------------------------------------
def purge_webgldemos(app, env, docname):
    pass


# ==========================================================================
#
# webglinteractive directive
#
# ==========================================================================
#
# This creates an area for webgl code interactive experimentation.
# The area takes this basic format:
#
# -----------------------------------------------------------------
# |     css: webgl_cmds                                           |
# |     commands: reload, view options, download, download edited |
# -----------------------------------------------------------------
# |  css: webgl_row2                                              |
# | |-------------------------| |-------------------------------| |
# | | css: webgl_editors      | | css: webgl_canvas             | |
# | | tabbed textareas for    | | canvas for drawing            | |
# | | for code editing        | |                               | |
# | |                         | |                               | |
# | |                         | | HTML options for program      | |
# | |                         | | control, checkboxes, sliders, | |
# | |                         | | etc.                          | |
# | |-------------------------| |-------------------------------| |
# ----------------------------- -----------------------------------
# |  css: webgl_output                                            |
# |  text feedback                                                |
# |                                                               |
# -----------------------------------------------------------------
# Options:
# The code should be able to be initially hidden.
# The text feedback area should be able to be initially hidden.
#
# HTML and CSS objects for the above design:
# <div class="webgl_container">
#   <div class="webgl_cmds"> .. </div>
#   <div class="webgl_row2>
#      <div class="webgl_editors">
#         <div class="webgl_editors_tabs"> ... </div>
#         <div class="webgl_editors_contents"> ... </div>
#      </div>
#      <div class="webgl_canvas">  ... </div>
#   </div>
#   <div class="webgl_output">
#      checkbox options
#      <div class="webgl_output_text">
#          output
#      </div>
#   </div>
# </div>

# Organization of files that make up a WebGL 3D graphics display
# --------------------------------------------------------------
#
# A webGL program has these 5 parts:
#   1. HTML web page description (must include a canvas element)
#   2. Javascript program that initializes and "drives" the graphics
#   3. Webgl Vertex and Fragment shader programs
#   4. 3D models (optional if the models are generated procedurally in JavaScript code)
#
# Some of these components will be used over and over again for different
# WebGL scenes. Other components will be unique to a specific 3D scene.
# Therefore, we need an organization that divides the files into two groups:
#   - the reusable components
#   - the unique components
#
# The reusable components are:
#    2. Javascript libraries
#    3. WebGL shaders
#    4. 3D models
# The unique components are :
#    1. the HTML page
#    2. the Javascript programs that initialize and drive the graphics,
#       and the unique Javascript programs for this scene.
#    3. the WebGL shaders.
#    4. 3D models that are unique to this scene.
#
# Conclusions:
#   - The only unique file will be the HTML file
#   - Javascript, shaders, and models will be in either location
#
# Assume the LearnWebGL textbook (ands perhaps other applications)
# is organized like this, where each chapter is in a separate folder.
#    Chapter_1 (folder)
#       Lesson (html)
#       Lesson (html)
#       Lesson (html)
#    Chapter_2 (folder)
#       Lesson (html)
#       Lesson (html)
#       Lesson (html)
#    Chapter_3 (folder)
#       Lesson (html)
#       Lesson (html)
#       Lesson (html)
#    _static (folder)
#       learn_webgl (folder)
#           JavaScript files for webgl programs, *.js
#       models (folder)
#           model files, *.obj, *.mtl, etc.
#       shaders (folder)
#           shader programs, *.vert and *.frag
#       webgl_program_01 (folder)
#           JavaScript files specific to this program
#       webgl_program_02 (folder)
#           JavaScript files specific to this program
#       etc.
#
# Note that the webgl program folders are stored in the _static folder
# so that they are automatically copied to the build folder when a
# runestone book is built.
#
# So now we can write the file paths to various components, where "pathToPage"
# is the path to the current web page:

# The reusable components are:
#    2. Javascript libraries ( ../_static/learn_webgl/filename.js )
#    3. WebGL shaders        ( ../_static/shaders/filename.vert, *.frag )
#    4. 3D models            ( ../_static/models/model.obj, *.mtl )
# The unique components are :
#    1. the HTML page        ( ./filename.html )
#    2. Javascript programs  ( ./filename.js )
#    3. WebGL shaders.       ( ./filename.vert, ./filename.frag )
#    4. 3D models.           ( ./filename.obj, ./filename.mtl )
#

# =====================================================================
class WebglInteractive(Directive):
    """
.. webglinteractive:: uniqueid
    :htmlprogram: path/to/program/webgl_program.html
    :editList: comma separated list of files that can be edited
    :viewList: comma sepatated list of files that can be viewed, but not edited
    :width: -- width of rendering canvas in pixels (default is value in HTML)
    :height: -- height of rendering canvas in pixels (default is value in HTML)
    :width2: -- width of secondary rendering canvas in pixels (default is value in HTML)
    :height2: -- height of secondary rendering canvas in pixels (default is value in HTML)
    :hidecode: -- if present, the code is not initially displayed
    :hideoutput: -- if present, the output area below the code is not initially displayed

    The following assumptions are made about the structure of a textbook that
    uses this directive:
        * A lesson can contain one or more webgl programs.
            * HTML ids for tags must be unique for each separate program.
            * Each webgldemo must have a unique id, which is used to rename
              HTML element tags and Javascript variables.
            * Your HTML program should name id's and variables with a "my_" prefix.
              When the HTML program is included in the web page, the webgldemo
              unique id is put in every location of "my_". This allows a demo
              program to be used more than once on a page. For example,
              if you have a webgldemo named W1 and you have tags in your
              HTML like my_canvas, my_button, etc., then those names are
              converted to W1_canvas, W1_button, etc. when the program is
              loaded into the web page.
            * A webgl program embedded in a lesson page always includes a
              link to open the example program in a separate window. This
              allows a student to use a browser's "view page source"
              functionality to view only the webgl program, separate from
              the textbook's lesson page.
        * The example webgl programs included in a lesson are stored in the
          _static folders. (All files in the _static folders are automatically
          copied to the _static folder of the deployed textbook.)
        * Each webgl program has its own folder.

    Because of the above assumptions and conventions, the HTML description of
    a webgl program is written as if it is a single, standalone program that
    can be loaded into the student's web browser from a sub-folder of the _static
    folder of the textbook.

    When a webgl directive is executed, it does the following:
        * It extracts the body of the webgl HTML code and inserts the contents
          into the textbook page being built.
        * It modifies the file paths to the Javascript files, shader files,
            and model files so that they can be loaded from the lesson page's
            location, not the location of the program in the _static folder.
            These changes are summarized as follows:
            Changes:  "../learn_webgl"  to  "../_static/learn_webgl"
            Changes:  "../shaders"      to  "../_static/shaders"
            Changes:  "../models"       to  "../_static/models"
            Changes:  "src="./"         to  "src="../' + node.webgl_components['htmlprogrampath'] + "/")
        * The Javascript code at the bottom of a webgl program needs to be
          in the HTML code so that the runestone build process can modify
          the paths to these webgl program resources. The "Learn Computer Graphics
          usign Webgl" textbook explains that in a "normal" webgl program, the
          Javascript code at the bottom would typically be moved into an
          appropriate Javascript code file.

    The default size for a webgl canvas is 400 by 400 pixels. The size of the
    canvas can be modified using the optional directive parameters.

    A typical webglinteactive directive will look like this:

        .. webglinteractive:: W1
            :htmlprogram: _static/01_example01/scale_about_origin.html
            :editlist: _static/01_example01/scale_about_origin_render.js, _static/01_example01/model.js
            :width: 200
            :height: 200

    """

    required_arguments = 1
    optional_arguments = 0
    has_content = False
    option_spec = {
        # HTML description of the canvas and controls. This is a full
        # HTML page description. Only the body of the HTML page is
        # placed in the the webgl display area. This files are saved
        # in the _static hierarchy of the web site, so the path to
        # the static hierarchy must be pretended to the name.
        'htmlprogram': directives.unchanged,
        # A list of source files that are displayed in editor panes. Again
        # the path to these files must be adjusted.
        'editlist': directives.unchanged,
        'viewlist': directives.unchanged,
        # Options for hiding parts of a webglinteractive
        'hidecode': directives.flag,
        'hideoutput': directives.flag,
        # Change the size of the canvas
        'width': directives.unchanged,
        'height': directives.unchanged,
        'width2': directives.unchanged,
        'height2': directives.unchanged
    }

    def run(self):
        env = self.state.document.settings.env

        # For debugging - print all the environment values
        # print("env: ")
        # attrs = vars(env)
        # for item in attrs.items():
        #     print item

        if not hasattr(env, 'webglinteractivecounter'):
            env.webglinteractivecounter = 0
        env.webglinteractivecounter += 1

        self.options['divid'] = self.arguments[0]

        self.options['hidecanvas'] = False
        self.options['hideoutput'] = 'hideoutput' in self.options
        self.options['hidecode'] = 'hidecode' in self.options

        if 'htmlprogram' in self.options:
            htmlprogram_folders = self.options['htmlprogram'].split('/')
            htmlprogram_path = "/".join(htmlprogram_folders[0:-1])
            htmlprogram_path = htmlprogram_path.strip()
            self.options['htmlprogram'] = htmlprogram_folders[-1]
            self.options['htmlprogrampath'] = htmlprogram_path
        else:
            print('***** ERROR: An htmlprogram is required for a webglinteractive directive.')

        if 'editlist' in self.options:
            # Turn the comma separated string of filenames into a list
            self.options['editlist'] = self.options['editlist'].split(',')
        else:
            self.options['editlist'] = []

        if 'viewlist' in self.options:
            # Turn the comma separated string of filenames into a list
            self.options['viewlist'] = self.options['viewlist'].split(',')
        else:
            self.options['viewlist'] = []

        if 'width' in self.options:
            self.options['width'] = int(self.options['width'])
        else:
            self.options['width'] = 0

        if 'height' in self.options:
            self.options['height'] = int(self.options['height'])
        else:
            self.options['height'] = 0

        if 'width2' in self.options:
            self.options['width2'] = int(self.options['width2'])
        else:
            self.options['width2'] = 0

        if 'height2' in self.options:
            self.options['height2'] = int(self.options['height2'])
        else:
            self.options['height2'] = 0

        # Determine how much the path to resources must be adjusted.
        find_relative_path(self.state.document.settings.env, self.options)

        # print("edit list: ", self.options['editlist'])
        # print("view list: ", self.options['viewlist'])
        # print("self.options = ", self.options)

        return [WebglInteractiveNode(self.options)]


OUTPUT_OPTIONS = '''
<div>
Show:
<input type="checkbox" id="%(divid)s_webgl_displayInfo" name="Display" value="InfoMessages" checked='checked' />
<span id="webgl_infoMessages" class="webgl_infoMessages">Process information &nbsp&nbsp</span>
<input type="checkbox" id="%(divid)s_webgl_displayWarnings" name="Display" value="Warnings" checked='checked' />
<span id="webgl_warningMessages" class="webgl_warningMessages">Warnings &nbsp&nbsp</span>
<input type="checkbox" id="%(divid)s_webgl_displayErrors" name="Display" value="Errors" checked='checked' />
<span id="webgl_errorMessages" class="webgl_errorMessages">Errors</span>
</div>
'''

OUTPUT_WINDOW = '''
<div id="%(divid)s_webgl_output_div" class="webgl_output_div">
</div>
'''

# For the tabbed content
# There is a list of tab headings
# Then a list of the contents for each tab.

TAB_BEGIN = """<div id='%(divid)s_editors' class='webgl_code'>"""
TAB_END = """</div>"""

# Run the show/hide function on each element to get it into the correct
# visibility and width
SHOW_HIDE_SCRIPT = """
    <script type='text/javascript'>
        %(divid)s_directive.show_webgl(\"%(divid)s_show_code\",1);
        %(divid)s_directive.show_webgl(\"%(divid)s_show_canvas\",2);
        %(divid)s_directive.show_webgl(\"%(divid)s_show_info\",3);
        %(divid)s_directive.set_height_of_webgl_editors(\"%(divid)s\");
        %(divid)s_directive.bring_first_editor_to_front(\"%(divid)s\");
    </script>
"""

TAB_TITLES_LIST_BEGIN = """<ul class='webgl_nav_tabs' id='%(divid)s_tab'>"""

TAB_TITLES_LIST_END = """</ul>"""

TAB_LIST_ELEMENT = """
<li>
    <a data-toggle='tab' href='#%(divid)s_%(tabname)s'><span>%(tabtitle)s</span></a>
</li>
"""

TAB_CONTENTS_BEGIN = """<div style='width:100%%; position:relative;'>
<div class="webgl_code">"""

TAB_CONTENTS_END = '''
<div style="clear:both;"></div>
</div>
</div>
'''

TAB_DIV_BEGIN = """<div class='webgl_tab_content' id='%(divid)s_%(tabname)s'>"""

TAB_DIV_END = """</div>"""

TABBED_EDITOR = '''
<textarea id="%(tabid)s_textarea" class="webgl_tabbed_editor">
%(fileContents)s
</textarea>

<script>
    %(divid)s_directive.createCodeMirrorEditor('%(tabid)s', '%(filename)s', '%(fileextension)s' %(readonly)s);
</script>
'''


# =====================================================================
class WebglInteractiveNode(nodes.General, nodes.Element):
    def __init__(self, content):
        """

        Arguments:
        - `self`:
        - `content`:
        """
        super(WebglInteractiveNode, self).__init__()
        self.webgl_components = content


def add_commands(options):
    res = ''
    res += "<button class='btn btn-success' id='%(divid)s_runb' onclick='%(divid)s_directive.restart();'>Re-start</button>\n"
    res += "Show: \n"

    if options['hidecode']:
        res += "<input type='checkbox' id='%(divid)s_show_code' onclick='%(divid)s_directive.show_webgl(\"%(divid)s_show_code\",1);' />Code &nbsp\n"
    else:
        res += "<input type='checkbox' id='%(divid)s_show_code' onclick='%(divid)s_directive.show_webgl(\"%(divid)s_show_code\",1);' checked='checked' />Code &nbsp\n"

    if options['hidecanvas']:
        res += "<input type='checkbox' id='%(divid)s_show_canvas' onclick='%(divid)s_directive.show_webgl(\"%(divid)s_show_canvas\",2);' />Canvas &nbsp\n"
    else:
        res += "<input type='checkbox' id='%(divid)s_show_canvas' onclick='%(divid)s_directive.show_webgl(\"%(divid)s_show_canvas\",2);' checked='checked' />Canvas &nbsp\n"

    if options['hideoutput']:
        res += "<input type='checkbox' id='%(divid)s_show_info' onclick='%(divid)s_directive.show_webgl(\"%(divid)s_show_info\",3);'/>Run Info\n"
    else:
        res += "<input type='checkbox' id='%(divid)s_show_info' onclick='%(divid)s_directive.show_webgl(\"%(divid)s_show_info\",3);' checked='checked' />Run Info\n"

    res += "<button class='btn webgl-default' id='%(divid)s_saveall' onclick='%(divid)s_directive.downloadAllFiles();'\n"
    res += "title='Download a copy of all the original\nfiles required for this WebGL program.'>Download Files</button>\n"

    res += "<button class='btn webgl-default' id='%(divid)s_save_edited' onclick='%(divid)s_directive.downloadEditedFiles();'\n"
    res += "title='Download a copy of all the\nfiles in the editor panels.'>Download Edited Files</button>\n"

    return res


def change_html_code_ids(bodyCode, webgl_components):

    if webgl_components['width'] > 0 and webgl_components['height'] > 0:
        # make the canvas a specific size
        width_re = re.compile(r'<canvas id="my_canvas" class="webgldemo_canvas" width="(\d+)" height="(\d+)">')
        if width_re.search(bodyCode):
            new_text = r'<canvas id="my_canvas" class="webgldemo_canvas" width="' + str(webgl_components['width']) + \
                       '" height="' + str(webgl_components['height']) + r'">'
            bodyCode = width_re.sub(new_text, bodyCode)

    if webgl_components['width2'] > 0 and webgl_components['height2'] > 0:
        # make the secondary canvas a specific size
        width_re = re.compile(r'<canvas id="my_canvas_b" class="webgldemo_canvas" width="(\d+)" height="(\d+)">')
        if width_re.search(bodyCode):
            new_text = r'<canvas id="my_canvas_b" class="webgldemo_canvas" width="' + str(webgl_components['width2']) + \
                       '" height="' + str(webgl_components['height2']) + r'">'
            bodyCode = width_re.sub(new_text, bodyCode)

    # Make all the ids and variables unique for this embedded program.
    bodyCode = bodyCode.replace("my_", webgl_components['divid'] + '_')

    # Make the first parameter of the scene function be the ID of this webgldemo
    bodyCode = bodyCode.replace('"my",', '"' + webgl_components['divid'] + '",')

    return bodyCode


def add_code_editors(options):
    # Put the code in the text editors in tabs
    res = ''

    # Add the tab headings
    res += TAB_TITLES_LIST_BEGIN

    number_to_edit = len(options['editlist'])
    for j in range(0, number_to_edit):

        tab_name = options['editlist'][j]
        # Remove any path on the file name
        folders = tab_name.split('/')
        if len(folders) > 1:
            tab_title = folders[len(folders) - 1].strip()
        else:
            tab_title = tab_name.strip()

        # Replace any periods in the filename to create the HTML id for the tab
        tab_name = tab_title.replace('.', '_').strip()

        res += TAB_LIST_ELEMENT % {'divid': options['divid'],
                                   'tabname': tab_name,
                                   'tabtitle': tab_title}

    number_to_view = len(options['viewlist'])
    for j in range(0, number_to_view):

        tab_name = options['viewlist'][j]
        # Remove any path on the file name
        folders = tab_name.split('/')
        if len(folders) > 1:
            tab_title = folders[len(folders) - 1].strip()
        else:
            tab_title = tab_name.strip()

        # Replace any periods in the filename to create the HTML id for the tab
        tab_name = tab_title.replace('.', '_').strip()

        res += TAB_LIST_ELEMENT % {'divid': options['divid'],
                                   'tabname': tab_name,
                                   'tabtitle': tab_title}

    res += TAB_TITLES_LIST_END

    # Add the tab contents
    res += TAB_CONTENTS_BEGIN

    for j in range(0, number_to_edit):
        edit_name = options['editlist'][j]
        # Remove any path on the file name
        folders = edit_name.split('/')
        if len(folders) > 1:
            file_name = folders[len(folders) - 1].strip()
        else:
            file_name = edit_name.strip()

        # Get the file name extension
        dot_pos = file_name.find('.')
        fileExtension = file_name[dot_pos + 1:]

        # Replace any periods in the filename to create the HTML id for the tab
        tab_name = file_name.replace('.', '_').strip()

        tab_id = options['divid'] + '_' + tab_name
        tab_file = options['editlist'][j].strip()
        tab_file = os.path.abspath(tab_file)

        # Read the data file into a single string
        file = open(tab_file, 'r')
        fileContents = file.read()
        file.close()

        # If this file is an HTML code file, then replace the "my_" code strings
        # with the directive ID. E.g., "my_" becomes "W2_"
        if fileExtension == 'html':
            fileContents = change_html_code_ids(fileContents, options)

        res += TAB_DIV_BEGIN % {'divid': options['divid'],
                                'tabname': tab_name}
        # content of tab
        res += TABBED_EDITOR % {'divid': options['divid'],
                                'tabid': tab_id,
                                'tabfile': edit_name,
                                'fileContents': fileContents,
                                'filename': file_name,
                                'fileextension': fileExtension,
                                'readonly': ""}
        res += TAB_DIV_END

    for j in range(0, number_to_view):
        view_name = options['viewlist'][j]
        # Remove any path on the file name
        folders = view_name.split('/')
        if len(folders) > 1:
            file_name = folders[len(folders) - 1].strip()
        else:
            file_name = view_name.strip()

        # Get the file name extension
        dot_pos = file_name.find('.')
        fileExtension = file_name[dot_pos + 1:]

        # Replace any periods in the filename to create the HTML id for the tab
        tab_name = file_name.replace('.', '_').strip()

        tab_id = options['divid'] + '_' + tab_name
        tab_file = options['viewlist'][j].strip()
        tab_file = os.path.abspath(tab_file)

        # Read the data file into a single string
        file = open(tab_file, 'r')
        fileContents = file.read()
        file.close()

        if fileExtension == 'html':
            fileContents = change_html_code_ids(fileContents, options)

        res += TAB_DIV_BEGIN % {'divid': options['divid'],
                                'tabname': tab_name}
        # content of tab
        res += TABBED_EDITOR % {'divid': options['divid'],
                                'tabid': tab_id,
                                'tabfile': view_name,
                                'fileContents': fileContents,
                                'filename': file_name,
                                'fileextension': fileExtension,
                                'readonly': ", true"}
        res += TAB_DIV_END

    res += TAB_CONTENTS_END

    return res


# self for these functions is an instance of the writer class.  For example
# in html, self is sphinx.writers.html.SmartyPantsHTMLTranslator
# The node that is passed as a parameter is an instance of our node class.
def visit_webglinteractive_node(self, node):
    # print("In visit_webglinteractive_node, node.webgl_components = ", node.webgl_components)

    # Overall structure is here. Content is added in the functions
    res = "<!-- webglinteractive start -->"

    # Create an instance of the WebglInteractive_directive class. This creates
    # the event handlers and functionality for the webglinteractive directive.
    res += '''
  <script>
    var %(divid)s_directive = new WebglInteractive_directive( '%(divid)s' );
  </script>
  '''

    res += "<div class='webgl_container' id='%(divid)s_webgl_container'>\n"

    # Commands (top row)
    res += "<div class='webgl_cmds' id='%(divid)s_webgl_cmds'>\n"
    res += add_commands(node.webgl_components)
    res += "</div>\n"

    # Start first row (editors and canvas)
    res += "<div class='webgl_row2' id='%(divid)s_webgl_row2'>\n"

    # Editors for code
    res += "<div class='webgl_editors' id='%(divid)s_webgl_editors'>\n"
    res += add_code_editors(node.webgl_components)
    res += "</div>\n"

    # Canvas for rendering (with controls below the canvas)
    res += "<div class='webgl_canvas' id='%(divid)s_webgl_canvas'>"
    # Read the HTML file
    filename = node.webgl_components['htmlprogrampath'] + "/" + node.webgl_components['htmlprogram']
    filename = os.path.realpath(filename)

    file = open(filename, 'r')
    fileContents = file.read()
    file.close()

    # Put the HTML source file name so it can be downloaded by the user
    html_file_name = "../" + node.webgl_components['htmlprogrampath'] + '/' + node.webgl_components['htmlprogram']
    res += '<span style="display: none;">' + html_file_name + '</span>'

    # Extract only the body of the HTML code
    startPos = fileContents.find('<body')
    startPos = fileContents.find('>', startPos) + 1
    endPos = fileContents.find('</body>')
    bodyCode = fileContents[startPos:endPos]

    # Update the paths to library files
    bodyCode = bodyCode.replace("../", node.webgl_components['lib_folder_prefix'])
    bodyCode = bodyCode.replace('src="./', 'src="' + node.webgl_components['program_folder_prefix'] + node.webgl_components['htmlprogrampath'] + os.sep)

    bodyCode = change_html_code_ids(bodyCode, node.webgl_components)

    # Add the HTML body code to the page in the "canvas" area.
    res += bodyCode

    res += "</div>\n"  # end of webgl_canvas

    res += "<div style='clear:both;'></div>"  # turns off the float left
    res += "</div>\n"

    # Output div for text feedback
    res += "<div class='webgl_output' id='%(divid)s_webgl_output'>"
    res += OUTPUT_OPTIONS
    res += OUTPUT_WINDOW
    res += "</div>\n"
    res += "<div style='clear:both;'></div>\n"  # turns off the float left

    # Add a link to open the webgl program in a separate browser tab.
    programPath = node.webgl_components['htmlprogrampath'].replace("_static/", "")
    myLink = os.path.join(node.webgl_components['lib_folder_prefix'], programPath, node.webgl_components['htmlprogram'])
    res += '<a href="' + myLink + '" target="_blank">Open this webgl program in a new tab or window</a>'

    res += "</div>\n"

    # Add javascript code
    res += SHOW_HIDE_SCRIPT

    res += "<!-- webglinteractive end -->"

    # Separate the webgl components from the next content
    res += "<p> </p>\n"

    # Replace all of the placeholders in the HTML with the strings stored
    # in the node.webgl_components dictionary.
    res = res % node.webgl_components

    self.body.append(res)


def depart_webglinteractive_node(self, node):
    ''' This is called at the start of processing an activecode node.  If activecode had recursive nodes
        etc and did not want to do all of the processing in depart_webglinteractive_node any finishing touches could be
        added here.
    '''
    pass


def process_webglinteractive_nodes(app, env, docname):
    pass


def purge_webglinteractive(app, env, docname):
    pass

