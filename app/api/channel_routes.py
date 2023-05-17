from flask import Blueprint, request, make_response
from app.models import Channel, db
from flask_login import current_user, login_required

channel_routes = Blueprint('channels', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@channel_routes.route('/<int:channelId>')
def get_channel_by_id(channelId):
    channel = Channel.query.get(channelId)
    return channel.to_dict_relationship()
