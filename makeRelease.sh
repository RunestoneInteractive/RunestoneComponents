#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "Usage:  makeRelease <release no>"
    exit
fi

while true; do
read -p "Did you update/commit the version in setup.py" yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

rm dist/*
source ~/Environments/rune2/bin/activate
python setup.py sdist bdist_wheel
deactivate

source ~/Environments/rune3/bin/activate
python setup.py bdist_wheel

python setup.py register -r pypi
twine upload dist/*

echo "tagging this release and pushing to github"

/usr/local/bin/git tag -a $1 -m 'tag new version'
/usr/local/bin/git push --tags
