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


import os, socket


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
    module_static_css = [
        os.path.join(basedir, "common", "css")
    ]
    module_static_css.append(os.path.join(basedir, "codelens", "css"))
    module_static_css.append(os.path.join(basedir, "accessibility", "css"))
    module_static_css.append(os.path.join(basedir, "webgldemo", "css"))
    module_static_css.append(os.path.join(basedir, "matrixeq", "css"))
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
    )


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
    "shortanswer": JournalDirective,
    "showeval": ShowEval,
    "tabbed": TabbedStuffDirective,
    "tab": TabDirective,
    "video": Video,
    "youtube": Youtube,
    "vimeo": Vimeo,
}
