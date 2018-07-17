Contributing to the Runestone Components
========================================

We welcome contributions large and small to the Runestone Components.  We welcome contributions from newcomers as well as seasoned Runestone hackers.  You don't need to be an expert to make a contribution here.  When I started this project I had barely written a line of Javascript, Runestone is a project that is all about helping people learn, if you learn by helping us improve Runestone that is even better!

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
* When making a new directive Also put the outer div in the runestone class, this makes it easy for us to select all runestone components on a page.
* When making any changes, make sure the docstring for the class that implements the Sphinx directive is up to date.  These docstrings are used in several places for templates and quick help.
* Make sure your new directive class inherits and uses RunestoneBase
* Avoid writing a directive that returns a raw node.  Creating appropriate nodes that inherit from Runestone gives us much more flexibility to auto number and cross reference and store source in the database.
* Make sure any buttons you create have their type specified.  Unless you know you want it to be submit or reset make sure it is 'button' otherwise it causes problems for previewing.


Unit Testing
------------

We are using Selenium to create unit tests for each of the components.  Nearly every component has selenium tests now.  If you add a feature or a new component, please make sure to include a selenium test that verifies it works.

Provide an example
------------------

The folder ``runestone/<component>/test/index.rst``  is a great place to add code
that demonstrates your new feature or component in action.

In fact you should provide two examples whenever possible to demonstrate that you can have 
multiple instances of your component on a single web page.

Internationalization
--------------------

It is recomended to implement internationalization as described in [I18N.md](I18N.md) even if you plan to support only English currently. Besides making easy to support other languages in the future, internationalization helps you to better separate natural language text fragments from the rest of your code.


## Major Feature Contributions

There are many ways that we can continue to improve and make the Runestone platform great, and I am exctied to see the platform evolve.  What I would ask is that if you have a large new feature that you would like to propose / contribute please start by creating an issue.  This will allow us to discuss it together up front, consider the design implications, and make it more likely that the PR will be accepted with a minimum of fuss.

Runestone has grown organically over the years but that has led to duplicated tables in the database duplicated code and lots of inconsistency.  We need to start working to change all of that if we are going to continue to grow runestone efficiently.

