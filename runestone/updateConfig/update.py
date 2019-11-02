__author__ = 'petlja'
from ast import literal_eval
from docutils import nodes
from docutils.parsers.rst import Directive
from docutils.parsers.rst import directives
from runestone.common.runestonedirective import  RunestoneNode


def setup(app):
    app.add_directive('update-config', UpdateConfig)

class UpdateConfig(Directive):
    """
    The syntax for a update config is:
    .. update-config::
        :set_config_option: configuration new_value

    .. update-config::
        :set_config_option: mchoice_compare_button_show False
    """ 
    required_arguments = 0
    optional_arguments = 0
    has_content = False
    option_spec ={
        'set_config_option': directives.unchanged,
    }

        
    def run(self):
        env = self.state.document.settings.env

        if 'set_config_option' in self.options:
            config_opt , value = self.options['set_config_option'].split(" ", 1)
            #It is possible to crash the Python interpreter with a sufficiently large/complex string due to stack depth limitations in Python’s AST compiler.
            if len(value)>1000:
                self.error("Length of configuration option value exceeded")

            env.config[config_opt]= literal_eval(value)

        
        return []
