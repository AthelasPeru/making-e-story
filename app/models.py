from flask_mongoengine import MongoEngine 


mongo = MongoEngine()

class Game(mongo.DynamicDocument):
	"""
	I'm creating this just to hold the JSON object,
	we don't really have time right now to set each field.
	"""
	
	general_data = mongo.DictField()
	character_data = mongo.DictField()
	phases = mongo.ListField()
