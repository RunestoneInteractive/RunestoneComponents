
import sys
import os
import shutil
import getpass
import six
import click
from paver.easy import sh
from pkg_resources import resource_string, resource_filename

@click.group(chain=True)
def cli():
    pass

@cli.command()
def init():
    template_base_dir = resource_filename('runestone', 'common/project_template')
    config_stuff = resource_string('runestone','common/project_template/conf.tmpl')
    paver_stuff = resource_string('runestone','common/project_template/pavement.tmpl')
    conf_dict = {}
    print("This will create a new Runestone project in your current directory.")
    click.confirm("Do you want to proceed? ", abort=True, default=True)
    print("Next we need to gather a few pieces of information to create your configuration files")
    conf_dict['project_name'] = click.prompt("Project name: (one word, no spaces)")
    while ' ' in conf_dict['project_name']:
        conf_dict['project_name'] = click.prompt("Project name: (one word, NO SPACES)")
    conf_dict['build_dir'] = click.prompt("Path to build dir ", default="./build")
    conf_dict['dest'] = click.prompt("Path to deploy built site ", default="../../static")
    conf_dict['use_services'] = click.prompt("Use Runestone Web Services ", type=click.Choice(['true', 'false']), default="false")
    conf_dict['author'] = click.prompt("Your Name ", default=getpass.getuser())
    conf_dict['project_title'] = click.prompt("Title for this project ", default="Runestone Default")
    conf_dict['python3'] = click.prompt("Use Simple Python3 Semantics ", default="false")
    if conf_dict['use_services'] == "true":
        conf_dict['login_req'] = click.prompt("Require login  ", default="false")
        conf_dict['master_url'] = click.prompt("URL for ajax server ", default="http://127.0.0.1:8000")
        conf_dict['logging'] = click.prompt("Log student actions? ", type=bool, default=True)
        conf_dict['log_level'] = 10 if conf_dict['logging'] else 0
    else:
        conf_dict['login_req'] = "false"
        conf_dict['master_url'] = "http://127.0.0.1:8000"
        conf_dict['logging'] = False
        conf_dict['log_level'] = 0

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

@cli.command()
@click.option('--all/--not-all', default=False, help="build all")
def build(all):
    from paver.tasks import main as paver_main
    os.chdir(findProjectRoot())

    myargs = ['build']
    if all:
        myargs.append('--all')

    paver_main(args=myargs)

@cli.command()
@click.option('--port', default=8000, help="port for server to listen on")
@click.option('--listen', default="", help="address for server to listen on")
def serve(port,listen):
    os.chdir(findProjectRoot())
    sys.path.insert(0,os.getcwd())
    try:
        import pavement
    except:
        print("Error, you must be in your project root directory")
        return
    
    os.chdir(pavement.serving_dir)


    if six.PY2:
        import SimpleHTTPServer
        import SocketServer
        Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
        httpd = SocketServer.TCPServer((listen, port), Handler)
    else:
        import http.server
        import socketserver
        Handler = http.server.SimpleHTTPRequestHandler
        httpd = socketserver.TCPServer((listen, port), Handler)

    print("serving at port", port)
    httpd.serve_forever()

@cli.command()
@click.option("--dest", default="", help="destination for deploy")
def deploy(dest):
    os.chdir(findProjectRoot())
    sys.path.insert(0,os.getcwd())
    try:
        import pavement
    except ImportError as ie:
        print("Error, you must be in your project root directory")

    if not dest:
        try:
            dest = pavement.dest
        except:
            raise IOError("No destination configured add dest to your pavement.py or use --dest")

    click.echo('Deploying from ' + pavement.serving_dir + ' to ' + dest)
    sh("rsync -rav --delete {} {}".format(pavement.serving_dir,dest))

def main(args=None):
    if not args:
        args = sys.argv[1:]
    cli.add_command(init)
    cli.add_command(build)
    cli.add_command(serve)
    cli.add_command(deploy)
    cli()

def findProjectRoot():
    start = os.getcwd()
    prevdir = ""
    while start != prevdir:
        if os.path.exists(os.path.join(start,'pavement.py')):
            return start
        prevdir = start
        start = os.path.dirname(start)
    raise IOError("You must be in a runestone project to run runestone")


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
