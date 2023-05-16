from .db import db, environment, SCHEMA, UniqueConstraint, add_prefix_for_prod
from .message import messages
from .member import members
class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    admin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(255), nullable=False)

    channels_users = db.relationship("User", back_populates="users_channels", cascade="all, delete-orphan")
    channels_messages = db.relationship("User", secondary=messages, back_populates="users_messages", cascade="all, delete-orphan")
    channels_members = db.relationship("User", secondary=members, back_populates="users_members", cascade="all, delete-orphan")
