=====================
This Is A New Project
=====================

.. Here is were you specify the content and order of your new book.

.. Each section heading (e.g. "SECTION 1: A Random Section") will be
   a heading in the table of contents. Source files that should be
   generated and included in that section should be placed on individual
   lines, with one line separating the first source filename and the
   :maxdepth: line.

.. Sources can also be included from subfolders of this directory.
   (e.g. "DataStructures/queues.rst").

SECTION 1: Introduction
:::::::::::::::::::::::

Congratulations!   If you can see this file you have probably successfully run the ``runestone init`` command.  If you are looking at this as a source file you should now run ``runestone build``  to generate html files.   Once you have run the build command you can run ``runestone serve`` and then view this in your browser at ``http://localhost:8000``

This is just a sample of what you can do.  The index.rst file is the table of contents for your entire project.  You can put all of your writing in the index, or as you will see in the following section you can include additional rst files.  those files may even be in subdirectories that you can reference using a relative path.

The overview section, which follows is an ideal section to look at both online and at the source.  It is pretty easy to see how to write using any of the interactive features just by looking at the examples in ``overview.rst``


SECTION 2: An Overview of the extensions
::::::::::::::::::::::::::::::::::::::::

.. toctree::
   :maxdepth: 2

   overview.rst


SECTION 2: Add more stuff here
::::::::::::::::::::::::::::::

You can add more stuff here.


