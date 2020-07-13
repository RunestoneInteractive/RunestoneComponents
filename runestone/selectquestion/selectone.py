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

from docutils import nodes
from docutils.parsers.rst import directives
from sqlalchemy import Table
from runestone.server.componentdb import addQuestionToDB, addHTMLToDB, get_engine_meta
from runestone.common.runestonedirective import (
    RunestoneIdDirective,
    RunestoneNode,
    add_i18n_js,
)


TEMPLATE = """
<div class="runestone" data-component="selectquestion" {selector}>
    <p>Loading ...</p>
</div>
"""


def setup(app):
    app.add_directive("selectquestion", SelectQuestion)


class SelectQuestion(RunestoneIdDirective):
    """
    .. selectquestion::  [fromid]
       :fromlist: given a list of ids randomly choose one
       :proficiency: randomly choose a question that tests a particular proficiency
       :basecourse: restrict question choices to the current base course
    """

    required_arguments = 0
    optional_arguments = 1
    has_content = False
    option_spec = RunestoneIdDirective.option_spec.copy()
    option_spec.update(
        {
            "fromlist": directives.unchanged,
            "proficiency": directives.unchanged,
            "basecourse": directives.flag,
        }
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def run(self):

        env = self.state.document.settings.env
        is_dynamic = env.config.html_context.get("dynamic_pages", False)
        if is_dynamic:
            self.options["message"] = "Loading ..."
        else:
            self.options[
                "message"
            ] = "The selectquestion directive only works with dynamic pages"

        if len(self.arguments) > 0:
            self.question_bank_id = self.arguments[0].strip()

            # todo: validate that question is in the database
            self.options["selector"] = f"data-questionid={self.question_bank_id}"
            print(self.options)

        if len(self.arguments) > 0 and "fromlist" in self.options:
            raise KeyError("You must Provide a single id OR list of ids, not both")

        if "fromlist" in self.options:
            self.question_bank_choices = self.options["fromlist"].split(",")
            self.options["selector"] = f"data-questionlist={self.question_bank_choices}"

        if "proficiency" in self.options:
            pass

        res = TEMPLATE.format(**self.options)

        return [nodes.raw(self.block_text, res, format="html")]
