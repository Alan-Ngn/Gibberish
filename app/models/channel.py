from .db import db, environment, SCHEMA, UniqueConstraint, add_prefix_for_prod
from .member import members
class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    admin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=True)
    title = db.Column(db.String(255), nullable=False)

    channels_users = db.relationship("User", back_populates="users_channels")
    channels_messages = db.relationship("Message", back_populates="messages_channels", cascade="all, delete-orphan")
    channels_members = db.relationship("User", secondary=members, back_populates="users_members")

    def to_dict(self):
        return{
            'id': self.id,
            'admin_id': self.admin_id,
            'title': self.title
        }

    def to_dict_relationship(self):
        return{
            'id': self.id,
            'admin_id': self.admin_id,
            'title': self.title,
            'messages': [message.to_dict() for message in self.channels_messages],
            'members': [member.to_dict() for member in self.channels_members]
        }
