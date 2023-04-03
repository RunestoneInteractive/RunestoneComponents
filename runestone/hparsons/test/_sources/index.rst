==========================================
Test: Horizontal Parsons Problems with SQL
==========================================


Examples
========
Randomized Block with Block Based Feedback
------------------------------------------
.. hparsons:: test_hparsons_block_1
    :language: sql
    :dburl: /_static/test.db
    :randomize:
    :blockanswer: 0 1 2 3

    This is a horizontal Parsons problem! Feedback is based on block for this problem.
    The blocks are randomized, but cannot be reused ;)
    ~~~~
    --blocks--
    SELECT 
    *
    FROM
    test


Randomized Block with Block Based Feedback - Python highlighting
----------------------------------------------------------------
.. hparsons:: test_hparsons_block_2
    :language: python
    :dburl: /_static/test.db
    :randomize:
    :blockanswer: 0 1 2 3

    Python highlighting for keywords
    ~~~~
    --blocks--
    return
    test
    or
    None


Randomized Block with Block Based Feedback - Java highlighting
----------------------------------------------------------------
.. hparsons:: test_hparsons_block_3
    :language: java 
    :dburl: /_static/test.db
    :randomize:
    :blockanswer: 0 1 2 3 4 5

    Java highlighting for keywords
    ~~~~
    --blocks--
    public
    static
    Short 
    ERROR
    =
    0x0001;


Randomized Block with Execution Based Feedback
----------------------------------------------
.. hparsons:: test_hparsons_sql_1 
    :language: sql
    :dburl: /_static/test.db
    :randomize:

    This is a horizontal Parsons problem! Feedback is based on code execution.
    The blocks are randomized, but cannot be reused ;)
    ~~~~
    --blocks--
    SELECT 
    *
    FROM
    test
    --unittest--
    assert 1,1 == world
    assert 0,1 == hello
    assert 2,1 == 42


Reusable Block with Execution Based Feedback
--------------------------------------------
.. hparsons:: test_hparsons_sql_2 
    :language: sql
    :dburl: /_static/test.db
    :reuse:

    This is a horizontal parsons problem! Feedback is base on code execution.
    The blocks are set as the original order, and can be used multiple times.
    To delete a block, simply drag out of the input area.
    These features might not be so useful in the context of SQL, but might be useful in regex.
    ~~~~
    --blocks--
    SELECT 
    *
    FROM
    test
    --unittest--
    assert 1,1 == world
    assert 0,1 == hello
    assert 2,1 == 42


Randomized Block with Execution Based Feedback and Hidden Code
---------------------------------------------------------------
.. hparsons:: test_hparsons_sql_exe_hidden
    :language: sql
    :randomize:

    In the ``grades`` table:

    .. image:: https://i.ibb.co/r6qShy5/practice-grade.png

    A student completed an extra assignment and got some additional points.

    Please write an UPDATE statement to change the entry whose ``student_id`` is 1, and set their math score for ``final`` ``test_name`` to 90.

    hidden prefix initializes the table above;
    hidden suffix is "SELECT * FROM grades".

    ~~~~
    --hiddenprefix--
    DROP TABLE IF EXISTS grades;
    create table "grades" ("student_id" INTEGER, "test_name" TEXT, "english" INTEGER, "math" INTEGER);
    INSERT INTO grades (student_id,test_name,english,math) VALUES
        ('1', 'midterm', 62, 84),
        ('1', 'final', 70, 86),
        ('2', 'midterm', 50, 95),
        ('2', 'final', 80, 99),
        ('3', 'midterm', 55, 91);
    --blocks--
    UPDATE grades
    SET
    math = 90
    WHERE
    student_id = 1 AND test_name = "final"
    LET
    student_id = 1 AND test_name = final
    --hiddensuffix--
    ;SELECT * FROM grades
    --unittest--
    assert 1,1 == final
    assert 1,3 == 90
    assert 3,3 == 99


Randomized Block with Execution Based Feedback and Hidden Code + error in prefix
--------------------------------------------------------------------------------
.. hparsons:: test_hparsons_sql_exe_hidden_error
    :language: sql
    :randomize:

    The third line of the hidden code is incorrect.

    ~~~~
    --hiddenprefix--
    DROP TABLE IF EXISTS grades;
    create table "grades" ("student_id" INTEGER, "test_name" TEXT, "english" INTEGER, "math" INTEGER);
    INSERT INTO grades (student_id,test_name,english,math) 
    --blocks--
    UPDATE grades
    SET
    math = 90
    WHERE
    student_id = 1 AND test_name = "final"
    LET
    student_id = 1 AND test_name = final
    --unittest--
    assert 1,1 == final
    assert 1,3 == 90
    assert 3,3 == 99
