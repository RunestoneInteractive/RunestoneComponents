# Copyright (C) 2012  Michael Hewner, Isaiah Mayerchak
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
__author__ = "isaiahmayerchak"
from textwrap import dedent
import pdb
import random
from docutils import nodes
from docutils.parsers.rst import directives
from runestone.mchoice import Assessment
from runestone.server.componentdb import (
    addQuestionToDB,
    addHTMLToDB,
    maybeAddToAssignment,
)
from runestone.common.runestonedirective import RunestoneIdNode


def setup(app):
    app.add_directive("parsonsprob", ParsonsProblem)
    app.add_node(
        ParsonsNode,
        html=(visit_parsons_html, depart_parsons_html),
        xml=(visit_parsons_xml, depart_parsons_xml),
    )
    app.add_config_value("parsons_div_class", "runestone", "html")


TEMPLATE_START = """
        <div class="%(divclass)s parsons-container %(optclass)s">
        <div data-component="parsons" id="%(divid)s" class="parsons" >
        <div class="parsons_question parsons-text" >
    """

TEMPLATE_END = """
        </div>
        <pre  class="parsonsblocks" data-question_label="%(question_label)s"  %(adaptive)s %(maxdist)s %(order)s %(noindent)s %(language)s %(grader)s %(numbered)s %(optional)s style="visibility: hidden;">
        %(code)s
        </pre>
        </div>
        </div>
    """


class ParsonsNode(nodes.General, nodes.Element, RunestoneIdNode):
    pass


def wrap_with_tag(text: str, tag: str, **kwargs) -> str:
    start = f"<{tag}"
    for k, v in kwargs.items():
        start += f" {k}='{v}'"
    start += ">"
    end = f"</{tag}>\n"
    return start + text + end


def visit_parsons_xml(self, node):
    if node["runestone_options"]["numbered"]:
        node["runestone_options"]["numbered"] = "numbered='yes'"

    if node["runestone_options"]["adaptive"]:
        node["runestone_options"]["adaptive"] = "adaptive='yes'"

    if not node["runestone_options"]["noindent"]:
        node["runestone_options"]["noindent"] = "indent='show'"
    else:
        node["runestone_options"]["noindent"] = "indent='hide'"

    if node["runestone_options"]["language"]:
        node["runestone_options"]["language"] = node["runestone_options"]["language"].replace(
            "data-", "")
    else:
        node["runestone_options"]["language"] = "language='python'"

    res = "<exercise label='{divid}' {numbered} {adaptive} {noindent} {language}>".format(
        **node["runestone_options"])
    res += "<statement>\n"
    self.output.append(res)


def process_one_block(block, choice=False, correct=False, natural=False):
    code_list = block.split("\n")
    if choice:
        attrs = "correct='yes'" if correct else ""
        res = f"<choice {attrs}>"
    else:
        res = ""
    for line in code_list:
        if line:
            line = line.replace("#paired", "")
            line = line.replace("#distractor", "")
            if natural:
                res += wrap_with_tag(line, "p")
            else:
                res += wrap_with_tag(line, "cline")
    if choice:
        res += "</choice>"
    return res


def depart_parsons_xml(self, node):
    res = "</statement>\n<blocks>"
    if "natural" in node["runestone_options"]["language"]:
        natural = True
    else:
        natural = False
    # first split into blocks based on --- then process each block...
    block_list = dedent(node["runestone_options"]["code"]).split("---")
    order = list(range(1, len(block_list) + 1))
    random.shuffle(order)
    block = block_list.pop(0)
    while block:
        attr = f"order='{order.pop()}' "
        attr += "correct='no'" if "#distractor" in block else ""
        res += f"<block {attr}>\n"
        # check to see if the next block is a distractor
        if block_list and "#paired" in block_list[0]:
            choice = True
            res += process_one_block(block, choice, True, natural)
            res += process_one_block(block_list.pop(0), choice, False, natural)
        else:
            choice = False
            res += process_one_block(block, choice, True, natural)
        res += "</block>"
        if block_list:
            block = block_list.pop(0)
        else:
            block = None

    res += "</blocks></exercise>"
    self.output.append(res)


def visit_parsons_html(self, node):
    node["delimiter"] = "_start__{}_".format(node["runestone_options"]["divid"])
    self.body.append(node["delimiter"])
    res = TEMPLATE_START % node["runestone_options"]
    self.body.append(res)


def depart_parsons_html(self, node):
    res = TEMPLATE_END % node["runestone_options"]
    self.body.append(res)
    addHTMLToDB(
        node["runestone_options"]["divid"],
        node["runestone_options"]["basecourse"],
        "".join(self.body[self.body.index(node["delimiter"]) + 1 :]),
    )
    self.body.remove(node["delimiter"])


class ParsonsProblem(Assessment):
    """
    .. parsonsprob:: unqiue_problem_id_here
       :maxdist:
       :order:
       :language:
       :noindent:
       :adaptive:
       :numbered:

       Solve my really cool parsons problem...if you can.
       -----
       def findmax(alist):
       =====
          if len(alist) == 0:
             return None
       =====
          curmax = alist[0]
          for item in alist:
       =====
             if item &gt; curmax:
       =====
                curmax = item
       =====
          return curmax


    config values (conf.py):

    - parsons_div_class - custom CSS class of the component's outermost div
    """

    required_arguments = 1
    optional_arguments = 1
    final_argument_whitespace = False
    option_spec = Assessment.option_spec.copy()
    option_spec.update(
        {
            "maxdist": directives.unchanged,
            "order": directives.unchanged,
            "language": directives.unchanged,
            "noindent": directives.flag,
            "adaptive": directives.flag,
            "numbered": directives.unchanged,
            "grader": directives.unchanged,
        }
    )
    has_content = True

    def run(self):
        """

           Instructions for solving the problem should be written and then a line with -----
           signals the beginning of the code.  If you want more than one line in a single
           code block, seperate your code blocks with =====.

           Both the instructions sections and code blocks are optional. If you don't include any
           =====, the code will assume you want each line to be its own code block.

        Example:

        .. parsonsprob:: unqiue_problem_id_here

           Solve my really cool parsons problem...if you can.
           -----
           def findmax(alist):
           =====
              if len(alist) == 0:
                 return None
           =====
              curmax = alist[0]
              for item in alist:
           =====
                 if item &gt; curmax:
           =====
                    curmax = item
           =====
              return curmax


        """

        super(ParsonsProblem, self).run()
        addQuestionToDB(self)

        env = self.state.document.settings.env
        self.options["instructions"] = ""
        self.options["code"] = self.content
        self.options["divclass"] = env.config.parsons_div_class

        if "numbered" in self.options:
            self.options["numbered"] = (
                ' data-numbered="' + self.options["numbered"] + '"'
            )  # ' data-numbered="true"'
        else:
            self.options["numbered"] = ""

        if "maxdist" in self.options:
            self.options["maxdist"] = ' data-maxdist="' + self.options["maxdist"] + '"'
        else:
            self.options["maxdist"] = ""
        if "order" in self.options:
            self.options["order"] = ' data-order="' + self.options["order"] + '"'
        else:
            self.options["order"] = ""
        if "noindent" in self.options:
            self.options["noindent"] = ' data-noindent="true"'
        else:
            self.options["noindent"] = ""
        if "adaptive" in self.options:
            if self.options.get("grader") == "dag" and "adaptive" in self.options:
                raise Exception("Adaptivity not yet supported with DAG grader")
            self.options["adaptive"] = ' data-adaptive="true"'
        else:
            self.options["adaptive"] = ""
        if "language" in self.options:
            self.options["language"] = (
                ' data-language="' + self.options["language"] + '"'
            )
        else:
            self.options["language"] = ""
        if "grader" in self.options:
            self.options["grader"] = ' data-grader="' + self.options["grader"] + '"'
        else:
            self.options["grader"] = ""

        if "-----" in self.content:
            index = self.content.index("-----")
            self.options["instructions"] = self.content[:index]
            self.options["code"] = self.content[index + 1 :]
        else:
            self.options["instructions"] = ["Arrange the blocks"]

        if "=====" in self.options["code"]:
            self.options["code"] = "\n".join(self.options["code"])

            self.options["code"] = self.options["code"].replace("=====", "---")
        else:
            self.options["code"] = "\n".join(self.options["code"])

        self.assert_has_content()

        maybeAddToAssignment(self)
        parsons_node = ParsonsNode()
        parsons_node["runestone_options"] = self.options
        (
            parsons_node["source"],
            parsons_node["line"],
        ) = self.state_machine.get_source_and_line(self.lineno)
        self.state.nested_parse(
            self.options["instructions"], self.content_offset, parsons_node
        )
        # explain_text is a list.
        return [parsons_node]
