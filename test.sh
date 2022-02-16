#!/bin/bash
npm run build
pip install .
cd runestone/hparsons/test
runestone build
runestone serve