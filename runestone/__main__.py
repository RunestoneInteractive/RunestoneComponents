# *********
# |docname|
# *********
import sys
import os
import shutil
import getpass
import six
import click
import pathlib
import re
from paver.easy import sh
from pkg_resources import resource_string, resource_filename, require
from .pretext.chapter_pop import manifest_data_to_db
import codecs

if len(sys.argv) == 2:
    if "--version" in sys.argv:
        version = require("runestone")[0].version
        print("Runestone version {}".format(version))
        sys.exit()


@click.group(chain=True)
@click.option("--version", is_flag=True, help="More print version and exit")
def cli(version):
    """
    Usage: runestone [--version] subcommand

    """
    if version:
        version = require("runestone")[0].version
        print("Runestone version {}".format(version))
        sys.exit()


@cli.command()
def init():
    template_base_dir = resource_filename("runestone", "common/project_template")
    config_stuff = resource_string("runestone", "common/project_template/conf.tmpl")
    paver_stuff = resource_string("runestone", "common/project_template/pavement.tmpl")
    conf_dict = {}
    print("This will create a new Runestone project in your current directory.")
    click.confirm("Do you want to proceed? ", abort=True, default=True)
    print(
        "Next we need to gather a few pieces of information to create your configuration files"
    )
    conf_dict["dynamic_pages"] = click.prompt(
        "Build book for dynamic page service?", type=bool, default=False
    )
    if conf_dict["dynamic_pages"] == False:
        conf_dict["use_services"] = click.prompt(
            "Use Runestone Web Services ", default="false"
        )
    else:
        conf_dict["use_services"] = "true"
    conf_dict["author"] = click.prompt("Your Name ", default=getpass.getuser())
    conf_dict["project_title"] = click.prompt(
        "Title for this project ", default="Runestone Default"
    )
    conf_dict["python3"] = click.prompt(
        "Use Simple Python3 Semantics ", default="false"
    )
    conf_dict["default_ac_lang"] = click.prompt(
        "Default ActiveCode language", default="python"
    )
    if conf_dict["use_services"] == "true":
        conf_dict[
            "project_name"
        ] = "os.path.basename(os.path.dirname(os.path.abspath(__file__)))"
        conf_dict["build_dir"] = "./build"
        conf_dict["dest"] = "./published"
        conf_dict["login_req"] = click.prompt("Require login ", default="false")
        conf_dict["master_url"] = ""
        conf_dict["log_level"] = (
            10 if click.prompt("Log student actions? ", type=bool, default=True) else 0
        )
        conf_dict["dburl"] = click.prompt(
            "DataBase Connection URL",
            default="postgresql://user:password@localhost/runestone",
        )
        conf_dict["enable_chatcodes"] = click.prompt(
            "Enable Enable the chatcode feature)", type=bool, default=False
        )
        # See the comments in ``conf.tmpl`` on server-side grading for an explanation of these conditions.
        if conf_dict["log_level"] and conf_dict["login_req"]:
            conf_dict["server_side_grading"] = click.prompt(
                "Grade questions on the server where possible?",
                type=bool,
                default=False,
            )
        else:
            conf_dict["server_side_grading"] = False
        conf_dict["allow_pairs"] = click.prompt(
            "Enable Pair Programming feature(s)", type=bool, default=False
        )
    else:
        conf_dict["project_name"] = click.prompt("Project name: (one word, no spaces)")
        while " " in conf_dict["project_name"]:
            conf_dict["project_name"] = click.prompt(
                "Project name: (one word, NO SPACES)"
            )
        # Add quotes around the project name for use in the template.
        conf_dict["project_name"] = repr(conf_dict["project_name"])
        conf_dict["build_dir"] = click.prompt("Path to build dir ", default="./build")
        conf_dict["dest"] = click.prompt(
            "Path to deploy built site ", default="../../static"
        )
        conf_dict["login_req"] = "false"
        conf_dict["master_url"] = "http://127.0.0.1:8000"
        conf_dict["log_level"] = 0
        conf_dict["dburl"] = ""
        conf_dict["enable_chatcodes"] = "false"
        conf_dict["server_side_grading"] = False
        conf_dict["allow_pairs"] = "false"
    conf_dict["short_name"] = conf_dict["project_name"]
    conf_dict["downloads_enabled"] = click.prompt(
        "Enable inline Activecode downloads by default (single activecode downloads may be enabled with the :enabledownload: flag)",
        default="false",
    )

    shutil.copytree(os.path.join(template_base_dir, "_sources"), "_sources")
    os.makedirs(conf_dict["build_dir"])
    paver_final = paver_stuff.decode("utf-8") % conf_dict
    config_final = config_stuff.decode("utf-8") % conf_dict

    # On Windows, Python 3.6, the bytes read from ``template_base_dir`` and ``config_stuff`` contain Windows-style ``\n\r``. Unfortunately, `resource_string <http://setuptools.readthedocs.io/en/latest/pkg_resources.html#basic-resource-access>`_ does no universal newline support, so these remain intact. When written out, this is changed to ``\n\n``, making the file double-spaced. Python 3's `StringIO <https://docs.python.org/3/library/io.html#io.StringIO>`_ class provides universal newline support, while Python 2's `StringIO <https://docs.python.org/2/library/stringio.html#StringIO.StringIO>`__ doesn't.
    if six.PY3:
        # Per the `TextIOWrapper docs <https://docs.python.org/3/library/io.html#io.TextIOWrapper>`_, ``newline=None`` selects universal newline mode. The Python 3 StringIO_ class's ``newline`` argument works the same.
        paver_final = six.StringIO(paver_final, newline=None).read()
        config_final = six.StringIO(config_final, newline=None).read()

    with codecs.open("pavement.py", "w", encoding="utf8") as pvf:
        pvf.write(paver_final)

    with codecs.open("conf.py", "w", encoding="utf8") as pvf:
        pvf.write(config_final)

    print("Done. Type runestone build to build your project")


@cli.command()
@click.option("--all/--not-all", default=False, help="build all")
@click.option("--wd", default=None, help="change working directory before build")
def build(all, wd):
    from paver.tasks import main as paver_main

    if wd:
        os.chdir(wd)
    else:
        os.chdir(findProjectRoot())
    sys.path.insert(0, os.getcwd())
    if not pathlib.Path(resource_filename("runestone", "dist/runestone.js")).exists():
        click.echo("Error -- You are missing runestone.js please make sure")
        click.echo("you have runestone installed correctly.")
        click.echo("In a development environment run npm run build")
        sys.exit(-1)

    version = require("runestone")[0].version
    print("Building with Runestone {}".format(version))

    with open("conf.py", encoding="utf-8") as cf:
        ctext = cf.read()
        if not re.search(r"from runestone import.*(setup|script_files)", ctext):
            click.echo(
                click.style(
                    """Please update conf.py to import setup or script_files and css_files
                    from runestone. If you do not import setup you must provide your own.""",
                    fg="red",
                ),
                err=True,
                color=True,
            )
            click.echo(
                "The current line probably looks like:\nfrom runestone import runestone_static_dirs, runestone_extensions"
            )
            click.echo(
                "Change it to:\nfrom runestone import runestone_static_dirs, runestone_extensions, setup"
            )
            sys.exit(1)

    import pavement

    if not os.path.exists(pavement.options.build.builddir):
        os.makedirs(pavement.options.build.builddir)

    myargs = ["build"]
    if all:
        myargs.append("--all")

    paver_main(args=myargs)


@cli.command()
@click.option("--port", default=8000, help="port for server to listen on")
@click.option("--listen", default="", help="address for server to listen on")
def serve(port, listen):
    click.echo("Note: this is a minimal static server without templates or a database.")
    click.echo("For many use cases this is fine.")
    click.echo(
        "For the full server, see https://github.com/RunestoneInteractive/RunestoneServer"
    )
    os.chdir(findProjectRoot())
    sys.path.insert(0, os.getcwd())
    try:
        import pavement

        try:
            if pavement.dynamic_pages == True:
                click.echo(
                    click.style(
                        """Error -- dynamic_pages is True, but this preview server does not support templates.
                    Please edit pavement.py and set dynamic_pages=False""",
                        color="red",
                    ),
                    err=True,
                )
                click.echo("You should update pavement.py and rebuild")
                return
        except:
            click.echo("dynamic_pages is not defined")
    except:
        print("Error, you must be in your project root directory")
        return

    os.chdir(pavement.serving_dir)

    if six.PY2:
        import SimpleHTTPServer
        import SocketServer

        Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
        httpd = SocketServer.TCPServer((listen, port), Handler, bind_and_activate=False)
    else:
        import http.server
        import socketserver

        Handler = http.server.SimpleHTTPRequestHandler
        httpd = socketserver.TCPServer((listen, port), Handler, bind_and_activate=False)

    print("serving at port", port)
    httpd.allow_reuse_address = True
    httpd.server_bind()
    httpd.server_activate()
    sys.stderr = open("runestone.log", "a")
    httpd.serve_forever()


@cli.command()
@click.option("--dest", default="", help="destination for deploy")
def deploy(dest):
    os.chdir(findProjectRoot())
    sys.path.insert(0, os.getcwd())
    try:
        import pavement
    except ImportError as ie:
        print("Error, you must be in your project root directory")

    if not dest:
        try:
            dest = pavement.dest
        except:
            raise IOError(
                "No destination configured add dest to your pavement.py or use --dest"
            )

    click.echo("Deploying from " + pavement.serving_dir + " to " + dest)
    if os.name == "nt":
        # From ``robocopy /?``:
        #
        # /MIR  MIRror a directory tree (equivalent to /E plus /PURGE).
        #
        # /MT   Do multi-threaded copies with n threads (default 8).
        #
        # /NFL  No File List - don't log file names.
        #
        # Robocopy copies the contents of the source directory, not the source directory itself. So, append the final path of the source directory to the destination directory.
        sh(
            "robocopy /mir /mt /nfl {} {}".format(
                pavement.serving_dir,
                os.path.join(dest, os.path.basename(pavement.serving_dir)),
            ),
            ignore_error=True,
        )
    else:
        sh("rsync -rav --delete {} {}".format(pavement.serving_dir, dest))


from runestone import cmap


@cli.command(short_help="type runestone doc directive to get help on directive")
@click.option("--list", is_flag=True, help="List all commands")
@click.argument("directive", nargs=-1)
def doc(directive=None, list=None):
    """
    Show Format and all options for a runestone directive
    """
    if list:
        print("Runestone Directives List")
        print("  ", "\n   ".join(sorted(cmap.keys())))
        return

    if directive:
        directive = directive[0]
        if directive in cmap:
            print(cmap[directive].__doc__)
        else:
            print("""Unknown Directive.  Possible values are""")
            print("  ", "\n   ".join(sorted(cmap.keys())))


@cli.command(short_help="Update template files")
def update():
    """
    Update all template files

    Warning!  This is a destructive command.  If you have made local changes to your
    templates (especially and most probably layout.html) They will be moved aside
    you can merge your changes (in _templates.bak) after you run this command.
    """
    os.chdir(findProjectRoot())
    template_base_dir = resource_filename("runestone", "common/project_template")
    print("This will update all files in the _templates folder.")
    print(
        "The old _templates folder will be in _templates.bak so you can merge manually after you update"
    )
    click.confirm("Do you want to proceed? ", abort=True, default=True)
    shutil.rmtree("_templates.bak", ignore_errors=True)
    shutil.move("_templates", "_templates.bak")
    shutil.copytree(os.path.join(template_base_dir, "_templates"), "_templates")


@cli.command(short_help="Process runestone-manifest.xml file")
@click.option("--course", help="Name of the course (base course)")
@click.option(
    "--manifest",
    default="runestone-manifest.xml",
    help="path to runestone-manifest.xml file",
)
def process_manifest(course, manifest):
    """Populate a runestone database with meta data about a course created with the PreTeXt processor

    Arguments:
        course {string} -- Name of the base course
        manifest {path} -- Path to manifest file

    Raises:
        IOError: If manifest file not found
    """
    if os.path.exists(manifest):
        manifest_data_to_db(course, manifest)
    else:
        raise IOError("You must provide a valid path to a manifest file")


def main(args=None):
    if not args:
        args = sys.argv[1:]
    if not args:
        print("""Usage: runestone help for a list of commands""")
        sys.exit(0)
    cli.add_command(init)
    cli.add_command(build)
    cli.add_command(serve)
    cli.add_command(deploy)
    cli.add_command(doc)
    cli.add_command(update)
    cli()


def findProjectRoot():
    start = os.getcwd()
    prevdir = ""
    while start != prevdir:
        if os.path.exists(os.path.join(start, "pavement.py")):
            return start
        prevdir = start
        start = os.path.dirname(start)
    raise IOError("You must be in a runestone project to run runestone")


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
