from src.models.database import db
from werkzeug.security import generate_password_hash, check_password_hash

class Usuario(db.Model):
    __tablename__ = 'Usuarios'

    Id_Usuario = db.Column(db.Integer, primary_key=True)
    Email = db.Column(db.String(100), nullable=False, unique=True)
    Nombre = db.Column(db.String(100), nullable=False)
    Password = db.Column(db.String, nullable=False)

    def set_password(self, Password):
        self.Password = generate_password_hash(Password)

    def check_password(self, Password):
        return check_password_hash(self.Password, Password)