=========================
Horizontal Parsons Test
=========================

.. Testing horizontal Parsons problems.

Horizontal Parsons + Regex
---------------------------

.. hparsons:: codeexample1
    :hidetests:
    :nostrictmatch:

    --problem--
    Capture words that start with a vowel letter(aeiou), but ends with a non-vowel letter. There can be 0 or more letters in between. Also, it is not allowed to have other characters besides letter in between. e.g. your regular expression should match unicorn, element, but should not match: banana, apple. All letters are lowercase.
    --blocks--
    [a-z]
    [aeiou]
    [^aeiou]
    +
    *
    --explanations--
    letter a to z
    letter a, e, i, o, u
    characters other than letter a, e, i, o, u
    repeat one or more times
    repeat zero or more times
    --positive test string--
    unicorn
    element
    --negative test string--
    apple
    banana
    --test cases--
    unicorn
    ['unicorn']
    element
    ['element']
    banana
    []
    bananu
    []
    apple
    []
    baby
    []
    az
    ['az']
    abcdefghizsdz
    ['abcdefghizsdz']
    abc9defghizsdz'
    []


.. hparsons:: codeexample2
    :textentry:

    content content content


Other Problems for reference
-----------------------------

.. parsonsprob:: test_parsons_1
    :adaptive:
    :order: 0 1 2 3 4

    need some text ?
    -----
    def fib(num):
    =====
       if num == 0:
           return 0:
    =====
       if num == 1:
           return 1:
    =====
       return fib(num - 1) + fib(num - 2)
    =====
       return fib(num - 1) * fib(num - 2) #paired

Multiple Choice
---------------

.. mchoice:: question1_2
    :multiple_answers:
    :correct: a,b,d
    :answer_a: red
    :answer_b: yellow
    :answer_c: black
    :answer_d: green
    :feedback_a: Red is a definitely on of the colors.
    :feedback_b: Yes, yellow is correct.
    :feedback_c: Remember the acronym...ROY G BIV.  B stands for blue.
    :feedback_d: Yes, green is one of the colors.

    Which colors might be found in a rainbow? (choose all that are correct)

These are just two of the many interactive components for writing online course materials.  You can see examples of all of them `On our Example Page <http://interactivepython.org/runestone/static/overview/overview.html>`_

Now feel free to modify this file to start creating your own interactive page.


Section 4: Theme
:::::::::::::::::::

You can add your own CSS or JS files to every page of a book by modifying ``setup.custom_css_files`` or ``setup.custom_js_files`` in conf.py.

If you want to do more significant changes to the theme, you should copy the files you wish to modify from
the runestone/common/project/template/sphinx_bootstrap to a directory like ``_templates/``. Then make sure
the ``templates_path`` points to them in your conf.py.

conf.py:

.. code:: 

    templates_path = ["_templates"]