# *********************************
# |docname| - An indirect directive
# *********************************
#
# This directive lets you specify a question by random selection
# Given a list of question ids, it will randomly select one of those ids
# to present to the student.
# given a competency it will select a random question from all questions that
# test for that competency.

# Copyright (C) 2020  Runestone Interactive LLC
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
    RunestoneIdDirective,
)


TEMPLATE = """
<div class="runestone alert alert-warning sqcontainer">
<div data-component="selectquestion" id={component_id} {selector} {points} {proficiency} {min_difficulty} {max_difficulty} {autogradable} {not_seen_ever} {primary} {AB}>
    <p>Loading ...</p>
</div>
</div>
"""


def setup(app):
    app.add_directive("selectquestion", SelectQuestion)


class SelectQuestion(RunestoneIdDirective):
    """
    .. selectquestion:: uniqueid
       :fromid: [id [, id]+ ]
       :proficiency: randomly choose a question that tests a particular proficiency
       :primary: Only match on primary proficiencies
       :basecourse: restrict question choices to the current base course
       :alwaysrandom: choose a new random question every time if possible
       :points: number of points for this question
       :min_difficulty: minimum difficulty level
       :max_difficulty: maximum difficulty level
       :ab: experiment_name

       Difficulty is measured in one of two ways. For things like multiple choice and
       fill in the blank, we can use the % of students that get the answer correct on
       the first try.  For Code that is a little unreasonable, so we use the number
       of
    """

    required_arguments = 1
    optional_arguments = 0
    has_content = False
    option_spec = RunestoneIdDirective.option_spec.copy()
    option_spec.update(
        {
            "fromid": directives.unchanged,
            "proficiency": directives.unchanged,
            "basecourse": directives.flag,
            "min_difficulty": directives.unchanged,
            "max_difficulty": directives.unchanged,
            "autogradable": directives.flag,
            "not_seen_ever": directives.flag,
            "primary": directives.flag,
            "ab": directives.unchanged,
        }
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def run(self):

        super(SelectQuestion, self).run()
        addQuestionToDB(self)
        env = self.state.document.settings.env
        is_dynamic = env.config.html_context.get("dynamic_pages", False)
        if is_dynamic:
            self.options["message"] = "Loading ..."
        else:
            self.options[
                "message"
            ] = "The selectquestion directive only works with dynamic pages"

        if "fromid" in self.options:
            self.question_bank_choices = self.options["fromid"]
            self.options[
                "selector"
            ] = f"data-questionlist='{self.question_bank_choices}'"
        else:
            self.options["selector"] = ""

            # todo: validate that question(s) are in the database

        self.options["component_id"] = self.arguments[0].strip()

        if "proficiency" in self.options:
            self.options[
                "proficiency"
            ] = f"""data-proficiency='{self.options["proficiency"]}'"""
        else:
            self.options["proficiency"] = ""

        if "points" in self.options:
            self.int_points = int(self.options["points"])
            self.options["points"] = f"data-points={self.options['points']}"
        else:
            self.int_points = 1
            self.options["points"] = ""

        if "min_difficulty" in self.options:
            self.options[
                "min_difficulty"
            ] = f"data-minDifficulty={self.options['min_difficulty']}"
        else:
            self.options["min_difficulty"] = ""

        if "max_difficulty" in self.options:
            self.options[
                "max_difficulty"
            ] = f"data-maxDifficulty={self.options['max_difficulty']}"
        else:
            self.options["max_difficulty"] = ""

        if "autogradable" in self.options:
            self.options["autogradable"] = "data-autogradable=true"
        else:
            self.options["autogradable"] = ""

        if "not_seen_ever" in self.options:
            self.options["not_seen_ever"] = "data-not_seen_ever=true"
        else:
            self.options["not_seen_ever"] = ""

        if "primary" in self.options:
            self.options["primary"] = "data-primary=true"
        else:
            self.options["primary"] = ""

        if "ab" in self.options:
            if len(self.question_bank_choices.split(",")) != 2:
                raise self.severe("AB questions must have 2 options for :fromid:")
            self.options["AB"] = f"data-ab={self.options['ab']}"
        else:
            self.options["AB"] = ""

        maybeAddToAssignment(self)

        res = TEMPLATE.format(**self.options)
        addHTMLToDB(self.options["divid"], self.basecourse, res)

        return [nodes.raw(self.block_text, res, format="html")]
