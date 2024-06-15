from flask import Flask
from config import config
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_cors import CORS

#database
from src.models.database import db

#JWT
jwt = JWTManager()

#Marshmallow
ma = Marshmallow()

#Routes
from .routes import AuthRoutes, LibraryRoutes, IndexRoutes, BookRoutes

def init_app(configname):

    app = Flask(__name__)

    #Configuration
    app.config.from_object(config[configname])

    db.init_app(app)
    jwt.init_app(app)
    ma.init_app(app)
    CORS(app, supports_credentials=True, expose_headers='Authorization')

    #Blueprints
    app.register_blueprint(IndexRoutes.main, url_prefix='/')
    app.register_blueprint(BookRoutes.main, url_prefix='/libro_blueprint')
    app.register_blueprint(LibraryRoutes.main, url_prefix='/biblioteca_blueprint')
    app.register_blueprint(AuthRoutes.main, url_prefix='/auth_blueprint')
    return app