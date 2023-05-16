from .db import db, environment, SCHEMA, add_prefix_for_prod
from .member import members
from .message import messages
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
    status = db.Column(db.String(20), nullable=False)
    admin = db.Column(db.Boolean, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)


    users_channels = db.relationship("Channel", back_populates="users_channels", cascade="all, delete-orphan")
    users_messages = db.relationship("Channel", secondary=messages, back_populates="channels_messages", cascade="all, delete-orphan")
    users_members = db.relationship("Channel", secondary=members, back_populates="channels_members", cascade="all, delete-orphan")

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
            'email': self.email
        }
