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

__author__ = 'isaiahmayerchak'

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive

def setup(app):
    app.add_directive('dragndrop',DragNDrop)
    app.add_javascript('dragndrop.js')
    app.add_javascript('timeddnd.js')
    app.add_stylesheet('dragndrop.css')

    app.add_node(DragNDropNode, html=(visit_dnd_node, depart_dnd_node))


TEMPLATE_START = """<ul data-component="dragndrop" id="%(divid)s">
    <span data-component="question">%(question)s</span>
	%(feedback)s
"""

TEMPLATE_OPTION = """
    <li data-component="draggable" id="%(divid)s_drag%(dnd_label)s">%(dragText)s</li>
    <li data-component="dropzone" for="%(divid)s_drag%(dnd_label)s">%(dropText)s</li>
"""
TEMPLATE_END = """</ul>"""


class DragNDropNode(nodes.General, nodes.Element):
    def __init__(self,content):
        """
        Arguments:
        - `self`:
        - `content`:
        """
        super(DragNDropNode,self).__init__()
        self.dnd_options = content

# self for these functions is an instance of the writer class.  For example
# in html, self is sphinx.writers.html.SmartyPantsHTMLTranslator
# The node that is passed as a parameter is an instance of our node class.
def visit_dnd_node(self,node):
    res = TEMPLATE_START

    if "feedback" in node.dnd_options:
        node.dnd_options["feedback"] = "<span data-component=feedback>" + node.dnd_options["feedback"] + "</span>"
    else:
        node.dnd_options["feedback"] = ""

    res = res % node.dnd_options

    self.body.append(res)

def depart_dnd_node(self,node):
    res = ""
    # Add all of the possible answers
    okeys = list(node.dnd_options.keys())
    okeys.sort()
    for k in okeys:
        if 'match' in k:
            x,label = k.split('_')
            node.dnd_options['dnd_label'] = label
            dragE, dropE = node.dnd_options[k].split("|||")
            node.dnd_options["dragText"] = dragE
            node.dnd_options['dropText'] = dropE
            res += node.template_option % node.dnd_options
    res += node.template_end % node.dnd_options
    self.body.append(res)


class DragNDrop(Directive):
    required_arguments = 1
    optional_arguments = 0
    has_content = True
    option_spec = {"feedback":directives.unchanged,
        "match_1":directives.unchanged,
        "match_2":directives.unchanged,
        "match_3":directives.unchanged,
        "match_4":directives.unchanged,
        "match_5":directives.unchanged,
        "match_6":directives.unchanged,
        "match_7":directives.unchanged,
        "match_8":directives.unchanged,
        "match_9":directives.unchanged,
        "match_10":directives.unchanged,
        "match_11":directives.unchanged,
        "match_12":directives.unchanged,
        "match_13":directives.unchanged,
        "match_14":directives.unchanged,
        "match_15":directives.unchanged,
        "match_16":directives.unchanged,
        "match_17":directives.unchanged,
        "match_18":directives.unchanged,
        "match_19":directives.unchanged,
        "match_20":directives.unchanged,

    }

    def run(self):
        """
            process the multiplechoice directive and generate html for output.
            :param self:
            :return:
            .. dragndrop:: identifier
                :feedback: Feedback that is displayed if things are incorrectly matched--is optional
                :match_1: Draggable element text|||Dropzone to be matched with text
                :match_2: Drag to Answer B|||Answer B
                :match_3: Draggable text|||Text of dropzone
                ...etc...(up to 20 matches)

                The question goes here.
        """
        self.options['divid'] = self.arguments[0]

        if self.content:
            source = "\n".join(self.content)
        else:
            source = '\n'

        self.options['question'] = source


        dndNode = DragNDropNode(self.options)
        dndNode.template_start = TEMPLATE_START
        dndNode.template_option = TEMPLATE_OPTION
        dndNode.template_end = TEMPLATE_END

        return [dndNode]
