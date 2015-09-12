def Config(object):
	SECRET_KEY = os.environ.get(
		"SECRET_KEY", "saddasjd348o43rfW?W=WEDW338XDIQWYDWHDX3!!"
	)


def DevConfig(Config):
	DEBUG = True
	MONGODB_SETTINGS = {
		"db": "making_e_dev"
	}


def ProdConfig(Config):
	DEBUG = False
	MONGODB_SETTINGS = {
		"db": "making_e_prod"
	}

config = {
	"dev": DevConfig,
	"prod": ProdConfig
	
}