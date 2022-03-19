import json
from json2xml import json2xml
from json2xml.utils import readfromstring
import sys

data = json.loads(open("runestone/dist/webpack_static_imports.json").read())
data['version'] = sys.argv[1]
#data = readfromstring()
print(json2xml.Json2xml(data).to_xml())
