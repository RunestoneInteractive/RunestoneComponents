# .. Copyright (C) 2017 Bryan A. Jones.
#
#    This file is part of E-Book Binder.
#
#    E-Book Binder is free software: you can redistribute it and/or modify it
#    under the terms of the GNU General Public License as published by the Free
#    Software Foundation, either version 3 of the License, or (at your option)
#    any later version.
#
#    E-Book Binder is distributed in the hope that it will be useful, but WITHOUT
#    ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
#    FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
#    details.
#
#    You should have received a copy of the GNU General Public License along
#    with E-Book Binder.  If not, see <http://www.gnu.org/licenses/>.
#
# .. highlight:: python
#
# ******************************************************************
# |docname| - Syntax highlighting for inline literal and code blocks
# ******************************************************************
# This is a heavily modified version of https://bitbucket.org/klorenz/sphinxcontrib-inlinesyntaxhighlight.
from docutils import nodes
import re
from sphinx.writers.html import HTMLTranslator

DIV_PRE_RE = re.compile(r"^<div[^>]*><pre>")
PRE_DIV_RE = re.compile(r"\s*</pre></div>\s*$")


def html_visit_literal(self, node):
    env = self.builder.env

    shall_highlight = False

    if (
        # This is a literal...
        (
            node.rawsource.startswith("``")
            and
            # ...that's not inside a ``:file:``
            "role" not in node.attributes
            and
            # ...and we should highlight literals, OR
            env.config.inline_highlight_literals
        )
        or
        # this is a code block, highlight.
        ("code" in node["classes"])
    ):

        if env.config.inline_highlight_respect_highlight:
            lang = self.highlightlang
        else:
            lang = None

        highlight_args = node.get("highlight_args", {})

        if node.has_key("language"):
            # code-block directives
            lang = node["language"]
            highlight_args["force"] = True

        def warner(msg, **kwargs):
            self.builder.warn(self.builder.current_docname, msg, node.line, **kwargs)

        highlighted = self.highlighter.highlight_block(
            node.astext(), lang, warn=warner, **highlight_args
        )

        # highlighted comes as <div class="highlighted"><pre>...</pre></div>

        highlighted = DIV_PRE_RE.sub("", highlighted)
        highlighted = PRE_DIV_RE.sub("", highlighted)

        # import rpdb2 ; rpdb2.start_embedded_debugger('foo')

        starttag = self.starttag(
            node,
            "code",
            suffix="",
            CLASS="docutils literal highlight highlight-%s" % lang,
        )
        self.body.append(starttag + highlighted + "</code>")

    else:
        return old_html_visit_literal(self, node)

    raise nodes.SkipNode


old_html_visit_literal = HTMLTranslator.visit_literal
HTMLTranslator.visit_literal = html_visit_literal


def setup(app):
    app.add_config_value("inline_highlight_literals", True, "env")
    app.add_config_value("inline_highlight_respect_highlight", True, "env")
