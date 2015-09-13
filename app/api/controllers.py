# coding: utf-8


from flask import Blueprint, abort, request, make_response, json

from app.models import Game

api = Blueprint("api", __name__, url_prefix="/api")

@api.route("/game", methods=["POST"])
def create(game_id=None):
    
    if game_id:
        abort(403)

    else:
        new_game = Game()
        print(request.json["general_data"])
        
        new_game.general_data = request.json["general_data"]
        new_game.character_data = request.json["character_data"]
        new_game.phases = request.json["phases"]

        
        new_game.save()
        
        return make_response(json.dumps(new_game), 201)


@api.route("/game", methods=["GET"])
@api.route("/game/<string:game_id>", methods=["GET"])
def game(game_id=None):
    if not game_id:
        games = Game.objects.to_json()
        return make_response(games, 200)
    else:
        game_data = Game.objects.get_or_404(id=game_id)
        return make_response(json.dumps(game_data), 200)



@api.route("/game/<string:game_id>", methods=["PUT"])
def update(game_id=None):
    if not game_id:
        abort(403)
    else:
        game_data = Game.objects.get_or_404(id=game_id)
        game_data.general_data = request.json["general_data"]
        game_data.character_data = request.json["character_data"]
        game_data.phases = request.json["phases"]
        game_data.save()
        
        return make_response(json.dumps({status: "saved"}), 201)



