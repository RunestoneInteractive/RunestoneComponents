======================================================
Testing: Multiple Choice and Multiple Answer Questions
======================================================

Multiple Answer
===============
Old style
---------
.. mchoice:: test_mchoice_1
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
.. mchoice:: test_mchoice_1_new

    Which colors might be found in a rainbow (check all)?

    -   red

        +   Red it is.

    -   brown

        -   Not brown.

    -   blue

        +   Blue it is.

    -   gray

        -   Not gray.


Group Submission
----------------

.. groupsub:: testgs_1

Group submit allows one person to submit answers for their entire group.
    