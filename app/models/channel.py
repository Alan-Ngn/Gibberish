from .db import db, environment, SCHEMA, UniqueConstraint, add_prefix_for_prod

class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
