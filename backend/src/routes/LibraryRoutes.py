from flask import Blueprint, jsonify
from src.models.LibraryModel import Biblioteca, biblioteca_schema
from src.models.database import db

main=Blueprint('biblioteca_blueprint', __name__)

@main.route('/biblioteca', methods=['GET'])
def get_libros():
    all_libros = Biblioteca.query.all()
    result = biblioteca_schema.dump(all_libros)
    return jsonify(result)

@main.route('/biblioteca/<id>', methods=['DELETE'])
def delete_biblioteca(id):
    biblioteca = Biblioteca.query.get(id)
    db.session.delete(biblioteca)
    db.session.commit()
    return biblioteca_schema.jsonify(biblioteca)