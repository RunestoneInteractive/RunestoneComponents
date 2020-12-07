# ********************************************************
# |docname| - Add question numbers to Runestone components
# ********************************************************
# Question numbers are prefixed with the current section of the document. These section numbers aren't computed until the doctree is resolved, so the question numbers can't be determined until then.
#
# Import
# ======
# Third-party
from docutils import nodes

# Local
from .runestonedirective import RunestoneIdNode
from ..server.componentdb import addQNumberToDB


# Code
# ====
# After the section numbers are available from the TOC tree, determine the section number for each Runestone component with an ID.
def _insert_qnum(app, doctree, docname):
    toc = app.env.toc_secnumbers.get(docname, {})

    # Return the section number tuple for the given ``section_ref`` if it exists, or None if not.
    def get_secnum_tuple(section_ref):
        # The Sphinx TOC structure is::
        #
        #   Dict[docname: str,
        #       Dict[ref: str, secnum_tuple: Tuple[int, ...]
        #   ]
        #
        # where a ``ref`` of ``''`` provides a tuple for the document as a whole.

        return toc.get(section_ref)

    # Set the current section number to the section for the overall document, if it's available; otherwise, use no number (an empty tuple).
    current_secnum_tuple = get_secnum_tuple("") or tuple()

    current_question_number = 1
    for node in doctree.traverse():
        if isinstance(node, nodes.section):
            # To create a reference for a section node, I used this string, which was taken from ``sphinx.environment.collectors.toctree.TocTreeCollector.process_doc.build_toc``.
            new_secnum_tuple = get_secnum_tuple('#' + node['ids'][0])
            # Question numbering restarts at the beginning of each numbered section; otherwise, continue to existing numbering through unnumbered sections.
            if new_secnum_tuple:
                current_secnum_tuple = new_secnum_tuple
                current_question_number = 1
        elif isinstance(node, RunestoneIdNode):
            question_number_tuple = current_secnum_tuple + (current_question_number, )
            question_number_str = ".".join(map(str, question_number_tuple))
            # Update the database.
            addQNumberToDB(app, node, question_number_str)
            div_id = node.runestone_options["divid"]
            node.runestone_options["question_label"] = question_number_str
            # Prepare to number the next question.
            current_question_number += 1
        else:
            pass
