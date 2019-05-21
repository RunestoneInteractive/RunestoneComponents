======================================================
Testing: Multiple Choice and Multiple Answer Questions
======================================================

Multiple Answer
===============
Old style
---------
.. mchoice:: question1
    :multiple_answers:
    :correct: a, c
    :answer_a: red
    :answer_b: brown
    :answer_c: blue
    :answer_d: gray
    :feedback_a: Red it is.
    :feedback_b: Not brown.
    :feedback_c: Blue it is.
    :feedback_d: Not gray.

    Which colors might be found in a rainbow (check all)?

New style
---------
.. mchoice:: question1_new

    Which colors might be found in a rainbow (check all)?

    -   red

        +   Red it is.

    -   brown

        -   Not brown.

    -   blue

        +   Blue it is.

    -   gray

        -   Not gray.

Test error handling
^^^^^^^^^^^^^^^^^^^
.. mchoice:: error1_no_content

.. mchoice:: error2

    No list is provided.

.. mchoice:: error3

    A list with missing sublists.

    -   One

        +   Yes.

    -   Two


.. mchoice:: error4

    A list with extra sublists.

    -   One

        +   Yes.
        +   OK.

    -   Two

        -   No.

.. This just produces a confused question. The auto-numbering in the base classes prepends ``Q-x`` to ``-   One``, which means it's no longer a list. There's no easy way to detect this, without rewriting the way question numbers are prepended.

    .. mchoice:: error5_only_list_is_provided

        -   One

            +   Yes.

        -   Two

            -   No.

.. mchoice:: error6

    A list with something else instead of sublists.

    -   One

        Not a sublist.

    -   Two

        +   No


.. mchoice:: error7

    No correct answers.

    -   One

        -   No.

    -   Two

        -   Nope.

Multiple Choice
===============
Old style
---------
.. mchoice:: question2
    :correct: a
    :answer_a: red
    :answer_b: brown
    :answer_c: black
    :answer_d: gray
    :feedback_a: Red it is.
    :feedback_b: Not brown.
    :feedback_c: Not black.
    :feedback_d: Not gray.

    What color is a stop sign?

New style
---------
.. mchoice:: question2_new

    What color is a stop sign?

    -   red

        +   Red it is.

    -   brown

        -   Not brown.

    -   blue

        -   Not blue.

    -   gray

        -   Not gray.

