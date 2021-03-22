======================
Spreadsheets Test Page
======================

.. Here is were you specify the content and order of your new book.

.. Each section heading (e.g. "SECTION 1: A Random Section") will be
   a heading in the table of contents. Source files that should be
   generated and included in that section should be placed on individual
   lines, with one line separating the first source filename and the
   :maxdepth: line.

.. Sources can also be included from subfolders of this directory.
   (e.g. "DataStructures/queues.rst").

Cells in the spreadsheet that are graded are initially colored light blue.  When the grade button is pressed a test report is printed out, and the cells that were correct are colored with a light green background.  The cells that were not correct have a light redish background

.. spreadsheet:: test_spreadsheet_1
    :mindimensions: 6,5
    :colwidths: 200,100,100
    :coltitles: 'name','year','price','foo'

    Google, 1998, 807.80
    Apple, 1976, 116.52
    Yahoo, 1994, 38.66
    ,,=sum(c1:c3)

    ====
    assert A3 == Yahoo
    assert B3 == 1994


.. spreadsheet:: test_spreadsheet_2
    :fromcsv: Iris.csv
    :colwidths: 50,100,100,100,100

    ====
    assert A151 == 150


.. spreadsheet:: test_spreadsheet_3
   :colwidths: 200,200
   :coltitles: 'my formula', 'result'

   "&#61;CONCATENATE(""abc"", ""xyz"")","=CONCATENATE(""abc"", ""xyz"")"
   '=1+1, 2
