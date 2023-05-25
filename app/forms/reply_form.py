from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


def length_check(form, field):
    reply = field.data
    if len(reply) > 255:
        raise ValidationError('Message must be less than 255 characters')

class ReplyForm(FlaskForm):
    reply = StringField('reply', validators=[DataRequired(message="Please enter a message"), length_check])
