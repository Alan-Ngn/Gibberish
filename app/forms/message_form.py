from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


def length_check(form, field):
    message = field.data
    if len(message) > 255:
        raise ValidationError('Message must be less than 255 characters')

class MessageForm(FlaskForm):
    message = StringField('message', validators=[DataRequired(message="Please enter a message"), length_check])
