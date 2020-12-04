"""
**********************************************
|docname| - select an accessibility stylesheet
**********************************************
By setting the `accessibility_style` config value (in `conf.py <../common/project_template/conf.tmpl>` of
an interactive book project) you can select what accessibility stylesheet
you want to add (``normal``, ``light``, ``darkest``, or ``none``).

An accessibility stylesheet covers:

-   Change of nav bar to color code based on Users using either mouse or keyboard to navigate the menu
-   Adjusting bootstrap buttons to invert color on active and on focus for accessibility for users
-   Changing default bootstrap buttons to follow WCAG 2.0 guidelines

| ``acessibility.css`` reflects WCAG 2.0 AA compliance
| ``acessibilitydarkest.css`` reflects WCAG 2.0 AAA compliance
| ``accessibilitylight.css`` doesn't change bootstrap colors but adds inversion

Personally we prefered WCAG 2.0 AA compliance, so ``accessibility.css``
reflects ideal changes

.. figure:: https://i.imgur.com/jFzkI6g.jpg

    This shows the different CSS files from most compliance (left) to least compliance (right).
"""


def setup(app):
    app.add_config_value("accessibility_style", "normal", "html")

    # Since the ``init_values()`` method of the ``app.config`` object (Config class)
    # is not invoked yet (will be invoked after the setup of all extensions),
    # we need to access the raw config dictionary here.
    acc_style = app.config._raw_config.get("accessibility_style", "normal")

    if acc_style == "normal":
        app.add_autoversioned_stylesheet("accessibility.css")
    elif acc_style == "light":
        app.add_autoversioned_stylesheet("accessibilitylight.css")
    elif acc_style == "darkest":
        app.add_autoversioned_stylesheet("accessibilitydarkest.css")
