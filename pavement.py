import paver
from paver.easy import *
import paver.setuputils
paver.setuputils.install_distutils_tasks()
import os, sys
import datetime

from sphinxcontrib import paverutils

sys.path.append(os.getcwd())

######## CHANGE THIS ##########
project_name = 'template'
###############################

master_url = 'http://interactivepython.org'
master_app = 'runestone'

options(
    sphinx = Bunch(docroot=".",),

    build = Bunch(
        builddir="build",
        sourcedir="_sources",
        outdir="build",
        confdir=".",
        template_args={'course_id':project_name,
                       'login_required':'false',
                       'appname':master_app,
                       'loglevel':10,
                       'course_url':master_url }
    )
)

if project_name == "<project_name>":
  print "Please edit pavement.py and give your project a name"
  exit()

@task
@cmdopts([
    ('all','a','rebuild everything'),
    ('outputdir=', 'o', 'output static files here'),
    ('masterurl=', 'u', 'override the default master url'),
    ('masterapp=', 'p', 'override the default master app'),
    ('slides','s','Use heiroglyph to build slides')
])
def build(options):
    if 'all' in options.build:
      options['force_all'] = True
      options['freshenv'] = True

    if 'outputdir' in options.build:
        options.build.outdir = options.build.outputdir

    if 'masterurl' in options.build:
        options.build.template_args['course_url'] = options.build.masterurl

    if 'masterapp' in options.build:
        options.build.template_args['appname'] = options.build.masterapp

    if 'slides' in options.build:
        options.sphinx.builder = 'slides'
    print 'Building into ', options.build.outdir    
    paverutils.run_sphinx(options,'build')


@task
def setup_github_pages(options):
    if sys.version > '3':
        repo = input("paste your repo URL here: ")
    else:
        repo = raw_input("paste your repo URL here: ")
    os.chdir(options.build.builddir)
    sh("git init")
    sh("git remote add origin %s " % repo)
    sh("git branch gh-pages")
    sh("git checkout gh-pages")    # need git 1.8+ to do git checkout -b gh-pages
    sh("touch .nojekyll")
    sh("git add .nojekyll")
    sh("git commit -m 'Create repo and gh-pages branch'")
    sh("git push --set-upstream origin gh-pages")
    sh("git push origin gh-pages")

@task
def deploy(options):
    os.chdir(options.build.builddir)
    sh("git add .")
    sh("git commit -m 'New Build on: %s'" % datetime.datetime.now())
    sh("git push")
    