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
__author__ = 'isaiahmayerchak'

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive

#add directives/javascript/css


class TimedNode(nodes.General, nodes.Element):
    def __init__(self,content):
        super(TimedNode,self).__init__()
        self.timed_options = content


def visit_timed_node(self, node):
#Set options and format templates accordingly

    if 'timelimit' not in node.timed_options:
        node.timed_options['timelimit'] = ''
    else:
        node.timed_options['timelimit'] = 'data-time=' + str(node.timed_options['timelimit'])

    if 'noresult' in node.timed_options:
        node.timed_options['noresult'] = 'data-no-result'
    else:
        node.timed_options['noresult'] = ''

    if 'nofeedback' in node.timed_options:
        node.timed_options['nofeedback'] = 'data-no-feedback'
    else:
        node.timed_options['nofeedback'] = ''
        
    if 'notimer' in node.timed_options:
        node.timed_options['notimer'] = 'data-no-timer'
    else:
        node.timed_options['notimer'] = ''
        
    if 'fullwidth' in node.timed_options:
        node.timed_options['fullwidth'] = 'data-fullwidth'
    else:
        node.timed_options['fullwidth'] = ''

    res = TEMPLATE_START % node.timed_options
    self.body.append(res)

def depart_timed_node(self,node):
#Set options and format templates accordingly
    res = TEMPLATE_END % node.timed_options

    self.body.append(res)

#Templates to be formatted by node options
TEMPLATE_START = '''
    <ul data-component="timedAssessment" %(timelimit)s id="%(divid)s" %(noresult)s %(nofeedback)s %(notimer)s %(fullwidth)s>
    '''

TEMPLATE_END = '''</ul>
    '''
class TimedDirective(Directive):
    """
.. timed:: identifier
    :timelimit: Number of minutes student has to take the timed assessment--if not provided, no time limit
    :noresult: Boolean, doesn't display score
    :nofeedback: Boolean, doesn't display feedback
    :notimer: Boolean, doesn't show timer
    :fullwidth: Boolean, allows the items in the timed assessment to take the full width of the screen...

    """
    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = True
    has_content = True
    option_spec = {"timelimit":directives.positive_int,
                    "noresult":directives.flag,
                    "nofeedback":directives.flag,
                    "fullwidth":directives.flag,
                    "notimer":directives.flag}

    def run(self):
        """
            process the timed directive and generate html for output.
            :param self:
            :return:
            .. timed:: identifier
                :timelimit: Number of minutes student has to take the timed assessment--if not provided, no time limit
                :noresult: Boolean, doesn't display score
                :nofeedback: Boolean, doesn't display feedback
                :notimer: Boolean, doesn't show timer
                :fullwidth: Boolean, allows the items in the timed assessment to take the full width of the screen
            ...
            """
        self.assert_has_content() # make sure timed has something in it

        self.options['divid'] = self.arguments[0]

        timed_node = TimedNode(self.options)

        self.state.nested_parse(self.content, self.content_offset, timed_node)

        return [timed_node]
