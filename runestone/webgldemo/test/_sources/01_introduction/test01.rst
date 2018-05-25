..  Copyright (C)  Wayne Brown
  Permission is granted to copy, distribute
  and/or modify this document under the terms of the GNU Free Documentation
  License, Version 1.3 or any later version published by the Free Software
  Foundation; with Invariant Sections being Forward, Prefaces, and
  Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
  the license is included in the section entitled "GNU Free Documentation
  License".

============================
Testing: webgldemo directive
============================

A simple webgl demo directive:

.. Code-Block:: text

  .. webgldemo:: W1
    :htmlprogram: _static/01_example01/scale_about_origin.html

.. webgldemo:: W1
  :htmlprogram: _static/01_example01/scale_about_origin.html

---------------------------------------------------------------------

A second instance of the same demo. The variables should have been
changed to allow for both program instances to exist on the same
page without conflicts.

.. Code-Block:: text

  .. webgldemo:: W2
    :htmlprogram: _static/01_example01/scale_about_origin.html

.. webgldemo:: W2
  :htmlprogram: _static/01_example01/scale_about_origin.html

---------------------------------------------------------------------

A third instance with a smaller, square canvas.

.. Code-Block:: text

  .. webgldemo:: W3
    :htmlprogram: _static/01_example01/scale_about_origin.html
    :width: 200
    :height: 200

.. webgldemo:: W3
  :htmlprogram: _static/01_example01/scale_about_origin.html
  :width: 200
  :height: 200

---------------------------------------------------------------------

A non-rectangular canvas.

.. Code-Block:: text

  .. webgldemo:: W4
    :htmlprogram: _static/01_example01/scale_about_origin.html
    :width: 600
    :height: 300

.. webgldemo:: W4
  :htmlprogram: _static/01_example01/scale_about_origin.html
  :width: 600
  :height: 300

===================================
Testing: webglinteractive directive
===================================

A simple webglinteractive directive that edits the shaders of a webgl program:

.. Code-Block:: text

  .. webglinteractive:: W5
    :htmlprogram: _static/01_example02/simple_pyramid.html
    :editlist: _static/shaders/uniform_color.vert, _static/shaders/uniform_color.frag

.. webglinteractive:: W5
  :htmlprogram: _static/01_example02/simple_pyramid.html
  :editlist: _static/shaders/uniform_color.vert, _static/shaders/uniform_color.frag

---------------------------------------------------------------------

A webglinteractive directive that edits the HTML of a webgl program and the output div is initially hidden:

.. Code-Block:: text

  .. webglinteractive:: W6
    :htmlprogram: _static/01_example02/simple_pyramid.html
    :editlist: _static/01_example02/simple_pyramid.html
    :hideoutput:

.. webglinteractive:: W6
  :htmlprogram: _static/01_example02/simple_pyramid.html
  :editlist: _static/01_example02/simple_pyramid.html
  :hideoutput:

---------------------------------------------------------------------

A webglinteractive directive that edits a model of a webgl program and the code div is initially hidden:

.. Code-Block:: text

  .. webglinteractive:: W7
    :htmlprogram: _static/01_example01/scale_about_origin.html
    :editlist: _static/models/xyz_blocks.obj, _static/models/xyz_blocks.mtl
    :hidecode:

.. webglinteractive:: W7
    :htmlprogram: _static/01_example01/scale_about_origin.html
    :editlist: _static/models/xyz_blocks.obj, _static/models/xyz_blocks.mtl
    :hidecode:


---------------------------------------------------------------------

A webglinteractive directive that edits a javascript program:

.. Code-Block:: text

  .. webglinteractive:: W8
    :htmlprogram: _static/01_example01/scale_about_origin.html
    :editlist: _static/01_example01/scale_about_origin_scene.js
    :viewlist: _static/01_example01/scale_about_origin_events.js
    :width: 200
    :height: 200

.. webglinteractive:: W8
  :htmlprogram: _static/01_example01/scale_about_origin.html
  :editlist: _static/01_example01/scale_about_origin_scene.js
  :viewlist: _static/01_example01/scale_about_origin_events.js
  :width: 200
  :height: 200



