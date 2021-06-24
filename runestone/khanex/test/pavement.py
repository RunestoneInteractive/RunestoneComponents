import os
import sys
import pkg_resources
from socket import gethostname

from paver.easy import options, Bunch
import paver.setuputils

from runestone import get_master_url
from runestone import build  # NOQA: F401 -- build is called implicitly by the paver driver.
from runestone.server import get_dburl

paver.setuputils.install_distutils_tasks()
sys.path.append(os.getcwd())

# The project name, for use below.
project_name = 'khanex'

master_url = 'http://127.0.0.1:8000'
if not master_url:
    master_url = get_master_url()

# The root directory for ``runestone serve``.
serving_dir = "./build/" + project_name
# The destination directory for ``runestone deploy``.
dest = "../../static"

options(
    sphinx=Bunch(docroot=".",),

    build=Bunch(
        builddir=serving_dir,
        sourcedir="_sources",
        outdir=serving_dir,
        confdir=".",
        template_args={
            'login_required': 'false',
            'loglevel': 0,
            'course_title': project_name,
            'python3': 'false',
            'dburl': '',
            'default_ac_lang': 'python',
            'jobe_server': 'http://jobe2.cosc.canterbury.ac.nz',
            'proxy_uri_runs': '/jobe/index.php/restapi/runs/',
            'proxy_uri_files': '/jobe/index.php/restapi/files/',
            'downloads_enabled': 'false',
            'enable_chatcodes': 'false',
            'allow_pairs': 'false',
            'dynamic_pages': False,
            'use_services': 'false',
            'basecourse': project_name,
            'course_id': project_name,
            # These are used for non-dynamic books.
            'appname': 'runestone',
            'course_url': master_url,
        }
    )
)

# if we are on runestone-deploy then use the proxy server not canterbury
if gethostname() == 'runestone-deploy':
    del options.build.template_args['jobe_server']
    del options.build.template_args['proxy_uri_runs']
    del options.build.template_args['proxy_uri_files']

version = pkg_resources.require("runestone")[0].version
options.build.template_args['runestone_version'] = version

# If DBURL is in the environment override dburl
options.build.template_args['dburl'] = get_dburl(outer=locals())
