from flask import Blueprint, request, make_response
from app.models import Reply, db
from flask_login import current_user, login_required
from app.forms import ReplyForm
from app.socket import socketio
reply_routes = Blueprint('replies', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@reply_routes.route('/message/<int:message_id>/user/<int:user_id>', methods=['POST'])
def create_reply(message_id, user_id):
    form = ReplyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_reply = Reply(
            user_id = user_id,
            message_id = message_id,
            reply = form.data['reply'],
        )
        db.session.add(new_reply)
        db.session.commit()
        socketio.emit('chat')
        return new_reply.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@reply_routes.route('/<int:reply_id>/edit', methods=['PUT'])
def edit_reply(reply_id):
    form = ReplyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        reply = Reply.query.get(reply_id)
        reply.reply = form.data['reply']
        db.session.add(reply)
        db.session.commit()
        socketio.emit('chat')
        return reply.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@reply_routes.route('/<int:id>', methods=['DELETE'])
def delete_reply(id):
    reply = Reply.query.get(id)
    deleted_reply = reply.to_dict()
    db.session.delete(reply)
    db.session.commit()
    socketio.emit('chat')
    return deleted_reply
