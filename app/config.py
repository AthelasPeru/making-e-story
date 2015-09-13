import os


class Config(object):
    SECRET_KEY = os.environ.get(
        'SECRET_KEY', "ASSDSSADASD788632ZSSCS7sasd78dad33dyas89ds7dsa")


class DevConfig(Config):
    DEBUG = True
    
    MONGODB_SETTINGS = {
        'db': 'making_e__dev'
    }
    ASSETS_DEBUG = True
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    DEBUG_TB_PANELS = (
        'flask.ext.mongoengine.panels.MongoDebugPanel',
        'flask_debugtoolbar.panels.versions.VersionDebugPanel',
        'flask_debugtoolbar.panels.timer.TimerDebugPanel',
        'flask_debugtoolbar.panels.headers.HeaderDebugPanel',
        'flask_debugtoolbar.panels.request_vars.RequestVarsDebugPanel',
        'flask_debugtoolbar.panels.config_vars.ConfigVarsDebugPanel',
        'flask_debugtoolbar.panels.template.TemplateDebugPanel',
        'flask_debugtoolbar.panels.logger.LoggingPanel',
        'flask_debugtoolbar.panels.route_list.RouteListDebugPanel',
        'flask_debugtoolbar.panels.profiler.ProfilerDebugPanel'
    )
    




class HerokuConfig(Config):
    MONGODB_SETTINGS = {
        'host': 'mongodb://heroku_app36432742:5t3gl9m5obtg6d9ma3snidsba5@ds031632.mongolab.com:31632/heroku_app36432742'
    }
    ASSETS_DEBUG = False

class HerokuDevConfig(HerokuConfig):
    DEBUG = True
    ASSETS_DEBUG = True
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    DEBUG_TB_PANELS = (
        'flask.ext.mongoengine.panels.MongoDebugPanel',
        'flask_debugtoolbar.panels.versions.VersionDebugPanel',
        'flask_debugtoolbar.panels.timer.TimerDebugPanel',
        'flask_debugtoolbar.panels.headers.HeaderDebugPanel',
        'flask_debugtoolbar.panels.request_vars.RequestVarsDebugPanel',
        'flask_debugtoolbar.panels.config_vars.ConfigVarsDebugPanel',
        'flask_debugtoolbar.panels.template.TemplateDebugPanel',
        'flask_debugtoolbar.panels.logger.LoggingPanel',
        'flask_debugtoolbar.panels.route_list.RouteListDebugPanel',
        'flask_debugtoolbar.panels.profiler.ProfilerDebugPanel'
    )

class ProdConfig(Config):
    MONGODB_SETTINGS = {
        'db': "making_e"
    }
    ASSETS_DEBUG = False

class TestConfig(Config):
    MONGODB_SETTINGS = {
        'db': 'test_making_e'
    }

    DEBUG = True
    DEBUG_TB_ENABLED = False
    WTF_CSRF_ENABLED = False

# mira esto
config = {
    "default": DevConfig,
    "development": DevConfig,
    "production": ProdConfig,
    "heroku": HerokuConfig,
    "heroku_dev": HerokuDevConfig,
    "testing": TestConfig
}