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

__author__ = 'bmiller'

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
from .textfield import *

def setup(app):
    app.add_directive('activecode', ActiveCode)
    app.add_directive('actex', ActiveExercise)
    app.add_role('textfield',textfield_role)
    app.add_stylesheet('codemirror.css')
    app.add_stylesheet('activecode.css')

    app.add_javascript('jquery.highlight.js')
    app.add_javascript('bookfuncs.js')
    app.add_javascript('codemirror.js')
    app.add_javascript('xml.js')
    app.add_javascript('css.js')
    app.add_javascript('htmlmixed.js')
    app.add_javascript('python.js')
    app.add_javascript('javascript.js')
    app.add_javascript('activecode.js')
    app.add_javascript('skulpt.min.js')
    app.add_javascript('skulpt-stdlib.js')

    app.add_node(ActivcodeNode, html=(visit_ac_node, depart_ac_node))

    app.connect('doctree-resolved', process_activcode_nodes)
    app.connect('env-purge-doc', purge_activecodes)



TEMPLATE = """
<pre data-component="activecode" id=%(divid)s data-lang="%(language)s" %(autorun)s %(hidecode)s %(include)s %(timelimit)s %(coach)s %(codelens)s data-audio='%(ctext)s'>
%(initialcode)s
</pre>
"""


CAPTION = ''' 
<div class="clearfix"></div>
<p class="ac_caption"><span class="ac_caption_text">%(caption)s (%(divid)s)</span> </p>
'''


GRADES = '''
<span class="ac_sep"></span>
<input type="button" class='btn btn-default ' id="gradeb" name="Show Feedback" value="Show Feedback" onclick="createGradeSummary('%(divid)s')"/>
'''



# <iframe id="%(divid)s_codelens" width="800" height="500" style="display:block"src="#">
# </iframe>


AUTO = '''
<script type="text/javascript">
$(document).ready(function() {
    $(window).load(function() {
        var runb = document.getElementById("%(divid)s_runb");
        runit('%(divid)s',runb, %(include)s);
    });
});
</script>
'''


class ActivcodeNode(nodes.General, nodes.Element):
    def __init__(self, content):
        """

        Arguments:
        - `self`:
        - `content`:
        """
        super(ActivcodeNode, self).__init__()
        self.ac_components = content


# self for these functions is an instance of the writer class.  For example
# in html, self is sphinx.writers.html.SmartyPantsHTMLTranslator
# The node that is passed as a parameter is an instance of our node class.
def visit_ac_node(self, node):
    # print self.settings.env.activecodecounter
    res = TEMPLATE
    #todo:  handle above in node.ac_components
    #todo handle  'hidecode' not in node.ac_components:
    # todo:  handle if 'gradebutton' in node.ac_components: res += GRADES

    res = res % node.ac_components
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

        if self.content:
            source = "\n".join(self.content)
        else:
            source = '\n'

        self.options['initialcode'] = source
        str = source.replace("\n", "*nline*")
        str0 = str.replace("\"", "*doubleq*")
        str1 = str0.replace("(", "*open*")
        str2 = str1.replace(")", "*close*")
        str3 = str2.replace("'", "*singleq*")
        self.options['argu'] = str3

        complete = ""
        no_of_buttons = 0
        okeys = list(self.options.keys())
        for k in okeys:
            if '_' in k:
                x, label = k.split('_')
                no_of_buttons = no_of_buttons + 1
                complete = complete + self.options[k] + "*atype*"

        newcomplete = complete.replace("\"", "*doubleq*")
        self.options['ctext'] = newcomplete
        self.options['no_of_buttons'] = no_of_buttons

        if 'caption' not in self.options:
            self.options['caption'] = ''

        if 'include' not in self.options:
            self.options['include'] = ''
        else:
            lst = self.options['include'].split(',')
            lst = [x.strip() for x in lst]
            self.options['include'] = 'data-include=' + " ".join(lst)

        if 'hidecode' in self.options:
            self.options['hidecode'] = 'data-hidecode="true"'
        else:
            self.options['hidecode'] = ''

        if 'language' not in self.options:
            self.options['language'] = 'python'

        if self.options['language'] == 'html':
            self.options['language'] = 'htmlmixed'

        if 'nocodelens' in self.options or self.options['language'] != 'python':
            self.options['codelens'] = ''
        else:
            self.options['codelens'] = 'data-codelens="true"'

        if 'timelimit' not in self.options:
            self.options['timelimit'] = 'data-timelimit=25000'
        else:
            self.options['timelimit'] = 'data-timelimit=%d' % self.options['timelimit']

        if 'autorun' not in self.options:
            self.options['autorun'] = ''
        else:
            self.options['autorun'] = 'data-autorun="true"'

        if 'coach' in self.options:
            self.options['coach'] = 'data-coach="true"'
        else:
            self.options['coach'] = ''

        return [ActivcodeNode(self.options)]


class ActiveExercise(ActiveCode):
    required_arguments = 1
    optional_arguments = 0
    has_content = True

    def run(self):
        self.options['hidecode'] = True
        self.options['gradebutton'] = True
        self.options['coach'] = True
        return super(ActiveExercise, self).run()


if __name__ == '__main__':
    a = ActiveCode()
