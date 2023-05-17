from .db import db, environment, SCHEMA, UniqueConstraint, add_prefix_for_prod, func

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')), nullable=False)
    message = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, server_default=func.now())

    messages_users = db.relationship("User", back_populates="users_messages")
    messages_channels = db.relationship("Channel", back_populates="channels_messages")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'channel_id': self.channel_id,
            'message': self.message,
            'created_at': self.created_at,
            'user': self.messages_users.to_dict()
        }
