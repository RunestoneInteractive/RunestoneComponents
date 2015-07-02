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


.. datafile:: df1

    def main():
        print("Hello world")
        return 45


.. activecode:: activecode1

.. timed:: timed1
    :timelimit: 10

    .. mchoice:: 1524142112
        :timed:
        :correct: a
        :answer_a: Red pill
        :answer_b: Blue pill
        :feedback_a: Time to see how far the rabbit hole goes.
        :feedback_b: Wrong answer.

        Choose the red pill or the blue pill...



    .. mchoice:: 152414d
        :timed:
        :multiple_answers:
        :correct: a, c
        :answer_a: Answer a
        :answer_b: Answer b
        :answer_c: Answer c
        :feedback_a: Feedback for a
        :feedback_b: Feedback for b
        :feedback_c: Feedback for c

        Here is the question...

    .. fillintheblank:: fill1412
        :timed:

        .. blank:: blank21
            :correct: \\b31\\b
            :feedback1: ("\\b25\\b", "NOOOOOOOOO NOT 25")
            :feedback2: (".*", "You don't know your octal numbers...")

            What is the octal of 25? Don't say 25.

        .. blank:: blank123
            :correct: 12
            :feedback1: (".*", "There's no 12 in that string!")

            Please write down 12 here. Please.

        .. blank:: blank34
            :correct: 44
            :feedback1: ("1", "nope")
            :feedback2: ("4", "close")
            :feedback3: (".*", "Sorry bro")

            Show me 44!

.. mchoice:: 1524142112
    :correct: b
    :answer_a: Peanuts
    :answer_b: Cashews
    :feedback_a: They're ok, but cashews are better.
    :feedback_b: Good job.

    Peanuts or cashews?



.. mchoice:: 152414d
    :multiple_answers:
    :correct: a, c
    :random:
    :answer_a: Hi
    :answer_b: Bye
    :answer_c: Aloha
    :feedback_a: Feedback for Hi
    :feedback_b: Feedback for Bye
    :feedback_c: Feedback for Aloha

    Here is the question...

.. fillintheblank:: fill1412

    .. blank:: blank21
        :correct: \\bblue\\b
        :feedback1: ("\\bred\\b", "You are an awful person.")
        :feedback2: (".*", "(Hint: Sail Norse)")

        What is the best color?





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
