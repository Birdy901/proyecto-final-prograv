from flask import Flask
from config import config
from flask_sqlalchemy import SQLAlchemy

from src.models.database import db

#Routes
from .routes import AuthRoutes, LibraryRoutes, IndexRoutes, BookRoutes

def init_app(configname):

    app = Flask(__name__)

    #Configuration
    app.config.from_object(config[configname])

    db.init_app(app)

    #Blueprints
    app.register_blueprint(IndexRoutes.main, url_prefix='/')
    app.register_blueprint(BookRoutes.main, url_prefix='/libro_blueprint')
    return app