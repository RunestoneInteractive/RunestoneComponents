# Copyright (C) 2016  Bradley N. Miller
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
__author__ = "bmiller"


from collections import defaultdict
import binascii
import os

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
from docutils.utils import get_source_line
from docutils.statemachine import ViewList

from sphinx import application
from sphinx.errors import ExtensionError

UNNUMBERED_DIRECTIVES = [
    #    "activecode",
    "reveal",
    #    "video",
    #    "youtube",
    #    "vimeo",
    #   "codelens",
    #   "showeval",
    #   "poll",
    "tabbed",
    "tab",
    "timed",
    "disqus",
]


# Provide a class which all Runestone nodes will inherit from.
class RunestoneNode(nodes.Node):
    pass


# Provide a class which all Runestone ID nodes will inherit from.
class RunestoneIdNode(RunestoneNode):
    pass


# Notes
# env = self.state.document.settings.env
# env.config.html_context['course_id']
# if not hasattr(env, 'activecodecounter'):
#    env.activecodecounter = 0
# env.activecodecounter += 1
# similar trick for assessments using getNumber()


# Easily create and initialize an object with named methods from the object's constructor. Taken from http://stackoverflow.com/a/3652937. While a collections.namedtuple could probably be forced to do this, the following approach seems fairly straightforward.
class Struct:
    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)

    # Provide a nice printable representation.
    def __repr__(self):
        args = ["{}={}".format(k, repr(v)) for (k, v) in vars(self).items()]
        return "Struct({})".format(", ".join(args))


# Get a data structure which holds Runestone data from the environment. Create one if it doesn't exist.
def _get_runestone_data(
    # The Sphinx environment which (possibly) contains Runestone data.
    env,
):

    # Create the Runestone data structure if it doesn't yet exist.
    if not hasattr(env, "runestone_data"):
        # .. _Runestone data:
        env.runestone_data = Struct(
            # Maps from a question's ID to the page containing it:
            #
            # .. code:: Python
            #   :number-lines:
            #
            #   .id_to_page = {
            #       # The ID maps to a Struct(), which contains:
            #       str(id): Struct()
            #           # The path of the file which contains this ID.
            #           .srcpath = str()
            #           # The line in this file which contains this ID.
            #           .line = int()
            #   }
            id_to_page=dict(),
            # Provide the inverse map: from a page to a set of IDs it contains.
            #
            # .. code:: Python
            #   :number-lines:
            #
            #   .page_to_id: = {
            #       # The path to a source file maps to a set:
            #       str(srcpath) : set(
            #           # Which consists of a strings, each of which is an ID on that page.
            #           str(id_), ...
            #       )
            #   }
            page_to_id=defaultdict(set),
        )
    return env.runestone_data


# When a source file is modified, clear all accumulated Runestone data from it.
def _purge_runestone_data(app, env, docname):
    runestone_data = _get_runestone_data(env)

    for id_ in runestone_data.page_to_id[docname]:
        runestone_data.id_to_page.pop(id_)
    runestone_data.page_to_id.pop(docname)

    # Reset the problem numbering for each page.
    env.assesscounter = 0


# Give the name of a file in the ``html_static_path``, append a version number after it based on its 32-bit CRC.
def _add_autoversion(
    self,
    # The file to find in the ``html_static_path``
    filename,
):

    # TODO: Cache the path and CRC to speed computing it.
    #
    # Search for this file by looking through all HTML static paths. The HTML builder hasn't been initilized, so the ``html_static_path`` doesn't show up yet as ``config.html_static_path``.
    # Some uses of this don't discriminate files versus urls. So if it starts with http just return it as we are not going to calculate a crc for something not on our server.
    if filename[:4] == "http":
        return filename
    for path in self.config._raw_config["html_static_path"]:
        full_path = path
        # Transform a relative path into an absolute path if necessary.
        if not os.path.isabs(full_path):
            full_path = os.path.join(self.confdir, full_path)
        # Distinguish between files and directories.
        if os.path.isdir(path):
            # Append the path to a directory.
            full_path = os.path.join(path, filename)
        # If it's not a directory, assume it's a file. See if these match.
        else:
            if os.path.normpath(path).endswith(os.path.normpath(filename)):
                full_path = path
            else:
                continue

        # See if we can open it.
        try:
            f = open(os.path.join(path, filename), "rb")
        except IOError:
            continue
        else:
            # Read the file and compute a CRC.
            with f:
                crc_str = "{:02X}".format(binascii.crc32(f.read()))

            # Append the CRC to the JavaScript reference.
            return "{}?v={}".format(filename, crc_str)

    # No match was found.
    raise ExtensionError("Unable to find {} in html_static_path.".format(filename))


# Convenience method to call ``add_js_file`` using ``add_autoversion``.
def _add_autoversioned_javascript(self, filename):
    return self.add_js_file(self.add_autoversion(filename))


# Convenience method for calling ``add_css_file`` using ``add_autoversion``.
def _add_autoversioned_stylesheet(self, filename, *args, **kwargs):
    return self.add_css_file(self.add_autoversion(filename), *args, **kwargs)


# Add these methods to the Sphinx application object.
application.Sphinx.add_autoversion = _add_autoversion
application.Sphinx.add_autoversioned_javascript = _add_autoversioned_javascript
application.Sphinx.add_autoversioned_stylesheet = _add_autoversioned_stylesheet


def setup(app):
    # Avoid a circular import. Ick.
    from .question_number import _insert_qnum

    # See http://www.sphinx-doc.org/en/stable/extdev/appapi.html#event-env-purge-doc.
    app.connect("env-purge-doc", _purge_runestone_data)
    app.connect("doctree-resolved", _insert_qnum)
    app.add_role("skipreading", SkipReading)
    # See http://www.sphinx-doc.org/en/stable/extdev/appapi.html#sphinx.application.Sphinx.add_config_value.
    app.add_config_value("runestone_server_side_grading", False, "env")
    app.add_config_value("generate_component_labels", True, "env")


# A base class for all Runestone directives.
class RunestoneDirective(Directive):
    option_spec = {
        "author": directives.unchanged,
        "tags": directives.unchanged,
        "difficulty": directives.unchanged,
        "autograde": directives.unchanged,
        "practice": directives.unchanged,
        "topics": directives.unchanged,
        "optional": directives.flag,
        "prim_comp": directives.unchanged,
        "supp_comp": directives.unchanged,
        "from_source": directives.unchanged,
        "basecourse": directives.unchanged,
        "chapter": directives.unchanged,
        "subchapter": directives.unchanged,
        "points": directives.positive_int,
        "pct_on_first": directives.unchanged,
        "mean_clicks_to_correct": directives.unchanged,
        "total_students_attempting": directives.unchanged,
        "num_students_correct": directives.unchanged,
    }

    def __init__(self, *args, **kwargs):
        super(RunestoneDirective, self).__init__(*args, **kwargs)
        env = self.state.document.settings.env
        self.srcpath = env.docname
        # Rather tha use ``os.sep`` to split ``self.srcpath``, use ``'/'``, because Sphinx internally stores filesnames using this separator, even on Windows.

        split_docname = self.srcpath.split("/")
        if len(split_docname) < 2:
            # TODO: Warn about this? Something like ``self.state.document.settings.env``?
            split_docname.append("")
        if "subchapter" not in self.options:
            self.subchapter = split_docname[-1]
            self.options["subchapter"] = self.subchapter
        else:
            self.subchapter = self.options["subchapter"]
        if "chapter" not in self.options:
            self.chapter = split_docname[-2]
            self.options["chapter"] = self.chapter
        else:
            self.chapter = self.options["chapter"]

        if "basecourse" not in self.options:
            self.basecourse = self.state.document.settings.env.config.html_context.get(
                "basecourse", "unknown"
            )
            self.options["basecourse"] = self.basecourse
        self.options["optional"] = (
            "data-optional=true" if "optional" in self.options else ""
        )
        if "points" in self.options:
            self.int_points = int(self.options["points"])
        else:
            self.int_points = 1

        self.explain_text = []


# This is a base class for all Runestone directives which require a divid as their first parameter.
class RunestoneIdDirective(RunestoneDirective):
    def getNumber(self):
        env = self.state.document.settings.env

        if (
            self.name in UNNUMBERED_DIRECTIVES
            or env.config.generate_component_labels is False
        ):
            return ""

        env.assesscounter += 1
        # print(f" assesscounter = {env.assesscounter}")
        res = "Q-%d"

        if hasattr(env, "assessprefix"):
            res = env.assessprefix + "%d"

        res = res % env.assesscounter

        if hasattr(env, "assesssuffix"):
            res += env.assesssuffix

        return res

    def updateContent(self):
        if self.content:
            # If the first line is a directive, then put the numbering on a separate line.
            if self.content[0][:2] == "..":
                # Per the `docs <http://www.sphinx-doc.org/en/stable/extdev/markupapi.html#viewlists>`_, ``self.content`` is a ``ViewList``, so we can't just insert strings. Instead, create a viewlist the combine the two.
                self.content = (
                    # Use the source file from the existing ViewList when creating a new one.
                    ViewList(
                        [self.options["qnumber"] + ":", ""], self.content.source(0)
                    )
                    + self.content
                )
            else:
                if self.options["qnumber"]:
                    self.content[0] = self.options["qnumber"] + ": " + self.content[0]

    def get_explain_text(self):
        try:
            idx = self.content.index("")  # find the first blank line in the contents
        except ValueError:
            idx = len(self.content)
        return self.content[:idx]

    def run(self):
        # Make sure the runestone directive at least requires an ID.
        assert self.required_arguments >= 1
        if "divid" not in self.options:
            id_ = self.options["divid"] = self.arguments[0]
        else:
            id_ = self.options["divid"]

        self.options["qnumber"] = self.getNumber()
        # print(f"{id_} is number {self.options['qnumber']}")

        # Get references to `runestone data`_.
        env = self.state.document.settings.env
        runestone_data = _get_runestone_data(env)
        id_to_page = runestone_data.id_to_page
        page_to_id = runestone_data.page_to_id
        # See if this ID already exists.
        if id_ in id_to_page:
            page = id_to_page[id_]
            # If it's not simply an update to an existing ID, complain.
            if page.docname != env.docname or page.lineno != self.lineno:
                raise self.error(
                    "Duplicate ID -- see {}, line {}".format(page.docname, page.lineno)
                )
            # Make sure our data structure is consistent.
            assert id_ in page_to_id[page.docname]
        else:
            # Add a new entry.
            id_to_page[id_] = Struct(docname=env.docname, lineno=self.lineno)
            page_to_id[env.docname].add(id_)

        self.in_exam = getattr(env, "in_timed", "")


# returns True when called first time with particular parameters' values
def first_time(app, *keys):
    key = "$".join(keys)
    if not hasattr(app, "runestone_flags"):
        app.runestone_flags = set()
    if not key in app.runestone_flags:
        app.runestone_flags.add(key)
        return True
    return False


# An internationalized component should call add_i18n_javascript() from its setup() function
def add_i18n_js(app, supported_langs, *i18n_resources):
    if first_time(app, "add_i18n_js"):
        app.add_autoversioned_javascript("jquery_i18n/CLDRPluralRuleParser.js")
        app.add_autoversioned_javascript("jquery_i18n/jquery.i18n.js")
        app.add_autoversioned_javascript("jquery_i18n/jquery.i18n.messagestore.js")
        app.add_autoversioned_javascript("jquery_i18n/jquery.i18n.fallbacks.js")
        app.add_autoversioned_javascript("jquery_i18n/jquery.i18n.language.js")
        app.add_autoversioned_javascript("jquery_i18n/jquery.i18n.parser.js")
        app.add_autoversioned_javascript("jquery_i18n/jquery.i18n.emitter.js")
        app.add_autoversioned_javascript("jquery_i18n/jquery.i18n.emitter.bidi.js")
    for res in i18n_resources:
        if first_time(app, "add_i18n_js", res):
            app.add_autoversioned_javascript(res + ".en.js")
            if (
                app.config.language
                and app.config.language != "en"
                and app.config.language in supported_langs
            ):
                app.add_autoversioned_javascript(
                    res + "." + app.config.language + ".js"
                )


# Some nodes have a line number of None. Look through their children to find the node's line number.
def get_node_line(node):
    # This returns source, line. Pick just the line.
    return get_source_line(node)[1]


def SkipReading(
    # _`roleName`: the local name of the interpreted role, the role name actually used in the document.
    roleName,
    # _`rawtext` is a string containing the enitre interpreted text input, including the role and markup. Return it as a problematic node linked to a system message if a problem is encountered.
    rawtext,
    # The interpreted _`text` content.
    text,
    # The line number (_`lineno`) where the interpreted text begins.
    lineno,
    # _`inliner` is the docutils.parsers.rst.states.Inliner object that called this function. It contains the several attributes useful for error reporting and document tree access.
    inliner,
    # A dictionary of directive _`options` for customization (from the "role" directive), to be interpreted by this function. Used for additional attributes for the generated elements and other functionality.
    options={},
    # A list of strings, the directive _`content` for customization (from the "role" directive). To be interpreted by the role function.
    content=[],
):

    docname = inliner.document.settings.env.docname

    if not hasattr(inliner.document.settings.env, "skipreading"):
        inliner.document.settings.env.skipreading = set()

    # print("ADDING {} to skipreading".format(docname))
    inliner.document.settings.env.skipreading.add(docname)

    return ([], [])


# Return the Sphinx environment given a node object.
def env_from_node(node):
    # Ascend the node tree until we find a node with a ``document``.
    node_with_document = node
    while not node_with_document.document:
        node_with_document = node_with_document.parent
    return node_with_document.document.settings.env
