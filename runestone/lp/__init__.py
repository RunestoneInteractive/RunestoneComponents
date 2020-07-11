# ********************************
# |docname| - LP module definition
# ********************************
from runestone.lp import inlinesyntaxhighlight, lp

# Register the for loop directive with Sphinx.
from runestone.lp import for_loop  # NOQA: F401


# Initialize both extensions.
def setup(app):
    inlinesyntaxhighlight.setup(app)
    return lp.setup(app)
