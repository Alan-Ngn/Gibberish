from .db import db, environment, SCHEMA, add_prefix_for_prod
from .member import members
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    profile_pic = db.Column(db.String(255), nullable=True)
    admin = db.Column(db.Boolean, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)


    users_channels = db.relationship("Channel", back_populates="channels_users", cascade="all, delete-orphan")
    users_messages = db.relationship("Message", back_populates="messages_users", cascade="all, delete-orphan")
    users_members = db.relationship("Channel", secondary=members, back_populates="channels_members")
    users_replies = db.relationship("Reply", back_populates="replies_users", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'profile_pic': self.profile_pic,
            'admin': self.admin
        }

    def to_dict_relationship(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'profile_pic': self.profile_pic,
            'admin': self.admin,
            'admin_channels': [channel.to_dict() for channel in self.users_channels],
            'messages': [message.to_dict() for message in self.users_messages],
            'channels': [channel.to_dict_relationship() for channel in self.users_members],
            'replies': [reply.to_dict() for reply in self.users_replies]
        }
