# *******************************************
# |docname| - reusable functions for rsmanage
# *******************************************
# These functions are used by the rsmanage command in RunestoneServer as well as
# by the AuthorServer in its Celery worker tasks.  There may be other places that
# find these utils handy as well.
#
#
# Imports
# =======
# These are listed in the order prescribed by `PEP 8`_.
#
# Standard library
# ----------------

import os
import subprocess
import sys
from pathlib import Path

# Third Party
# -----------
import click
import lxml.etree as ET
from lxml import ElementInclude
from sqlalchemy import create_engine
from sqlalchemy.exc import IntegrityError

# Local packages
# --------------
from runestone.pretext.chapter_pop import manifest_data_to_db


# Build a Runestone Book
# ----------------------
def _build_runestone_book(course, click=click):
    """
    Parameters:
    course: the name of the course to build.
    click: default is the click module otherwise an object that has an echo method
    """
    try:
        if os.path.exists("pavement.py"):
            # Since this may be used in a long running process (see AuthorServer/worker)
            # using import is a bad idea, exec can be dangerous as well
            paver_vars = {}
            exec(open("pavement.py").read(), paver_vars)
        else:
            click.echo(
                "I can't find a pavement.py file in {} you need that to build".format(
                    os.getcwd()
                )
            )
            return False
    except ImportError as e:
        click.echo("You do not appear to have a good pavement.py file.")
        print(e)
        return False

    if paver_vars["project_name"] != course:
        click.echo(
            "Error: {} and {} do not match.  Your course name needs to match the project_name in pavement.py".format(
                course, paver_vars["project_name"]
            )
        )
        return False
    click.echo("Running runestone build --all")
    res = subprocess.run("runestone build --all", shell=True, capture_output=True)
    with open("cli.log", "wb") as olfile:
        olfile.write(res.stdout)
        olfile.write(b"\n====\n")
        olfile.write(res.stderr)

    if res.returncode != 0:
        click.echo(
            f"building the book failed {res}, check the log for errors and try again"
        )
        return False
    click.echo("Build succeedeed... Now deploying to published")
    if paver_vars["dest"] != "./published":
        click.echo(
            "Incorrect deployment directory.  dest should be ./published in pavement.py"
        )
        return False

    resd = subprocess.run("runestone deploy", shell=True, capture_output=True)
    with open("cli.log", "ab") as olfile:
        olfile.write(res.stdout)
        olfile.write(b"\n====\n")
        olfile.write(res.stderr)
    if resd.returncode == 0:
        click.echo("Success! Book deployed")
        return True
    else:
        click.echo("Deploy failed, check the log to see what went wrong.")
        return False


# Build a PreTeXt Book
# --------------------
def _build_ptx_book(config, gen, manifest, course, click=click):
    """
    Parameters:
    config : This originated as a config object from click -- a mock config will be provided by the AuthorServer
    gen: A flag to indicate whether or not we should build static assets
    manifest: the name of the manifest file
    course: the name of the course to build.
    click: default is the click module otherwise an object that has an echo method
    """
    if not os.path.exists("project.ptx"):
        click.echo("PreTeXt books need a project.ptx file")
        return False
    else:
        click.echo("Checking files")
        main_file = check_project_ptx()
        if not main_file:
            return False
        # parse the main file, but this does not resolve any xi:includes
        tree = ET.parse(main_file)
        # The next two lines are needed to parse the entire tree
        root = tree.getroot()
        ElementInclude.include(root, base_url=main_file)  # include all xi:include parts
        if gen:
            res = subprocess.call("pretext generate", shell=True)
            if res != 0:
                click.echo("Failed to build")
            # build the book
        click.echo("Building for Runestone")
        res = subprocess.call("pretext build runestone", shell=True)
        if res != 0:
            click.echo("Building failed")
            return False
            # process the manifest
        el = root.find("./docinfo/document-id")
        if el is not None:
            cname = el.text
            if cname != course:
                click.echo(
                    f"Error course: {course} does not match document-id: {cname}"
                )
                return False
        else:
            click.echo("Missing document-id please add to <docinfo>")
            return False

        mpath = Path(os.getcwd(), "published", cname, manifest)
        click.echo("Processing Manifest")
        process_manifest(cname, mpath)
        # Fetch and copy the runestone components release as advertised by the manifest
        # - Use wget to get all the js files and put them in _static
        click.echo("populating with the latest runestone files")
        populate_static(config, mpath, course)
        # update the library page
        click.echo("updating library...")
        update_library(config, mpath, course)
        return True


# Support Functions
# -----------------


def process_manifest(cname, mpath, click=click):
    """
    cname - the name of the course
    mpath - path to the runestone-manifest.xml file

    Setup this book in the database and populate the questions table as well as
    The chapter and subchapter tables.
    """
    click.echo("processing manifest...")
    if os.path.exists(mpath):
        manifest_data_to_db(cname, mpath)
    else:
        raise IOError(
            f"You must provide a valid path to a manifest file: {mpath} does not exist."
        )


def check_project_ptx(click=click):
    """
    Verify that the PreTeXt project is set up for a Runestone build

    Returns: Name of the main project file.

    1. Is there a runestone target in project.ptx?
    2. Is the output dir set to published/basecourse
    3. Is the top level source file set properly
    4. TODO: Is the publisher file set (and present)

    """
    tree = ET.parse("project.ptx")
    targ = tree.find(".//target[@name='runestone']")
    if not targ:
        click.echo("No runestone target in project.ptx - please add one")
        return False
    else:
        dest = targ.find("./output-dir")
        if "published" not in dest.text:
            click.echo("destination for build must be in published/<document-id>")
            return False
        main = targ.find("./source")
        if main is not None:
            return main.text
        else:
            click.echo("No main source file specified")
            return False


def extract_docinfo(tree, string, attr=None, click=click):
    """
    Parameters:
    tree: The parsed document tree from ET
    string: The name of the element we are looking for
    Helper to get the contents of several tags from the docinfo element of a PreTeXt book
    """
    el = tree.find(f"./{string}")
    if attr is not None and el is not None:
        print(f"{el.attrib[attr]=}")
        return el.attrib[attr].strip()

    if el is not None:
        # using method="text" will strip the outer tag as well as any html tags in the value
        return ET.tostring(el, encoding="unicode", method="text").strip()
    return ""


def update_library(config, mpath, course, click=click):
    """
    Parameters:
    config : This originated as a config object from click -- a mock config will be provided by the AuthorServer
    mpath: Path to the runestone-manifest file which containes the library metadata
    course: the name of the course we are buildingn

    Update the library table using meta data from the book

    Returns: Nothing
    """
    tree = ET.parse(mpath)
    docinfo = tree.find("./library-metadata")
    eng = create_engine(config.dburl)
    title = extract_docinfo(docinfo, "title")
    subtitle = extract_docinfo(docinfo, "subtitle")
    description = extract_docinfo(docinfo, "blurb")
    shelf = extract_docinfo(docinfo, "shelf")
    click.echo(f"{title} : {subtitle}")
    try:
        res = eng.execute(f"select * from library where basecourse = '{course}'")
    except:
        click.echo("Missing library table?  You may need to run an alembic migration.")
        return False

    if res.rowcount == 0:
        eng.execute(
            f"""insert into library 
        (title, subtitle, description, shelf_section, basecourse ) 
        values('{title}', '{subtitle}', '{description}', '{shelf}', '{course}') """
        )
    else:
        eng.execute(
            f"""update library set
            title = '{title}',
            subtitle = '{subtitle}',
            description = '{description}',
            shelf_section = '{shelf}'
        where basecourse = '{course}'
        """
        )
    return True


def populate_static(config, mpath: Path, course: str, click=click):
    """
    Copy the apropriate Javascript to the _static folder for PreTeXt books.  This may
    involve downloading it from the Runestone CDN.  PreTeXt does not include the current set
    of javascript files like the Runestone components release does, instead we supply it
    on runestone.academy/cdn/runestone so it can be used for generic html builds as well as
    builds on runestone.academy.
    """
    # <runestone-services version="6.2.1"/>
    sdir = mpath.parent / "_static"
    current_version = ""
    if (sdir / "webpack_static_imports.xml").exists():
        tree = ET.parse(sdir / "webpack_static_imports.xml")
        current_version = tree.find("./version").text
    else:
        sdir.mkdir(mode=0o775, exist_ok=True)  # NB mode must be in Octal!
    tree = ET.parse(mpath)
    el = tree.find("./runestone-services[@version]")
    version = el.attrib["version"].strip()
    # Do not download if the versions already match.
    if version != current_version:
        click.echo(f"Fetching {version} files to {sdir} ")
        for f in os.listdir(sdir):
            try:
                os.remove(sdir / f)
            except:
                click.echo(f"ERROR - could not delete {f}")
        # call wget non-verbose, recursive, no parents, no hostname, no directoy copy files to sdir
        # trailing slash is important or otherwise you will end up with everything below runestone
        res = subprocess.call(
            f"""wget -nv -r -np -nH -nd -P {sdir} https://runestone.academy/cdn/runestone/{version}/
    """,
            shell=True,
        )
        if res != 0:
            click.echo("wget of runestone files failed")
            return False
    else:
        click.echo(f"_static files already up to date for {version}")
    return True
