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
from docutils.parsers.rst import Directive
from assessbase import Assessment
from multiplechoice import *
from textfield import *
from blankfill import *

def setup(app):
    app.add_directive('mchoicemf',MChoiceMF)
    app.add_directive('mchoicema',MChoiceMA)
    app.add_directive('exammchoicemf',examMChoiceMF)
    app.add_directive('startexam',StartExam)
    app.add_directive('finishexam',FinishExam)	
    app.add_directive('fillintheblank',FillInTheBlank)
    app.add_directive('mcmfrandom',MChoiceRandomMF)
    app.add_directive('addbutton',AddButton)
    app.add_directive('qnum',QuestionNumber)	    
    app.add_role('textfield',textfield_role)


    app.add_javascript('assess.js')

    app.add_node(MChoiceNode, html=(visit_mc_node, depart_mc_node))
    app.add_node(FITBNode, html=(visit_fitb_node, depart_fitb_node))
    app.add_node(RevealQNode, html=(visit_reveal_qnode, depart_reveal_qnode))    

class AddButton(Directive):
    required_arguments = 1
    optional_arguments = 1
    final_argument_whitespace = True
    has_content = True
    
    def run(self):
        """
            :param self:
            :return:
            .. addbutton:: bname
            
            ...
            """
        
        TEMPLATE_START = '''
            <div id="%(divid)s" class="alert alert-warning">
            <form name="%(divid)s_form" method="get" action="" onsubmit="return false;">
            '''
        
        TEMPLATE_END = '''
            <button class='btn btn-inverse' name="reset" onclick="resetPage('%(divid)s')">Forget My Answers</button>
            </form>
            </div>
            '''   
        
        self.options['divid'] = self.arguments[0]
        
        res = ""
        res = TEMPLATE_START % self.options
        
        res += TEMPLATE_END % self.options
        return [nodes.raw('',res , format='html')]


class QuestionNumber(Directive):
    """Set Parameters for Question Numbering"""
    required_arguments = 0
    optional_arguments = 3
    has_content = False
    option_spec = { 'prefix': directives.unchanged,
        'suffix': directives.unchanged,
        'start': directives.positive_int
    }

    def run(self):
        env = self.state.document.settings.env

        if 'start' in self.options:
            env.assesscounter = self.options['start'] - 1

        if 'prefix' in self.options:
            env.assessprefix = self.options['prefix']

        if 'suffix' in self.options:
            env.assesssuffix = self.options['suffix']

        return []







################################################################################################

## Directive to add the submit button and results area at the end of an exam
class FinishExam(Directive):
    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = True
    has_content = True
    
    def run(self):
        """
            .. finishexam:: examName
            """
        
        TEMPLATE_START = '''

            '''
        
        TEMPLATE_END = '''
	
	<div style="text-align: center;">
	<button class='btn btn-inverse' id ="finish" onclick="checkExam()">Submit Answers</button>
	</div>
	<script>
	    
	    $(document).ready(function() {
	      $("#results").hide();
	      checkIfFinished()
	    });
	</script>


            '''   
        
        self.options['divid'] = self.arguments[0]
        
        res = ""
        res = TEMPLATE_START % self.options
        
        res += TEMPLATE_END % self.options
        return [nodes.raw('',res , format='html')]

#########################################################################

class RevealQNode(nodes.General, nodes.Element):
    def __init__(self,content):
        super(RevealQNode,self).__init__()
        self.reveal_components = content


def visit_reveal_qnode(self, node):
    res = node.startTemplate % node.reveal_components

    self.body.append(res)

def depart_reveal_qnode(self,node):
    res = node.finishTemplate % node.reveal_components

    self.body.append(res)
    

class StartExam(Directive):
    required_arguments = 1
    optional_arguments = 2
    final_argument_whitespace = True
    has_content = True
    option_spec = {"showtitle":directives.unchanged,
                   "hidetitle":directives.unchanged,
                   "duration":directives.nonnegative_int,
                   "nofeedback":directives.flag,
                   "noresult":directives.flag}

    def run(self):
        """ 
            This directive starts an exam which can be timed or not timed (if not timed it will keep track of how much time is used).  Feedback can be shown or not as well.
            :param self:
            :return:
            .. startexam:: timed_Test
            :showtitle: What to display when the exam is not shown
            :hidetitle: What to display when the exam is shown
            :duration: time in seconds 
            :nofeedback: boolean (if present assume true)
            :noresult: boolean (if present assume true)
        """
        self.assert_has_content() # an empty reveal block isn't very useful...
        
        OUTPUT = """
           <div id="startWrapper">
		    <p id="timeOutput"></p>
		    </div>
		    """
        
        BEGIN = """
		    <div id="controls" style="text-align: center;">
			<button class='btn btn-inverse' id ="examButton" onclick="handleExamButtonClick()">Start</button>
	        </div>
            <div id='%(divid)s' style='display:none'>
            """
            
        END = """
            </div>
            <p id="results"></p>
 
            """
            
        SCRIPT1 = """
            <script>
			   var time = %(duration)s * 60;
			   var change = -1;
		       showTime(%(duration)s * 60);
            </script>
            """
            
        SCRIPT2 = """
            <script>
			   var time = 0;
			   var change = 1;
		       showTime(0);
            </script>
            """
            
        FEEDBACKNO = """
            <script>
			   var showFeedback = 0;
            </script>
            """
            
        FEEDBACKYES = """
            <script>
			   var showFeedback = 1;
            </script>
            """
            
        RESULTNO = """
            <script>
			   var showResult = 0;
            </script>
            """
            
        RESULTYES = """
            <script>
			   var showResult = 1;
            </script>
            """

        if not 'showtitle' in self.options:
            self.options['showtitle'] = "Started exam"
        if not 'hidetitle' in self.options:
            self.options['hidetitle'] = "Exam is paused"
        if 'duration' in self.options:
           END = END + SCRIPT1
        else:
           END = END + SCRIPT2
        if 'nofeedback' in self.options:
           END = END + FEEDBACKNO
        else:
           END = END + FEEDBACKYES  
        if 'noresult' in self.options:
           END = END + RESULTNO
        else:
           END = END + RESULTYES     
        
        self.options['divid'] = self.arguments[0]

        reveal_node = RevealQNode(self.options)
        reveal_node.startTemplate = OUTPUT + BEGIN 
        reveal_node.finishTemplate = END

        self.state.nested_parse(self.content, self.content_offset, reveal_node)

        return [reveal_node]




