import paver
from paver.easy import *
import paver.setuputils
paver.setuputils.install_distutils_tasks()
import os, sys
from runestone.server import get_dburl
from sphinxcontrib import paverutils
import pkg_resources

sys.path.append(os.getcwd())

home_dir = os.getcwd()
master_url = 'http://127.0.0.1:8000'
master_app = 'runestone'
serving_dir = "./build/testwebgldemo"
dest = "../../static"

options(
    sphinx = Bunch(docroot=".",),

    build = Bunch(
        builddir="./build/testwebgldemo",
        sourcedir="_sources",
        outdir="./build/testwebgldemo",
        confdir=".",
        project_name = "testwebgldemo",
        template_args={'course_id': 'testwebgldemo',
                       'login_required':'false',
                       'appname':master_app,
                       'loglevel': 0,
                       'course_url':master_url,
                       'use_services': 'false',
                       'python3': 'false',
                       'dburl': '', 'downloads_enabled': 'true', 'enable_chatcodes': 'false', 'allow_pairs': 'false',
                       'basecourse': 'testwebgldemo'
                        }
    )
)

version = pkg_resources.require("runestone")[0].version
options.build.template_args['runestone_version'] = version

# If DBURL is in the environment override dburl
options.build.template_args['dburl'] = get_dburl(outer=locals())

from runestone import build  # build is called implicitly by the paver driver.
