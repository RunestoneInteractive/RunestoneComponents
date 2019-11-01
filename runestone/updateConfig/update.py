__author__ = 'petlja'
from ast import literal_eval
from docutils import nodes
from docutils.parsers.rst import Directive
from docutils.parsers.rst import directives
from runestone.common.runestonedirective import RunestoneDirective , RunestoneIdDirective , RunestoneNode


def setup(app):
    app.add_directive('update-config', UpdateConfig)

class UpdateConfig(RunestoneDirective):
    """
    update config
    """ 
    required_arguments = 0
    optional_arguments = 0
    has_content = False
    option_spec = RunestoneDirective.option_spec.copy()
    option_spec.update({'set_config_option': directives.unchanged,
    })

        
    def run(self):
        env = self.state.document.settings.env

        if 'set_config_option' in self.options:
            config_opt , value = self.options['set_config_option'].split(" ", 1)

            if len(value)>1000:
                self.error("Length of configuration option value exceeded")

            env.config[config_opt]= literal_eval(value)

        
        return []
