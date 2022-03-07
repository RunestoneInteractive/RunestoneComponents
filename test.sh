#!/bin/bash
cd ~/code/regex
npm run build
cd ~/code/RunestoneComponents
cp ~/code/regex/packages/horizontal-parsons/horizontal-parsons.js ~/code/RunestoneComponents/runestone/hparsons/js/horizontal-parsons.js
npm run build
pip install .
cd runestone/hparsons/test
runestone build
runestone serve