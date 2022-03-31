# **************************************
# |docname| - A for loop for Sphinx/reST
# **************************************
# This provides a simple for loop for Sphinx/reST.
#
# Imports
# =======
# These are listed in the order prescribed by `PEP 8
# <http://www.python.org/dev/peps/pep-0008/#imports>`_.
#
# Standard library
# ----------------
# None.
#
# Third-party imports
# -------------------
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
from docutils import nodes
from docutils.statemachine import StringList

# Local application imports
# -------------------------
# None.


class ForLoop(Directive):
    # The required argument is the first parameter to ``range``.
    required_arguments = 1
    # The optional arguments are the second and third parameter to ``range``.
    optional_arguments = 2
    # Per http://docutils.sourceforge.net/docs/howto/rst-directives.html, True if content is allowed. However, this isn't checked or enforced.
    has_content = True

    def __init__(self, *args, **kwargs):
        super(ForLoop, self).__init__(*args, **kwargs)

    def run(self):
        # Create and error-check the range.
        try:
            _range = range(*[int(arg) for arg in self.arguments])
        except Exception as e:
            raise self.error("Invalid arguments to range: {}".format(e))

        # Run the for loop over all this directive's content. Docutils expects a StringList, so use that.
        loop_content = StringList()
        for loop_index in _range:
            # Loop over each line of the content, only replacing lines in the content of this directive.
            for source, offset, value in self.content.xitems():
                loop_content.append(
                    value.format(loop_index, *self.arguments), source, offset
                )

            # Add an additional newline between loop iterations.
            loop_content.append("\n", "for-loop", 0)

        # Parse the resulting content and return it.
        node = nodes.container()
        self.state.nested_parse(loop_content, self.content_offset, node)
        return [node]


directives.register_directive("for-loop", ForLoop)
