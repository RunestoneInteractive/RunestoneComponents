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

    def get_secnum_tuple(section_ref, current_secnum_tuple_):
        # The Sphinx TOC structure is::
        #
        #   Dict[docname: str,
        #       Dict[ref: str, secnum_tuple: Tuple[int, ...]
        #   ]
        #
        # where a ``ref`` of ``''`` provides a tuple for the document as a whole.
        #
        # Not all section references will have an associated number. Return the current section if it was numbered and not None; otherwise, current the existing section number.
        return toc.get(section_ref, current_secnum_tuple_) or current_secnum_tuple_

    # Set the current section number to the section for the overall document, if it's available.
    current_secnum_tuple = get_secnum_tuple("", tuple())

    current_question_number = 1
    for node in doctree.traverse():
        if isinstance(node, nodes.section):
            # To create a reference for a section node, I used this string, which was taken from ``sphinx.environment.collectors.toctree.TocTreeCollector.process_doc.build_toc``.
            current_secnum_tuple = get_secnum_tuple('#' + node['ids'][0], current_secnum_tuple)
            # Question numbering restarts at the beginning of each section.
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
