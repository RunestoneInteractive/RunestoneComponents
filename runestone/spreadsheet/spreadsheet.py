# Copyright (C) 2019  Bradley N. Miller,
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
__author__ = "bmiller"

import csv
import io
import os
import re
import urllib.parse
from docutils import nodes
from docutils.parsers.rst import directives
from runestone.common.runestonedirective import (
    RunestoneNode,
    RunestoneIdDirective,
    RunestoneIdNode,
    get_node_line,
)
from runestone.server.componentdb import addQuestionToDB, addHTMLToDB

#
# setup is called when extensions are loaded. This registers the new directive and
# logs any js or css files that should be loaded for this extension.
#
def setup(app):
    app.add_directive("spreadsheet", SpreadSheet)

    app.add_node(SpreadSheetNode, html=(visit_ss_node, depart_ss_node))


# When the directive is process we will create nodes in the document tree to account
# for what we need to see on the final page.  Although we only care to render interactive
# textbooks as HTML one could, render the nodes as LaTex or many other languages.
#
class SpreadSheetNode(nodes.General, nodes.Element, RunestoneIdNode):
    def __init__(self, content, **kwargs):
        """

        Arguments:
        - `self`:
        - `content`:
        """
        super(SpreadSheetNode, self).__init__(**kwargs)
        self.runestone_options = content


#
# The spreadsheet class implements the directive.
# When the directive is processed the run method is called.
# This allows us to handle any arguments, and then create a node or nodes to insert into the
# document tree to be rendered when the tree is written.
#
class SpreadSheet(RunestoneIdDirective):
    """
    .. spreadsheet:: uniqueid
        :fromcsv: path/to/csv/file
        :colwidths: list of column widths
        :coltitles: list of column names
        :mindimensions: mincols, minrows  -- minDimensions:[10,5]

        A1,B1,C1,D1...
        A2,B2,C2,D2...
    """

    required_arguments = 1
    optional_arguments = 5
    has_content = True
    option_spec = RunestoneIdDirective.option_spec.copy()
    option_spec.update(
        {
            "fromcsv": directives.unchanged,
            "colwidths": directives.unchanged,
            "coltitles": directives.unchanged,
            "mindimensions": directives.unchanged,
        }
    )

    def run(self):
        super(SpreadSheet, self).run()
        env = self.state.document.settings.env

        self.options["divid"] = self.arguments[0].strip()

        if "====" in self.content:
            idx = self.content.index("====")
            suffix = self.content[idx + 1 :]
            self.options["asserts"] = suffix
            self.options["autograde"] = 'data-autograde="true"'
        else:
            self.options["asserts"] = '""'
            self.options["autograde"] = ""

        if "fromcsv" in self.options:
            self.content = self.body_from_csv(env, self.options["fromcsv"])
        else:
            if self.content:
                self.content = self.body_to_csv(self.content)
            else:
                raise ValueError(
                    "You must specify either from csv or provide content in the body"
                )

        self.options["data"] = self.content

        if "coltitles" not in self.options:
            self.options["coltitles"] = ""
        else:
            self.options["coltitles"] = "data-coltitles=[{}]".format(
                ",".join(
                    [
                        urllib.parse.quote(x.strip(), safe="'\"")
                        for x in self.options["coltitles"].split(",")
                    ]
                )
            )

        if "mindimensions" not in self.options:
            self.options["mindimensions"] = ""
        else:
            self.options["mindimensions"] = "data-mindimensions=[{}]".format(
                ",".join([x.strip() for x in self.options["mindimensions"].split(",")])
            )

        if "colwidths" not in self.options:
            self.options["colwidths"] = ""
        else:
            self.options["colwidths"] = "data-colwidths=[{}]".format(
                ",".join([x.strip() for x in self.options["colwidths"].split(",")])
            )

        ssnode = SpreadSheetNode(self.options, rawsource=self.block_text)
        ssnode.source, ssnode.line = self.state_machine.get_source_and_line(self.lineno)
        self.add_name(ssnode)  # make this divid available as a target for :ref:

        return [ssnode]

    def body_to_csv(self, row_list):
        """
        Use the csv reader and writer functionality to better parse the body.

        1. Convert the contents to a StringIO object
        2. Then read and process using a csv reader
        3. Formulas with ,'s in them should be in double quotes, if there are "'s in the
           cell then they should be ""-ed
        """

        csvlist = []
        body_list = []
        for row in row_list:
            if re.match(r"^\s*====", row):
                break
            body_list.append(row)
        body_file = io.StringIO("\n".join(body_list))
        body_reader = csv.reader(body_file)
        for row in body_reader:
            ilist = []
            for item in row:
                item = item.strip()
                if item and item[0] == '"' and item[-1] == '"':
                    item = item[1:-1]
                if is_float(item):
                    ilist.append(as_int_or_float(item))
                elif item.startswith("="):
                    ilist.append("{}".format(item.upper()))
                else:
                    ilist.append("{}".format(item))
            csvlist.append(ilist)
        return csvlist

    def body_from_csv(self, env, csvfile):
        ffpath = os.path.dirname(self.srcpath)
        print(self.srcpath, os.getcwd())
        filename = os.path.join(env.srcdir, ffpath, csvfile)

        print("\n\nPATH=", self.srcpath)
        with open(filename, "r") as csv:
            content = csv.readlines()

        content = [line[:-1] for line in content]
        return self.body_to_csv(content)


def is_float(s):
    try:
        x = float(s)
        return True
    except:
        return False


def as_int_or_float(s):
    try:
        x = int(s)
        return x
    except:
        x = float(s)
        return x


TEMPLATE = """
<div id="{divid}" data-component="spreadsheet" class="runestone" {autograde} {mindimensions} {colwidths} {coltitles} data-question_label="{question_label}">
    <div id="{divid}_sheet"></div>

    <script>
        {divid}_data = {data};
        {divid}_asserts = {asserts};
    </script>

</div>
"""


def visit_ss_node(self, node):
    res = TEMPLATE.format(**node.runestone_options)
    self.body.append(res)


def depart_ss_node(self, node):
    pass
