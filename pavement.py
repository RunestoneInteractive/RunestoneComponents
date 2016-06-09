import paver
from paver.easy import *
import paver.setuputils
paver.setuputils.install_distutils_tasks()
import os, sys

from sphinxcontrib import paverutils

sys.path.append(os.getcwd())

home_dir = os.getcwd()
master_url = 'http://127.0.0.1:8000'
master_app = 'runestone'
serving_dir = "./build/testdir"
dest = "../../static"

options(
    sphinx = Bunch(docroot=".",),

    build = Bunch(
        builddir="./build/testdir",
        sourcedir="_sources",
        outdir="./build/testdir",
        confdir=".",
        project_name = "testdir",
        template_args={'course_id': 'testdir',
                       'login_required':'false',
                       'appname':master_app,
                       'loglevel': 0,
                       'course_url':master_url,
                       'use_services': 'false',
                       'python3': 'false',
                       'dburl': '',
                       'basecourse': 'testdir'
                        }
    )
)

from runestone import build  # build is called implicitly by the paver driver.

