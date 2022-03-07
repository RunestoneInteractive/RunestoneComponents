#!/bin/bash
# cd ~/code/regex
# npm run build
# cp ~/code/regex/packages/horizontal-parsons/horizontal-parsons.js ~/code/RunestoneComponents/runestone/hparsons/js/horizontal-parsons.js
cd ~/RunestoneComponents
npm run build
pip install .
cd runestone/hparsons/test
runestone build
runestone serve