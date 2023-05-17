from app.models import db, User, environment, SCHEMA, Channel
from sqlalchemy.sql import text

def seed_channels():
    demo_channel = Channel(
        admin_id = User.query.filter(User.username == 'DemoAdmin').first().id,
        title = 'Demo Channel'
    )
    another_demo_channel = Channel(
        admin_id = User.query.filter(User.username == 'DemoAdmin').first().id,
        title = 'Another Demo Channel'
    )


    all_channels = [demo_channel, another_demo_channel]
    for channel in all_channels:
        existing_channel = Channel.query.filter_by(title=channel.title).first()
        if not existing_channel:
            db.session.add(channel)
    db.session.commit()

def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
