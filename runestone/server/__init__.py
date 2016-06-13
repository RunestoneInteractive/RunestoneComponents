from .chapternames import *
from os import environ
import re

def get_dburl(outer={}):
    """
    Return a nicely formatted database connection URL
    This function should not be used to configure a DAL db_uri for web2py that will already
    be configured in settings.

    :param outer:  pass locals from the calling environment
    :return:  string
    """
    # outer may contain the locals from the calling function
    # nonlocal env, settings # Python 3 only

    if all([x in environ for x in ['DBUSER', 'DBHOST', 'DBNAME']]):
        return 'postgresql://{DBUSER}:{DBPASS}@{DBHOST}/{DBNAME}'.format(**environ)

    if 'options' in outer:
        return outer['options'].build.template_args['dburl']

    if 'env' in outer:
        return outer['env'].config.html_context['dburl']

    if 'env' in globals():
        return globals()['env'].config.html_context['dburl']

    ret = None
    if 'settings' in outer:
        ret = outer['settings'].database_uri

    if 'settings' in globals():
        ret = globals()['settings'].database_uri.replace('postgres:','postgresql:')

    if ret:
        return re.sub(r'postgres:.*/', 'postgresql:/', ret)

    raise RuntimeError("Cannot configure a Database URL!")
