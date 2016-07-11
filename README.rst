RunestoneComponents
===================

.. image:: https://badges.gitter.im/Join%20Chat.svg
   :alt: Join the chat at https://gitter.im/RunestoneInteractive/RunestoneComponents
   :target: https://gitter.im/RunestoneInteractive/RunestoneComponents?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge

.. image:: https://img.shields.io/pypi/v/Runestone.svg
   :target: https://pypi.python.org/pypi/Runestone
   :alt: PyPI Version

.. image:: https://img.shields.io/pypi/dm/Runestone.svg
   :target: https://pypi.python.org/pypi/Runestone
   :alt: PyPI Monthly downloads

.. image:: http://bnmnetp.me:8088/buildStatus/icon?job=RunestoneComponents&build=9

Packaging of the Runestone components for publishing educational materials using Sphinx and restructuredText. Check out the `Overview <http://interactivepython.org/runestone/static/overview/overview.html>`_ To see all of the extensions in action.
**NOTE** -- If you have used an older version of this repo, please know this is a total restart.  I think much better, and it WILL stay up to date as this is now the master copy of the components not just a copy.
Check out the `Development Roadmap <https://github.com/bnmnetp/runestone/wiki>`_ to get an understanding of our migration towards webcomponents.


Quick Start
-----------

If you are completely new to pip and github text editors, I have written a more thorough getting started
 tutorial `on my blog <http://reputablejournal.com/how-to-make-a-lab-in-three-easy-steps.html>`_
 Otherwise, you can install everything you need with one simple command! (Although I recommend that you first create a virtual environment for your work.)
 
 **Install and make a Python virtualenv**
 
* Documentation here:  https://virtualenv.pypa.io/en/stable/
* Video here:  https://www.youtube.com/watch?v=IX-v6yvGYFg
* For the impatient:

::
   
    $ sudo pip install virtualenv
    $ virtualenv /path/to/home/MyEnv
    $ source /path/to/home/MyEnv/bin/activate
     
* You will need to do the last command every time you want to work on RunestoneServer.  If you have not used Python virtual environments before I strongly recommend reading the docs or watching the video
 
With the virtual environment installed and configured you can continue.

::

    pip install runestone



Or, if you prefer to live on the development edge, you can check out the very latest from:

::

    pip install git+git://github.com/RunestoneInteractive/RunestoneTools.git


To start a project, create a new folder and then run the following command (installed by pip)  in that new folder ``runestone init``  For example:

::

    mkdir myproject
    cd myproject
    runestone init


The init command will ask you some questions and setup a default project for you.

To build the included default project run

::

    runestone build

You will now have a build folder with a file index.html in it, along with some default content.  The contents of the build folder are suitable for hosting anywhere that you can serve static web content from!  For a small class you could even serve the content using the builtin Python webserver.

::

    $ runestone serve


Now from your browser you can open up ``http://localhost:8000/index.html``  You should see the table of contents for a sample page.  If you edit ``_sources/index.html`` or ``_sources/overview.rst`` and then rebuild and serve again you will see your changes.  The best documentation is probably the overview.rst file itself, as it demonstrates how to use all of the common components and shows most of their options.


**Windows Users** I have tested the installation, along with init, build, and serve on Windows 8.1.
The biggest pain is probably setting your PATH environment variable so you can simply type the commands
from the shell.  Please note that I am not a regular user of windows, I only test things on my VMWare
installation every so often.  If you are new to using Python on windows I recommend you check out this
link on `Using Python with Windows <https://docs.python.org/3.4/using/windows.html>`_


Developing and Hacking
----------------------

So, you would like to help out with developing the Runestone Components.  What do you need to know?

1.  Make a Fork of this repository.
2.  Setup your environment on your development machine

    1.  Make a virtual environment for testing and working  I recommend pyvenv-3.4  as it is baked in to Python 3.4 and higher.
    2.  Rather than following the instructions above for installing runestone simply run ``pip install -e .`` from the top level runestone directory.  This will install all of the required prerequisites and setup the runestone install as a link to the development directory.

3.  When you have some changes to share, make a Pull Request.


Notes for more Advanced Users
-----------------------------

If you already have an existing `Sphinx <http://sphinx-doc.org>`_  project and you want to incorporate the runestone components into your project you can just make a couple of simple edits to your existing ``conf.py`` file.

* First add the following import line ``from runestone import runestone_static_dirs, runestone_extensions``
* Then modify your extensions.  You may have a different set of extensions already enabled, but it doesn't matter just do this:  ``extensions = ['sphinx.ext.mathjax'] + runestone_extensions()``
* Then modify your html_static_path:  ``html_static_path = ['_static']  + runestone_static_dirs()``  Again you may have your own set of static paths in the initial list.


See https://github.com/bnmnetp/runestone/wiki/DevelopmentRoadmap to get a sense for how this is all going to come together.
