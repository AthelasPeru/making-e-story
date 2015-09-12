# flask Imports
from flask import Flask, send_from_directory
from flask_mongoengine import MongoEngine
from flask_restful import Api

# local imports
from config import config
from views import main

mongo = MongoEngine()


def create_app(config_val="dev"):
    app = Flask(__name__)
    # set config values
    app.config.from_object(config[config_val])

    # register blueprints
    app.register_blueprint(main)

    # initializations
    mongo.init_app(app)

    # API
    api = Api()

    # add robots.txt
    @app.route('/robots.txt')
    def static_from_root():
        return send_from_directory(app.static_folder, request.path[1:])


    return app

