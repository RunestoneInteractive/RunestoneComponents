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


First, get `Sphinx <http://sphinx.pocoo.org>`_, version 1.2.x is current as of this writing:

::

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

2. Copy conf.py.prototype to conf.py  You should not need to make any edits to get the basics working.

2. Type the command ``paver build``

You will now have a build folder with a file index.html in it, along with some default content.  The contents of the build folder are suitable for hosting anywhere that you can serve static web content from!  For a small class you could even serve the content using the builtin Python webserver.

::

    $ cd build
    $ python3 -m http.server

Now from your browser you can open up http://localhost:8000/index.html

Running your own web server isn't always the easiest way to go.  So I have provided a couple of commands to make it easy for you to host your materials using githubs Pages feature.


#. Create a repository (if you don't already have one where you would like to host the finished product)  Copy the github URL to your clipboard.

#. Type the command ``paver setup_github_pages``  You will be prompted to paste in the URL to your repository.

#. Type the command ``paver deploy``

#. Now you can access your pages from github at http://username.github.io/repo  where username is your github username, and repo is the repository you created to host your deployed pages.  Note that the deployed pages will be on the branch ``gh-pages``

Details
~~~~~~~

If you want to know the details of what goes on in the paver commands above here is what is happening:

#. paver build  -- creates build directory and html files
#. cd build
#. git init
#. git remote add origin git@github.com:bnmnetp/deploytest.git
#. git checkout -b gh-pages
#. git touch .nojekyll
#. git add .nojekyll
#. git add .
#. git commit -m 'first published version'
#. git push origin gh-pages

Now wait a few minutes and go to http://username.github.io/yourRepo

You should see an example page.

Work in Progress
----------------

Here's what is on the todo list for this project.  If you have the inclination to help out please let me know, I would welcome the help.

Slides
~~~~~~

I am currently working on getting hieroglyph integrated so that you can make presentation slides with Runestone Interactive features.  At the moment, some of the tools work and some do not.  Activecode works OK, multiple choice questions work fine, reveals work fine, but CodeLens does not work and neither do parsons problems.  Some things make more sense to work in slide mode than others. In particular getting CodeLens to work nicely would be valuable.  I'll keep working on it.  If you want to give it a try yourself.  Install ``pip install hieroglyph``, and uncomment the line in your conf.py file that adds heiroglyph to the extension list.   To build slides you need to run ``paver build --slides``.  There is much that could be done in terms of styling, and working out some problems with javascript.  Standard Sphinx loads all the js files up front, whereas the template for slides moves javscript loading to the bottom of the page.  This appears to be the root of most problems.  In addition the directives themselves for some could be updated to provide a better layout when generating slides instead of html.  

I'm not even sure whether this particular little project should be a high priority, I thought everything might just work, but then it didn't. So, I spent a day hacking at it until I realized it was much more work than I thought.


Login/Logout
~~~~~~~~~~~~

Currently you cannot have your students login to any resources you build and host yourself or on github.  This is a problem that probably will not get fixed until later this semester or even this summer when I have more time to work on the back end.  This has to do with the way that most web frameworks (including web2py) use session cookies to track login/logout. Given the current architecture of the tools it makes sense to go away from cookies anyway.

