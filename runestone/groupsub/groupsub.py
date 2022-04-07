# *********************************
# |docname| - An Group Submissions
# *********************************
#
# This directive lets you specify a question by random selection
# Given a list of question ids, it will randomly select one of those ids
# to present to the student.
# given a competency it will select a random question from all questions that
# test for that competency.

# Copyright (C) 2021  Runestone Interactive LLC
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

# Imports from standard libarary
# ------------------------------

# Imports from third party libraries
# ----------------------------------
from docutils import nodes
from docutils.parsers.rst import directives

# local imports
# -------------
from runestone.server.componentdb import (
    addQuestionToDB,
    addHTMLToDB,
    maybeAddToAssignment,
)
from runestone.common.runestonedirective import (
    RunestoneDirective,
)


TEMPLATE = """
<div class="runestone sqcontainer %(optclass)s">
    <div data-component="groupsub" id={component_id} {size_limit}>
        <div class="col-sm-6">
            <select id="assignment_group" multiple class="assignment_partner_select" style="width: 100%">
            </select>
        </div>
        <div id="groupsub_button" class="col-sm-6">
        </div>
        <p>The Submit Group button will submit the answer for each each question
        on this page for each member of your group. It also logs you as the official
        group submitter.</p>
    </div>
</div>
"""


def setup(app):
    app.add_directive("groupsub", GroupSubmission)


class GroupSubmission(RunestoneDirective):
    """
    .. groupsub:: uniqueid
       :limit: int
       :question_list:

    For a POGIL or groupwork page to allow one partner to submit answers
    to all questions on the page for everyone in the group.
    Question list is an anticipated extension that will allow the author
    to specify a list of questions rather than assuming all.
    """

    required_arguments = 1
    optional_arguments = 1
    has_content = False
    option_spec = RunestoneDirective.option_spec.copy()
    option_spec.update(
        {
            "limit": directives.unchanged,
        }
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def run(self):

        self.options["component_id"] = self.arguments[0].strip()

        if "limit" in self.options:
            self.options["size_limit"] = f"data-size_limit={self.options['limit']}"
        else:
            self.options["size_limit"] = f"data-size_limit=4"

        res = TEMPLATE.format(**self.options)

        return [nodes.raw(self.block_text, res, format="html")]
