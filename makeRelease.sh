#!/bin/bash

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

rm dist/*

#source ~/.virtualenvs/runedev/bin/activate
python setup.py sdist
pip wheel --no-index --no-deps --global-option bdist_wheel  --wheel-dir dist dist/*.tar.gz
#pip3 wheel --no-index --no-deps --global-option bdist_wheel  --wheel-dir dist dist/*.tar.gz

#python setup.py register -r pypi
twine upload dist/*

echo "tagging this release and pushing to github"

git tag -a $1 -m 'tag new version'
git push --follow-tags
