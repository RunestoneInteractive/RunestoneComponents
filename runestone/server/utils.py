import pdb
import click
import subprocess
import sys
import os
from pathlib import Path
import xml.etree.ElementTree as ET
from xml.etree import ElementInclude
from sqlalchemy import create_engine
from sqlalchemy.exc import IntegrityError
from runestone.pretext.chapter_pop import manifest_data_to_db


def _build_runestone_book(course):
    try:
        if os.path.exists("pavement.py"):
            sys.path.insert(0, os.getcwd())
            from pavement import options, dest, project_name
        else:
            click.echo(
                "I can't find a pavement.py file in {} you need that to build".format(
                    os.getcwd()
                )
            )
            exit(1)
    except ImportError as e:
        click.echo("You do not appear to have a good pavement.py file.")
        print(e)
        exit(1)

    if project_name != course:
        click.echo(
            "Error: {} and {} do not match.  Your course name needs to match the project_name in pavement.py".format(
                course, project_name
            )
        )
        exit(1)

    res = subprocess.call("runestone build --all", shell=True)
    if res != 0:
        click.echo("building the book failed, check the log for errors and try again")
        exit(1)
    click.echo("Build succeedeed... Now deploying to published")
    if dest != "./published":
        click.echo(
            "Incorrect deployment directory.  dest should be ./published in pavement.py"
        )
        exit(1)

    res = subprocess.call("runestone deploy", shell=True)
    if res == 0:
        click.echo("Success! Book deployed")
    else:
        click.echo("Deploy failed, check the log to see what went wrong.")


def _build_ptx_book(config, gen, manifest, course):
    if not os.path.exists("project.ptx"):
        click.echo("PreTeXt books need a project.ptx file")
        sys.exit(1)
    else:
        main_file = check_project_ptx()
        tree = ET.parse(main_file)
        root = tree.getroot()
        ElementInclude.include(root, base_url=main_file)  # include all xi:include parts
        if gen:
            res = subprocess.call("pretext generate web")
            if res != 0:
                click.echo("Failed to build")
            # build the book
        res = subprocess.call("pretext build runestone", shell=True)
        if res != 0:
            click.echo("Building failed")
            sys.exit(1)
            # process the manifest
        el = root.find("./docinfo/document-id")
        if el is not None:
            cname = el.text
            if cname != course:
                click.echo(
                    f"Error course: {course} does not match document-id: {cname}"
                )
                sys.exit(1)
        else:
            click.echo("Missing document-id please add to <docinfo>")
            sys.exit(1)

        mpath = Path(os.getcwd(), "published", cname, manifest)
        process_manifest(cname, mpath)
        # Fetch and copy the runestone components release as advertised by the manifest
        # - Use wget to get all the js files and put them in _static
        click.echo("populating with the latest runestone files")
        populate_static(config, mpath, course)
        # update the library page
        click.echo("updating library...")
        update_library(config, mpath, course)


def process_manifest(cname, mpath):
    click.echo("processing manifest...")
    if os.path.exists(mpath):
        manifest_data_to_db(cname, mpath)
    else:
        raise IOError(
            f"You must provide a valid path to a manifest file: {mpath} does not exist."
        )


def check_project_ptx():
    tree = ET.parse("project.ptx")
    targ = tree.find(".//target[@name='runestone']")
    if not targ:
        click.echo("No runestone target in project.ptx - please add one")
        sys.exit(1)
    else:
        dest = targ.find("./output-dir")
        if "published" not in dest.text:
            click.echo("destination for build must be in published/<document-id>")
            sys.exit(1)
        main = targ.find("./source")
        if main is not None:
            return main.text
        else:
            click.echo("No main source file specified")
            sys.exit(1)


def extract_docinfo(tree, string, attr=None):
    el = tree.find(f"./{string}")
    if attr is not None and el is not None:
        print(f"{el.attrib[attr]=}")
        return el.attrib[attr].strip()

    if el is not None:
        # using method="text" will strip the outer tag as well as any html tags in the value
        return ET.tostring(el, encoding="unicode", method="text").strip()
    return ""


def update_library(config, mpath, course):
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
        sys.exit()

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


def populate_static(config, mpath: Path, course: str):

    # <runestone-services version="6.2.1"/>
    sdir = mpath.parent / "_static"
    current_version = ""
    if (sdir / "webpack_static_imports.xml").exists():
        tree = ET.parse(sdir / "webpack_static_imports.xml")
        current_version = tree.find("./version").text
    else:
        sdir.mkdir(mode=775, exist_ok=True)
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
        subprocess.call(
            f"""wget -nv -r -np -nH -nd -P {sdir} https://runestone.academy/cdn/runestone/{version}/
    """,
            shell=True,
        )
    else:
        click.echo(f"_static files already up to date for {version}")
