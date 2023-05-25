from flask import Blueprint, request, make_response
from app.models import Message, db
from flask_login import current_user, login_required
from app.forms import MessageForm
message_routes = Blueprint('messages', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@message_routes.route('/<int:id>')
def get_message_by_id(id):
    message = Message.query.get(id)
    return message.to_dict()

@message_routes.route('/channel/<int:channel_id>/user/<int:user_id>', methods=['POST'])
def create_message(channel_id, user_id):
    print('inside the backend message route', channel_id, user_id)
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_message = Message(
            user_id = user_id,
            channel_id = channel_id,
            message = form.data['message'],
        )
        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@message_routes.route('/<int:id>', methods=['DELETE'])
def delete_message(id):
    message = Message.query.get(id)
    deleted_message = message.to_dict()
    db.session.delete(message)
    db.session.commit()
    return deleted_message

@message_routes.route('/<int:id>/edit', methods=['PUT'])
def edit_message(id):
    form = MessageForm()
    print('inside backend for update message', id, form.data['message'])
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message = Message.query.get(id)
        message.message = form.data['message']
        db.session.add(message)
        db.session.commit()
        return message.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
