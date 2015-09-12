# coding: utf-8


# Flask libraries
from flask_restful import Resource, fields, marshal_with
from flask import abort, make_response, json, current_app

# local imports
from app.models import Game

# Game fields for API Marshall

game_fields = {
	"id": fields.String(),
	"json_data": fields.Nested()
}

class GameApi(Resource):
	"""
	Handle basic game saving and loading
	"""
	@marshal_with(game_fields)
	def get(self, game_id=None):
		if game_id:
			game = Game.objects.get_or_404(id=game_id)

			return game
		else:
			abort(401)

	@marshal_with(game_fields)
	def post(self, game_id=None):
		if game_id:
			abort(405)
		else:

			args = game_post_parser.parse_args()
			new_game = Game()
			new_game.json_data = args["data"]