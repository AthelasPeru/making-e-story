from flask import Blueprint, render_template, request, redirect, url_for, current_app
from werkzeug import secure_filename
import os
import uuid

from models import Game

from utils import allowed_file

main = Blueprint("main", __name__)

@main.route("/")
def index():
    games = Game.objects
    return render_template(
        "index.html",
        games=games
    )


@main.route("/create", methods=["GET"])
def create():   
    return render_template("create.html")


@main.route("/create", methods=["POST"])
def create_item():
    
    new_game= Game()
    new_game.name = request.form["name"]
    new_game.description = request.form["description"]

    file = request.files["upload_img"]
    if file and allowed_file(file.filename):
        filename = "{}-{}".format(uuid.uuid4(), secure_filename(file.filename))
        print(filename)
        uploads_route = "{}/app/static/{}".format(os.getcwd(), current_app.config["UPLOAD_FOLDER"] )
        
        file.save(os.path.join(uploads_route, filename))

        new_game.img = filename


    new_game.save()
    return redirect(url_for("main.index"))


@main.route("/game/<string:game_id>")
def play_game(game_id):

    game = Game.objects.get_or_404(id=game_id)


    return render_template(
        "game.html",
        game=game
    )

