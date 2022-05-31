README.txt

The quizly directive, in this first pass looks like this:
-----------------------------------------------

.. quizly::
   :quizname: unique-quiz-name from quizzes.js

The quizly component uses and requires the following resources:
----------------------------------------------

runestone/quizly/quizly.py   -- creates QuizlyNode from directive
runestone/quizly/__init__.py -- imports the quizly code
runestone/quizly/toctree.rst

runestone/quizly/js   -- javascript resources 
  -- quizly.js        -- renders quizly exercise and handles interface with runestone 

Quizly source files must be store in COURSE/_static.  They include:
  -- all_appinv.js    -- compressed files
  -- all_blockly.js
  -- all_quizly.js
  -- blockly.html     -- blockly iframe
  -- index.html       -- quizly UI and iframe container
  -- main.css         -- gcb style defs
  -- media            -- directory image and icon files 
  -- quizme-helper.js -- main quizly code
  -- quizzes.js       -- quizly quiz collection in JSON format

The content files for the quizly component must stored in the course's _static folder. 
Download the following file and unzip it in COURSE/_static, where COURSE is your course:
  https://github.com/ram8647/quizly/blob/35ee7c945e6f240450f46f41ad9c80735215b5e0/quizly-runestone.zip

runestone/quizly/test -- some test code
  -- _sources         -- test files
     -- Quizly
        -- TestQuizly.rst  -- contains 1 MC and 2 different quizly exercises
        -- toctree.rst
  -- conf.py          -- sphinx config file for runestone
  -- pavement.py      -- needed for runestone build

The files that need to be coded by the developer
-----------------------------------------------

./runestone/quizly/quizly.py 
----------------------------
Th script that runs during runestone build. Runestone build parses the
source document and translates the directive and its options into a QuizlyNode.

 - QuizlyNode -- defines the node. The  only option needed for this is the quizname, 
   which is parsed from the directive. 

 - visit_quizly_mode(self, node) -- appends the quizly template, instantiated, to the
   body of the html document that will represent the quizly exercise

 - Quizly(RunestoneDirective) -- its run() method instantiates and returns QuizlyNode,
   probably called by runestone build.

./runestone/quizly/__init__.py -- called by runestone build, imports quizly.py  
------------------------------

./runestone/quizly/js/quizly.js 
-------------------------------

This script runs when the html page containing the quizly iframe is loaded. It contains
methods to render the quizly component and to handle the interface with runestone.  

This script will be invoked automatically when the page is loaded, provided a quizly entry
is made in the module.exports list in webpack.config.js.

    "./runestone/quizly/js/quizly.js",

quizly.js contains the following methods and functions:

 -- class Quizly extends RunestoneBase -- constructs a Quizly object that holds the
    data from the exercise.  Calls renderQuiz() method.

    -- getIFrameAndQuizname() -- extracts the iframe from the fully instantiated html code 
       produced by quizly.py and contained in QuizlyNode. And gets the specific quizname.

    -- renderQuizly() -- renders the quizly iframe inside a container <div>.

    -- submitQuizly() -- the method invoked from the callback function when the user
       clicks "Check Me" button in the quizly exercise.

$(document).on( ,,, function() {}) -- function that sets up the callback function
    and binds it to the html document.

setupCallback(quizly)  -- defines the callback function that is invoked when the "Check Me"
    button is clicked.  It calls quizly.submitQuizly(result), where result is the
    quizly-graded response to the user's attempt.

