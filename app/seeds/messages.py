from app.models import db, User, environment, SCHEMA, Message, Channel
from sqlalchemy.sql import text

def seed_messages():
    message1 = Message(
        user_id = User.query.filter(User.username == 'DemoUser').first().id,
        channel_id = Channel.query.filter(Channel.title == 'Demo Channel').first().id,
        message = 'Hey dood'
    )
    message2 = Message(
        user_id = User.query.filter(User.username == 'DemoAdmin').first().id,
        channel_id = Channel.query.filter(Channel.title == 'Demo Channel').first().id,
        message = 'Hey man'
    )
    message3 = Message(
        user_id = User.query.filter(User.username == 'DemoUser').first().id,
        channel_id = Channel.query.filter(Channel.title == 'Another Demo Channel').first().id,
        message = 'Why did you make another channel?'
    )
    message4 = Message(
        user_id = User.query.filter(User.username == 'DemoAdmin').first().id,
        channel_id = Channel.query.filter(Channel.title == 'Another Demo Channel').first().id,
        message = 'You messed up bad'
    )


    all_messages = [message1, message2, message3, message4]
    for message in all_messages:
        db.session.add(message)
    db.session.commit()

def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
