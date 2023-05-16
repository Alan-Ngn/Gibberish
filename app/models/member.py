from .db import db, environment, SCHEMA, UniqueConstraint, add_prefix_for_prod

members = db.Table(
    'members',
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True ),
    db.Column('channels', db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')), primary_key=True )
)

if environment == "production":
    members.schema = SCHEMA
