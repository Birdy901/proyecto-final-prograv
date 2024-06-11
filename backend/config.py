from decouple import config

class Config:
    SECRET_KEY=config('SECRET_KEY')

class DevelopmentConfig(Config):
    DEBUG=True
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:Ch33sk!ng2@localhost:5432/BibliotecaMisticaThalindor'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

config = {
    'development': DevelopmentConfig
}