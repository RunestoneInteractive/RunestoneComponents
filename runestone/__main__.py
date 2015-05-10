
import sys
import os
import shutil
import getpass
import six
import click
from pkg_resources import resource_string, resource_filename


def init():
    template_base_dir = resource_filename('runestone', 'common/project_template')
    config_stuff = resource_string('runestone','common/project_template/conf.tmpl')
    paver_stuff = resource_string('runestone','common/project_template/pavement.tmpl')
    conf_dict = {}
    print("This will create a new Runestone project in your current directory.")
    click.confirm("Do you want to proceed? ", abort=True, default=True)
    print("Next we need to gather a few pieces of information to create your configuration files")
    conf_dict['project_name'] = click.prompt("Project name: (one word, no spaces)")
    conf_dict['build_dir'] = click.prompt("path to build dir ", default="./build")
    conf_dict['login_req'] = click.prompt("require login  ", default="false")
    conf_dict['master_url'] = click.prompt("URL for ajax server ", default="http://127.0.0.1:8000")
    conf_dict['author'] = click.prompt("your Name ", default=getpass.getuser())
    conf_dict['project_title'] = click.prompt("Title for this project ", default="Runestone Default")
    conf_dict['logging'] = click.prompt("Log student actions? ", type=bool, default=True)
    conf_dict['log_level'] = 10 if conf_dict['logging'] else 0

    shutil.copytree(os.path.join(template_base_dir,'_sources'),'_sources')
    shutil.copytree(os.path.join(template_base_dir,'_static'),'_static')
    shutil.copytree(os.path.join(template_base_dir,'_templates'),'_templates')
    os.makedirs(conf_dict['build_dir'])
    paver_final = paver_stuff.decode('utf-8') % conf_dict
    config_final = config_stuff.decode('utf-8') % conf_dict

    with open('pavement.py','w') as pvf:
        pvf.write(paver_final)

    with open('conf.py','w') as pvf:
        pvf.write(config_final)

    print("Done.  Type runestone build to build your project")

def build():
    from paver.tasks import main as paver_main
    os.chdir(findProjectRoot())
    sys.argv[0] = "build"
    paver_main()
    
def serve():
    os.chdir(findProjectRoot())
    sys.path.insert(0,os.getcwd())
    try:
        import pavement
    except:
        print("Error, you must be in your project root directory")
        return
    
    os.chdir(pavement.serving_dir)


    PORT = 8000
    if six.PY2:
        import SimpleHTTPServer
        import SocketServer
        Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
        httpd = SocketServer.TCPServer(("", PORT), Handler)
    else:
        import http.server
        import socketserver
        Handler = http.server.SimpleHTTPRequestHandler
        httpd = socketserver.TCPServer(("", PORT), Handler)

    print("serving at port", PORT)
    httpd.serve_forever()

def main(args=None):
    if not args:
        args = sys.argv[1:]
    foo_config = resource_filename('runestone', 'common')
#    foo_string = resource_string('runestone', 'project/template/conf.tmpl')

    if args[0] == "init":
        init()
    elif args[0] == "build":
        build()
    elif args[0] == "serve":
        serve()
    else:
        print("Error:  I only understand init, build, and serve")

def findProjectRoot():
    start = os.getcwd()
    prevdir = ""
    while start != prevdir:
        if os.path.exists(os.path.join(start,'pavement.py')):
            return start
        prevdir = start
        start = os.path.dirname(start)
    raise NotADirectoryError("You must be in a runestone project to run runestone")

if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))