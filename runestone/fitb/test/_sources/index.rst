qnum testing
------------
.. qnum::
    :prefix: Before-
    :suffix: -After
    :start: 5

Fill in the Blank
-----------------
.. fillintheblank:: fill1412

    Fill in the blanks to make the following sentence: "The red car drove away."

    The |blank| car drove |blank|.

    -   :red: Correct.
        :x: Incorrect. Try 'red'.
    -   :away: Correct.
        :x: Incorrect. Try 'away'.

Test 2 - test a numeric range.

.. fillintheblank:: fill_2pi

    .. If this isn't treated as a comment, then it will cause a **syntax error, thus producing a test failure.

    What is the solution to the following:

    :math:`2 * \pi =` |blank|.

    - :6.28 0.005: Good job.
      :3.27 3: Try higher.
      :9.29 3: Try lower.
      :.*: Incorrect. Try again.

Error testing
-------------
.. fillintheblank:: error1_no_content

.. fillintheblank:: error2

    No feedback provided.

.. fillintheblank:: error3

    List contents aren't field lists.

    -   I'm not a field list.

.. fillintheblank:: error4

    Not enough feedback. |blank| |blank|

    -   :Feedback: For blank 1.

Regex testing
-------------
.. fillintheblank:: fillregex
   :casei:

   Complete the sentence: |blank| had a |blank| lamb. One plus one is: (note that if there aren't enough blanks for the feedback given, they're added to the end of the problem. So, we don't **need** to specify a blank here.)

   -   :mary|Mair[a|e|i]: Correct.
       :Sue: Is wrong.
       :wrong: Try again. (Note: the last item of feedback matches anything, regardless of the string it's given.)
   -   :little: That's right.
       :.*: Nope.
   -   :0b10: Right on! Numbers can be given in decimal, hex (0x10 == 16), octal (0o10 == 8), binary (0b10 == 2), or using scientific notation (1e1 == 10), both here and by the user when answering the question.
       :2 1: Close.... (The second number is a tolerance, so this matches 1 or 3.)
       :x: Nope. (As earlier, this matches anything.)

.. fillintheblank:: regexescapes1
   :casei:

   Windows system files are stored in: |blank|.

   -   :C\:\\Windows\\system: Correct.
       :program files: Third party applications are stored here, not system files.
       :x: Try again.

.. fillintheblank:: regexescapes2
   :casei:

   Python lists are declared using: |blank|.

   -   :\[\]: Correct.
       :x: Try again.

Timed exam testing
------------------
.. timed:: timed-exam-test

    .. fillintheblank:: timed-fitb-1


        Fill in the blanks to make the following sentence: "The red car drove away."

        The |blank| car drove |blank|.

        -   :red: Correct.
            :x: Incorrect. Try 'red'.
        -   :away: Correct.
            :x: Incorrect. Try 'away'.

    .. fillintheblank:: timed-fitb-2

        What is the solution to the following:

        :math:`2 * \pi =` |blank|.

        - :6.28 0.005: Good job.
          :3.27 3: Try higher.
          :9.29 3: Try lower.
          :.*: Incorrect. Try again.
