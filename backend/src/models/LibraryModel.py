from src.models.database import db
from src import ma
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from src.models.BookModel import Libros, LibroSchema

class Biblioteca(db.Model):
    __tablename__ = 'Biblioteca_Personal'

    Id_Biblioteca = db.Column(db.Integer, primary_key=True)
    Id_Usuario = db.Column(db.Integer, db.ForeignKey('Usuarios.Id_Usuario'), nullable=False)
    Id_Libro = db.Column(db.Integer, db.ForeignKey('Libros.Id_Libro'), nullable=False)
    Estado = db.Column(db.Boolean, default=False)

    Libro = db.relationship('Libros', backref='biblioteca_entries', lazy=True ,primaryjoin='Biblioteca.Id_Libro == Libros.Id_Libro')

class BibliotecaSchema(SQLAlchemyAutoSchema):
    Libro = ma.Nested(LibroSchema)
    class Meta:
        model = Biblioteca
        load_instance = True

biblioteca_schema = BibliotecaSchema()
bibliotecas_schema = BibliotecaSchema(many=True)