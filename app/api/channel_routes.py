from flask import Blueprint, request, make_response
from app.models import Channel, db
from flask_login import current_user, login_required
from app.forms import ChannelForm
from app.socket import socketio
channel_routes = Blueprint('channels', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@channel_routes.route('/<int:channelId>')
def get_channel_by_id(channelId):
    channel = Channel.query.get(channelId)
    return channel.to_dict_relationship()


@channel_routes.route('/new/<int:id>', methods=['POST'])
def create_channel(id):
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_channel = Channel(
            title = form.data['title'],
            admin_id = id
        )
        db.session.add(new_channel)
        db.session.commit()
        socketio.emit('chat')
        return new_channel.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@channel_routes.route('/<int:channelId>', methods=['DELETE'])
def delete_channel(channelId):
    channel = Channel.query.get(channelId)
    deleted_channel = channel.to_dict()
    db.session.delete(channel)
    db.session.commit()
    socketio.emit('chat')
    return deleted_channel

@channel_routes.route('/<int:channelId>/edit', methods=['PUT'])
def edit_channel(channelId):
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel = Channel.query.get(channelId)
        channel.title = form.data['title']
        db.session.add(channel)
        db.session.commit()
        socketio.emit('chat')
        return channel.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
