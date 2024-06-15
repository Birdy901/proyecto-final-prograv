from flask import Blueprint, jsonify, request
from src.models.BookModel import Libros, libros_schema

main=Blueprint('libro_blueprint', __name__)

@main.route('/libros', methods=['GET'])
def get_libros():
    #Paginado
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 50, type=int)

    libros_pagination = Libros.query.paginate(page=page, per_page=per_page)

    #Resultados
    all_libros = libros_pagination.items
    
    result = libros_schema.dump(all_libros)
    return jsonify(result)
