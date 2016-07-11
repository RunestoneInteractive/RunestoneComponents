#!/usr/bin/env bash

testhome=`pwd`
cd runestone/activecode/test
runestone build --all
runestone serve --port 8081 &
python test_activecode.py
cd $testhome
kill %1
