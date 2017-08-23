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

__author__ = 'bmiller'

from docutils import nodes
from docutils.parsers.rst import directives
import os
from jinja2 import Environment, FileSystemLoader
from runestone.common.runestonedirective import RunestoneDirective

# try:
#     import conf
#     version = conf.version
#     staticserver = conf.staticserver
# except:
#     version = '2.1.0'
#     staticserver = 'runestonestatic.appspot.com'

def setup(app):
    app.add_directive('livecode', LiveCode)



class LiveCode(RunestoneDirective):
    required_arguments = 1
    optional_arguments = 0
    has_content = True
    option_spec = {
        'language':directives.unchanged_required,
        'stdin'   :directives.unchanged,
        'datafile' : directives.unchanged,
        'sourcefile': directives.unchanged
    }

    def run(self):
        raise RuntimeError("livecode is obsolete, Use the activecode directive with the language option")



