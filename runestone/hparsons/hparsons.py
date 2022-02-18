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
__author__ = "ziwu"

from cgi import test
import json
from docutils import nodes
from docutils.parsers.rst import directives
from runestone.mchoice import Assessment
from runestone.server.componentdb import (
    addQuestionToDB,
    addHTMLToDB,
    maybeAddToAssignment,
)
from runestone.common.runestonedirective import RunestoneDirective, RunestoneIdNode


def setup(app):
    app.add_directive("hparsons", HParsonsDirective)
    # adding the html
    app.add_node(HParsonsNode, html=(visit_hparsons_node, depart_hparsons_node))
    # TODO: figure out what these means
    # app.add_config_value("shortanswer_div_class", "journal alert alert-warning", "html")
    # app.add_config_value(
    #     "shortanswer_optional_div_class", "journal alert alert-success", "html"
    # )


# TODO: what is the alert and alert-warnings?
TEMPLATE_START = """
        <div>
        <div data-component="hparsons" id="%(divid)s" data-question_label="%(question_label)s" class="alert alert-warning hparsons" >
        <div>
    """

TEMPLATE_END = """
        </div>
        <div class="hparsons_question hparsons-text" >%(problem)s</div>
        <div class="hparsons %(hidetests)s" %(textentry)s %(nostrictmatch)s>
            <pre>%(settings)s</pre>
        </div>
        </div>
        </div>
    """


# seems to be the same for all
class HParsonsNode(nodes.General, nodes.Element, RunestoneIdNode):
    def __init__(self, options, **kwargs):
        super(HParsonsNode, self).__init__(**kwargs)
        self.runestone_options = options

# generate the first part of the html
def visit_hparsons_node(self, node):
    div_id = node.runestone_options["divid"]
    components = dict(node.runestone_options)
    components.update({"divid": div_id})
    node.delimiter = "_start__{}_".format(node.runestone_options["divid"])
    self.body.append(node.delimiter)
    res = TEMPLATE_START % components
    self.body.append(res)


# generate the second part of the html
def depart_hparsons_node(self, node):
    components = dict(node.runestone_options)
    res = TEMPLATE_END % components
    self.body.append(res)
    addHTMLToDB(
        node.runestone_options["divid"],
        components["basecourse"],
        "".join(self.body[self.body.index(node.delimiter) + 1 :]),
    )
    self.body.remove(node.delimiter)


class HParsonsDirective(Assessment):
    """
    .. hparsons:: uniqueid
        :textentry: if you will use text entry instead of horizontal parsons
        :hidetests: if the unittests will be hidden from learners
        :nostrictmatch: if the answer is required to match the whole string. if not selected, the tool will add ^ and $ automatically to the answer to force matching the full string. This does not affect the test string area.

        --problem--
        Here is the problem description. 
        Make sure you use the correct delimitier for each section.
        --blocks--
        block 1
        block 2
        --explanations--
        explanations for block 1
        explanations for block 2
        --positive test string--
        this is some positive test string.
        it can be more than one line.
        just ignore this section if you do not want to put anything in there.
        --negative test string--
        this is some negative test string.
        --test cases--
        input string 1
        ['expected match 1', 'expected match 2']
        input string 2
        []
        input string 3
        []
    """

    required_arguments = 1  # the div id
    optional_arguments = 1
    final_argument_whitespace = False
    has_content = True 
    option_spec = Assessment.option_spec.copy()
    option_spec.update(
        {
            "textentry": directives.flag,
            "hidetests": directives.flag,
            "nostrictmatch": directives.flag,
        }
    )
    # seem to be defining the type of the options
    # option_spec.update({"mathjax": directives.flag})

    # just fill it with the name
    # node_class = HParsonsNode 

    def run(self):
        # same
        super(HParsonsDirective, self).run()
        addQuestionToDB(self)
        # Raise an error if the directive does not have contents.
        # env = self.state.document.settings.env
        if "textentry" in self.options:
            self.options['textentry'] = ' data-textentry="true"'
        else:
            self.options['textentry'] = ''
        if "hidetests" in self.options:
            self.options['hidetests'] = 'hidetests'
        else:
            self.options['hidetests'] = ''
        if "nostrictmatch" in self.options:
            self.options['nostrictmatch'] = ' data-nostrictmatch="true"'
        else:
            self.options['nostrictmatch'] = ''

        self.assert_has_content()

        # sepcifying the start end end for each section
        delimitiers = ['--problem--', '--blocks--', '--explanations--', '--positive test string--', '--negative test string--', '--test cases--']
        delimitiers_index = [-1 for x in range(6)]

        has_content = False
        for i in range(len(delimitiers)):
            if delimitiers[i] in self.content:
                has_content = True
                delimitiers_index[i] = self.content.index(delimitiers[i])
        if has_content:
            sorted_index, sorted_delimiters = [list(t) for t in zip(*[pair for pair in sorted(zip(delimitiers_index, delimitiers)) if pair[0] > 0])]
        else:
            sorted_index = []
            sorted_delimiters = []
        
        content = self.content

        parsons_settings = {}

        if '--problem--' in sorted_delimiters:
            index = sorted_delimiters.index('--problem--')
            self.options['problem'] = '\n'.join(content[(sorted_index[index] + 1): (sorted_index[index + 1] if index + 1 < len(sorted_index) else len(content))])
        else:
            self.options['problem'] = 'empty problem'

        if '--blocks--' in sorted_delimiters:
            index = sorted_delimiters.index('--blocks--')
            parsons_settings['blocks'] = list(content[sorted_index[index] + 1: (sorted_index[index + 1] if index + 1 < len(sorted_index) else len(content))])
        else:
            parsons_settings['blocks'] = []

        if '--explanations--' in sorted_delimiters:
            index = sorted_delimiters.index('--explanations--')
            parsons_settings['explanations'] = list(content[sorted_index[index] + 1: (sorted_index[index + 1]  if index + 1 < len(sorted_index) else len(content))])

        if '--positive test string--' in sorted_delimiters:
            index = sorted_delimiters.index('--positive test string--')
            parsons_settings['positivetest'] = '\n'.join(content[sorted_index[index] + 1: (sorted_index[index + 1]  if index + 1 < len(sorted_index) else len(content))])

        if '--negative test string--' in sorted_delimiters:
            index = sorted_delimiters.index('--negative test string--')
            parsons_settings['negativetest'] = '\n'.join(content[sorted_index[index] + 1: (sorted_index[index + 1]  if index + 1 < len(sorted_index) else len(content))])

        if '--test cases--' in sorted_delimiters:
            index = sorted_index[sorted_delimiters.index('--test cases--')] + 1
            end_index = sorted_index[index + 1] if index + 1 < len(sorted_index) else len(content)
            parsons_settings['testcases'] = []
            while index < end_index:
                testcase = {}
                testcase['input'] = content[index]
                testcase['expect'] = content[index + 1] if index + 1 < end_index else []
                parsons_settings['testcases'].append(testcase)
                index += 2

        self.options['settings'] = json.dumps(parsons_settings)

        # same
        maybeAddToAssignment(self)

        # same
        hparsons_node = HParsonsNode(self.options, rawsource=self.block_text)
        hparsons_node.source, hparsons_node.line = self.state_machine.get_source_and_line(
            self.lineno
        )

        # exist in short answer and mchoice but not parsons
        # For MChoice its better to insert the qnum into the content before further processing.
        self.updateContent()

        # same as mchoice, different from parsons. i think it is for generating instructions.
        # parsons:
        # self.state.nested_parse(
        #     self.options["instructions"], self.content_offset, parsons_node
        # )


        # same
        return [hparsons_node]
