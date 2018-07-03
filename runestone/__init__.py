from .activecode import *
from .animation import *
from .assess import *
from .blockly import *
from .codelens import *
from .clickableArea import *
from .datafile import *
from .disqus import *
from .dragndrop import *
from .fitb import *
from .matrixeq import *
from .meta import *
from .parsons import *
from .poll import *
from .reveal import *
from .shortanswer import *
from .showeval import *
from .tabbedStuff import *
from .usageAssignment import *
from .video import *
from .webgldemo import *


import os, sys

def runestone_static_dirs():
    basedir = os.path.dirname(__file__)
    module_paths = [ x for x in os.listdir(basedir) if os.path.isdir(os.path.join(basedir,x))]
    module_static_js = ['%s/js' % os.path.join(basedir,x) for x in module_paths if os.path.exists('%s/js' % os.path.join(basedir,x))]
    module_static_css = ['%s/css' % os.path.join(basedir,x) for x in module_paths if os.path.exists('%s/css' % os.path.join(basedir,x))]
    module_static_image = ['%s/images' % os.path.join(basedir,x) for x in module_paths if os.path.exists('%s/images' % os.path.join(basedir,x))]
    module_static_bootstrap = ['%s/bootstrap' % os.path.join(basedir,x) for x in module_paths if os.path.exists('%s/bootstrap' % os.path.join(basedir,x))]

    return module_static_js + module_static_css + module_static_image + module_static_bootstrap


def runestone_extensions():
    basedir = os.path.dirname(__file__)
    module_paths = [ x for x in os.listdir(basedir) if os.path.isdir(os.path.join(basedir,x))]
    modules = [ 'runestone.{}'.format(x) for x in module_paths if os.path.exists('{}/__init__.py'.format(os.path.join(basedir,x)))]
    modules.remove('runestone.server')
    return modules

from paver.easy import task, cmdopts, sh
from sphinxcontrib import paverutils

@task
@cmdopts([
    ('all','a','rebuild everything'),
    ('outputdir=', 'o', 'output static files here'),
    ('masterurl=', 'u', 'override the default master url'),
    ('masterapp=', 'p', 'override the default master app')
])
def build(options):
    if 'all' in options.build:
      options['force_all'] = True
      options['freshenv'] = True

    try:
        bi = sh('git describe --long',capture=True)[:-1]
        bnum = bi.split('-')[0]
        options.build.template_args["build_info"] = bnum
    except:
        bi = "unknown-0-0"
        options.build.template_args["build_info"] = 'unknown'

    with open('build_info','w') as bif:
        bif.write(bi)
        bif.write("\n")

    if 'outputdir' in options.build:
        options.build.outdir = options.build.outputdir

    if 'masterurl' in options.build:
        options.build.template_args['course_url'] = options.build.masterurl

    if 'masterapp' in options.build:
        options.build.template_args['appname'] = options.build.masterapp

    print('Building into ', options.build.outdir)
    rc = paverutils.run_sphinx(options,'build')

    if rc == 0 or rc is None:
        print("Done, {} build successful".format(options.build.project_name))
    else:
        print("Error in building {} code {}".format(options.build.project_name, rc))

    return rc

cmap = {'activecode': ActiveCode,
        'mchoice': MChoice,
        'fillintheblank': FillInTheBlank,
        'timed': TimedDirective,
        'qnum': QuestionNumber,
        'codelens': Codelens,
        'clickablearea': ClickableArea,
        'datafile': DataFile,
        'disqus': DisqusDirective,
        'dragndrop': DragNDrop,
        'parsonsprob': ParsonsProblem,
        'poll': Poll,
        'reveal': RevealDirective,
        'shortanswer': JournalDirective,
        'showeval': ShowEval,
        'tabbed': TabbedStuffDirective,
        'tab': TabDirective,
        'video': Video,
        'youtube': Youtube,
        'vimeo': Vimeo,
        'usageassignment': usageAssignment
        }
