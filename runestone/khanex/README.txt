README.txt

The khanex directive, in this first pass looks like this:
-----------------------------------------------

.. khanex::
   :exercise: unique-exercise-name /qs folder

The quizly component uses and requires the following resources:
----------------------------------------------

runestone/khanex/khanex.py   -- creates KhanexNode from directive
runestone/khanex/__init__.py -- imports the khanex code

runestone/khanex/js   -- javascript resources


runestone/khanex/test -- some test code
  -- _sources         -- test files
  -- conf.py          -- sphinx config file for runestone
  -- pavement.py      -- needed for runestone build

The files that need to be coded by the developer
-----------------------------------------------

./runestone/khanex/khanex.py 
----------------------------
Th script that runs during runestone build. Runestone build parses the
source document and translates the directive and its options into a QuizlyNode.

 - Copies resource files from quizly/js to the project/_static folder, from where
   they are copied to build/quizly/_static during build, where they are used by
   the _sources web pages.

 - QuizlyNode -- defines the node. The  only option needed for this is the quizname, 
   which is parsed from the directive. 

 - visit_quizly_mode(self, node) -- appends the quizly template, instantiated, to the
   body of the html document that will represent the quizly exercise

 - Quizly(RunestoneDirective) -- its run() method instantiates and returns QuizlyNode,
   probably called by runestone build.

./runestone/khanex/__init__.py -- called by runestone build, imports khanex.py  
------------------------------

./runestone/khanex/js/khanex.js 
-------------------------------

This script runs when the html page containing the khanex iframe is loaded. It contains
methods to render the khanex component and to handle the interface with runestone.  

This script will be invoked automatically when the page is loaded, provided a khanex entry
is made in the module.exports list in webpack.config.js.

    "./runestone/khanex/js/khanex.js",

khanex.js contains the following methods and functions:

 -- class Khanex extends RunestoneBase -- constructs a Khanex object that holds the
    data from the exercise.  Calls renderQuiz() method.

    -- getIFrame() -- extracts the iframe from the fully instantiated html code produced
       by khanex.py and contained in KhanexNode.

    -- renderKhanex() -- renders the khanex iframe inside a container <div>.

    -- submitKhanex() -- the method invoked from the callback function when the user
       clicks "Check Me" button in the khanex exercise.

$(document).bind( ,,, function() {}) -- function that sets up the callback function
    and binds it to the html document.

setupCallback(khanex)  -- defines the callback function that is invoked when the "Check Me"
    button is clicked.  It calls khanex.submitKhanex(result), where result is the
    khanex-graded response to the user's attempt.

