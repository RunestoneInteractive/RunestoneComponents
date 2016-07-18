#!/usr/bin/env bash

set -e
testhome=`pwd`
cd runestone/activecode/test
runestone build --all
runestone serve --port 8081 &
python test_activecode.py
cd $testhome
kill %1
exit 0
