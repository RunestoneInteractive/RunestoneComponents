#!/usr/bin/env python3

# Just a quick wrapper around what is in runestone utils to make it easier to do a full build
# of a PreTeXt book outside of docker
import os
import subprocess
import sys
import pathlib
from runestone.server.utils import _build_ptx_book

p = pathlib.Path.cwd()

if len(sys.argv) < 2:
    if (p / "project.ptx").exists():  # we are in a pretext project
        print(f"Building {p.name} in place")
        bookname = p.name
    else:
        print("You must either name a book or be in the book's folder")
        exit(-1)

elif p.name != sys.argv[1] and "BOOK_PATH" in os.environ:
    print("Not in the right folder")
    newp = pathlib.Path(os.environ["BOOK_PATH"], sys.argv[1])
    print(f"Trying to change to {newp}")
    if newp.exists():
        os.chdir(newp)
        bookname = sys.argv[1]
    else:
        print(f"{newp} does not exist")
        print("Build Failed")
        exit(-1)


class Config:
    def __init__(self):
        conf = os.environ.get("WEB2PY_CONFIG", "production")
        if conf == "production":
            self.dburl = os.environ.get("DBURL")
        elif conf == "development":
            self.dburl = os.environ.get("DEV_DBURL")
        elif conf == "test":
            self.dburl = os.environ.get("TEST_DBURL")
        else:
            print("Incorrect WEB2PY_CONFIG")


config = Config()
assert bookname

res = _build_ptx_book(config, False, "runestone-manifest.xml", bookname)
if not res:
    print("build failed")
    exit(-1)

res = subprocess.run(f"chgrp -R www-data .", shell=True, capture_output=True)
if res.returncode != 0:
    print("failed to change group")
    exit(-1)
res = subprocess.run(f"chmod -R go+rw .", shell=True, capture_output=True)
if res.returncode != 0:
    print("failed to change permissions")
    exit(-1)
