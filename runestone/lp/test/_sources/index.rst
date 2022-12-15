***************************************************
|docname| - test cases for the LP Sphinx extension
***************************************************

LP directive
============
.. toctree::

    lp_tester.s



``for-loop``
============
The following provide test cases for the ``for-loop`` directive.

Too few parameters
------------------
.. for-loop::

    Testing!


Too many parameters
-------------------
.. for-loop:: 0 1 2 3

    Testing!


Wrong type of parameters
------------------------
.. for-loop:: foo bar baz

    Testing!


One parameter
-------------
.. for-loop:: 3

    1p {0} {1}


Two parameters
--------------
.. for-loop:: 1 4

    2p {0} {1} {2}


Three parameters
----------------
.. for-loop:: 4 0 -1

    3p {0} {1} {2} {3}
