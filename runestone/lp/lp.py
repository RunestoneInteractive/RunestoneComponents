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
# **************************************************************************
# lp.py - A Runestone extension for authoring literate programming questions
# **************************************************************************
#
# Imports
# =======
# These are listed in the order prescribed by `PEP 8
# <http://www.python.org/dev/peps/pep-0008/#imports>`_.
#
# Standard library
# ----------------
import re
import os
from os import makedirs
from pathlib import Path
import json
#
# Third-party imports
# -------------------
import pygments
from pygments.lexers import guess_lexer_for_filename
from pygments.formatters import HtmlFormatter
from docutils import nodes
from docutils.transforms import Transform
from docutils.parsers.rst import directives
from docutils.parsers.rst.states import Struct
from CodeChat.CodeToRestSphinx import is_source_code
from CodeChat.CodeToRest import get_lexer
#
# Local imports
# -------------
from ..common.runestonedirective import RunestoneIdDirective, RunestoneNode
from ..server.lp_common_lib import STUDENT_SOURCE_PATH, code_here_comment, SPHINX_CONFIG_NAME
from ..server.componentdb import addQuestionToDB, addHTMLToDB
#
# Directives
# ----------
#
# Utilities
# ^^^^^^^^^
# _remove_code_solutions
# """"""""""""""""""""""
# Given code containing solution tags, remove the lines containing the solution tags and any intervening lines, replacing them with the provided string.
def _remove_code_solutions(
  # The file name of this code.
  file_name,
  # A string containing the code.
  src,
  # The _`replacement function`, invoked as ``replacement_func(start_line, end_line, file_name)`` which returns a replacement string.
  replacement_func):

    # Split these so they won't be treated as actual tags when this file is parsed.
    start_token = 'SOLUTION_' 'BEGIN'
    end_token = 'SOLUTION_' 'END'

    # Search through the lines of source from the end of the beginning. That way, any deletions made at the end won't change line numbers for deletions made earlier in the source.
    lines = src.splitlines(keepends=True)
    current_index = len(lines) - 1
    end_token_index = None
    while current_index >= 0:
        # Implement this is a two-state state machine:
        #
        # 1. When ``end_token_index`` is None, we're searching for the ending token.
        if end_token_index is None:
            if end_token in lines[current_index]:
                end_token_index = current_index
        # 2. Otherwise, ``end_token_index`` contains the line number at which the end token was found. Therefore, we're searching for the beginning token.
        else:
            if start_token in lines[current_index]:
                del lines[current_index:end_token_index + 1]
                lines.insert(current_index, replacement_func(current_index + 1, end_token_index + 1, file_name))
                end_token_index = None
        current_index -= 1

    return ''.join(lines)
#
# _assert_has_no_content
# """"""""""""""""""""""
# An almost-copy of ``docutils.parsers.rst.Directive.assert_has_content``. It throws an ERROR-level DirectiveError if the directive has contents.
def _assert_has_no_content(self):
    if self.content:
        raise self.error('Content block not allowed for the "%s" directive.'
                         % self.name)
#
# _source_read
# ^^^^^^^^^^^^
# The source-read_ event occurs when a source file is read. If it's code, this
# routine replaces code solutions with HTML textareas, so students can fill in their own code.
def _source_read(
  # .. _app:
  #
  # The `Sphinx application object <http://sphinx-doc.org/extdev/appapi.html#sphinx.application.Sphinx>`_.
  app,
  # The name of the document that was read. It contains a path relative to the
  # project directory and (typically) no extension.
  docname,
  # A list whose single element is the contents of the source file.
  source):

    if is_source_code(app.env, docname):
        source[0] = _remove_code_solutions(docname, source[0], _textarea_replacement)

# A `replacement function`_ to substitute a text area for student code for the solution.
def _textarea_replacement(start_line, end_line, file_name):

    # Create the minimal-length replacement string.
    s = TEXTAREA_REPLACEMENT_STRING.format(end_line - 4)

    # Pad with newlines if we can so line numbering is preserved.
    padding_newlines = end_line - start_line + 1 - s.count('\n')
    if padding_newlines > 0:
        s += '\n'*padding_newlines

    return s

TEXTAREA_REPLACEMENT_STRING = (
"""
.. raw::
 html

 <textarea class="code_snippet"></textarea><br />

..

""")
#
# _LpBuildButtonDirective
# ^^^^^^^^^^^^^^^^^^^^^^^
# This inserts a "save and run" button, along with the HTML/JavaScript which causes the current page to be tested by compiling and running it with its test bench, then reporting the results to the user. It must only be used on pages that are a program and have a test bench associated with them. Only one should appear on a given page.
class _LpBuildButtonDirective(RunestoneIdDirective):
    # The required argument is an id_ for this question.
    required_arguments = 1
    # No optional arguments.
    optional_arguments = 0
    # Per http://docutils.sourceforge.net/docs/howto/rst-directives.html, True if content is allowed. However, this isn't checked or enforced.
    has_content = False
    # Options. Everything but language is currently ignored. This is based on activecode, so in the future similar support would be provided for these options.
    option_spec = RunestoneIdDirective.option_spec.copy()
    option_spec.update({
        'include': directives.unchanged,
        'language': directives.unchanged,
        'timelimit': directives.unchanged,
        'stdin': directives.unchanged,
        'datafile': directives.unchanged,
        'available_files': directives.unchanged,
        'builder': directives.unchanged,
    })

    def run(self):
        super(_LpBuildButtonDirective, self).run()
        _assert_has_no_content(self)
        addQuestionToDB(self)
        # Gather arguments.
        id_ = self.options['divid']

        # Process options
        ##===============
        self.options['include'] = [x.strip() for x in self.options.get('include', '')]
        # If a language isn't provided, derive it from the file's name.
        env = self.state.document.settings.env
        self.options.setdefault('language', get_lexer(filename=env.docname).name)
        self.options.setdefault('timelimit', 25000)
        self.options.setdefault('builder', 'JOBE')

        # Generate HTML for the lp build directive. Pass the language, so client-side JS can use the correct syntax highligher.
        html = (
"""<div class="runestone">
    <input type="button" value="Save and run" class="btn btn-success" data-component="lp_build" data-lang="{}" id="{}" />
    <br />
    <textarea readonly id="lp-result"></textarea>
    <br />
    <div></div>
</div>""".format(self.options['language'], id_)
        )
        addHTMLToDB(id_, self.options['basecourse'], html, json.dumps(dict(
            # Provide these to the server, indicating how to build.
            language=self.options['language'], builder=self.options['builder'],
            timelimit=self.options['timelimit'], include=self.options['include'],
            source_path=env.docname, sphinx_base_path=env.app.confdir,
        )))
        raw_node = nodes.raw(self.block_text, html, format='html')
        raw_node.source, raw_node.line = self.state_machine.get_source_and_line(self.lineno)

        return [raw_node]

# Remove code solutions and feedback from source files. Also, produce a Pygments-highlighted version of each source file.
def _doctree_resolved(app, doctree, docname):
    env = app.builder.env

    if is_source_code(env, docname):
        # Read the source of this file.
        src_path = env.doc2path(docname, None)
        src_abs_path = Path(env.srcdir) / src_path
        with src_abs_path.open(encoding='utf-8') as f_in:
            str_ = f_in.read()

        # See if any Runestone questions exist in this source file.
        # Remove feedback from source files.
        runestone_directives_to_remove = []
        for node in doctree.traverse(RunestoneNode):
            # See if any parent of this node is a RunestoneNode; if so, skip it.
            parent_node = node.parent
            while parent_node:
                if isinstance(parent_node, RunestoneNode):
                    break
                parent_node = parent_node.parent
            else:
                # None of the node's ancestors are RunestoneNodes. Add to our list.
                # Some nodes don't define enough information to remove them. Skip.
                if node.line and node.rawsource:
                    runestone_directives_to_remove += [[node.line, node.line + len(node.rawsource.splitlines())]]
        if runestone_directives_to_remove:
            # Look for answers in the source and remove them. Work from the last answer (which is closest to the end of the file), so edits don't change the line numbering for earlier answers.
            l = str_.splitlines(keepends=True)
            for fb in reversed(runestone_directives_to_remove):
                del l[fb[0]:fb[1]]

            # Now that feedback is removed, convert it back to a string.
            str_ = ''.join(l)

        # Replace solutions with "put your code here" comments. The lambda is a `replacement function`_.
        str_ = _remove_code_solutions(docname, str_,
            lambda start_line, end_line, file_name: code_here_comment(file_name))

        # Write the source without answers or feedback into ``outdir/STUDENT_SOURCE_PATH``. Create the path if it doesn't exist.
        dest_path = Path(app.outdir) / STUDENT_SOURCE_PATH / src_path
        makedirs(str(dest_path.parent), exist_ok=True)
        with dest_path.open('w', encoding='utf-8') as f_out:
            f_out.write(str_)

        # _`Pygments source`: Write an HTML version of the source without answers or feedback using Pygments.
        #
        # Skip files if a lexer can't be found.
        try:
            # See http://pygments.org/docs/api/#module-pygments.
            lexer = guess_lexer_for_filename(docname, str_)
        except pygments.util.ClassNotFound:
            pass
        else:
            # Figure out the path from docname to the Pygments css file. For example, ``path/to/source/code.py`` becomes ``../../../_static/pygments.css``. The newer ``pathlib`` doesn't support this, while ``os.path.relpath`` does:
            #
            # .. code-block:: pycon
            #
            #   >>> os.path.relpath('/', '/a/b/c')
            #   '..\\..\\..'
            #   >>> Path('/').relative_to('/a/b/c')
            #   Traceback (most recent call last):
            #     File "<stdin>", line 1, in <module>
            #     File "E:\Downloads\Python36-64\lib\pathlib.py", line 873, in relative_to
            #       .format(str(self), str(formatted)))
            #   ValueError: '\\' does not start with '\\a\\b\\c'
            #
            # To make this work, prepend a ``/`` to both paths, signifying that they start from the same directory (app.outdir, in this case). Use the parent of docname. so that the file name isn't treated as a directory.
            cssfile = os.path.relpath('/_static/pygments.css', '/' + str(Path(docname).parent))
            # The directory containing the cssfile may not exist yet; create it if needed.
            makedirs(app.outdir + '/_static', exist_ok=True)
            # See http://pygments.org/docs/formatters/.
            formatter = HtmlFormatter(full=True, title=env.titles[docname], cssfile=cssfile,
                                      noclobber_cssfile=True)
            pygments_name = Path(app.outdir) / (docname + '-source.html')
            # The directory containing pygments_name may not exist yet; create it if so.
            makedirs(str(pygments_name.parent), exist_ok=True)
            with pygments_name.open('w', encoding='utf-8') as f_out:
                # See http://pygments.org/docs/api/#module-pygments.
                pygments.highlight(str_, lexer, formatter, f_out)

#
# Anchored references
# ===================
# I have a number of rather long hyperlinks, and I want to refer to specific anchors of these hyperlinks. So, I'd like to provide a short name for the hyperlinks, then add an anchor to the end of the short name. This is :alink:`the finished product <short_name#external-links>`. Building up to this:
#
# .. _short_name: http://www.sphinx-doc.org/en/stable/rest.html
#
# Standard docutils syntax to refer to this is the usual `short_name`_ and the less well-known `this stuff <short_name_>`_. Per http://docutils.sourceforge.net/docs/ref/rst/restructuredtext.html#embedded-uris-and-aliases, this all works. But what I want is something like ``anchored stuff <short_name#anchor_>`_``. That doesn't natively work. While it seems tempting to play with Sphinx's `:ref: role <http://www.sphinx-doc.org/en/stable/markup/inline.html#role-ref>`_, this doesn't help, since ref doesn't refer to hyperlinks, but only labels. For example, ``:ref:`this link <short_name_>``` doesn't work.
#
# This functionality could also be replaced by the `sphinx.ext.extlinks <http://www.sphinx-doc.org/en/stable/ext/extlinks.html>`_ extension, which I found after finishing ``alink``. However, I prefer ``alink``: I don't like creating lots of new roles for every PDF I want to cross reference, and I like to be able to define a link locally in a document if it's used only there, rather than globally in the ``extlinks`` setting of `/conf.py`.
#
# To make this work:
#
# #. Create a new role, ``:alink:`title <refname#anchor>```. This role transforms its input to ```title <refname_>`_`` and has docutils parse it, adding the ``anchor`` to the resulting ``reference`` node produced by the parser.
# #. Create a transform which changes a ``refname`` into the corresponding ``refuri#anchor``. This process (without anchors) is performed by a `transform <http://docutils.sourceforge.net/docs/dev/hacking.html#transforming-the-document>`_.
# #. Register this role and transform with Sphinx.
#
# The _`:alink:` role
# --------------------
# Define the ``alink`` role, as discueed `above <anchored references>`_. `Docutils <http://docutils.sourceforge.net/docs/howto/rst-roles.html>`_ has documentation on this. There's a very helpful `tutorial <https://doughellmann.com/blog/2010/05/09/defining-custom-roles-in-sphinx/>`_ for creating a new role in Sphinx.
def _alink_role(
  # See roleName_.
  roleName,
  # See rawtext_.
  rawtext,
  # See text_.
  text,
  # See lineno_.
  lineno,
  # See inliner_.
  inliner,
  # See options_.
  options={},
  # See content_.
  content=[]):

    # Look for ``title <refname#anchor>``.
    m = re.search('(.*\s+<[^#]+)(#.+)(>\s*)$', text)
    if not m:
        msg = inliner.reporter.error('Expected "title <refname#anchor>", but saw "{}"'.format(text))
        prb = inliner.problematic(rawtext, rawtext, msg)
        return [prb], [msg]
    anchor = m.group(2)
    # Reassemble this into a reference, but removing the anchor. It then becomes
    ## `title <refname_>`_
    no_anchor_reference = '`' + m.group(1) + '_' + m.group(3) + '`_'

    # Parse this. Booger a bit to be able to invoke the inliner. Just creating a reference node doesn't work, since the parser modifies internal data structures which relate refnames to references.
    memo = Struct(reporter=inliner.reporter,
                  document=inliner.document,
                  language=inliner.language)
    parsed_nodes, system_messages = inliner.parse(no_anchor_reference, lineno,
                                                  memo, inliner.parent)

    # This should return [refence_node, target_node].
    assert isinstance(parsed_nodes[0], nodes.reference)
    assert isinstance(parsed_nodes[1], nodes.target)
    # Add in the anchor to the reference node.
    parsed_nodes[0]['anchor'] = anchor
    # I'd like ``:alink:`foo <bar#thing>``` followed by ``foo_`` to link to ``bar#thing``, but it instead links to ``bar``. That's because:
    #
    # #. ``:alink:`foo <bar#thing>``` is translated to ```foo <bar_>_```, an indirect reference to ``bar``.
    # #. In  (I think) ``docutils.transforms.references.IndirectHyperlinks``, the ``nodes.target`` referring to ``bar`` is replaced with the ``nodes.target`` for ``bar``. So, any info (such as an ``anchor`` field) specific to this target will be lost in the replacement.
    # #. In the ``ExternalAnchorTargets`` transform, the ``nodes.target`` with the actual ``refuri`` (name of the URL in a Docutils node) will have the ``node.reference anchor`` value appended. However, this will **only** apply to the original ``node.reference`` -- references to this reference won't have the ``anchor`` field. I'm not sure how or where to fix this (to make ``anchor`` propagate).
    #
    # Test cases: source link is
    # :alink:`.space directive <asmguide#page=75>`
    # and the following should refer to the same thing (but leaves off the anchor)
    # `.space directive`_.
    return parsed_nodes, system_messages
#
# Transform ``alink`` references
# ------------------------------
# This is based on ``docutils.transforms.references.ExternalTargets`` v0.12.
class ExternalAnchorTargets(Transform):

    """
    Given:

    .. code-block:: xml

        <paragraph>
            <reference refname="direct external#anchor">
                direct external
        <target id="id1" name="direct external" refuri="http://direct">

    The "refname" attribute is replaced by the direct "refuri" attribute with #anchor appended:

    .. code-block:: xml

        <paragraph>
            <reference refuri="http://direct#anchor">
                direct external
        <target id="id1" name="direct external" refuri="http://direct">
    """

    # This line was changed from the original. Lower is higher priority.
    #default_priority = 640
    default_priority = 639

    def apply(self):
        for target in self.document.traverse(nodes.target):
            if target.hasattr('refuri'):
                refuri = target['refuri']
                for name in target['names']:
                    reflist = self.document.refnames.get(name, [])
                    if reflist:
                        target.note_referenced_by(name=name)
                    for ref in reflist:
                        if ref.resolved:
                            continue
                        del ref['refname']
                        # This line was changed from the original:
                        #ref['refuri'] = refuri
                        ref['refuri'] = refuri + ref.get('anchor', '')
                        ref.resolved = 1
#
# Hyperlinks to PDF documents
# ---------------------------
# The main use of the ``alink`` role is providing a hyperlink to a specific portion of a PDF document. Some reference material on this approach:
#
# #. You can't hyperlink to bookmarks in a PDF, but instead of named destinations.
# #. In terms of syntax, https://helpx.adobe.com/acrobat/kb/link-html-pdf-page-acrobat.html covers the basics. A longer, more complete guide is available from http://www.adobe.com/content/dam/Adobe/en/devnet/acrobat/pdfs/pdf_open_parameters.pdf.
# #. In some StackOverflow post, I read that using ``#nameddest=blah`` is a bit less suporrted than ``#blah``. Chrome seems to scroll to the page, but not the actual location.
# #. The utility `textify <http://rammichael.com/textify>`_ allows me to copy the name of a named destination, even on a locked PDF.
#
# Misc
# ====
# .. _`_docname_role`:
#
# _docname_role
# -------------
# Create a role which returns a specified part of the `docname <http://www.sphinx-doc.org/en/stable/extdev/envapi.html#sphinx.environment.BuildEnvironment.docname>`_ (the path to the current document). Syntax: ``:docname:`attr``` returns the ``attr`` method of the docname as a `Path <https://docs.python.org/3/library/pathlib.html#methods-and-properties>`_. For example, ``:docname:`name``` would return the name of the current docname_.
#
# This function returns a tuple of two values:
#
# 0. A list of nodes which will be inserted into the document tree at the point where the interpreted role was encountered (can be an empty list).
# #. A list of system messages, which will be inserted into the document tree immediately after the end of the current block (can also be empty).
def _docname_role(
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
    content=[]):

    # See https://doughellmann.com/blog/2010/05/09/defining-custom-roles-in-sphinx/.
    env = inliner.document.settings.env
    try:
        # Invoke
        p = Path(env.docname)
        # Return p.<text> using `getattr <https://docs.python.org/3/library/functions.html#getattr>`_.
        path_component = str(getattr(p, text, p))
    except Exception as e:
        # Report an error.
        msg = inliner.reporter.error(
            'Invalid path component {}: {}'.format(text, e), line=lineno
        )
        prb = inliner.problematic(rawtext, rawtext, msg)
        return [prb], [msg]
    # Create a reference to the underlying source file. Typical node structure:
    #
    # .. code-block:: guess
    #
    #   <reference name="link text" refuri="../link.html">
    #       link text
    #   </reference>
    #   <target ids="['link-text']" names="['link text']" refuri="../link.html"/>
    #
    # For simplicity, I omit the target and just insert the reference. The source HTML is created from `Pygments source`_.
    refuri = str(Path(env.docname).name) + '-source.html'
    return [nodes.reference(rawtext, path_component, refuri=refuri, **options)], []
#
# setup
# =====
# Register these additions with Sphinx.
def setup(
  # Sphinx application context.
  app):

    # This depends on `CodeChat <https://pythonhosted.org/CodeChat/README.html>`_.
    app.setup_extension('CodeChat.CodeToRestSphinx')

    # See http://www.sphinx-doc.org/en/stable/extdev/appapi.html#sphinx.application.Sphinx.add_role.
    app.add_role('alink', _alink_role)
    app.add_role('docname', _docname_role)

    # See http://www.sphinx-doc.org/en/stable/extdev/appapi.html#sphinx.application.Sphinx.add_transform.
    app.add_transform(ExternalAnchorTargets)

    # See http://www.sphinx-doc.org/en/stable/extdev/appapi.html#sphinx.application.Sphinx.add_directive.
    app.add_directive('lp_build', _LpBuildButtonDirective)

    app.add_autoversioned_javascript('lp.js')
    app.add_autoversioned_javascript('gas.js')
    app.add_javascript('https://hypothes.is/embed.js')

    # Use the `source-read <http://sphinx-doc.org/extdev/appapi.html#event-source-read>`_
    # event hook to replace solutions with textareas before Sphinx processes it.
    app.connect('source-read', _source_read)
    # See http://www.sphinx-doc.org/en/stable/extdev/appapi.html#event-doctree-resolved.
    app.connect('doctree-resolved', _doctree_resolved)

    # Save Sphinx build info for use in other applications (web server, build system, etc.)
    with open(SPHINX_CONFIG_NAME, 'w', encoding='utf-8') as f:
        f.write(json.dumps({
            'SPHINX_SOURCE_PATH': str(Path(app.srcdir).relative_to(Path.cwd())),
            'SPHINX_OUT_PATH': str(Path(app.outdir).relative_to(Path.cwd())),
        }))

    # Return `extension metadata <http://sphinx-doc.org/extdev/index.html>`_.
    return {'version' : '0.0.1',
            'parallel_read_safe' : True }
