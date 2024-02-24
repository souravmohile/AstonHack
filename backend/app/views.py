from app import app
from flask import jsonify


@app.route('/api/hello', methods=["GET"])
def get_hello():
    hello = {"hello": "there"}
    return jsonify(hello)