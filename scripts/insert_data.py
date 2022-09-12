from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import class_mapper
from sqlalchemy.dialects.postgresql import BIGINT, INTEGER, TEXT, DOUBLE_PRECISION


Base = declarative_base()


class Document(Base):
    __tablename__ = 'document'

    id = Column(INTEGER, primary_key=True)
    description = Column(TEXT)
    document = Column(TEXT)
    to = Column(TEXT)
    amount = Column(DOUBLE_PRECISION)


class Invoice(Base):
    __tablename__ = 'invoice'

    id = Column(INTEGER, primary_key=True)
    document_id = Column(INTEGER, ForeignKey('document.id'))
    request_id = Column(TEXT)
    submitter = Column(TEXT)


def _model2dict(model):
    if not model:
        return {}

    fields = class_mapper(model.__class__).columns.keys()
    return dict((col, getattr(model, col)) for col in fields)


def model_to_dict(model):
    if not model:
        return {}

    return _model2dict(model)


def models_to_list(models):
    if not models:
        return []
    return [model_to_dict(model) for model in models]


class DB:

    def __init__(self, db_str):
        engine = create_engine(db_str, echo=True)
        self.session = Session(engine)

    def get_models(self, model):
        datasets = self.session.query(eval(model)).all()
        return models_to_list(datasets)

    def save_models(self, model: str, datas=[]):
        m = eval(model)
        models = [m(**data) for data in datas]
        self.session.bulk_save_objects(models)
        self.session.commit()


db_str = 'postgresql://ligulfzhou:POSTGRESzlg153@127.0.0.1/thentic'
db = DB(db_str)


def main():
    documents = []
    for idx in range(1, 100):
        documents.append({
            'document': f'this is content of document {idx}, the content is very valuable, pay 2 view',
            'description': f'this is document {idx}, pay to view',
            'to': '0x2A0CFDe00155b19a7Cf625c1c68d905e55adcf7b',
            'amount': 1
        })

    db.save_models('Document', documents)


if __name__ == '__main__':
    main()
