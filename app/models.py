from flask_mongoengine import MongoEngine 


mongo = MongoEngine()

class Game(mongo.DynamicDocument):
	"""
	I'm creating this just to hold the JSON object,
	we don't really have time right now to set each field.
	"""
	json_data = mongo.DictField()