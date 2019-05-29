import sys
from runestone.lp import inlinesyntaxhighlight

# Initialize both extensions.
def setup(app):
    inlinesyntaxhighlight.setup(app)
    # The LP extension requires Python 3.
    if sys.version_info >= (3, 3):
        from runestone.lp import lp
        return lp.setup(app)
