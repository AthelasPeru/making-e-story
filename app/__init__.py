# flask Imports
from flask import Flask, send_from_directory
from flask_mongoengine import MongoEngine
from flask_restful import Api
from flask_debugtoolbar import DebugToolbarExtension

# local imports
from config import config
from views import main
from api.controllers import api

mongo = MongoEngine()
toolbar = DebugToolbarExtension()


def create_app(config_val="default"):
    app = Flask(__name__)
    # set config values
    app.config.from_object(config[config_val])
    app.config["DEBUG"] = True

    # register blueprints
    app.register_blueprint(main)
    app.register_blueprint(api)

    # initializations
    mongo.init_app(app)
    toolbar.init_app(app)



    # add robots.txt
    @app.route('/robots.txt')
    def static_from_root():
        return send_from_directory(app.static_folder, request.path[1:])


    return app

