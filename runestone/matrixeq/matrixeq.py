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
from __future__ import print_function

from docutils import nodes
from docutils.parsers.rst import directives
from runestone.common.runestonedirective import RunestoneDirective, RunestoneNode
import re

__author__ = 'Wayne Brown'

# This creates a matrix equation
#
# HTML and CSS objects for the design:
# <div class="matrixeq">
#   <span class="matrix"> .. </span>
#   <span class="matrix_operator"> .. </span>
#   <span class="matrix"> .. </span>
#   ...
#   <span class="matrix"> .. </span>
#   <span class="equation_number"> .. </span>
# </div>
#


# --------------------------------------------------------------------------
def setup(app):
    app.add_directive('matrixeq', MatrixEq)
    app.add_role('inline_matrixeq', inline_matrixeq)

    app.add_autoversioned_stylesheet('matrixeq.css')

    app.add_autoversioned_javascript('matrixeq.js')

    app.add_node(MatrixEqNode, html=(visit_matrixeq_node, depart_matrixeq_node))
    app.add_node(InlineMatrixEqNode, html=(visit_inline_matrixeq_node, depart_inline_matrixeq_node))

    app.connect('doctree-resolved', process_matrixeq_nodes)
    app.connect('env-purge-doc', purge_matrixeq)


# ==========================================================================
# A python class derived from the sphinx class Directive
# This initializes the new directive
class MatrixEq(RunestoneDirective):
    """
.. matrixeq:: uniqueid
    :notexecutable: -- the matrix equation can't be executed by the user
    :comment: -- A comment to include to the right of the equation
    :nolabel: -- don't label the equation using the uniqueid provided
    :backgroundcolor: -- the color of the background; either #RRBBGG or a color name
    :foregroundcolor: -- the color used for the matrix elements; either #RRBBGG or a color name
    :highlightcolor: -- the color used for "bolded" elements; ; either #RRBBGG or a color name

    A single matrix is defined using javascript array notation, e.g., [a,b,c;d,e,f]

    A "name" can be assigned to a matrix by including a string and a colon after the
    beginning [, but before the first value, e.g., [M1: a,b,c;d,e,f]. If no name is
    specified, a default name is assigned.

    A background color can be assigned to a matrix by including a color specifier
    after the matrix's name. The color can be one of the standard HTML color names
    or a color value (#RRGGBB). To specify a color, you must give the matrix a name.
    E.g., [M1,lightcyan: a,b,c;d,e,f] or [M1,#DF85E8: a,b,c;d,e,f]

    Individual elements of a matrix can have no special formatting, be highlighted,
    be editable, or be both highlighted and editable. To make an element:
        - highlighted, add an asterisk in front of the value, e.g., *a
        - editable, put the value inside {}, e.g, {a}
        - both highlighted and editable, *{a} or {*a}

    The content of the directive is a matrix equation. E.g.,
    [M1: 1, 0, 0, 0; 0, 1, 0, 0; 0, 0, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1] = [M3: x';y';z';w']
    """

    required_arguments = 1
    optional_arguments = 0
    has_content = True
    option_spec = {
        'notexecutable': directives.flag,
        'comment': directives.unchanged,
        'nolabel': directives.flag,
        'backgroundcolor': directives.unchanged,
        'foregroundcolor': directives.unchanged,
        'highlightcolor': directives.unchanged
    }

    def run(self):

        # print("self.options = ", self.options)

        env = self.state.document.settings.env
        if not hasattr(env, 'matrixeqcounter'):
            env.matrixeqcounter = 0
        env.matrixeqcounter += 1

        # The contents is a StringList. Combine all the strings into a single string
        # and put a newline character at the line breaks.
        text = ''.join(self.content)

        text = text.replace("u'", "'")  # hack: avoid unicode strings

        self.options['name'] = self.arguments[0].strip()

        self.options['contents'] = text

        self.options['equationnumber'] = self.arguments[0]
        self.options['equationcounter'] = env.matrixeqcounter
        self.options['executable'] = 'notexecutable' not in self.options
        self.options['nolabel'] = 'nolabel' in self.options
        if 'comment' in self.options:
            self.options['comment'] = self.options['comment'].strip()
        else:
            self.options['comment'] = ""

        color_scheme = ' style="background-color:'
        if 'backgroundcolor' in self.options:
            color_scheme += self.options['backgroundcolor'].strip() + ';'
        else:
            color_scheme += '#fcf8e3;'

        if 'foregroundcolor' in self.options:
            color_scheme += ' color:' + self.options['foregroundcolor'].strip() + ';'

        self.options['colorscheme'] = color_scheme + '"'

        if 'highlightcolor' in self.options:
            self.options['highlightcolor'] = self.options['highlightcolor'].strip()
        else:
            self.options['highlightcolor'] = "red"  # default highlight color

        return [MatrixEqNode(self.options)]


# ==========================================================================
class MatrixEqNode(nodes.General, nodes.Element, RunestoneNode):
    def __init__(self, content, **kwargs):
        """

        Arguments:
        - `self`:
        - `content`:
        """
        super(MatrixEqNode, self).__init__(name=content['name'], **kwargs)
        self.components = content


def matrixToHTML(text, nodeID, node):
    # Divide the text into a "header" and the matrix values
    parts = text.split(':')
    if len(parts) == 1:
        header = nodeID       # The generated ID from the calling function
        valuesStr = parts[0]  # The entire text
    else:
        header = parts[0]     # All text before the :
        valuesStr = parts[1]  # All text after the :

    # Check to see if there is a color value after the node name string
    if ',' in header:
        nodeName, matrixColor = header.split(',')
        matrixColor = ' style="background-color: ' + matrixColor + '" '
    else:
        nodeName = header
        matrixColor = ''

    if '*' in nodeName:
        highlight = ' style="color:#C8255D" '
    else:
        highlight = ''

    # formatting codes
    # 0: no formatting
    # 1: make the element highlighted
    # 2: make the element editable
    # 3: make the element both editable and highlighted

    # Define the output format. Make this user controllable in the future
    fieldSize = 6
    precision = str(fieldSize) + '.' + str(3) + 'f'

    # Put the matrix values into a 2D array
    values = []
    valuesFormat = []

    rowStrings = valuesStr.split(";")
    for row in range(len(rowStrings)):

        rowTextValues = rowStrings[row].split(",")

        rowValues = []
        rowFormat = []
        for col in range(len(rowTextValues)):
            # remove all white space around the value
            s = rowTextValues[col].strip()

            formatValue = 0
            # print( "value = " + rowTextValues[col])
            if s[0] == '*':
                formatValue |= 1
                s = s[1:]   # remove the formatting symbol

            if s[0] == '{':
                formatValue |= 2
                s = s[1:]   # remove the formatting symbol
                if s[-1] == '}':
                    s = s[:-1]

            if s[0] == '*':
                formatValue |= 1
                s = s[1:]   # remove the formatting symbol

            # print( "value = " + s)
            try:
                valueAsNumber = float(s)
                if valueAsNumber.is_integer():
                    valueAsString = format(valueAsNumber, "6d")
                else:
                    valueAsString = format(valueAsNumber, precision)
            except ValueError:
                valueAsString = s

            rowValues.append(valueAsString)
            rowFormat.append(formatValue)

        values.append(rowValues)
        valuesFormat.append(rowFormat)

    # print("values = ", values);
    # print("formats = ", valuesFormat);

    # Build the HTML for the matrix
    res = '<span id="' + nodeID + '" class="matrix_table"' + highlight + matrixColor + '>'

    nRows = len(values)
    nCols = len(values[0])
    # Check to make sure every row has the same number of columns
    for r in range(0, nRows):
        if len(values[r]) != nCols:
            res = 'matrixeq directive error: row ' + str(r) + ' does not have ' + str(nCols) + ' values <br />'
            res += text
            return res, nRows

    # print("matrix size = ", nRows, nCols)

    # Create the HTML code for the matrix
    for c in range(0, nCols):
        res += '<span class="matrix_column">'  # start column

        for r in range(0, nRows):
            valueStr = values[r][c]

            # Replace any exponential's with html <sup>v</sup>
            expIndex = valueStr.find('^(')
            if expIndex >= 0:
                expIndexEnd = valueStr.find(')', expIndex)
                if expIndexEnd > 0:
                    exp = valueStr[expIndex+2:expIndexEnd]
                    valueStr = valueStr[0:expIndex] + '<sup>' + exp + '</sup>' + valueStr[expIndexEnd+1:]

            # Create the correct type of field
            if valuesFormat[r][c] == 0:
                res += '<span>' + valueStr + '<br /></span>'
            elif valuesFormat[r][c] == 1:
                res += '<span style="color:' + node.components['highlightcolor'] + ';">' + valueStr + '<br /></span>'
            elif valuesFormat[r][c] == 2:
                res += '<span><input type="text" value="' + valueStr + '"></span>'
            elif valuesFormat[r][c] == 3:
                res += '<span><input type="text" value="' + valueStr + '" style="color:' + node.components['highlightcolor'] + '";></span>'

        res += '</span>'  # end column

    res += '</span>'  # END_MATRIX

    return res, nRows


# parse a matrix equation into its distinct parts
def divide_matrixeq_into_its_parts(text):
    parts = []
    # print("text = ", text)
    while len(text) > 0:
        matrix_start = text.find('[')
        # print("matrix_start = ", matrix_start)
        if matrix_start >= 0:
            matrix_end = text.find(']', matrix_start)
            before = text[0:matrix_start]
            matrix = text[matrix_start:matrix_end+1]
            text = text[matrix_end+1:]
        else:
            before = text
            matrix = ""
            text = ""

        before = before.strip()
        if len(before) > 0:
            parts.append(before)
        if len(matrix) > 0:
            parts.append(matrix)

    # print("matrixeq parts: ", parts)
    return parts


# self for these functions is an instance of the writer class.  For example
# in html, self is sphinx.writers.html.SmartyPantsHTMLTranslator
# The node that is passed as a parameter is an instance of our node class.
def visit_matrixeq_node(self, node):
    # print("In visit_matrixeq_node, node.components = ", node.components)

    # Parse the matrix equation into its parts
    parts = divide_matrixeq_into_its_parts(node.components['contents'].strip())

    id = "M" + str(node.components['equationcounter'])
    node.components['equationcounter'] += 1

    # start of HTML
    res = "<!-- matrixeq start -->\n"
    res += "<div id='" + id + "' class='matrixeq_container'" + node.components['colorscheme'] + ">\n"

    for j in range(0, len(parts)):
        if parts[j][0] == '[':
            (text, nRows) = matrixToHTML(parts[j][1:-1], id + "_" + str(j), node)
            res += text
        else:
            if node.components['executable']:
                event = ' onclick="Matrixeq_directive(this);"'
            else:
                event = ''
            res += '<span class="matrix_operator"' + event + ">" + parts[j] + "</span>"

    # Add a comment to the end of the equation
    comment = ''
    if len(node.components['comment']) > 0:
        comment = " - " + node.components['comment']

    label = node.components['equationnumber']
    if node.components['nolabel']:
        label = ''

    res += "<span class='matrix_label'> " + label + comment + "</span>"

    # End of HTML
    res += "</div>\n"
    res += "<!-- end of matrixeq -->"

    self.body.append(res)


# --------------------------------------------------------------------------
def depart_matrixeq_node(self, node):
    '''
    This is called at the start of processing an activecode node.  If activecode had recursive nodes
    etc and did not want to do all of the processing in visit_matrixeq_node any finishing touches could be
    added here.
    '''
    pass


# --------------------------------------------------------------------------
def process_matrixeq_nodes(app, env, docname):
    pass


# --------------------------------------------------------------------------
def purge_matrixeq(app, env, docname):
    pass


# ==========================================================================
# Inline_MatrixEq role
# ==========================================================================
# Create a role representing a matrix equation that can be included into an
# in-line paragraph.
class InlineMatrixEqNode(nodes.General, nodes.Element, RunestoneNode):
    """
:inline_matrixeq:`[a,b;c,d]`

    A inline_matrixeq role allows a matrix equation to be defined inside a
    paragraph. The syntax for the matrix equation is identical to a matrixeq
    directive. The operators in an in-line matrix equation are not executable.

    In the future it would be nice to figure out how to make the background
    color user configurable. (For some reason, inheriting the background color
    from the enclosing parent makes the brackets of the matrices render
    incorrectly.)

    The background color is hardcoded to a light yellow.
    The highlight color is hardcoded to red.
    """

    def __init__(self, content, **kwargs):
        """

        Arguments:
        - `self`:
        - `content`:
        """

        super(InlineMatrixEqNode, self).__init__(**kwargs)
        matrix_text = re.search(':inline_matrixeq:`(.*)`', content).group(1)
        self.components = {'contents' : matrix_text,
                           'colorscheme' : ' style="background-color:inherit; color: inherit"',
                           'highlightcolor' : "red",
                           'equationcounter' : 0}


def inline_matrixeq(
    roleName,  # _`roleName`: the local name of the interpreted role, the role name actually used in
               # the document.
    rawtext,   # _`rawtext` is a string containing the entire interpreted text input, including the
               # role and markup. Return it as a problematic node linked to a system message if a
               # problem is encountered.
    text,      # The interpreted _`text` content.
    lineno,    # The line number (_`lineno`) where the interpreted text begins.
    inliner,   # _`inliner` is the docutils.parsers.rst.states.Inliner object that called this function.
               # It contains the several attributes useful for error reporting and document tree access.
    options={},  # A dictionary of directive _`options` for customization (from the "role" directive),
                 # to be interpreted by this function. Used for additional attributes for the generated elements and other functionality.
    content=[]):  # A list of strings, the directive _`content` for customization (from the "role"
                  # directive). To be interpreted by the role function.
    """
    """
    matrix_node = InlineMatrixEqNode(rawtext)
    matrix_node.line = lineno
    return [matrix_node], []


def visit_inline_matrixeq_node(self, node):

    # Parse the matrix equation into its parts
    parts = divide_matrixeq_into_its_parts(node.components['contents'].strip())

    id = "M" + str(node.components['equationcounter'])
    node.components['equationcounter'] += 1

    # start of HTML
    res = "<!-- inline_matrixeq start -->\n"
    res += "<span id='" + id + "' class='matrixeq_container'" + node.components['colorscheme'] + ">\n"

    for j in range(0, len(parts)):
        if parts[j][0] == '[':
            (text, nRows) = matrixToHTML(parts[j][1:-1], id + "_" + str(j), node)
            res += text
        else:
            res += '<span class="matrix_operator">' + parts[j] + "</span>"

    # End of HTML
    res += "</span>\n"
    res += "<!-- end of inline_matrixeq -->"

    self.body.append(res)


def depart_inline_matrixeq_node(self, node):
    pass

