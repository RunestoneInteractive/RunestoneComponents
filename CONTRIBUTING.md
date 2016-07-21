Contributing to the Runestone Components
========================================

We welcome contributions through pull requests to the Runestone Components.

Understand the RoadMap
----------------------

You should look at the [development road map](https://github.com/bnmnetp/runestone/wiki/DevelopmentRoadmap) 
and especially RSE-0001 which gives you a clear idea of the current philosophy behind the components.  Any 
Sphinx directives should create very simple html and let Javascript take care of the rest.

Coding Standards
----------------

* All components must remain Python 3/2 compatible.   The ``six`` module is already 
in the requirements.txt file, so feel free to use that.
* No Tabs for Python files (4 spaces = 1 indention)
* Avoid profliferation of jQuery versions.  Make your stuff compatible with the version
of jQuery in the common folder.
* Avoid proliferation of additional third party javascript modules.  We are already out of 
control in this regard and it would be nice to rein it in.
* When creating a new directive, assign a unique class name to the outermost HTML division. That will allow you to easily confine your CSS declarations to apply only within your directive. Since there are many directives, chances for CSS namespace conflicts are high without that.
* When making any changes, make sure the docstring for the class that implements the Sphinx directive is up to date.  These docstrings are used in several places for templates and quick help.

Unit Testing
------------

We are using selenium to create unit tests for each of the components.  Look at poll or activecode for some examples.

Provide an example
------------------

The folder ``runestone/common/project_template/_sources`` folder is a great place to add a file
that demonstrates your new feature or component in action.

In fact you should provide two examples whenever possible to demonstrate that you can have 
multiple instances of your component on a single web page.
