# coding: utf-8

# Native Libraries
from __future__ import print_function
import os

# Flask imports
from flask.ext.script import Manager

# Local imports
from app import create_app


conf_env = os.environ.get('WEBAPP_ENV', "dev")

app = create_app(conf_env)

manager = Manager(app)



@manager.shell
def make_shell_context():
    return dict(    
        app=app,
        
        
)


if __name__ == '__main__':
    manager.run()