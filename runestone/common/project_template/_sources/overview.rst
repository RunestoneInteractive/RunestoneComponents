..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".


..  shortname:: Overview
..  description:: This is an overview chapter for the web site.

.. setup for automatic question numbering.

.. qnum::
   :start: 1
   :prefix: sc-1-


An Overview of Runestone Interactive
====================================

Runestone Interactive is a project focusing on providing tools and content for the purpose of
creating interactive computer science courseware.  We provide a complete introductory series of chapters
that can be used as is, or if you wish, you can customize the chapters.  You can even start
from scratch and write your own interactive textbook using the tools that we provide.
In order to see how the tools work, the following sections will show them in action.


Embedded Videos
---------------

Our toolset provides a number of different things that will help you to learn to program in the Python programming language.
Aside from reading the text, it is sometimes useful to hear someone tell you about different aspects of the topic being discussed.
In order to accomplish this, we provide a way to integrate simple, short videos into the text.  For example, if you click
on the video shown below, you will hear us talk about the tools that will be described shortly.

.. video:: videoinfo
    :controls:
    :thumb: _static/activecodethumb.png

    http://media.interactivepython.org/runestone.mov
    http://media.interactivepython.org/runestone.webm



YouTube
-------

.. youtube:: anwy2MPT5RE
    :height: 315
    :width: 560
    :align: left



ActiveCode Windows
------------------

One of the most important things that you can do when you are learning a programming language is to write programs.  Unfortunately,
typical textbooks allow you to read about programming but don't allow you to practice.  We have created a unique tool called
**activecode** that allows you to write, modify, and execute programs right
in the text itself (right from the web browser).  Although this is certainly not the way real programs are written, it provides an excellent
environment for learning a programming language like Python since you can experiment with the language as you are reading.

Take a look at the activecode interpreter in action.  If we take a simple Python program and make it active, you will see that it can be executed directly by pressing the *run* button.   Try pressing the *run* button below.

.. activecode:: codeexample1
   :coach:

   print("My first program adds a list of numbers")
   myList = [2, 4, 6, 8, 10]
   total = 0
   for num in myList:
       total = total + num
   print(total)


Now try modifying the activecode program shown above.  First, modify the string in the first print statement
by changing the word *adds* to the word *multiplies*.  Now press *run*.  You can see that the result of the program
has changed.  However, it still prints "30" as the answer.  Modify the total calculation by changing the
addition symbol, the "+", to the multiplication symbol, "*".  Press *run* to see the new results (note that you should also fix the total initialization for a correct claculation).
You can do this as many times as you like.  You can even start completely over by simply deleting all the code from the window.

If you are a registered user and have logged in,
it is possible to save the changes you make for reloading later. *Save* and *Load* buttons will appear that allow you to keep one copy of the program you are working on.
Note that these saved programs can be accessed from anywhere if you have logged in.  However, if you are
working anonymously, then you will lose your work at the end of the session.


Activecode is even capable of executing graphical programs that use the built in Python turtle module.
The program shown below is a very interesting graphics program that uses the turtle and the idea of recursion to construct a type of
fractal called a Sierpinski Triangle.  Once you run the program, try experimenting with the number of triangle levels.  You
can find this on line 39 (it is currently set to 3).  Try 4!
Try some other
changes and see what happens (maybe change a few of the colors or make the level 2).  If you ever want to go back to the original example, simply reload the page in the browser.  One of
the great things about activecode is that you can experiment as much as you want.  This can be very helpful as you
are learning to program.



.. activecode:: codeexample2
    :nocodelens:

    import turtle

    def drawTriangle(points,color,myTurtle):
        myTurtle.fillcolor(color)
        myTurtle.up()
        myTurtle.goto(points[0][0],points[0][1])
        myTurtle.down()
        myTurtle.begin_fill()
        myTurtle.goto(points[1][0],points[1][1])
        myTurtle.goto(points[2][0],points[2][1])
        myTurtle.goto(points[0][0],points[0][1])
        myTurtle.end_fill()

    def getMid(p1,p2):
        return ( (p1[0]+p2[0]) / 2, (p1[1] + p2[1]) / 2)

    def sierpinski(points,degree,myTurtle):
        colormap = ['blue','red','green','white','yellow',
                    'violet','orange']
        drawTriangle(points,colormap[degree],myTurtle)
        if degree > 0:
            sierpinski([points[0],
                            getMid(points[0], points[1]),
                            getMid(points[0], points[2])],
                       degree-1, myTurtle)
            sierpinski([points[1],
                            getMid(points[0], points[1]),
                            getMid(points[1], points[2])],
                       degree-1, myTurtle)
            sierpinski([points[2],
                            getMid(points[2], points[1]),
                            getMid(points[0], points[2])],
                       degree-1, myTurtle)

    def main():
       myTurtle = turtle.Turtle()
       myWin = turtle.Screen()
       myPoints = [[-100,-50],[0,100],[100,-50]]
       sierpinski(myPoints,3,myTurtle)
       myWin.exitonclick()

    main()



The CodeLens Tool
-----------------


In addition to activecode, you can also execute Python code with the assistance of a unique visualization tool.  This tool, known as **codelens**, allows you to control the step by step execution of a program.  It also lets you see the values of
all variables as they are created and modified.  The following example shows codelens in action on the same simple program as we saw above.  Remember that in activecode, the source code executes from beginning to end and you can see the final result.  In codelens you can see and control the step by step progress.  Try clicking on the forward button below.

.. codelens:: firstexample
    :showoutput:

    print("My first program adds two numbers, 2 and 3:")
    print(2 + 3)


Note that you can control the step by step execution and you can even move forward and backward thru the statements as they execute.  The following example shows a more sophisticated program using Python lists.  The codelens tool draws very useful
pictures as the statements are being executed.  These pictures, called reference diagrams, are very helpful as you learn about the
more complex aspects of Python.

.. codelens:: secondexample

    fruit = ["apple","orange","banana","cherry"]
    numlist = [6,7]
    newlist = fruit + numlist
    zeros = [0] * 4

    zeros[1] = fruit
    zeros[1][2] = numlist

Self-Check Questions
--------------------

Finally, it is also possible to embed simple questions into the text.  These
questions provide a way for the students to check themselves as they go along.  The questions also provide feedback so that you can
understand why an answer may or may not be correct.

**Check your understanding**

.. mchoicemf:: question1_1
   :answer_a: Python
   :answer_b: Java
   :answer_c: C
   :answer_d: ML
   :correct: a
   :feedback_a: Yes, Python is a great language to learn, whether you are a beginner or an experienced programmer.
   :feedback_b: Java is a good object oriented language but it has some details that make it hard for the beginner.
   :feedback_c: C is an imperative programming language that has been around for a long time, but it is not the one that we use.
   :feedback_d: No, ML is a functional programming language.  You can use Python to write functional programs as well.

   What programming language does this site help you to learn?


This next type of question allows more than one correct answer to be required.  The feedback will tell you whether you have the
correct number as well as the feedback for each.


.. mchoicema:: question1_2
   :answer_a: red
   :answer_b: yellow
   :answer_c: black
   :answer_d: green
   :correct: a,b,d
   :feedback_a: Red is a definitely on of the colors.
   :feedback_b: Yes, yellow is correct.
   :feedback_c: Remember the acronym...ROY G BIV.  B stands for blue.
   :feedback_d: Yes, green is one of the colors.

   Which colors might be found in a rainbow? (choose all that are correct)


Another type of question allows you as the instructor to ask for a value.  You can test for the value using Pythons regular expressions.  For example:

.. fillintheblank:: baseconvert1
   :correct: \\b31\\b
   :blankid: baseconvert1_ans1

   What is value of 25 expressed as an octal number (base 8) :textfield:`baseconvert1_ans1::mini`


And finally here is a way of giving your students some simple programming problems where the code is already there for them but not indented or in the correct order.  Use drag-and-drop to get everthing right.

**Check your understanding**

.. parsonsprob:: question1_100_4

   Construct a block of code that correctly implements the accumulator pattern.
   -----
   x = 0
   for i in range(10)
      x = x + 1



Here is a different sort of codelens visualization.  Some codelens blocks can have
questions embedded in them that will ask you a question about the value of a
variable, or which line will be the next line to execute.  This example asks you
to keep track of the ``tot`` variable as you step through the loop.

.. codelens:: codelens_question
    :question: What is the value of tot after the line with the red arrow executes?
    :breakline: 4
    :feedback: Use the global variables box to look at the current values of tot and i.
    :correct: globals.tot

    tot = 0
    prod = 1
    for i in range(10):
       tot = tot + i
       prod = prod * i


Here's another example that asks the student to predict which line will be the
next line executed.

.. codelens:: codelens_question_line
    :question: After the line with the red arrow is executed, which will be next?
    :breakline: 3
    :feedback: Remember that in an if/else statement only one block is executed.
    :correct: line

    x = 2
    y = 0
    if x % 2 == 1:
        print('x is odd')
        y = y + x
    else:
        print('x is even')
        y = y - x
        
Timed Exam Questions
---------------------

You can add a timed exam of multiple-choice questions that the user can only take once. You can specify the maximum duration of the exam in minutes and it will display the time remaining.  If you don't include a duration it will keep track of the amount of time used and give the user unlimited time to finish the exam.   To start the exam click on the "Start" button.  You can pause the time by clicking on the "Pause" button and start it again by clicking on the "Resume" button.  When you pause the exam the questions will be hidden.  There is also a clock icon that will display the time remaining if it is a timed exam and the time used otherwise when the reader hovers over it.  

Please note that you can currently only have one timed exam per html page.  By default the feedback will be shown after the user clicks the "Submit Answer" button or also after the time runs out for an exam with a specified duration. 

It currently needs at least 3 directives to function: startexam,  exammchoicemf, and finishexam.  You can have as many exammchoicemf as you want.  


.. startexam:: timed_Test
    :showtitle: Timed Exam Paused or Not Started
    :hidetitle: Currently Taking Timed Exam
    :duration: 1

    .. exammchoicemf:: te_1
       :answer_a: The value you are searching for is the first element in the array.
       :answer_b: The value you are searching for is the last element in the array
       :answer_c: The value you are searching for is in the middle of the array.
       :answer_d: The value you are searching for is not in the array
       :answer_e: Sequential Search can never be faster than Binary Search.
       :correct: a
       :feedback_a: Only when the search value is the first item in the array, and thus the first value encountered in sequential search, will sequential be faster than binary.
       :feedback_b: In this case a sequential search will have to check every element before finding the correct one, whereas a binary search will not.
       :feedback_c: Results will differ depending on the exact location of the element, but Binary Search will still find the element faster while Sequential will have to check more elements.
       :feedback_d: If the search value is not in the array, a sequential search will have to check every item in the array before failing, a binary search will be faster.
       :feedback_e: When the search value is the first element, Sequential will always be faster, as it will only need to check one element.

       Under which of these conditions will a sequential search be faster than a binary search?

    .. exammchoicemf:: te_2
       :answer_a: (c || d)
       :answer_b: (c && d)
       :answer_c: (!c) || (!d)
       :answer_d: !(c && d)
       :answer_e: (!c) && (!d)
       :correct: e
       :feedback_a: NOTing an OR expression does not result in the same values ORed.
       :feedback_b: You do negate the OR to AND, but you also need to negate the values of d and d.
       :feedback_c: This would be equivalent to (!(c && d)) using De Morgans laws.
       :feedback_d: This would be equivalent to (!c || !d)
       :feedback_e: NOTing (negating) an OR expression is the same as the AND of the individual values NOTed (negated). See De Morgans laws.

       Which of the following expressions is equivalent to the following? 
   
       .. code-block:: java

           !(c || d)
           
    .. finishexam:: Finish
    
You can turn off the feedback by adding the :nofeedback option.
You can turn off the display of the results (how many the user got right or wrong and what they answered) with the :noresult option.  It will tell the user that s/he finished the exam and that the answers were recorded.


Unit Tests for Code
-------------------

Its nice to be able to have students solve a particular problem by writing some code, its even better if you can give them some feedback and provide some tests for them.  Much of the ``unittest`` module from Python is available in the ``unittest`` module for activecode.  Take a look:

.. activecode:: units1
   :nocodelens:

   def add(a,b):
      return 4

   from unittest.gui import TestCaseGui

   class myTests(TestCaseGui):

       def testOne(self):
           self.assertEqual(add(2,2),4,"A feedback string when the test fails")
           self.assertAlmostEqual(add(2.0,3.0),5.0,"Your function failed on inputs of 2.0 and 3.0")

   myTests().main()

Before you go on, fix the add function in the activecode box.  The full complement of assertXXX functions is available.  You can see the list `Here <http://docs.python.org/2/library/unittest.html#assert-methods>`_.  Now, for an introductory course exposing the inner workings of the unittest class may lead to more confusion that anything.  But, you can still get the benefit of the unittest module with activecode by placing it in the hidden code at the end.  You can hide the code by placing it after a line that contains ``====``.  The source code for the above example with the unit tests hidden would look like this:

.. sourcecode:: rst

    .. activecode:: units1

       def add(a,b):
          return 4

       ====
       from unittest.gui import TestCaseGui

       class myTests(TestCaseGui):

           def testOne(self):
               self.assertEqual(add(2,2),4,"A feedback string when the test fails")
               self.assertAlmostEqual(add(2.0,3.0),5.0,"Your function failed on inputs of 2.0 and 3.0")

       myTests().main()

**Check Your Understanding**

Fix the following code so that it always correctly adds two numbers.

.. activecode:: units2
   :nocodelens:

   def add(a,b):
      return 4

   ====
   from unittest.gui import TestCaseGui

   class myTests(TestCaseGui):

       def testOne(self):
           self.assertEqual(add(2,2),4,"A feedback string when the test fails")
           self.assertAlmostEqual(add(2.0,3.0),5.0,"Your function failed on inputs of 2.0 and 3.0")

   myTests().main()




Disqus Comment Box
------------------

A comment box allowing users to add comments and start discussions can be added. A comment box can be added at the page level, but also for an individual section or question, allowing discussion of that particular content.

.. disqus::
    :shortname: interactivepython
    :identifier: discussion1


Tabbed Question
---------------

Any of the existing question types can be placed in a tabbed exhibit-style question. This may be used to provide an possible answer or a Disqus discussion box specifically related to a certain question.

.. tabbed:: exercise1

    .. tab:: Question 1
        
        Write a program that prints "Hello, world".
            
        .. activecode:: helloworld

            print("Hello, world")

    .. tab:: Discussion
        
        .. disqus::
            :shortname: interactivepython
            :identifier: helloworlddiscussion



We are working on additional question types as well.  Give us your feedback on our `Facebook page <http://www.facebook.com/RunestoneInteractive>`_.

Polls
-----
.. poll:: pollid1
   :scale: 10
   :allowcomment:

    On a scale from 1 to 10, how important do you think it is to have a polling directive in the Runestone Tools?


Reveals
-------
.. reveal:: revealid1
    :showtitle: Reveal Content
    :hidetitle: Hide Content

    This content starts out hidden. It's visibility can be toggled by using the Show/Hide button.

    The reveal block can also contain other directives (ActiveCode, Disqus block, etc):

    .. activecode:: ac11

        print ("Hello, world")


DOM Access
----------

Python programs written in activecode windows can now import the ``document`` module. This document module
allows access to basic elements of the web page, including the new text entry box called
**text1** :textfield:`text1:example input:medium` like this one.  Try running the program, then change
the value in the text entry box and run it again.

.. activecode:: tftest1
   :nocodelens:

   import document

   t = document.getElementById('text1')
   print('value = ', t.value)


JavaScript
----------

We have come to realize that not everyone loves Python as much as we do.
So we have now made it possible to write activecode examples in pure javascript as well
as Python.  Here is a simple example:

.. activecode:: jstest1
   :language: javascript
   :nocodelens:

   var x = 10;
   var y = 11;
   var z = x + y;
   console.log(z);
   function fact(n) {
      if(n <= 1) return 1;
      else {
          return n * fact(n-1);
      }
   }
   console.log(fact(10));
   outf('hello world');


Adding a javascript example is just as easy as Python, all you need to do is add a ``:language:``
parameter to the activecode directive.

HTML
----

Teaching a class on HTML and simple web design?  Why not use activecode for HTML too?
Although you don't run HTML, clicking the run button will cause the HTML to be rendered.

.. activecode:: html1
   :language: html
   :nocodelens:

   <html>
   <body>
   <style>
       h2 { font-size: 48px;
            color: red;
       }
   </style>
   <h2>Hello World</h2>
   <ul>
       <li>one</li>
       <li>two</li>
   </ul>
   </body>
   </html>


Blockly
-------

.. blockly:: blockly1

   * controls
   controls_if
   controls_repeat_ext
   ====
   * logic
   logic_compare
   ====
   * math
   math_number
   math_arithmetic
   ====
   * text
   text
   text_print
   ====
   variables

   preload::
   <xml>  
      <block type="variables_set" id="1" inline="true" x="25" y="9">    
         <field name="VAR">X</field>    
         <value name="VALUE">      
            <block type="math_number" id="2">
               <field name="NUM">10</field>
            </block>    
         </value>  
      </block>
   </xml>

Add a print statement after the set X to 10.  Click on text and drag out a print block;
connect it to the set block.  Then click on variables and drag out the X block and
connect it to the print block.  Now click the run button and you should see 10 printed
in the gray output area.


Other Languages - LiveCode
--------------------------

.. livecode:: lc1
   :language: java
   :stdin: 100

   import java.util.Scanner;

   public class TempConv {
       public static void main(String[] args) {
            Double fahr;
            Double cel;
            Scanner in;

            in = new Scanner(System.in);
            System.out.println("Enter the temperature in F: ");
            fahr = in.nextDouble();

            cel = (fahr - 32) * 5.0/9.0;
            System.out.println(fahr + " degrees F is: " + cel + " C");

            System.exit(0);
       }

   }



What To Do Now
--------------

Now that you have seen some of these tools in action, you can do more exploration by going back to the Runestone Interactive
site and choosing the courseware examples that we have already created.  The first,
**How to Think Like a Computer Scientist: Interactive Edition**, provides an introductory course.  This course covers the basic ideas
of computer science and helps you learn Python programming.  The second course, **Problem Solving with Algorithms and Data Structures Using Python**, is a thorough introduction to data structures and algorithms using Python.  Topics include stacks,
queues, trees, graphs, and recursion.

We hope you will find these tools and materials useful.  If you want to get more involved, feel free to download the tools and write your own courseware.  Everything you need can be found in the current `GitHub repository <http://github.com/bnmnetp/runestone>`_.



.. toctree::
    :hidden:

    navhelp
