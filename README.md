RunestoneTools
==============

Packaging of the Runestone tools for publishing educational materials using github pages

During January 2014 I switched my personal blog to OctoPress.  This inspired me in many ways.  First to try to blog more often, but more importantly to think about how the Runestone Toolset could be more easily used and deployed by people who didn't want to mess around with hosting, and setting up web2py servers, etc.  This new project is the first phase of that inspiration.

Prerequisites
-------------

The following three prerequisites are easily installed using pip.  All are either Python2.x or 3.x compatible.

1. Install Spinx
2. Install Paver
3. Install paverutils


::
First get `Sphinx <http://sphinx.pocoo.org>`_, version 1.1.x is current as of this writing:

    # pip install sphinx

Install `paver <http://paver.github.io/paver/>`_, at least version 1.2.0:

::

    # pip install paver


Once paver is installed you will also need to install sphinxcontrib-paverutils, at least version 1.5:

::

    # pip install sphinxcontrib-paverutils

Publishing your own materials with Runestone
--------------------------------------------

1. Clone the RunestoneTools repository to your development machine
2. Create a repository (if you don't already have one where you would like to host the finished product)
3. paver build
4. cd build
5. git init
5. git remote add origin git@github.com:bnmnetp/deploytest.git
5. git checkout -b gh-pages
5. git touch .nojekyll
5. git add .nojekyll
5. git add .
6. git commit -m 'first published version'
7. git push origin gh-pages

Now wait a few minutes and go to http://username.github.io/yourRepo

You should see an example page.

