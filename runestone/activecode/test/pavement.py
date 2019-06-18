import paver
from paver.easy import *
import paver.setuputils
paver.setuputils.install_distutils_tasks()
import os, sys
from runestone.server import get_dburl
from sphinxcontrib import paverutils

sys.path.append(os.getcwd())

home_dir = os.getcwd()
master_url = 'http://127.0.0.1:8000'
master_app = 'runestone'
serving_dir = "./build/activecodetest"
dest = "./static"

options(
    sphinx = Bunch(docroot=".",),

    build = Bunch(
        builddir="./build/activecodetest",
        sourcedir="_sources",
        outdir="./build/activecodetest",
        confdir=".",
        quiet=True,
        project_name = "activecodetest",
        template_args={'course_id': 'activecodetest',
                       'login_required':'false',
                       'appname':master_app,
                       'loglevel': 0,
                       'course_url':master_url,
                       'use_services': False,
                       'python3': 'true',
                       'dburl': '', 'downloads_enabled': 'true', 'enable_chatcodes': 'false', 'allow_pairs': 'false',
                       'basecourse': 'activecodetest',
                       'jobe_server': 'http://jobe2.cosc.canterbury.ac.nz',
                       'proxy_uri_runs': '/jobe/index.php/restapi/runs/',
                       'proxy_uri_files': '/jobe/index.php/restapi/files/'
                        }
    )
)

# If DBURL is in the environment override dburl
options.build.template_args['dburl'] = get_dburl(outer=locals())

from runestone import build  # build is called implicitly by the paver driver.
