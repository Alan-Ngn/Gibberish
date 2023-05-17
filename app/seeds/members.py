from app.models import db, User, environment, SCHEMA, Channel, members
from sqlalchemy.sql import text

def seed_members():
    db.session.execute(members.insert().values(user_id=User.query.filter(User.username == 'DemoUser').first().id, channel_id=Channel.query.filter(Channel.title == 'Demo Channel').first().id))
    db.session.execute(members.insert().values(user_id=User.query.filter(User.username == 'DemoUser').first().id, channel_id=Channel.query.filter(Channel.title == 'Another Demo Channel').first().id))
    db.session.execute(members.insert().values(user_id=User.query.filter(User.username == 'DemoAdmin').first().id, channel_id=Channel.query.filter(Channel.title == 'Demo Channel').first().id))
    db.session.execute(members.insert().values(user_id=User.query.filter(User.username == 'DemoAdmin').first().id, channel_id=Channel.query.filter(Channel.title == 'Another Demo Channel').first().id))

    db.session.commit()


def undo_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM members"))

    db.session.commit()
