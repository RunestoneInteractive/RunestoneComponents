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
from .textfield import *


def setup(app):
    app.add_directive('activecode', ActiveCode)
    app.add_stylesheet('activecode.css')

    app.add_javascript('skulpt.min.js')
    app.add_javascript('skulpt-stdlib.js')
    app.add_javascript('codemirror.js')
    app.add_javascript('python.js')
    app.add_javascript('activecode.js')

    app.add_role('textfield', textfield_role)

    app.add_node(ActivcodeNode, html=(visit_ac_node, depart_ac_node))

    app.connect('doctree-resolved', process_activcode_nodes)
    app.connect('env-purge-doc', purge_activecodes)


TEMPLATE = """
    <pre data-component="activecode" id=%(divid)s data-lang="%(language)s" %(autorun)s %(hidecode)s %(include)s %(timelimit)s %(coach)s %(codelens)s>
    %(initialcode)s
    </pre>
    """

class ActivcodeNode(nodes.General, nodes.Element):
    def __init__(self, content):
        """
        Arguments:
        - `self`:
        - `content`:
        """
        super(ActivcodeNode, self).__init__()
        self.ac_options = content

def visit_ac_node(self, node):
    # print self.settings.env.activecodecounter
    res = ""

    if 'language' not in node.ac_options:
        node.ac_options['language'] = 'python'

    if 'autorun' in node.ac_options:
        node.ac_options['autorun'] = 'data-autorun'
    else:
        node.ac_options['autorun'] = ''

    if 'hidecode' in node.ac_options:
        node.ac_options['hidecode'] = 'data-hidecode'
    else:
        node.ac_options['hidecode'] = ''

    if 'include' in node.ac_options:
        node.ac_options['include'] = 'data-include=' + str(node.ac_options['include'])
    else:
        node.ac_options['include'] = ''

    if 'timelimit' in node.ac_options:
        node.ac_options['timelimit'] = 'data-timelimit=' + str(node.ac_options['timelimit'])
    else:
        node.ac_options['timelimit'] = ''

    if 'coach' in node.ac_options:
        node.ac_options['coach'] = 'data-coach'
    else:
        node.ac_options['coach'] = ''

    if 'codelens' in node.ac_options:
        node.ac_options['codelens'] = 'data-codelens'
    else:
        node.ac_options['codelens'] = ''

    res += TEMPLATE % node.ac_options

    res = res.replace("u'", "'")  # hack:  there must be a better way to include the list and avoid unicode strings

    self.body.append(res)


def depart_ac_node(self, node):
    ''' This is called at the start of processing an activecode node.  If activecode had recursive nodes
        etc and did not want to do all of the processing in visit_ac_node any finishing touches could be
        added here.
    '''
    pass


def process_activcode_nodes(app, env, docname):
    pass


def purge_activecodes(app, env, docname):
    pass


class ActiveCode(Directive):
    required_arguments = 1
    optional_arguments = 1
    has_content = True
    option_spec = {
        'nocanvas': directives.flag,
        'nopre': directives.flag,
        'above': directives.flag,  # put the canvas above the code
        'autorun': directives.flag,
        'caption': directives.unchanged,
        'include': directives.unchanged,
        'hidecode': directives.flag,
        'language': directives.unchanged,
        'tour_1': directives.unchanged,
        'tour_2': directives.unchanged,
        'tour_3': directives.unchanged,
        'tour_4': directives.unchanged,
        'tour_5': directives.unchanged,
        'nocodelens': directives.flag,
        'coach': directives.flag,
        'timelimit': directives.unchanged
    }

    def run(self):
        env = self.state.document.settings.env
        # keep track of how many activecodes we have.... could be used to automatically make a unique id for them.
        if not hasattr(env, 'activecodecounter'):
            env.activecodecounter = 0
        env.activecodecounter += 1

        self.options['divid'] = self.arguments[0]

        source = "\n".join(self.content)
        self.options['initialcode'] = source

        return [ActivcodeNode(self.options)]


if __name__ == '__main__':
    a = ActiveCode()
