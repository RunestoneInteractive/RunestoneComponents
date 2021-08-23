# *********************************
# |docname| - Runestone Module init
# *********************************
import json

from .activecode import ActiveCode
from .animation import Animation
from .blockly import Blockly
from .codelens import Codelens
from .clickableArea import ClickableArea
from .datafile import DataFile
from .disqus import DisqusDirective
from .dragndrop import DragNDrop
from .fitb import FillInTheBlank
from .groupsub import GroupSubmission
from .khanex import Khanex
from .selectquestion import SelectQuestion
from .matrixeq import MatrixEq
from .mchoice import MChoice, QuestionNumber
from .meta import Meta
from .parsons import ParsonsProblem
from .poll import Poll
from .quizly import Quizly
from .reveal import RevealDirective
from .shortanswer import JournalDirective
from .showeval import ShowEval
from .tabbedStuff import TabbedStuffDirective, TabDirective
from .timed import TimedDirective
from .video import Youtube, Vimeo, Video
from .webgldemo import WebglDemo


import os, socket, pkg_resources
import CodeChat.CodeToRest
from sphinx.errors import ExtensionError
from sphinx.builders.html import JavaScript


# TODO: clean up - many of the folders are not needed as the files are imported by webpack
#
# runestone_static_dirs()
# -----------------------
# Users can call this to get a list of all static directories in the runestone package
# normally this is just used by the `conf.py` file for building a runestone book
def runestone_static_dirs():
    basedir = os.path.dirname(__file__)
    module_static_js = [os.path.join(basedir, "dist")]
    module_static_js.append(os.path.join(basedir, "animation", "js"))
    module_static_js.append(os.path.join(basedir, "codelens", "js"))
    module_static_js.append(os.path.join(basedir, "webgldemo", "js"))
    module_static_js.append(os.path.join(basedir, "matrixeq", "js"))
    module_static_css = []
    module_static_css.append(os.path.join(basedir, "accessibility", "css"))
    module_static_css.append(os.path.join(basedir, "webgldemo", "css"))
    module_static_css.append(os.path.join(basedir, "matrixeq", "css"))
    module_static_css.append(os.path.join(basedir, "lp", "css"))
    return module_static_js + module_static_css + CodeChat.CodeToRest.html_static_path()


# runestone_extensions()
# -----------------------
# Users can call this to get a list of all extensions provided by runestone
# normally this is just used by the `conf.py` file for building a runestone book
def runestone_extensions():
    basedir = os.path.dirname(__file__)
    module_paths = [
        x for x in os.listdir(basedir) if os.path.isdir(os.path.join(basedir, x))
    ]
    modules = [
        "runestone.{}".format(x)
        for x in module_paths
        if os.path.exists("{}/__init__.py".format(os.path.join(basedir, x)))
    ]
    # Place ``runestone.common`` first, so it can run init code needed by all other modules. This assumes that the first module in the list is run first. An alternative to this to guarantee this ordering is to call ``app.setup_extension('runestone.common')`` in every extension.
    modules.insert(0, modules.pop(modules.index("runestone.common")))
    return modules


# setup_js_defer(app, pagename, templatexname, context, doctree)
# -----------------------
# Used to inspect js right before it is rendered to page so that
# we can forcibly defer js files or prevent same
def setup_js_defer(app, pagename, templatexname, context, doctree):
    def js_defer(script_files):
        for js in sorted(script_files):
            if app.config.html_defer_js:
                # Files added from Runestone should already have defer set - so just add it to sphinx based ones
                to_defer = [
                    "_static/jquery.js",
                    "_static/underscore.js",
                    "_static/doctools.js",
                ]
                if isinstance(js, JavaScript) and js in to_defer:
                    js.attributes["defer"] = ""
            else:
                # config flag not set, prevent all deferrals
                if isinstance(js, JavaScript):
                    js.attributes.pop("defer", None)
        return ""

    context["js_defer"] = js_defer


# setup(app)
# ----------
def setup(app):
    """
    A normal Runestone project will import this function into its conf.py
    This setup will run after all of the extensions, so it is a good place
    for us to include our common javascript and css files.
    This could be expanded if there is additional initialization or customization
    we wanted to do for all projects.
    """
    # Include JS and CSS produced by webpack. See `webpack static imports <webpack_static_imports>`_.
    with open(
        pkg_resources.resource_filename(
            "runestone", "dist/webpack_static_imports.json"
        ),
        "r",
        encoding="utf-8",
    ) as f:
        wb_imports = json.load(f)
        script_files = wb_imports["js"]
        _css_files = css_files + wb_imports["css"]

    for jsfile in script_files:
        try:
            app.add_autoversioned_javascript(jsfile, defer="")
        except ExtensionError:
            app.add_js_file(jsfile, defer="")
    for cssfile in _css_files:
        try:
            app.add_autoversioned_stylesheet(cssfile)
        except ExtensionError:
            app.add_css_file(cssfile)

    # projects can define their own custom css or js files to include
    # But since this is imported into their conf.py authors must
    # define them as attributes of the setup function
    # ``setup.custom_xxx_files``
    try:
        for c in setup.custom_css_files:
            app.add_css_file(c)
        print("Adding custom CSS files")
    except AttributeError:
        print("No custom CSS files")
    try:
        for c in setup.custom_js_files:
            if isinstance(c, dict):
                # peel off filename, pass rest of key/values on as kwargs
                filename = c.pop("file")
                app.add_autoversioned_javascript(filename, **c)
            else:
                app.add_autoversioned_javascript(c)
        print("Adding custom Javascript")
    except AttributeError:
        print("No custom js files")

    app.config.html_static_path.append("dist/")
    app.add_config_value("html_defer_js", False, "env")
    app.connect("html-page-context", setup_js_defer)


def get_master_url():
    if socket.gethostname() in ["runestone-deploy", "rsbuilder"]:
        master_url = "https://runestone.academy"
    elif "RUNESTONE_HOST" in os.environ:
        port = os.environ.get("RUNESTONE_PORT", 80)
        secure = os.environ.get("RUNESTONE_PROTOCOL", "http")
        master_url = "{}://{}:{}".format(secure, os.environ["RUNESTONE_HOST"], port)
    else:
        master_url = "http://127.0.0.1:8000"

    return master_url


from paver.easy import task, cmdopts, sh
from sphinxcontrib import paverutils


@task
@cmdopts(
    [
        ("all", "a", "rebuild everything"),
        ("outputdir=", "o", "output static files here"),
        ("masterurl=", "u", "override the default master url"),
        ("masterapp=", "p", "override the default master app"),
    ]
)
def build(options):
    if "all" in options.build:
        options["force_all"] = True
        options["freshenv"] = True

    try:
        bi = sh("git describe --long", capture=True)[:-1]
        bnum = bi.split("-")[0]
        options.build.template_args["build_info"] = bnum
    except:
        bi = "unknown-0-0"
        options.build.template_args["build_info"] = "unknown"

    with open("build_info", "w") as bif:
        bif.write(bi)
        bif.write("\n")

    if "outputdir" in options.build:
        options.build.outdir = options.build.outputdir

    if "masterurl" in options.build:
        options.build.template_args["course_url"] = options.build.masterurl

    if "masterapp" in options.build:
        options.build.template_args["appname"] = options.build.masterapp

    print("Building into ", options.build.outdir)
    rc = paverutils.run_sphinx(options, "build")

    if rc == 0 or rc is None:
        print("Done, build successful")
    else:
        print("Error in building code {}".format(rc))

    return rc


# Module variables
# ----------------
runestone_version = version = pkg_resources.get_distribution("runestone").version

css_files = [
    # Generated from a template, so it can't be directly included in the webpack.
    "bootstrap-sphinx.css",
]


cmap = {
    "activecode": ActiveCode,
    "mchoice": MChoice,
    "fillintheblank": FillInTheBlank,
    "timed": TimedDirective,
    "qnum": QuestionNumber,
    "codelens": Codelens,
    "clickablearea": ClickableArea,
    "datafile": DataFile,
    "disqus": DisqusDirective,
    "dragndrop": DragNDrop,
    "groupsub": GroupSubmission,
    "parsonsprob": ParsonsProblem,
    "poll": Poll,
    "quizly": Quizly,
    "reveal": RevealDirective,
    "selectquestion": SelectQuestion,
    "shortanswer": JournalDirective,
    "showeval": ShowEval,
    "tabbed": TabbedStuffDirective,
    "tab": TabDirective,
    "video": Video,
    "youtube": Youtube,
    "vimeo": Vimeo,
}
