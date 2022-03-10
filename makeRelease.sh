#!/bin/bash
# *********
# |docname|
# *********

set -e

if [ $# -eq 0 ]
  then
    echo "Usage:  makeRelease <release no>"
    exit
fi

while true; do
read -p "Did you update/commit the version in setup.py " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

rm -f dist/*
npm run dist
python setup.py sdist
pip wheel --no-index --no-deps --global-option bdist_wheel  --wheel-dir dist dist/*.tar.gz


twine check dist/*
twine upload dist/*

echo "tagging this release and pushing to github"

git tag -a $1 -m 'tag new version'
git push --follow-tags


if [ -d ~/.virtualenvs/json2xml ] 
  then

    echo "Creating dist for PreTeXt"
    source ~/.virtualenvs/json2xml/bin/activate
    python dist2xml.py $1 > runestone/dist/webpack_static_imports.xml
    cd runestone
    tar zcf dist-$1.tgz dist
  else
    echo "Warning: no json2xml ve found skipping pretext"
fi


