from flask import Blueprint, request, make_response
from app.models import db, members
from flask_login import current_user, login_required

member_routes = Blueprint('members', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages



@member_routes.route('/channel/<int:channelId>', methods=['POST'])
def create_member(channelId):
    user_id = request.get_json()
    db.session.execute(members.insert().values(user_id=user_id, channel_id = channelId))
    db.session.commit()
    return 'success'
