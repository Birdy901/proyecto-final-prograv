from src.models.database import db
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, fields

class Biblioteca(db.Model):
    __tablename__ = 'Biblioteca_Personal'

    Id_Biblioteca = db.Column(db.Integer, primary_key=True, nullable=False)
    Id_Usuario = db.Column(db.Integer, db.ForeignKey('Id_Usuario'), nullable=False)
    Id_Libro = db.Column(db.Integer, db.ForeignKey('Id_Libro'), nullable=False)
    Estado = db.Column(db.Boolean, nullable=False, default=False)

    def __init__(self, Id_Biblioteca, Id_Usuario, Id_Libro, Estado):
        self.Id_Biblioteca = Id_Biblioteca
        self.Id_Usuario = Id_Usuario
        self.Id_Libro = Id_Libro
        self.Estado = Estado

class BibliotecaSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Biblioteca
        load_instance = True

biblioteca = fields.Nested(BibliotecaSchema)
biblioteca_schema = BibliotecaSchema(many=True)