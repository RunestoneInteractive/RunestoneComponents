****************
Dynamic problems
****************
The fill-in-the-blank problem type supports standard (static) problem; it also supports dynamic problems, where a new problem is randomly generated based on a template provided by the dynamic problem. This document discusses the design of the dynamic problem additions.

Types of dynamic problems
=========================
There are three cases for both traditional static problems and for dynamic problems:

-   Client-side (when the ``use_services`` in ``pavement.py`` is false): grading is done on the client and results stored only on the client. For dynamic problems, a random seed and the problem text is generated on the client.
-   Server-side: (when ``use_services`` is true): grading is done on the client, but the student answer and the graded result are stored on the server (if available) and on the client. Problem state is restored first from the server (if available) then from the client. For dynamic problems, a random seed is generated on the server. Problem text is generated from this server-supplied seed on the client.
-   Server-side graded (``use_services`` is true and ``runestone_server_side_grading`` in ``conf.py`` is True): grading is done on the server; the student answer and the graded result are stored on the server (if available) and on the client. Problem state is restored first from the server (if available) then from the client. Both the random seed and the problem text are generated on the server.

Design
======
The following principles guided the design of dynamic problems

Server-side problem generation
------------------------------
The purpose of server-side grading is to improve the security of grading problems, typically for high-stakes assessments such as a test. Client-side grading means the client both knows the correct answers and is responsible for correctly grading answers, both of which provide many opportunities for attack.

Therefore, server-side grading of dynamic problems requires that all problem generation and grading occur on the server, since problem generation often begins with choosing a solution, then proceeds to compute the problem from this known solution. For example, a problem on the quadratic equation begins by selecting two roots, :math:`r_1` and :math:`r_2`. We therefore know that :math:`\left(x - r_1 \right) \left(x - r_2 \right) = 0`, giving :math:`x^2 - \left(r_1 + r_2 \right) x + r_1 r_2 = 0`. Assigning :math:`a = 1`, :math:`b = -\left(r_1 + r_2 \right)`, and :math:`c = r_1 r_2` provides a student-facing problem of :math:`ax^2 + bx + c = 0`. Starting from the solution of :math:`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}` requires ensuring randomly chosen values for :math:`a`, :math:`b`, and :math:`c` produce real, integral roots, which is a more difficult task.

Programming language for dynamic problems
-----------------------------------------
The extensive `WeBWorK system <https://webwork.maa.org/>`_ contains 20,000 dynamic problems developed in Perl, making this an attractive option. However, Perl lacks much as a language; the 2021 Stack Overflow survey reports that 2.46% of the surveyed developers work in Perl, while JavaScript captures 65% and Python 48%. Perl v5 was released in 2000 and remains at v5 today (not counting Perl v6, since it became a separate language called Raku). In addition, there are few good options for executing Perl in the browser.

While Python is attractive, the options for running it in the client are limited and require large downloads. JavaScript in a web broswer; the `Js2Py <https://github.com/PiotrDabkowski/Js2Py>`_ Python package provides a working JavaScript v5.1 engine that should be sufficient to run dynamic problems. Therefore, JavaScript was selected as the programming language for dynamic problems.

Templates
---------
Dynamic problems need the ability to insert generated values into the text of the problem and into problem feedback. The `EJS <https://ejs.co/>`_ library allows authors to insert the results of evaluating JavaScript into problems. This frees authors from learning (yet another) template language.

Summary
-------
Based on these choices:

-   Dynamic problems are authored in JavaScript, with text using EJS_ templates.
-   Dynamic problems are rendered and graded in the browser for client-side or server-side operation. They are rendered and graded on the server for server-side graded operation.


Architecture
============
-   The Python server must be able to evaluate JavaScript to generate problem text and grade problems.
-   The same JavaScript code used to generate a problem and grade a problem run on both the client (when not doing server-side grading) and the server (for server-side grading). Webpack is used to build the same code into a client bundle and a server bundle.
-   Per-problem random seeds are generated on the client for client-side operation; they are generated on the server for server-side operation.

On the client side, a primary challenge is to create a coherent plan for what data is stored where and at what point in the lifecycle of a problem. See `js/fitb.js` for these details.