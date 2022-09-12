from flask import Flask
from model import db
from route import router_bp
from const import DATABASE_URL
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    CORS(app)
    with app.app_context():
        db.create_all()

    app.register_blueprint(router_bp)
    return app
