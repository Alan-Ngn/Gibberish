from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ChannelForm(FlaskForm):
    admin_id: IntegerField('admin_id',validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
