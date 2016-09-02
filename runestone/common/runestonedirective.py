# Copyright (C) 2016  Bradley N. Miller
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
__author__ = 'bmiller'


from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
import os

# Notes
# env = self.state.document.settings.env
# env.config.html_context['course_id']
#if not hasattr(env, 'activecodecounter'):
#    env.activecodecounter = 0
#env.activecodecounter += 1
# similar trick for assessments using getNumber()

class RunestoneDirective(Directive):
    option_spec = {'author': directives.unchanged,
                   'tags': directives.unchanged,
                   'difficulty': directives.positive_int,
                   'autograde': directives.unchanged,
                   }

    def __init__(self, *args, **kwargs):
        super(RunestoneDirective,self).__init__(*args, **kwargs)
        srcpath, self.line = self.state_machine.get_source_and_line()
        self.subchapter = os.path.basename(srcpath).replace('.rst','')
        self.chapter = srcpath.split(os.path.sep)[-2]
        self.srcpath = srcpath
        self.basecourse = self.state.document.settings.env.config.html_context.get('basecourse', "unknown")
        self.options['basecourse'] = self.basecourse
        self.options['chapter'] = self.chapter
        self.options['subchapter'] = self.subchapter
