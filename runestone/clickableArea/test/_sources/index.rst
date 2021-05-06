=================================
Testing: Clickable Area Questions
=================================

.. Here is were you specify the content and order of your new book.

.. Each section heading (e.g. "SECTION 1: A Random Section") will be
   a heading in the table of contents. Source files that should be
   generated and included in that section should be placed on individual
   lines, with one line separating the first source filename and the
   :maxdepth: line.

.. Sources can also be included from subfolders of this directory.
   (e.g. "DataStructures/queues.rst").


Clickable Area
--------------
.. clickablearea:: test_clickablearea_1
    :question: Click the rainbow color(s)
    :feedback: This is incorrect
    :iscode:

    :click-correct:Red:endclick:
    :click-incorrect:Gold:endclick:
    :click-correct:Blue:endclick:
    :click-incorrect:Black:endclick:


.. clickablearea:: test_clickablearea_2
    :question: Click the rainbow color(s)
    :feedback: This is incorrect
    :table:
    :correct: 1,0;2,2;3,1;3,3;4,2
    :incorrect: 2,1;2,3;3,2;4,1;4,3

    +-------+---------+--------+
    |  Red  |  Orange | Yellow |
    +-------+---------+--------+
    | White |  Green  | White  |
    +-------+---------+--------+
    |  Blue |  White  | Indigo |
    +-------+---------+--------+
    | White |  Violet | White  |
    +-------+---------+--------+
