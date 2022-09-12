import pdb

from model import Document, db, Invoice
from flask import Blueprint, request, jsonify
from utils import model_to_dict, models_to_list
from thentic_client import Client
from const import THENTIC_CALLBACK_URL, THENTIC_KEY, CHAIN_ID

router_bp = Blueprint('router', __name__)


@router_bp.route('/')
def index():
    return "It works!"


@router_bp.route('/api/documents')
def fetch_documents():
    page = int(request.args.get('page', 0))+1
    page_size = int(request.args.get('page_size', 20))
    offset = (page-1)*page_size
    docs = Document.query.order_by(Document.id.desc()).offset(offset).limit(page_size).all()
    docs = models_to_list(docs)

    count = Document.query.count()
    for doc in docs:
        del doc['document']

    return jsonify({
        'documents': docs,
        'count': count
    })


@router_bp.route('/submit/document', methods=['POST'])
def submit_document():
    # save info which user submited
    body = request.get_json()
    doc = Document(
        desc=body['desc'],
        document=body['document'],
        to=body['to'],
        amount=body['amount']
    )
    db.session.add(doc)
    db.session.commit()
    return jsonify({
        'document': model_to_dict(doc)
    })


@router_bp.route('/doc/<doc_id>')
def render_doc(doc_id: int = 0):
    # if user is paid, also render result.
    doc = Document.query.filter(Document.id == doc_id).scalar()
    doc = model_to_dict(doc)
    del doc['document']
    return jsonify({
        'document': doc
    })


@router_bp.route('/api/submit/invoice', methods=['POST'])
def submit_invoice():
    body = request.get_json()
    doc_id = int(body['document_id'])
    doc = Document.query.filter(Document.id == doc_id).scalar()
    client = Client(key=THENTIC_KEY, chain_id=CHAIN_ID, webhook_url=THENTIC_CALLBACK_URL)
    res = client.create_invoice(CHAIN_ID, doc.amount, doc.to)
    invoice = Invoice(
        document_id=doc.id,
        request_id=res.request_id
    )
    db.session.add(invoice)
    db.session.commit()
    return jsonify({
        'invoice': model_to_dict(invoice)
    })


@router_bp.route('/api/invoices')
def get_invoices():
    address = request.args.get('address', None)
    assert address

    invoices = Invoice.query.filter(Invoice.submitter == address).all()
    return jsonify({
        'invoices': models_to_list(invoices)
    })


@router_bp.route('/api/thentic/call/back')
def callback():
    pass
