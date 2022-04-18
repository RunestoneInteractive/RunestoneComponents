import json
from json2xml import json2xml
from json2xml.utils import readfromstring
import sys
import os

if "COMPDIR" in os.environ:
    data_path = os.path.join(os.environ["COMPDIR"], "runestone/dist")
else:
    data_path = ""

data = json.loads(
    open(os.path.join(data_path, "webpack_static_imports.json")).read())

if sys.argv[1] == "test":
    data['cdn-url'] = sys.argv[2] if len(sys.argv) > 2 else "_static/"
else:
    data['cdn-url'] = "https://runestone.academy/cdn/runestone/"

data['version'] = sys.argv[1]

with open(os.path.join(data_path, "webpack_static_imports.xml"), "w") as f:
    f.write(json2xml.Json2xml(data).to_xml())
