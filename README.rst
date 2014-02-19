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

Quick Start
-----------

This guide will get you started with creating your own course materials using the Runestone tools.

1. Clone the RunestoneTools repository to your development machine  ``git clone https://github.com/RunestoneInteractive/RunestoneTools.git``

2. Type the command ``paver build``

You will now have a build folder with a file index.html in it, along with some default content.  The contents of the build folder are suitable for hosting anywhere that you can serve static web content from!  For a small class you could even serve the content using the builtin Python webserver.

::

    $ cd build
    $ python3 -m http.server

Now from your browser you can open up http://localhost:8000/index.html

Running your own web server isn't always the easiest way to go.  So I have provided a couple of commands to make it easy for you to host your materials using githubs Pages feature.


2. Create a repository (if you don't already have one where you would like to host the finished product)  Copy the github URL to your clipboard.
2. Type the command ``paver setup_github_pages``  You will be prompted to paste in the URL to your repository.
2. Type the command ``paver deploy``
2. Now you can access your pages from github at http://username.github.io/repo  where username is your github username, and repo is the repository you created to host your deployed pages.  Note that the deployed pages will be on the branch ``gh-pages``

Details
~~~~~~~

If you want to know the details of what goes on in the paver commands above here is what is happening:

3. paver build  -- creates build directory and html files
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

