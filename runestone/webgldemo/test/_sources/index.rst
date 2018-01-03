..  Copyright (C)  Wayne Brown
  Permission is granted to copy, distribute
  and/or modify this document under the terms of the GNU Free Documentation
  License, Version 1.3 or any later version published by the Free Software
  Foundation; with Invariant Sections being Forward, Prefaces, and
  Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
  the license is included in the section entitled "GNU Free Documentation
  License".

Table of Contents
:::::::::::::::::

SECTION 1: Introduction
-----------------------

.. toctree::
  :titlesonly:
  :maxdepth: 1

  01_introduction/test01
  01_introduction/nested/test02

A simple webgl demo directive:

.. Code-Block:: text

  .. webgldemo:: W1
    :htmlprogram: _static/01_example01/scale_about_origin.html

.. webgldemo:: W1
  :htmlprogram: _static/01_example01/scale_about_origin.html

A simple webglinteractive directive that edits the shaders of a webgl program:

.. Code-Block:: text

  .. webglinteractive:: W5
    :htmlprogram: _static/01_example02/simple_pyramid.html
    :editlist: _static/shaders/uniform_color.vert, _static/shaders/uniform_color.frag

.. webglinteractive:: W5
  :htmlprogram: _static/01_example02/simple_pyramid.html
  :editlist: _static/shaders/uniform_color.vert, _static/shaders/uniform_color.frag


