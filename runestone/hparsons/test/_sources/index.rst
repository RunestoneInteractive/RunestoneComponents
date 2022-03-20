=========================
Horizontal Parsons Test
=========================

.. Testing horizontal Parsons problems.

Horizontal Parsons + SQL
--------------------------------------
.. hparsons:: test_activecode_6
    :language: sql
    :dburl: /_static/test.db
    :randomize:


    This is a horizontal Parsons problem! Feedback is based on code execution.
    The blocks are randomized, but cannot be reused ;)
    ~~~~
    --blocks--
    select
    *
    from
    test
    --unittest--
    assert 1,1 == world
    assert 0,1 == hello
    assert 2,1 == 42

..     :dburl: http://localhost:8000/_static/test.db


.. hparsons:: teasfasfas
    :language: sql
    :dburl: /_static/test.db
    :reuse:


    This is a horizontal parsons problem! Feedback is base on code execution.
    The blocks are set as the original order, and can be used multiple times.
    To delete a block, simply drag out of the input area.
    These features might not be so useful in the context of SQL, but might be useful in regex.
    ~~~~
    --blocks--
    select
    *
    from
    test
    --unittest--
    assert 1,1 == world
    assert 0,1 == hello
    assert 2,1 == 42

..     :dburl: http://localhost:8000/_static/test.db



