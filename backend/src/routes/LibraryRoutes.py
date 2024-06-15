from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from src.models.LibraryModel import Biblioteca, biblioteca_schema, bibliotecas_schema
from src.models.UserModel import Usuario
from src.models.BookModel import Libros
from src.models.database import db

main=Blueprint('biblioteca_blueprint', __name__)

@main.route('/biblioteca', methods=['GET'])
@jwt_required()
def get_libros():
    id_Usuario = get_jwt_identity()

    #Paginado
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 50, type=int)

    biblioteca_pagination = Biblioteca.query.filter_by(Id_Usuario=id_Usuario).paginate(page=page, per_page=per_page)

    #Resultados
    bibliotecas = biblioteca_pagination.items

    result = bibliotecas_schema.dump(bibliotecas)
    return jsonify(result)

@main.route('/biblioteca', methods=['POST'])
@jwt_required()
def agregar_biblioteca():
    id_Usuario = get_jwt_identity()
    id_Libro = request.json['Id_Libro']
    estado = request.json['Estado']

    biblioteca_exists = db.session.query(Biblioteca).filter_by(Id_Usuario=id_Usuario, Id_Libro=id_Libro).first()
    
    if biblioteca_exists:
        return jsonify({'error': 'El usuario ya tiene este libro registrado'}), 400

    new_biblioteca = Biblioteca(Id_Usuario=id_Usuario, Id_Libro=id_Libro, Estado=estado)
    db.session.add(new_biblioteca)
    db.session.commit()
    
    return jsonify({"msg": "Libro guardado"})

@main.route('/biblioteca/<id>', methods=['PUT'])
@jwt_required()
def marcar_leido(id):
    id_Usuario = get_jwt_identity()
    biblioteca = Biblioteca.query.filter_by(Id_Biblioteca=id, Id_Usuario=id_Usuario).first_or_404()
    
    biblioteca.Estado = request.json['Estado']
    db.session.commit()
    
    return jsonify({"msg": "Libro leido"})

@main.route('/biblioteca/<id>', methods=['DELETE'])
@jwt_required()
def delete_biblioteca(id):
    id_Usuario = get_jwt_identity()
    biblioteca = Biblioteca.query.filter_by(Id_Biblioteca=id, Id_Usuario=id_Usuario).first_or_404()
    
    db.session.delete(biblioteca)
    db.session.commit()
    
    return jsonify({"msg": "Libro eliminado"})