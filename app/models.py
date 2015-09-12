from flask_mongoengine import MongoEngine 


mongo = MongoEngine()

class Game(mongo.DynamicDocument):
	