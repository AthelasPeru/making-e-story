from flask_restful import reqparse


game_post_parser = reqparse.RequestParser(bundle_errors=True)
game_post_parser.add_argument(
	"json_data",
	type=dict,
	required=True,
	location=["json"],
	help="No data provided"
)