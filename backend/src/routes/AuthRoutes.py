from flask import Blueprint, jsonify, request, abort
from src.models.UserModel import Usuario, usuario_schema
from src.models.database import db
from werkzeug.security import generate_password_hash, check_password_hash

main=Blueprint('auth_blueprint', __name__)

@main.route('/register', methods=['POST'])
def registrar_usuario():
    email = request.json["Email"]
    password = request.json["Password"]
    nombre = request.json["Nombre"]

    user_exists = Usuario.query.filter_by(Email=email).first() is not None

    if user_exists:
        return jsonify({
            "error": "Este usuario ya existe"
        }), 409

    hashed_password = generate_password_hash(password)
    new_user = Usuario(Id_Usuario=None,Email=email, Nombre=nombre,Password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.Id_Usuario,
        "email": new_user.Email
    })

@main.route('/login', methods=['POST'])
def login():
    email = request.json["Email"]
    password = request.json["Password"]
    
    usuario = Usuario.query.filter_by(Email=email).first()

    if usuario is None:
        return jsonify({"error":"No autorizado"}), 401
    
    if not usuario and check_password_hash(Usuario.Password, password):
        return jsonify({"error":"No autorizado"}), 401
    
    return jsonify({
        "message":"Conectado correctamente",
        "Id_Usuario":usuario.i })
