from src.models.database import db
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, fields

class Usuario(db.Model):
    __tablename__ = 'Usuarios'

    Id_Usuario = db.Column(db.Integer, primary_key=True, nullable=False)
    Email = db.Column(db.String(100), nullable=False, unique=True)
    Nombre = db.Column(db.String(100), nullable=False)
    Password = db.Column(db.String, nullable=False)

    def __init__(self, Id_Usuario, Email, Nombre, Password):
        self.Id_Usuario = Id_Usuario
        self.Email = Email
        self.Nombre = Nombre
        self.Password = Password

class UsuarioSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Usuario
        load_instance = True

usuario = fields.Nested(UsuarioSchema)
usuario_schema = UsuarioSchema(many=True)