********************
Runestone Components
********************
This site documents the working of the Runestone Components. See the `Runestone Interactive Overview <https://runestone.academy/runestone/books/published/overview/overview.html>`_ or the `Runestone instructor's guide <https://runestone.academy/runestone/static/instructorguide/index.html>`_.

Demo linking to the Runestone Server docs: :ref:`assignments/grades_report endpoint`.


Getting started
===============
.. toctree::
    :maxdepth: 2

    README
    CONTRIBUTING
    I18N


Components
==========
.. toctree::
    :maxdepth: 1
    :glob:

    runestone/overview
    runestone/*/toctree
    runestone/__init__.py
    runestone/__main__.py
    runestone/conftest.py
    runestone/shared_conftest.py


Packaging
=========
.. toctree::
    :maxdepth: 2

    setup.py
    setup.cfg
    MANIFEST.in
    webpack.config.js

Misc
====
.. toctree::
    :maxdepth: 2

    ACKNOWLEDGEMENTS
    .github/FUNDING.yml
    runestone/conftest.py
    runestone/shared_conftest.py
    .gitignore
    .github/workflows/python-package.yml
    .readthedocs.yml
    conf.py
    codechat_config.yaml
    requirements-dev.in
    requirements.in
    public/index.html
    makeRelease.sh
