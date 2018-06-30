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

from docutils import nodes
from docutils.parsers.rst import directives
from sqlalchemy import Table
from runestone.server.componentdb import engine, meta
from runestone.common.runestonedirective import RunestoneIdDirective, RunestoneNode


def setup(app):
    app.add_directive('datafile',DataFile)

    app.add_stylesheet('datafile.css')

    app.add_node(DataFileNode, html=(visit_df_node, None))


TEMPLATE = """
<div class="runestone datafile %(hidden_class)s">
<div class="datafile_caption">Data file: <code>%(divid)s</code></div>
<pre id=%(divid)s contenteditable="%(edit)s" style="%(width)s %(height)s">
%(filecontent)s</pre>
</div>
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
def visit_df_node(self, node):
    res = TEMPLATE % node.df_content

    self.body.append(res)

    # Content fully processed, don't need a depart_...() call:
    raise nodes.SkipNode


class DataFile(RunestoneIdDirective):
    """
.. datafile:: identifier
   :edit: Option that makes the datafile editable
   :cols: Number of columns--default is full width of page content
   :rows: Number of rows--default is to size to content
   :hide: Flag that sets a non-editable datafile to be hidden
   """
    required_arguments = 1
    optional_arguments = 0
    has_content = True
    option_spec = RunestoneIdDirective.option_spec.copy()
    option_spec.update({
        'hide':directives.flag,
        'edit':directives.flag,
        'rows':directives.positive_int,
        'cols':directives.positive_int
    })

    def run(self):
        """
            process the multiplechoice directive and generate html for output.
            :param self:
            :return:
            .. datafile:: identifier
                :edit: Option that makes the datafile editable
                :cols: Number of columns--default is full width of page content
                :rows: Number of rows--default is to size to content
                :hide: Flag that sets a non-editable datafile to be hidden
        """
        super(DataFile, self).run()
        env = self.state.document.settings.env

        if not hasattr(env,'datafilecounter'):
            env.datafilecounter = 0
        env.datafilecounter += 1

        if 'cols' in self.options:
            # 1ch char width plus buffer = (cols*2+2)ch width
            self.options['width'] = "width: %dch;" % (self.options['cols'] + 2)
        else:
            self.options['width'] = ''

        if 'rows' in self.options:
            # 1.5em linehight plus buffer = (rows*1.5+2)em height
            self.options['height'] = "height: %dem;" % (self.options['rows'] * 1.5 + 2)
        else:
            self.options['height'] = ''

        if self.content:
            source = "\n".join(self.content)
        else:
            source = ''
        self.options['filecontent'] = source

        if 'hide' in self.options:
            self.options['hidden_class'] = "datafile_hidden"
        else:
            self.options['hidden_class'] = ""

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
                acid=divid,
                course_id=course_name,
                main_code=source,
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
