from src.models.database import db
from flask_marshmallow import Marshmallow

ma = Marshmallow()

class Libros(db.Model):
    __tablename__ = 'Libros'

    Id_Libro = db.Column(db.Integer, primary_key=True, nullable=False)
    Titulo = db.Column(db.String, nullable=False)
    Autor = db.Column(db.String, nullable=False)
    Editorial = db.Column(db.String, nullable=False)
    Fecha_publicacion = db.Column(db.Date, nullable=False)
    ISBN = db.Column(db.Integer, nullable=False)
    Paginas = db.Column(db.Integer, nullable=False)
    Genero = db.Column(db.String, nullable=False)
    Idioma = db.Column(db.String, nullable=False)

    def __init__(self, Id_Libro, Titulo, Autor, Editorial, Fecha_publicacion, ISBN, Paginas, Genero, Idioma):
        self.Id_Libro = Id_Libro
        self.Titulo = Titulo
        self.Autor = Autor
        self.Editorial = Editorial
        self.Fecha_publicaciono = Fecha_publicacion
        self.ISBN = ISBN
        self.Paginas = Paginas
        self.Genero = Genero
        self.Idioma = Idioma

class LibroSchema(ma.Schema):
    class Meta:
        fields = ('Id_Libro', 'Titulo', 'Autor', 'Editorial', 'Fecha_publicacion', 'ISBN', 'Paginas', 'Genero', 'Idioma')

libros_schema = LibroSchema(many=True)
