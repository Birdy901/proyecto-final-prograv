from flask import Blueprint, jsonify, request

main=Blueprint('index_blueprint', __name__)

@main.route('/')
def index():
    pass