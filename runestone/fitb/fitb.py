# ******************************************************************
# |docname| - Provide Sphinx support for fill-in-the-blank questions
# ******************************************************************
#
# .. Copyright (C) 2013  Bradley N. Miller
#
#   This program is free software: you can redistribute it and/or modify
#   it under the terms of the GNU General Public License as published by
#   the Free Software Foundation, either version 3 of the License, or
#   (at your option) any later version.
#
#   This program is distributed in the hope that it will be useful,
#   but WITHOUT ANY WARRANTY; without even the implied warranty of
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU General Public License for more details.
#
#   You should have received a copy of the GNU General Public License
#   along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
__author__ = "isaiahmayerchak"

import json
import ast
from numbers import Number
import re
import pdb

from docutils import nodes
from docutils.parsers.rst import directives
from sphinx.util import logging

from runestone.server.componentdb import (
    addQuestionToDB,
    addHTMLToDB,
    maybeAddToAssignment,
)
from runestone.common import (
    RunestoneIdDirective,
    RunestoneNode,
    RunestoneIdNode,
    get_node_line,
)
from runestone.common.xmlcommon import substitute_departure, substitute_visitor


def noop(self, node):
    pass


def setup(app):
    app.add_directive("fillintheblank", FillInTheBlank)
    app.add_role("blank", BlankRole)
    app.add_node(FITBNode, html=(visit_fitb_html, depart_fitb_html),
                 xml=(visit_fitb_xml, depart_fitb_xml))
    app.add_node(BlankNode, html=(visit_blank_html, depart_blank_html))
    app.add_node(
        FITBFeedbackNode, html=(visit_fitb_feedback_html, depart_fitb_feedback_html),
        xml=(noop, noop)
    )

    app.add_config_value("fitb_div_class", "runestone", "html")


class FITBNode(nodes.General, nodes.Element, RunestoneIdNode):
    pass


def visit_fitb_html(self, node):

    node["delimiter"] = "_start__{}_".format(node["runestone_options"]["divid"])
    self.body.append(node["delimiter"])

    res = node["template_start"] % node["runestone_options"]
    self.body.append(res)


def depart_fitb_html(self, node):
    # If there were fewer blanks than feedback items, add blanks at the end of the question.
    blankCount = 0
    for _ in node.traverse(BlankNode):
        blankCount += 1
    while blankCount < len(node["feedbackArray"]):
        visit_blank_html(self, None)
        blankCount += 1

    # Warn if there are fewer feedback items than blanks.
    if len(node["feedbackArray"]) < blankCount:
        # Taken from the example in the `logging API <http://www.sphinx-doc.org/en/stable/extdev/logging.html#logging-api>`_.
        logger = logging.getLogger(__name__)
        logger.warning(
            "Not enough feedback for the number of blanks supplied.", location=node
        )

    # Generate the HTML.
    json_feedback = json.dumps(node["feedbackArray"])
    # Some nodes (for example, those in a timed node) have their ``document == None``. Find a valid ``document``.
    node_with_document = node
    while not node_with_document.document:
        node_with_document = node_with_document.parent
    # Supply grading info (the ``json_feedback``) to the client if we're not grading on the server.
    ssg = node_with_document.document.settings.env.config.runestone_server_side_grading
    node["runestone_options"]["json"] = "false" if ssg else json_feedback
    res = node["template_end"] % node["runestone_options"]
    self.body.append(res)

    # add HTML to the Database and clean up
    addHTMLToDB(
        node["runestone_options"]["divid"],
        node["runestone_options"]["basecourse"],
        "".join(self.body[self.body.index(node["delimiter"]) + 1 :]),
        # Either provide grading info to enable server-side grading or pass ``None`` to select client-side grading.
        json_feedback if ssg else None,
    )

    self.body.remove(node["delimiter"])

# <exercise>
#     <title>Fill-In, Integer Answer</title>

#     <statement>
#         <p>The game of bowling uses <var/> pins that you try to knock down.</p>
#     </statement>
#     <setup>
#         <var>
#             <condition number="10">
#                 <feedback>
#                     <p>Arranged in a triangle, there are <m>1+2+3+4 = 10</m> pins, a so-called <term>triangular</term> number.</p>
#                 </feedback>
#             </condition>
#             <condition number="16">
#                 <feedback>
#                     <p><em>Close</em>! You may have used hexadecimal notation, when you did not really mean to.</p>
#                 </feedback>
#             </condition>
#             <condition string=".*">
#                 <feedback>
#                     <p>Incorrect.</p>
#                 </feedback>
#             </condition>
#         </var>
#     </setup>
# </exercise>


def visit_fitb_xml(self, node):

    TEMPLATE_START = """
        <exercise>
            <statement>
    """
    self.output.append(TEMPLATE_START)
    node.private_children = node.children[1:]
    stmt = str(node.children[0])
    stmt = re.sub(r"<problematic.*?</problematic>", "<var />", stmt)
    neededBlanks = len(node["runestone_options"]["pattlist"])
    numBlanks = stmt.count("<var />")
    diff = neededBlanks - numBlanks
    if diff > 0:
        stmt = stmt[0:stmt.rfind("</paragraph>")]
        for i in range(diff):
            stmt += " <var /> "
        stmt += " </paragraph>"
    node.children = []
    self.output.append(stmt)
    self.output.append("</statement>")


def depart_fitb_xml(self, node):

    # pattlist = node["runestone_options"]["pattlist"]  # answer patterns
    # flist = node["runestone_options"]["flist"]  # feedback
    # for _ in pattlist:
    #     blankCount += 1
    # while blankCount < len(flist):
    #     visit_blank_xml(self, None)
    #     blankCount += 1

    self.output.append("<setup>")
    # Walk the children of node
    # child 0 is the statement
    # children 1..N are the feedbacks
    #    each of these children will have an atribute called blankfeedbackdict which is the match for this
    #    each child will have a child/children that is the actual feedback we want to supply
    #

    for var in range(len(node["runestone_options"]["pattlist"])):
        self.output.append("<var>")

        for ans in range(len(node["runestone_options"]["pattlist"][var])):
            child = node.private_children.pop(0)
            if "blankfeedbackdict" in child:
                rx = child["blankfeedbackdict"]
                if "number" in rx:
                    self.output.append(f"""<condition number="{rx['number']}">""")
                else:
                    self.output.append(f"""<condition string="{rx['regex']}">""")
                fb = ""
                for p in child.children:
                    fb += str(p)
                self.output.append(f"<feedback>{fb}</feedback>")
                self.output.append("</condition>")
            else:
                self.output.append(str(child))
        self.output.append("</var>")
    self.output.append("</setup>")
    self.output.append("</exercise>")


class FillInTheBlank(RunestoneIdDirective):
    """
    .. fillintheblank:: some_unique_id_here

        Put the text of the question here.
        See https://runestone.academy/runestone/books/published/overview/Assessments/fitb.html
        for additional options and documentation.
        -   :Put the correct answer here: Put feedback displayed for this answer here.
            :x: Put feedback displayed for an incorrect answer here.
    """

    # config values (conf.py):
    #
    # - fitb_div_class - custom CSS class of the component's outermost div

    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = True
    has_content = True
    option_spec = RunestoneIdDirective.option_spec.copy()
    option_spec.update(
        {
            "casei": directives.flag,  # case insensitive matching
        }
    )

    def run(self):
        """
            process the fillintheblank directive and generate html for output.
            :param self:
            :return: Nodes resulting from this directive.
            ...
            """

        super(FillInTheBlank, self).run()

        TEMPLATE_START = """
        <div class="%(divclass)s %(optclass)s">
        <div data-component="fillintheblank" data-question_label="%(question_label)s" id="%(divid)s" %(optional)s style="visibility: hidden;">
            """

        TEMPLATE_END = """
        <script type="application/json">
            %(json)s
        </script>

        </div>
        </div>
            """

        addQuestionToDB(self)

        fitbNode = FITBNode()
        fitbNode["runestone_options"] = self.options
        fitbNode["feedbackArray"] = []
        fitbNode["source"], fitbNode["line"] = self.state_machine.get_source_and_line(
            self.lineno
        )
        fitbNode["template_start"] = TEMPLATE_START
        fitbNode["template_end"] = TEMPLATE_END

        self.updateContent()

        self.state.nested_parse(self.content, self.content_offset, fitbNode)
        env = self.state.document.settings.env
        self.options["divclass"] = env.config.fitb_div_class
        # Expected _`structure`, with assigned variable names and transformations made:
        #
        # .. code-block::
        #   :number-lines:
        #
        #   fitbNode = FITBNode()
        #       Item 1 of problem text
        #       ...
        #       Item n of problem text
        #       feedback_bullet_list = bullet_list()  <-- The last element in fitbNode.
        #           feedback_list_item = list_item()   <-- Feedback for the first blank.
        #               feedback_field_list = field_list()
        #                   feedback_field = field()
        #                       feedback_field_name = field_name()  <-- Contains an answer.
        #                       feedback_field_body = field_body()  <-- Contains feedback for this answer.
        #                   feedback_field = field()  <-- Another answer/feedback pair.
        #           feedback_list_item = bullet_item()  <-- Feedback for the second blank.
        #               ...etc. ...
        #
        # This becomes a data structure:
        #
        # .. code-block::
        #   :number-lines:
        #
        #   self.feedbackArray = [
        #       [   # blankArray
        #           { # blankFeedbackDict: feedback 1
        #               "regex" : feedback_field_name   # (An answer, as a regex;
        #               "regexFlags" : "x"              # "i" if ``:casei:`` was specified, otherwise "".) OR
        #               "number" : [min, max]           # a range of correct numeric answers.
        #               "feedback": feedback_field_body (after being rendered as HTML)  # Provides feedback for this answer.
        #           },
        #           { # Feedback 2
        #               Same as above.
        #           }
        #       ],
        #       [  # Blank 2, same as above.
        #       ]
        #   ]
        #
        # ...and a transformed node structure:
        #
        # .. code-block::
        #   :number-lines:
        #
        #   fitbNode = FITBNode()
        #       Item 1 of problem text
        #       ...
        #       Item n of problem text
        #       FITBFeedbackNode(), which contains all the nodes in blank 1's feedback_field_body
        #       ...
        #       FITBFeedbackNode(), which contains all the nodes in blank n's feedback_field_body
        #
        self.assert_has_content()
        feedback_bullet_list = fitbNode.pop()
        if not isinstance(feedback_bullet_list, nodes.bullet_list):
            raise self.error(
                "On line {}, the last item in a fill-in-the-blank question must be a bulleted list.".format(
                    get_node_line(feedback_bullet_list)
                )
            )
        # Thelength of feedbback_list_item gives us the number of blanks.
        # the number of feedback is len(feedback_bullet_list.children[x].children[0].children)
        for feedback_list_item in feedback_bullet_list.children:
            assert isinstance(feedback_list_item, nodes.list_item)
            feedback_field_list = feedback_list_item[0]
            if len(feedback_list_item) != 1 or not isinstance(
                feedback_field_list, nodes.field_list
            ):
                raise self.error(
                    "On line {}, each list item in a fill-in-the-blank problems must contain only one item, a field list.".format(
                        get_node_line(feedback_list_item)
                    )
                )
            blankArray = []
            for feedback_field in feedback_field_list:
                assert isinstance(feedback_field, nodes.field)

                feedback_field_name = feedback_field[0]
                assert isinstance(feedback_field_name, nodes.field_name)
                feedback_field_name_raw = feedback_field_name.rawsource
                # See if this is a number, optinonally followed by a tolerance.
                try:
                    # Parse the number. In Python 3 syntax, this would be ``str_num, *list_tol = feedback_field_name_raw.split()``.
                    tmp = feedback_field_name_raw.split()
                    str_num = tmp[0]
                    list_tol = tmp[1:]
                    num = ast.literal_eval(str_num)
                    assert isinstance(num, Number)
                    # If no tolerance is given, use a tolarance of 0.
                    if len(list_tol) == 0:
                        tol = 0
                    else:
                        assert len(list_tol) == 1
                        tol = ast.literal_eval(list_tol[0])
                        assert isinstance(tol, Number)
                    # We have the number and a tolerance. Save that.
                    blankFeedbackDict = {"number": [num - tol, num + tol]}
                except (SyntaxError, ValueError, AssertionError):
                    # We can't parse this as a number, so assume it's a regex.
                    regex = (
                        # The given regex must match the entire string, from the beginning (which may be preceded by whitespaces) ...
                        r"^\s*"

                        # ... to the contents (where a single space in the provided pattern is treated as one or more whitespaces in the student's answer) ...
                        + feedback_field_name.rawsource.replace(" ", r"\s+")
                        # ... to the end (also with optional spaces).
                        + r"\s*$"
                    )
                    blankFeedbackDict = {
                        "regex": regex,
                        "regexFlags": "i" if "casei" in self.options else "",
                    }
                    # Test out the regex to make sure it compiles without an error.
                    try:
                        re.compile(regex)
                    except Exception as ex:
                        raise self.error(
                            'Error when compiling regex "{}": {}.'.format(
                                regex, str(ex)
                            )
                        )
                blankArray.append(blankFeedbackDict)
                feedback_field_body = feedback_field[1]
                assert isinstance(feedback_field_body, nodes.field_body)
                # Append feedback for this answer to the end of the fitbNode.
                ffn = FITBFeedbackNode(
                    feedback_field_body.rawsource,
                    *feedback_field_body.children,
                    **feedback_field_body.attributes
                )
                ffn["blankFeedbackDict"] = blankFeedbackDict
                fitbNode += ffn

            # Add all the feedback for this blank to the feedbackArray.
            fitbNode["feedbackArray"].append(blankArray)

        maybeAddToAssignment(self)
        fitbNode["runestone_options"]["pattlist"] = fitbNode["feedbackArray"][:]
        fitbNode["runestone_options"]["flist"] = feedback_field_list[:]

        return [fitbNode]


# BlankRole
# ---------
# Create role representing the blank in a fill-in-the-blank question. This function returns a tuple of two values:
#
# 0. A list of nodes which will be inserted into the document tree at the point where the interpreted role was encountered (can be an empty list).
# #. A list of system messages, which will be inserted into the document tree immediately after the end of the current block (can also be empty).
def BlankRole(
    # _`roleName`: the local name of the interpreted role, the role name actually used in the document.
    roleName,
    # _`rawtext` is a string containing the enitre interpreted text input, including the role and markup. Return it as a problematic node linked to a system message if a problem is encountered.
    rawtext,
    # The interpreted _`text` content.
    text,
    # The line number (_`lineno`) where the interpreted text begins.
    lineno,
    # _`inliner` is the docutils.parsers.rst.states.Inliner object that called this function. It contains the several attributes useful for error reporting and document tree access.
    inliner,
    # A dictionary of directive _`options` for customization (from the "role" directive), to be interpreted by this function. Used for additional attributes for the generated elements and other functionality.
    options={},
    # A list of strings, the directive _`content` for customization (from the "role" directive). To be interpreted by the role function.
    content=[],
):

    # Blanks ignore all arguments, just inserting a blank.
    blank_node = BlankNode(rawtext)
    blank_node.line = lineno
    return [blank_node], []


class BlankNode(nodes.Inline, nodes.TextElement, RunestoneNode):
    pass


def visit_blank_html(self, node):
    self.body.append('<input type="text">')


def visit_blank_xml(self, node):
    self.output.append('<p><var /></p>')


def depart_blank_html(self, node):
    pass


# Contains feedback for one answer.
class FITBFeedbackNode(nodes.General, nodes.Element, RunestoneNode):
    pass


def visit_fitb_feedback_html(self, node):
    # Save the HTML generated thus far. Anything generated under this node will be placed in JSON.
    self.context.append(self.body)
    self.body = []


def depart_fitb_feedback_html(self, node):
    # Place all the HTML generated for this node and its children into the feedbackArray.
    node["blankFeedbackDict"]["feedback"] = "".join(self.body)
    # Restore HTML generated thus far.
    self.body = self.context.pop()
