#!/usr/bin/env bash

set -e
testhome=`pwd`
port=8081
for t in 'activecode' 'poll' 'question'; do
    cd runestone/$t/test
    runestone build --all
    runestone serve --port $port &
    SERVE_PID=$!
    echo "Running test_${t}.py" $port
    set -x
    python "test_${t}.py"
    if [ $? -ne 0 ]; then
        echo "Test failed"
        pgrep -lf '.*runestone serve.*' | awk '{ print $1 }' | xargs kill
        exit 1
    else
        echo "killing server" $SERVE_PID
        kill $SERVE_PID
    fi
    set -e
    cd $testhome
    #port=$((port+1))
done

exit 0
