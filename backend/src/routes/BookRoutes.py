from flask import Blueprint, jsonify
from src.models.BookModel import Libros, libros_schema

main=Blueprint('libro_blueprint', __name__)

@main.route('/libros', methods=['GET'])
def get_libros():
    all_libros = Libros.query.all()
    result = libros_schema.dump(all_libros)
    return jsonify(result)
