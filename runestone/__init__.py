# *********************************
# |docname| - Runestone Module init
# *********************************
from .activecode import ActiveCode
from .animation import Animation
from .mchoice import MChoice, QuestionNumber
from .blockly import Blockly
from .codelens import Codelens
from .clickableArea import ClickableArea
from .datafile import DataFile
from .disqus import DisqusDirective
from .dragndrop import DragNDrop
from .fitb import FillInTheBlank
from .selectquestion import SelectQuestion
from .matrixeq import MatrixEq
from .meta import Meta
from .parsons import ParsonsProblem
from .poll import Poll
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


# TODO: clean up - many of the folders are not needed as the files are imported by webpack
#
# runestone_static_dirs()
# -----------------------
# Users can call this to get a list of all static directories in the runestone package
# normally this is just used by the `conf.py` file for building a runestone book
def runestone_static_dirs():
    basedir = os.path.dirname(__file__)
    module_paths = [
        x for x in os.listdir(basedir) if os.path.isdir(os.path.join(basedir, x))
    ]
    module_static_js = [os.path.join(basedir, "dist")]
    module_static_js.append(os.path.join(basedir, "common", "js"))
    module_static_js.append(os.path.join(basedir, "animation", "js"))
    module_static_js.append(os.path.join(basedir, "codelens", "js"))
    module_static_js.append(os.path.join(basedir, "webgldemo", "js"))
    module_static_js.append(os.path.join(basedir, "matrixeq", "js"))
    module_static_css = [os.path.join(basedir, "common", "css")]
    module_static_css.append(os.path.join(basedir, "codelens", "css"))
    module_static_css.append(os.path.join(basedir, "accessibility", "css"))
    module_static_css.append(os.path.join(basedir, "webgldemo", "css"))
    module_static_css.append(os.path.join(basedir, "matrixeq", "css"))
    module_static_css.append(os.path.join(basedir, "lp", "css"))
    module_static_image = [
        "%s/images" % os.path.join(basedir, x)
        for x in module_paths
        if os.path.exists("%s/images" % os.path.join(basedir, x))
    ]
    module_static_bootstrap = [
        "%s/bootstrap" % os.path.join(basedir, x)
        for x in module_paths
        if os.path.exists("%s/bootstrap" % os.path.join(basedir, x))
    ]

    return (
        module_static_js
        + module_static_css
        + module_static_image
        + module_static_bootstrap
        + [os.path.join(basedir, "common/project_template/_static")]
        + CodeChat.CodeToRest.html_static_path()
    )


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


# setup(app)
# ----------
#
def setup(app):
    """
    A normal Runestone project will import this function into its conf.py
    This setup will run after all of the extensions, so it is a good place
    for us to include our common javascript and css files.
    This could be expanded if there is additional initialization or customization
    we wanted to do for all projects.
    """
    for jsfile in script_files:
        try:
            app.add_autoversioned_javascript(jsfile)
        except ExtensionError:
            app.add_js_file(jsfile)
    for cssfile in css_files:
        try:
            app.add_autoversioned_stylesheet(cssfile)
        except ExtensionError:
            app.add_css_file(cssfile)


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


#
# Module variables
# ----------------
runestone_version = version = pkg_resources.get_distribution("runestone").version

script_files = [
    "https://cdnjs.cloudflare.com/ajax/libs/jquery.i18n/1.0.5/jquery.i18n.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery.i18n/1.0.5/jquery.i18n.emitter.bidi.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery.i18n/1.0.5/jquery.i18n.emitter.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery.i18n/1.0.5/jquery.i18n.fallbacks.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery.i18n/1.0.5/jquery.i18n.messagestore.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery.i18n/1.0.5/jquery.i18n.parser.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery.i18n/1.0.5/jquery.i18n.language.js",
    "https://cdn.jsdelivr.net/npm/vega@4.0.0-rc.2/build/vega.js",
    "https://cdn.jsdelivr.net/npm/vega-lite@2.5.0/build/vega-lite.js",
    "https://cdn.jsdelivr.net/npm/vega-embed@3.14.0/build/vega-embed.js",
    "runestone.js",
    "jquery-ui-1.10.3.custom.min.js",
    "bootstrap-3.4.1/js/bootstrap.min.js",
    "jquery-fix.js",  # required by bootstrap theme
    "bootstrap-sphinx.js",
    "jquery.idle-timer.js",
    "presenter_mode.js",
    "theme.js",
]

css_files = [
    "bootstrap-3.4.1/css/bootstrap.min.css",
    "presenter_mode.css",
    "jquery-ui-1.10.3.custom.min.css",
    "bootstrap-sphinx.css",
    "user-highlights.css",
    "runestone-custom-sphinx-bootstrap.css?v=" + runestone_version,
    "theme-overrides.css",
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
    "parsonsprob": ParsonsProblem,
    "poll": Poll,
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
