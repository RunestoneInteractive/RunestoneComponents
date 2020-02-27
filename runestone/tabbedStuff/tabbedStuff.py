# Copyright (C) 2011  Bradley N. Miller
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
__author__ = "isaiahmayerchak"

from docutils import nodes
from docutils.parsers.rst import directives
from runestone.common.runestonedirective import RunestoneDirective, RunestoneNode


def setup(app):
    # Add directives/javascript/css
    app.add_directive("tabbed", TabbedStuffDirective)
    app.add_directive("tab", TabDirective)

    app.add_node(TabNode, html=(visit_tab_node, depart_tab_node))
    app.add_node(
        TabbedStuffNode, html=(visit_tabbedstuff_node, depart_tabbedstuff_node)
    )

    app.add_config_value("tabbed_div_class", "alert alert-warning", "html")


# Templates to be formatted by node options
BEGIN = """<div id='%(divid)s' data-component="tabbedStuff" %(inactive)s class='%(divclass)s'>"""

TABDIV_BEGIN = """<div data-component="tab" data-tabname="%(tabname)s" %(active)s>
"""

TABDIV_END = """</div>"""

END = """
    </div>

"""


class TabNode(nodes.General, nodes.Element):
    def __init__(self, content, **kwargs):
        super(TabNode, self).__init__(**kwargs)
        self.tabnode_options = content
        self.tabname = content["tabname"]


def visit_tab_node(self, node):
    # Set options and format templates accordingly
    divid = node.parent.divid
    tabname = node.tabname

    if "active" in node.tabnode_options:
        node.tabnode_options["active"] = "data-active"
    else:
        node.tabnode_options["active"] = ""

    res = TABDIV_BEGIN % {
        "divid": divid,
        "tabname": tabname,
        "active": node.tabnode_options["active"],
    }
    self.body.append(res)


def depart_tab_node(self, node):
    # Set options and format templates accordingly
    self.body.append(TABDIV_END)


class TabbedStuffNode(nodes.General, nodes.Element, RunestoneNode):
    """A TabbedStuffNode contains one or more TabNodes"""

    def __init__(self, content, **kwargs):
        super(TabbedStuffNode, self).__init__(**kwargs)
        self.tabbed_stuff_options = content
        self.divid = content["divid"]


def visit_tabbedstuff_node(self, node):
    divid = node.divid
    if "inactive" in node.tabbed_stuff_options:
        node.tabbed_stuff_options["inactive"] = "data-inactive"
    else:
        node.tabbed_stuff_options["inactive"] = ""

    res = BEGIN % {
        "divid": divid,
        "divclass": node.tabbed_stuff_options["divclass"],
        "inactive": node.tabbed_stuff_options["inactive"],
    }

    self.body.append(res)


def depart_tabbedstuff_node(self, node):
    divid = node.divid
    res = ""
    # close the tab plugin div and init the Bootstrap tabs
    res += END

    res = res % {"divid": divid}

    self.body.append(res)


class TabDirective(RunestoneDirective):
    """
.. tab:: identifier
   :active: Optional flag that specifies this tab to be opened when page is loaded (default is first tab)--overridden by :inactive: flag on tabbedStuff

   Content
   ...


config values (conf.py):

- tabbed_div_class - custom CSS class of the component's outermost div
    """

    required_arguments = 1  # the name of the tab
    optional_arguments = 0
    final_argument_whitespace = True
    has_content = True
    option_spec = {"active": directives.flag}

    node_class = TabNode

    def run(self):
        """
            process the tab directive and generate html for output.
            :param self:
            :return:
            .. tab:: identifier
            :active: Optional flag that specifies this tab to be opened when page is loaded (default is first tab)--overridden by :inactive: flag on tabbedStuff

            Content
            ...
            """
        # Raise an error if the directive does not have contents.
        self.assert_has_content()

        # Create the node, to be populated by "nested_parse".
        self.options["tabname"] = self.arguments[0]
        tab_node = TabNode(self.options, rawsource=self.block_text)

        # Parse the child nodes (content of the tab)
        self.state.nested_parse(self.content, self.content_offset, tab_node)
        return [tab_node]


class TabbedStuffDirective(RunestoneDirective):
    """
.. tabbed:: identifier
   :inactive: Optional flag that calls for no tabs to be open on page load

   Content (put tabs here)
   ...



config values (conf.py):

- tabbed_div_class - custom CSS class of the component's outermost div
    """

    required_arguments = 1  # the div to put the tabbed exhibit in
    optional_arguments = 0
    final_argument_whitespace = True
    has_content = True
    option_spec = {"inactive": directives.flag}

    def run(self):
        """
            process the tabbedStuff directive and generate html for output.
            :param self:
            :return:
            .. tabbed:: identifier
            :inactive: Optional flag that calls for no tabs to be open on page load

            Content (put tabs here)
            ...
            """

        # Raise an error if the directive does not have contents.
        self.assert_has_content()

        self.options["divid"] = self.arguments[0]

        env = self.state.document.settings.env
        self.options["divclass"] = env.config.tabbed_div_class

        # Create the node, to be populated by "nested_parse".
        tabbedstuff_node = TabbedStuffNode(self.options, rawsource=self.block_text)
        tabbedstuff_node.source, tabbedstuff_node.line = self.state_machine.get_source_and_line(
            self.lineno
        )

        # Parse the directive contents (should be 1 or more tab directives)
        self.state.nested_parse(self.content, self.content_offset, tabbedstuff_node)
        return [tabbedstuff_node]
