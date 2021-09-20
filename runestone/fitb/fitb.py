# *********
# |docname|
# *********
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


def setup(app):
    app.add_directive("fillintheblank", FillInTheBlank)
    app.add_role("blank", BlankRole)
    app.add_node(FITBNode, html=(visit_fitb_node, depart_fitb_node))
    app.add_node(BlankNode, html=(visit_blank_node, depart_blank_node))
    app.add_node(
        FITBFeedbackNode, html=(visit_fitb_feedback_node, depart_fitb_feedback_node)
    )

    app.add_config_value("fitb_div_class", "runestone", "html")


class FITBNode(nodes.General, nodes.Element, RunestoneIdNode):
    def __init__(self, content, **kwargs):
        """

        Arguments:
        - `self`:
        - `content`:
        """
        super(FITBNode, self).__init__(**kwargs)
        self.runestone_options = content
        # Create a data structure of feedback.
        self.feedbackArray = []


def visit_fitb_node(self, node):
    # Save the HTML that's been generated so far. We want to know only what's generated inside this directive.
    self.context.append(self.body)
    self.body = []



def depart_fitb_node(self, node):
    # If there were fewer blanks than feedback items, add blanks at the end of the question. Also, determine the names of each blank.
    blank_names = {}
    blank_count = 0
    for blank_node in node.traverse(BlankNode):
        # Empty blanks have a "name" of ``-``.
        name = blank_node["input_name"]
        if name != "-":
            # Map from the blank's name to its index in the array of blanks. Don't include unnamed blanks.
            blank_names[name] = blank_count
        blank_count += 1
    while blank_count < len(node.feedbackArray):
        visit_blank_node(self, None)
        blank_count += 1

    # Warn if there are fewer feedback items than blanks.
    if len(node.feedbackArray) < blank_count:
        # Taken from the example in the `logging API <http://www.sphinx-doc.org/en/stable/extdev/logging.html#logging-api>`_.
        logger = logging.getLogger(__name__)
        logger.warning(
            "Not enough feedback for the number of blanks supplied.", location=node
        )

    # Capture HTML generated inside this directive.
    inner_html = self.body
    self.body = self.context.pop()

    # Generate the HTML.
    server_json = json.dumps({
        "problemHtml": "".join(inner_html),
        "dyn_vars": node.dynamic,
        "blankNames": blank_names,
        "feedbackArray": node.feedbackArray
    })
    # Some nodes (for example, those in a timed node) have their ``document == None``. Find a valid ``document``.
    node_with_document = node
    while not node_with_document.document:
        node_with_document = node_with_document.parent
    # Supply client-side grading info if we're not grading on the server.
    if node_with_document.document.settings.env.config.runestone_server_side_grading:
        if node.dynamic:
            # Server-side graded dynamic problems render and provide the problem's HTML on the server; just tell the client it's a dynamic problem.
            client_json = json.dumps(dict(dyn_vars=True))
        else:
            # Other server-side graded problems need the problem's HTML.
            client_json = json.dumps(dict(problemHtml="".join(inner_html)))
    else:
        client_json = server_json
    node.runestone_options["client_json"] = client_json
    outer_html = """
        <div class="%(divclass)s">
            <div data-component="fillintheblank" data-question_label="%(question_label)s" id="%(divid)s" %(optional)s style="visibility: hidden;">
                <script type="application/json">
                    %(client_json)s
                </script>
            </div>
        </div>
            """ % node.runestone_options

    # add HTML to the Database and clean up
    addHTMLToDB(
        node.runestone_options["divid"],
        node.runestone_options["basecourse"],
        outer_html,
        server_json,
    )
    self.body.append(outer_html)


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
            # For dynamic problems, this contains JavaScript code which defines the variables used in template substitution in the problem. If this option isn't present, the problem will be a static problem.
            "dyn_vars": directives.unchanged,
            # case insensitive matching
            "casei": directives.flag,
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

        addQuestionToDB(self)

        fitbNode = FITBNode(self.options, rawsource=self.block_text)
        fitbNode.source, fitbNode.line = self.state_machine.get_source_and_line(
            self.lineno
        )

        self.updateContent()

        # Process dynamic problem content.
        env = self.state.document.settings.env
        dyn_vars = self.options.get("dyn_vars")
        # Store the dynamic code, or None if it's a static problem.
        fitbNode.dynamic = dyn_vars

        self.state.nested_parse(self.content, self.content_offset, fitbNode)
        self.options["divclass"] = env.config.fitb_div_class

        # Expected _`structure`, with assigned variable names and transformations made:
        #
        # .. code-block::
        #   :linenos:
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
        #   :linenos:
        #
        #   self.feedbackArray = [
        #       [   # blankArray
        #           { # blankFeedbackDict: feedback 1
        #               "regex" : feedback_field_name,      # (An answer, as a regex;
        #               "regexFlags" : "x",                 # "i" if ``:casei:`` was specified, otherwise "".) OR
        #               "number" : [min, max],              # a range of correct numeric answers OR
        #               "solution_code" : source_code,      # For dynamic problems -- an expression which evaluates
        #                                                   # to true or false to determine if the solution was correct.
        #               "feedback": feedback_field_body (after being rendered as HTML)  # Provides feedback for this answer.
        #           },
        #           { # Feedback 2
        #               Same as above.
        #           }
        #       ],
        #       [  # Blank 2, same as above.
        #       ],
        #       ...,
        #   ]
        #
        # ...and a transformed node structure:
        #
        # .. code-block::
        #   :linenos:
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
                # Simply store the solution code for a dynamic problem.
                if dyn_vars:
                    blankFeedbackDict = {"solution_code": feedback_field_name_raw}
                else:
                    # See if this is a number, optionally followed by a tolerance.
                    try:
                        # Parse the number.
                        str_num, *list_tol = feedback_field_name_raw.split()
                        num = ast.literal_eval(str_num)
                        assert isinstance(num, Number)
                        # If no tolerance is given, use a tolerance of 0.
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
                            +
                            # ... to the contents (where a single space in the provided pattern is treated as one or more whitespaces in the student's answer) ...
                            feedback_field_name.rawsource.replace(" ", r"\s+")
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
                ffn.blankFeedbackDict = blankFeedbackDict
                fitbNode += ffn

            # Add all the feedback for this blank to the feedbackArray.
            fitbNode.feedbackArray.append(blankArray)

        maybeAddToAssignment(self)

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
    # _`rawtext` is a string containing the entire interpreted text input, including the role and markup. Return it as a problematic node linked to a system message if a problem is encountered.
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

    blank_node = BlankNode(rawtext, input_name=text)
    return [blank_node], []


class BlankNode(nodes.Inline, nodes.TextElement, RunestoneNode):
    pass


def visit_blank_node(self, node):
    # Note that the fitb visit code may call this with ``node = None``.
    name = node["input_name"] if node else ""
    # If the blank contained a name, use that as the name of the input element. A name of ``-`` (the default value for ``|blank|``, since there's no way to pass an empty value) is treated as an unnamed input element.
    html_name = "" if name == "-" else f" name={repr(name)}"
    self.body.append(f'<input type="text"{html_name} />')


def depart_blank_node(self, node):
    pass


# Contains feedback for one answer.
class FITBFeedbackNode(nodes.General, nodes.Element, RunestoneNode):
    pass


def visit_fitb_feedback_node(self, node):
    # Save the HTML generated thus far. Anything generated under this node will be placed in JSON.
    self.context.append(self.body)
    self.body = []


def depart_fitb_feedback_node(self, node):
    # Place all the HTML generated for this node and its children into the feedbackArray.
    node.blankFeedbackDict["feedback"] = "".join(self.body)
    # Restore HTML generated thus far.
    self.body = self.context.pop()
