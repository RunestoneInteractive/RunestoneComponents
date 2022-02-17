#!/bin/bash
cd ~/code/regex
npm run build
cd ~/code/RunestoneComponents
cp ~/code/regex/packages/regex-element/regex-element.js ~/code/RunestoneComponents/runestone/hparsons/js/regex-element.js
npm run build
pip install .
cd runestone/hparsons/test
runestone build
runestone serve