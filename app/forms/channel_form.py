from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Channel

def channel_exists(form, field):
    # Checking if username is already in use
    title = field.data
    id = form.id.data
    if id:
        channel = Channel.query.filter(Channel.title == title, Channel.id != id).first()
    else:
        channel = Channel.query.filter(Channel.title == title).first()

    if channel:
        raise ValidationError('Channel Title is already in use.')

def length_check(form, field):
    title = field.data
    if len(title) > 255:
        raise ValidationError('Message must be less than 255 characters')

class ChannelForm(FlaskForm):
    admin_id: IntegerField('admin_id',validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired(message='Channel title is required'), channel_exists, length_check])
    id = IntegerField('id')
