===========================
Testing: matrixeq directive
===========================

Various matrixeq examples
-------------------------

Equation with a single matrix:

.. Code-Block:: text

  .. matrixeq:: Eq1

    [1, 0, 0, 0; 0, 1, 0, 0; 0, 0, -c2, c1; 0, 0, -1, 0]

.. matrixeq:: Eq1

  [1, 0, 0, 0; 0, 1, 0, 0; 0, 0, -c2, c1; 0, 0, -1, 0]

Simple matrix equation:

.. Code-Block:: text

  .. matrixeq:: Eq2

    [M1: 1, 0, 0, 0; 0, 1, 0, 0; 0, 0, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1]  = [M3: x';y';z';w']

.. matrixeq:: Eq2

  [M1: 1, 0, 0, 0; 0, 1, 0, 0; 0, 0, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1]  = [M3: x';y';z';w']

Specific elements can be editable: (Enclose the element in braces, e.g., {6})

.. Code-Block:: text

  .. matrixeq:: Eq3

    [M1: 1, 0, 0, {0}; 0, 1, 0, 0; 0, {0}, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1]  = [M3: x';y';z';w']

.. matrixeq:: Eq3

  [M1: 1, 0, 0, {0}; 0, 1, 0, 0; 0, {0}, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1]  = [M3: x';y';z';w']

Specific elements can be bolded: (Prefix the element with an asterisk, \*.)

.. Code-Block:: text

  .. matrixeq:: Eq4_bold_test

    [M1: 1, 0, 0, *0; 0, 1, 0, 0; 0, *0, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1]  = [M3: x';y';z';w']

.. matrixeq:: Eq4_bold_test

  [M1: 1, 0, 0, *0; 0, 1, 0, 0; 0, *0, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1]  = [M3: x';y';z';w']

Specific elements can be bolded and editable: (The order of the {} and \* does not matter.)

.. Code-Block:: text

  .. matrixeq:: Eq5

    [M1: 1, 0, 0, *{0}; 0, 1, 0, 0; 0, {*0}, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1]  = [M3: x';y';z';w']

.. matrixeq:: Eq5

    [M1: 1, 0, 0, *{0}; 0, 1, 0, 0; 0, {*0}, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1]  = [M3: x';y';z';w']

Example of matrices of different sizes:

.. Code-Block:: text

  .. matrixeq:: Eq6

    [1, 0; 1, 0]*[x,y,z; 4, 5, 6]  = [M3: a,b,c;d,e,f]

.. matrixeq:: Eq6

  [1, 0; 1, 0]*[x,y,z; 4, 5, 6]  = [M3: a,b,c;d,e,f]

Example of abstract matrix notation, including matrix inverses, which uses the syntax ^(-1)

.. Code-Block:: text

  .. matrixeq:: Eq18

    [M1: M]*[M2: M^(-1)] = [M1: M^(-1)]*[M2: M] = [I: I]

.. matrixeq:: Eq18

  [M1: M]*[M2: M^(-1)] = [M1: M^(-1)]*[M2: M] = [I: I]

Test optional parameters
^^^^^^^^^^^^^^^^^^^^^^^^

Disable the equation operators: (the operators are not linked to javascript events)

.. Code-Block:: text

  .. matrixeq:: Eq1
    :notexecutable:

    [M1: 1, 0, 0, 0; 0, 1, 0, 0; 0, 0, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1]  = [M3: x';y';z';w']

.. matrixeq:: Eq1
  :notexecutable:

  [M1: 1, 0, 0, 0; 0, 1, 0, 0; 0, 0, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1]  = [M3: x';y';z';w']

You can include a comment after a matrix equation:

.. Code-Block:: text

  .. matrixeq:: Eq2
    :comment: This is an example comment

    [M1: 1, 0, 0, 0; 0, 1, 0, 0; 0, 0, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1]  = [M3: x';y';z';w']

.. matrixeq:: Eq2
  :comment: This is an example comment

  [M1: 1, 0, 0, 0; 0, 1, 0, 0; 0, 0, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1]  = [M3: x';y';z';w']

You can disable the display of the equation's identifier:

.. Code-Block:: text

  .. matrixeq:: Eq3
    :nolabel:

    [M1: 1, 0, 0, 0; 0, 1, 0, 0; 0, 0, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1]  = [M3: x';y';z';w']

.. matrixeq:: Eq3
  :nolabel:

  [M1: 1, 0, 0, 0; 0, 1, 0, 0; 0, 0, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1]  = [M3: x';y';z';w']

Change the background color to red:

.. Code-Block:: text

  .. matrixeq:: Eq4
    :backgroundcolor: red

    [M1: 1, 0, 0, 0; 0, 1, 0, 0; 0, 0, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1]  = [M3: x';y';z';w']

.. matrixeq:: Eq4
  :backgroundcolor: red

  [M1: 1, 0, 0, 0; 0, 1, 0, 0; 0, 0, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1]  = [M3: x';y';z';w']

Change the foreground color to red:

.. Code-Block:: text

  .. matrixeq:: Eq5
    :foregroundcolor: red

    [M1: 1, 0, 0, 0; 0, 1, 0, 0; 0, 0, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1]  = [M3: x';y';z';w']

.. matrixeq:: Eq5
  :foregroundcolor: red

  [M1: 1, 0, 0, 0; 0, 1, 0, 0; 0, 0, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1]  = [M3: x';y';z';w']

Change the highlight (bold) color to blue:

.. Code-Block:: text

  .. matrixeq:: Eq6
    :highlightcolor: blue

    [M1: 1, 0, *0, 0; *0, 1, 0, 0; 0, 0, -c2, c1; 0, *0, -1, 0]*[M2: x;y;z;1]  = [M3: x';*y';z';w']

.. matrixeq:: Eq6
  :highlightcolor: blue

  [M1: 1, 0, *0, 0; *0, 1, 0, 0; 0, 0, -c2, c1; 0, *0, -1, 0]*[M2: x;y;z;1]  = [M3: x';*y';z';w']

Change all 3 colors at the same time:

.. Code-Block:: text

  .. matrixeq:: Eq7
    :backgroundcolor: cyan
    :foregroundcolor: yellow
    :highlightcolor: blue

    [M1: 1, 0, *0, 0; *0, 1, 0, 0; 0, 0, -c2, c1; 0, *0, -1, 0]*[M2: x;y;z;1]  = [M3: x';*y';z';w']

.. matrixeq:: Eq7
  :backgroundcolor: cyan
  :foregroundcolor: yellow
  :highlightcolor: blue

  [M1: 1, 0, *0, 0; *0, 1, 0, 0; 0, 0, -c2, c1; 0, *0, -1, 0]*[M2: x;y;z;1]  = [M3: x';*y';z';w']

Change the colors of individual matrices:

.. Code-Block:: text

  .. matrixeq:: Eq8

    [M2,lightcyan: 2/(right-left), 0, 0, 0; 0, 2/(top-bottom), 0, 0; 0, 0, 1, 0; 0, 0, 0, 1]*
    [M3,lightgrey: near, 0, 0, 0; 0, near, 0, 0; 0, 0, 1, 0; 0, 0, 0, 1]*
    [M4,#DF85E8: 1, 0, 0, 0; 0, 1, 0, 0; 0, 0, -c2, c1; 0, 0, -1,0]*
    [M5,#FDFF9D: 1, 0, 0, -(left+right)/2; 0, 1, 0, -(bottom+top)/2; 0, 0, 1, 0; 0, 0, 0, 1]
    *[M6: x;y;z;1]  = [M7: x';y';z';w']

.. matrixeq:: Eq8

  [M2,lightcyan: 2/(right-left), 0, 0, 0; 0, 2/(top-bottom), 0, 0; 0, 0, 1, 0; 0, 0, 0, 1]*
  [M3,lightgrey: near, 0, 0, 0; 0, near, 0, 0; 0, 0, 1, 0; 0, 0, 0, 1]*
  [M4,#DF85E8: 1, 0, 0, 0; 0, 1, 0, 0; 0, 0, -c2, c1; 0, 0, -1,0]*
  [M5,#FDFF9D: 1, 0, 0, -(left+right)/2; 0, 1, 0, -(bottom+top)/2; 0, 0, 1, 0; 0, 0, 0, 1]
  *[M6: x;y;z;1]  = [M7: x';y';z';w']

Test error handling
^^^^^^^^^^^^^^^^^^^

A matrix with the equation missing

.. Code-Block:: text

  .. matrixeq:: No_content

.. matrixeq:: No_content

A matrix that is not rectangular. All rows must have the same number of elements.

.. Code-Block:: text

  .. matrixeq:: Malformed_matrix_1

    [M1: 1, 0, 0, 0; 0, 1, 0]

.. matrixeq:: Malformed_matrix_1

  [M1: 1, 0, 0, 0; 0, 1, 0]

A matrix that is not rectangular. All rows must have the same number of elements.

.. Code-Block:: text

  .. matrixeq:: Malformed_matrix_2

    [M1: 1, 0, 0; 0, 1, 0, 1]

.. matrixeq:: Malformed_matrix_2

  [M1: 1, 0, 0; 0, 1, 0, 1]

=============================
Testing: inline_matrixeq role
=============================

.. Code-Block:: text

  This matrix is in-line with the text of a paragraph, :inline_matrixeq:`[a,b;c,d]`.
  It has 2 rows and 2 columns.

This matrix is in-line with the text of a paragraph, :inline_matrixeq:`[a,b;c,d]`.
It has 2 rows and 2 columns.

.. Code-Block:: text

  This in-line matrix is a full equation,
  :inline_matrixeq:`[M1: 1, 0, 0, *{0}; 0, 1, 0, 0; 0, {*0}, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1] = [M3: x';y';z';w']`.
  Note that all text inside the role's quote marks, \`.... \`,
  must be on the same line.
  Matrix equation operators are not operable for in-line formatting.

This in-line matrix is a full equation, :inline_matrixeq:`[M1: 1, 0, 0, *{0}; 0, 1, 0, 0; 0, {*0}, -c2, c1; 0, 0, -1, 0]*[M2: x;y;z;1] = [M3: x';y';z';w']`.
Note that all text inside the role's quote marks, \`.... \`,  must be on the same line.
Matrix equation operators are not operable for in-line formatting.






