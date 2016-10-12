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

__author__ = 'bmiller'

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
from .textfield import *
from sqlalchemy import create_engine, Table, MetaData, select, delete
from runestone.server import get_dburl
from runestone.server.componentdb import addQuestionToDB, addHTMLToDB
from runestone.common.runestonedirective import RunestoneDirective

try:
    from html import escape  # py3
except ImportError:
    from cgi import escape  # py2

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
    app.add_javascript('clike.js')
    app.add_javascript('timed_activecode.js')

    app.add_node(ActivcodeNode, html=(visit_ac_node, depart_ac_node))

    app.connect('doctree-resolved', process_activcode_nodes)
    app.connect('env-purge-doc', purge_activecodes)


TEMPLATE_START = """
<div data-childcomponent="%(divid)s" class="explainer ac_section alert alert-warning">
"""

TEMPLATE_END = """
<textarea data-component="activecode" id=%(divid)s data-lang="%(language)s" %(autorun)s %(hidecode)s %(include)s %(timelimit)s %(coach)s %(codelens)s data-audio='%(ctext)s' %(sourcefile)s %(datafile)s %(stdin)s %(gradebutton)s %(caption)s>
%(initialcode)s
</textarea>
</div>
"""

class ActivcodeNode(nodes.General, nodes.Element):
    def __init__(self, content):
        """

        Arguments:
        - `self`:
        - `content`:
        """
        super(ActivcodeNode, self).__init__(name=content['name'])
        self.ac_components = content


# self for these functions is an instance of the writer class.  For example
# in html, self is sphinx.writers.html.SmartyPantsHTMLTranslator
# The node that is passed as a parameter is an instance of our node class.
def visit_ac_node(self, node):
    # print self.settings.env.activecodecounter

    #todo:  handle above in node.ac_components
    #todo handle  'hidecode' not in node.ac_components:
    # todo:  handle if 'gradebutton' in node.ac_components: res += GRADES

    node.delimiter = "_start__{}_".format(node.ac_components['divid'])

    self.body.append(node.delimiter)

    res = TEMPLATE_START % node.ac_components
    self.body.append(res)


def depart_ac_node(self, node):
    ''' This is called at the start of processing an activecode node.  If activecode had recursive nodes
        etc and did not want to do all of the processing in visit_ac_node any finishing touches could be
        added here.
    '''
    res = TEMPLATE_END % node.ac_components
    self.body.append(res)


    addHTMLToDB(node.ac_components['divid'],
                node.ac_components['basecourse'],
                "".join(self.body[self.body.index(node.delimiter) + 1:]))

    self.body.remove(node.delimiter)


def process_activcode_nodes(app, env, docname):
    pass


def purge_activecodes(app, env, docname):
    pass


class ActiveCode(RunestoneDirective):
    """
.. activecode:: uniqueid   'nocanvas': directives.flag,
   :nopre: do not create an output component
   :above: put the canvas above the code
   :autorun: run this activecode as soon as the page is loaded
   :caption: caption under the active code
   :include: invisibly include code from another activecode
   :hidecode: Don:t show the editor initially
   :language: python, html, javascript, java, python2, python3
   :tour_1: audio tour track
   :tour_2: audio tour track
   :tour_3: audio tour track
   :tour_4: audio tour track
   :tour_5: audio tour track
   :nocodelens: Do not show the codelens button
   :coach: Show the codecoach button
   :timelimit: set the time limit for this program
   :stdin: : A file to simulate stdin (java, python2, python3)
   :datafile: : A datafile for the program to read (java, python2, python3)
   :sourcefile: : source files (java, python2, python3)
   :available_files: : other additional files (java, python2, python3)

    If this is a homework problem instead of an example in the text
    then the assignment text should go here.  The assignment text ends with
    the line containing four tilde ~
    ~~~~
    print("hello world")
    ====
    print("Hidden code, such as unit tests come after the four = signs")
    """
    required_arguments = 1
    optional_arguments = 1
    has_content = True
    option_spec = RunestoneDirective.option_spec.copy()
    option_spec.update({
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
        'gradebutton': directives.flag,
        'timelimit': directives.unchanged,
        'stdin' : directives.unchanged,
        'datafile' : directives.unchanged,
        'sourcefile' : directives.unchanged,
        'available_files' : directives.unchanged,
    })

    def run(self):

        addQuestionToDB(self)

        env = self.state.document.settings.env
        # keep track of how many activecodes we have.... could be used to automatically make a unique id for them.
        if not hasattr(env, 'activecodecounter'):
            env.activecodecounter = 0
        env.activecodecounter += 1
        self.options['name'] = self.arguments[0].strip()
        self.options['divid'] = self.arguments[0]

        if not self.options['divid']:
            raise Exception("No divid for ..activecode or ..actex in activecode.py")

        explain_text = None
        if self.content:
            if '~~~~' in self.content:
                idx = self.content.index('~~~~')
                explain_text = self.content[:idx]
                self.content = self.content[idx+1:]
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
        else:
            self.options['caption'] = "data-caption='%s'" % self.options['caption']

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
            self.options['initialcode'] = escape(self.options['initialcode'])

        if 'nocodelens' in self.options or self.options['language'] != 'python':
            self.options['codelens'] = ''
        else:
            self.options['codelens'] = 'data-codelens="true"'

        if 'timelimit' not in self.options:
            self.options['timelimit'] = 'data-timelimit=25000'
        else:
            self.options['timelimit'] = 'data-timelimit=%s' % self.options['timelimit']

        if 'autorun' not in self.options:
            self.options['autorun'] = ''
        else:
            self.options['autorun'] = 'data-autorun="true"'

        if 'coach' in self.options:
            self.options['coach'] = 'data-coach="true"'
        else:
            self.options['coach'] = ''

        # livecode options
        if 'stdin' in self.options:
            self.options['stdin'] = "data-stdin='%s'" % self.options['stdin']
        else:
            self.options['stdin'] = ""

        if 'datafile' not in self.options:
            self.options['datafile'] = ""
        else:
            self.options['datafile'] = "data-datafile='%s'" % self.options['datafile']

        if 'sourcefile' not in self.options:
            self.options['sourcefile'] = ""
        else:
            self.options['sourcefile'] = "data-sourcefile='%s'" % self.options['sourcefile']

        if 'gradebutton' not in self.options:
            self.options['gradebutton'] = ''
        else:
            self.options['gradebutton'] = "data-gradebutton=true"

        if self.content:
            if '====' in self.content:
                idx = self.content.index('====')
                source = "\n".join(self.content[:idx])
                suffix = "\n".join(self.content[idx+1:])
            else:
                source = "\n".join(self.content)
                suffix = "\n"
        else:
            source = '\n'
            suffix = '\n'
        try:
            engine = create_engine(get_dburl(locals()))
            meta = MetaData()
            course_name = env.config.html_context['course_id']
            Source_code = Table('source_code', meta, autoload=True, autoload_with=engine)
            divid = self.options['divid']

            engine.execute(Source_code.delete().where(Source_code.c.acid == divid).where(Source_code.c.course_id == course_name))
            engine.execute(Source_code.insert().values(
                acid = divid,
                course_id = course_name,
                main_code= source,
                suffix_code = suffix,
                includes = self.options['include'],
                available_files = self.options.get('available_files', "")
            ))
            try:
                ch, sub_ch = env.docname.split('/')
            except:
                ch, sub_ch = (env.docname, 'null subchapter')
            Div = Table('div_ids', meta, autoload=True, autoload_with=engine)
            engine.execute(Div.delete()\
                           .where(Div.c.course_name == course_name)\
                           .where(Div.c.chapter == ch)\
                           .where(Div.c.subchapter==sub_ch)\
                           .where(Div.c.div_id==divid))
            engine.execute(Div.insert().values(
                course_name = course_name,
                chapter = ch,
                subchapter = sub_ch,
                div_id = divid,
                div_type = 'activecode'
            ))


        except Exception as e:
            import traceback
            print("The exception is ", e)
            traceback.print_exc()
            print(env.config.html_context['course_id'])
            print("Unable to save to source_code table in activecode.py. Possible problems:")
            print("  1. dburl or course_id are not set in conf.py for your book")
            print("  2. unable to connect to the database using dburl")
            print("")
            print("This should only affect the grading interface. Everything else should be fine.")


        acnode = ActivcodeNode(self.options)
        self.add_name(acnode)    # make this divid available as a target for :ref:

        if explain_text:
            self.state.nested_parse(explain_text, self.content_offset, acnode)

        return [acnode]


class ActiveExercise(ActiveCode):
    required_arguments = 1
    optional_arguments = 0
    has_content = True

    def run(self):
        self.options['hidecode'] = "data-hidecode=true"
        self.options['gradebutton'] = "data-gradebutton=true"
        self.options['coach'] = "data-coach=true"
        return super(ActiveExercise, self).run()


if __name__ == '__main__':
    a = ActiveCode()
