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

__author__ = 'isaiahmayerchak'

import os.path
from docutils import nodes
from docutils.parsers.rst import directives
from sqlalchemy import Table
from runestone.server.componentdb import engine, meta
from runestone.common.runestonedirective import RunestoneIdDirective, RunestoneNode, add_skulpt_js

def setup(app):
    app.add_directive('datafile',DataFile)
    add_skulpt_js(app)

    app.add_javascript('datafile.js')

    app.add_stylesheet('datafile.css')

    app.add_node(DataFileNode, html=(visit_df_node, depart_df_node))

    app.connect('doctree-resolved',process_datafile_nodes)
    app.connect('env-purge-doc', purge_datafiles)


TEMPLATE = u"""
<div class="runestone datafile">
<div class="datafile_caption">Data file: <code>%(divid)s</code></div>
<pre data-component="datafile" id=%(divid)s %(hidden)s data-edit="%(edit)s" data-rows="%(rows)s" data-cols="%(cols)s">
%(filecontent)s</pre></div>
"""

class DataFileNode(nodes.General, nodes.Element, RunestoneNode):
    def __init__(self,content, **kwargs):
        """
        Arguments:
        - `self`:
        - `content`:
        """
        super(DataFileNode,self).__init__(**kwargs)
        self.df_content = content

# self for these functions is an instance of the writer class.  For example
# in html, self is sphinx.writers.html.SmartyPantsHTMLTranslator
# The node that is passed as a parameter is an instance of our node class.
def visit_df_node(self,node):
    res = TEMPLATE
    res = res % node.df_content

    res = res.replace("u'","'")  # hack:  there must be a better way to include the list and avoid unicode strings

    self.body.append(res)

def depart_df_node(self,node):
    ''' This is called at the start of processing an datafile node.  If datafile had recursive nodes
        etc and did not want to do all of the processing in visit_ac_node any finishing touches could be
        added here.
    '''
    pass


def process_datafile_nodes(app,env,docname):
    pass


def purge_datafiles(app,env,docname):
    pass


class DataFile(RunestoneIdDirective):
    """
.. datafile:: identifier
   :edit: Option that makes the datafile editable
   :cols: If editable, number of columns--default is 20
   :rows: If editable, number of rows--default is 40
   :hide: Flag that sets a non-editable datafile to be hidden
   :fromfile: path to file that contains the data
   """
    required_arguments = 1
    optional_arguments = 0
    has_content = True
    option_spec = RunestoneIdDirective.option_spec.copy()
    option_spec.update({
        'hide':directives.flag,
        'edit':directives.flag,
        'rows':directives.positive_int,
        'cols':directives.positive_int,
        'fromfile': directives.unchanged
    })

    def run(self):
        """
            process the multiplechoice directive and generate html for output.
            :param self:
            :return:
            .. datafile:: identifier
                :edit: Option that makes the datafile editable
                :cols: If editable, number of columns--default is 20
                :rows: If editable, number of rows--default is 40
                :hide: Flag that sets a non-editable datafile to be hidden
                :fromfile: path to file that contains the data
        """
        super(DataFile, self).run()
        env = self.state.document.settings.env

        if not hasattr(env,'datafilecounter'):
            env.datafilecounter = 0
        env.datafilecounter += 1
        import os
        if 'fromfile' in self.options:
            ffpath = os.path.dirname(self.srcpath)
            print(self.srcpath, os.getcwd())
            filename = os.path.join(env.srcdir, ffpath, self.options['fromfile'])
            with open(filename, 'rb') as f:
                self.content = [x[:-1].decode('utf8') for x in f.readlines()]

        if 'cols' in self.options:
            self.options['cols'] = self.options['cols']
        else:
            self.options['cols'] = min(65,max([len(x) for x in self.content]))
        if 'rows' in self.options:
            self.options['rows'] = self.options['rows']
        else:
            self.options['rows'] = 20

        if self.content:
            source = "\n".join(self.content)+"\n"
        else:
            source = '\n'
        self.options['filecontent'] = source

        if 'hide' in self.options:
            self.options['hidden'] = 'data-hidden'
        else:
            self.options['hidden'] = ''

        if 'edit' in self.options:
            self.options['edit'] = "true"
        else:
            self.options['edit'] = "false"

        if engine:
            Source_code = Table('source_code', meta, autoload=True, autoload_with=engine)
            course_name = env.config.html_context['course_id']
            divid = self.options['divid']

            engine.execute(Source_code.delete().where(Source_code.c.acid == divid).where(Source_code.c.course_id == course_name))
            engine.execute(Source_code.insert().values(
                acid = divid,
                course_id = course_name,
                main_code= source,
            ))
        else:
            print("Unable to save to source_code table in datafile__init__.py. Possible problems:")
            print("  1. dburl or course_id are not set in conf.py for your book")
            print("  2. unable to connect to the database using dburl")
            print()
            print("This should only affect the grading interface. Everything else should be fine.")


        data_file_node = DataFileNode(self.options, rawsource=self.block_text)
        data_file_node.source, data_file_node.line = self.state_machine.get_source_and_line(self.lineno)
        return [data_file_node]
