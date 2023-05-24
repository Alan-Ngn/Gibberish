from app.models import db, User, environment, SCHEMA, Message, Reply
from sqlalchemy.sql import text

def seed_replies():
    reply1 = Reply(
        message_id = Message.query.filter(Message.message == 'Hey dood').first().id,
        user_id = User.query.filter(User.username == 'DemoAdmin').first().id,
        reply = 'Sup man'
    )
    reply2 = Reply(
        message_id = Message.query.filter(Message.message == 'Hey man').first().id,
        user_id = User.query.filter(User.username == 'DemoUser').first().id,
        reply = 'Sup man'
    )
    reply3 = Reply(
        message_id = Message.query.filter(Message.message == 'Why did you make another channel?').first().id,
        user_id = User.query.filter(User.username == 'DemoAdmin').first().id,
        reply = 'Cus I felt like it'
    )
    reply4 = Reply(
        message_id = Message.query.filter(Message.message == 'You messed up bad').first().id,
        user_id = User.query.filter(User.username == 'DemoAdmin').first().id,
        reply = 'Real BAD'
    )


    all_replies = [reply1, reply2, reply3, reply4]
    for reply in all_replies:
        db.session.add(reply)
    db.session.commit()

def undo_replies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.replies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM replies"))

    db.session.commit()
