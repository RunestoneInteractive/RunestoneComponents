import json
from json2xml import json2xml
from json2xml.utils import readfromstring
import sys
import os

if len(sys.argv) < 2:
    print("Usage: dist2xml.py version_number [cdn_url]")
    print("    version_number should match the latest version of runestone components")
    print("    cdn_url defaults to https://runestone.academy/cdn/runestone")
    print("    The environment variable COMPDIR can be set to the root of RunestoneComponents")
    print("    Otherwise you are best off running this command from the root of the RunestoneComponents distribution")
    sys.exit(1)

if "COMPDIR" in os.environ:
    data_path = os.path.join(os.environ["COMPDIR"], "runestone/dist")
else:
    print("Warning: No COMPDIR environment variable set using . for RunestoneComponents")
    data_path = "runestone/dist"

data = json.loads(
    open(os.path.join(data_path, "webpack_static_imports.json")).read())

if sys.argv[1] == "test":
    data['cdn-url'] = sys.argv[2] if len(sys.argv) > 2 else "_static/"
else:
    print("Warning: You did not specify a URL for the cdn will use Runestone.Academy")
    data['cdn-url'] = "https://runestone.academy/cdn/runestone/"

data['version'] = sys.argv[1]

with open(os.path.join(data_path, "webpack_static_imports.xml"), "w") as f:
    f.write(json2xml.Json2xml(data).to_xml())
