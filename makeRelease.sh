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
read -p "Did you update/commit the version in pyproject.toml " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

echo "Building webpack bundle"
npm run dist

echo "building python package"
poetry build
poetry publish
 
echo "tagging this release and pushing to github"

git tag -a $1 -m 'tag new version'
git push --follow-tags
gh release create v$1 --generate-notes

if [ -d ~/.virtualenvs/json2xml ] 
  then

    echo "Creating dist for PreTeXt"
    source ~/.virtualenvs/json2xml/bin/activate
    python scripts/dist2xml.py $1 
    cd runestone
    tar --strip-components 1 -zcf dist-$1.tgz dist/*
    echo "Installing release on CDN"
    scp dist-$1.tgz balance.runestoneacademy.org:~/
    ssh balance.runestoneacademy.org /home/bmiller/bin/install_release.sh $1
    mv dist-$1.tgz ../jsdist
    cp dist/webpack_static_imports.xml ~/Pretext/pretext/xsl/support/runestone-services.xml 
    cp dist/webpack_static_imports.xml ~/.ptx/xsl/support/runestone-services.xml 
  else
    echo "Warning: no json2xml ve found skipping pretext"
fi
