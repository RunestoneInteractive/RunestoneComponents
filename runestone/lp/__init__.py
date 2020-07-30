# ********************************
# |docname| - LP module definition
# ********************************
from runestone.lp import inlinesyntaxhighlight, lp


# Initialize both extensions.
def setup(app):
    inlinesyntaxhighlight.setup(app)
    return lp.setup(app)
