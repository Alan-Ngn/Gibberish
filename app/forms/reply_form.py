from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class ReplyForm(FlaskForm):
    reply = StringField('reply', validators=[DataRequired(message="Please enter a message")])
