from .db import db, environment, SCHEMA, UniqueConstraint, add_prefix_for_prod, func

class Reply(db.Model):
    __tablename__ = 'replies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    message_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('messages.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    reply = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())

    replies_messages = db.relationship("Message", back_populates="messages_replies")
    replies_users = db.relationship("User", back_populates="users_replies")
    def to_dict(self):
        return {
            'id': self.id,
            'message_id': self.message_id,
            'user_id': self.user_id,
            'reply': self.reply,
            'created_at': self.created_at,
            'user': self.replies_users.to_dict()
        }

    def to_dict_relationship(self):
        return {
            'id': self.id,
            'message_id': self.message_id,
            'user_id': self.user_id,
            'reply': self.reply,
            'created_at': self.created_at,
            'message': self.replies_messages.to_dict(),
            'user': self.replies_users.to_dict()
        }
