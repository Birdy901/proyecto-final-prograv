from decouple import config
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY=config('SECRET_KEY')
    JWT_SECRET_KEY=config('JWT_SECRET_KEY')

class DevelopmentConfig(Config):
    DEBUG=True
    SQLALCHEMY_DATABASE_URI = config('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

config = {
    'development': DevelopmentConfig
}