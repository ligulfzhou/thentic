from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import DOUBLE_PRECISION

db = SQLAlchemy()


class Document(db.Model):
    __tablename__ = 'document'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text)
    document = db.Column(db.Text)
    to = db.Column(db.Text)
    amount = db.Column(DOUBLE_PRECISION)


class Invoice(db.Model):
    __tablename__ = 'invoice'

    id = db.Column(db.Integer, primary_key=True)
    document_id = db.Column(db.Integer, ForeignKey('document.id'))
    request_id = db.Column(db.Text)
    submitter = db.Column(db.Text)
