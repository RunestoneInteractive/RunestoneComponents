#!/bin/bash

if ((  $# < 1  )); then
   echo "please provide version number"
   exit
fi

source ~/.virtualenvs/compdev39/bin/activate
npm run dist
source ~/.virtualenvs/json2xml/bin/activate
python scripts/dist2xml.py $@ > runestone/dist/webpack_static_imports.xml
cd runestone
tar zcf dist-$1.tgz dist
deactivate
