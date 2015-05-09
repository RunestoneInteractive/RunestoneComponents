RunestoneComponents
===================

Packaging of the Runestone components for publishing educational materials using Sphinx and restructured text.

**NOTE** -- If you have used an older version of this repo, please know this is a total restart.  I think much better, and it WILL stay up to date as this is now the master copy of the components not just a copy.

Check out the [Development Roadmap](https://github.com/bnmnetp/runestone/wiki) to get an understanding of our migration towards webcomponents.

Quick Start
-----------

Until I get this tested well enough to push onto ``pypi.python.org`` You can install everything you need with one simple command! (Although I recommend that you first create a virtual environment for your work.)   Python 2.7.x is required, I have not yet made the directives Python3 compatible.  Working on it.

```
pip install runestone
```

Or, if you prefer to live on the development edge, you can check out the very latest from:

```
pip install git+git://github.com/RunestoneInteractive/RunestoneTools.git
```

To start a project, create a new folder and then run the following command (installed by pip)  in that new folder ``runestone init``  For example:

```
mkdir myproject
cd myproject
runestone init
```

The init command will ask you some questions and setup a default project for you.

To build the included default project run

```
runestone build
```
You will now have a build folder with a file index.html in it, along with some default content.  The contents of the build folder are suitable for hosting anywhere that you can serve static web content from!  For a small class you could even serve the content using the builtin Python webserver.

```

    $ runestone serve
```

Now from your browser you can open up http://localhost:8000/index.html

That is all.  For now.

See https://github.com/bnmnetp/runestone/wiki/DevelopmentRoadmap to get a sense for how this is all going to come together.
