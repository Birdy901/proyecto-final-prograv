from flask import Blueprint, jsonify, request, make_response
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, unset_jwt_cookies

from src.models.UserModel import Usuario
from src.models.database import db

main=Blueprint('auth_blueprint', __name__)

@main.route('/register', methods=['POST'])
def registrar_usuario():
    email = request.json["Email"]
    password = request.json["Password"]
    nombre = request.json["Nombre"]

    if Usuario.query.filter_by(Email=email).first():
        return jsonify({"msg": "Ya existe un usuario con este correo electronico"}), 400

    new_user = Usuario(Email=email, Nombre=nombre)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "Email": email, 
        "msg": "El usuario ha sido creado correctamente"}), 201

@main.route('/login', methods=['POST'])
def login():
    email = request.json["Email"]
    password = request.json["Password"]
    
    usuario = Usuario.query.filter_by(Email=email).first()

    if usuario is None:
        return jsonify({"error":"No autorizado"}), 401
    
    if usuario and usuario.check_password(password):
        access_token = create_access_token(identity=usuario.Id_Usuario)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"error":"Contraseña o Email incorrectos"}), 401

@main.route('/logout', methods=['POST'])
def logout():
    response = make_response(jsonify({"msg": "Cierre de sesión exitoso"}))
    unset_jwt_cookies(response)
    return response, 200

@main.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    return jsonify(logged_in_as=current_user_id), 200
