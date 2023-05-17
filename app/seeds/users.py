from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo_user = User(
        username='DemoUser',
        email='demo@aa.io',
        password='password',
        admin=False,
        first_name='Demo',
        last_name='User',
        status='Active'
    )
    demo_admin = User(
        username='DemoAdmin',
        email='admin@aa.io',
        password='password',
        admin=True,
        first_name='Demo',
        last_name='Admin',
        status='Active'
    )

    all_users = [demo_user, demo_admin]
    for user in all_users:
        existing_user = User.query.filter_by(username=user.username).first()
        if not existing_user:
            db.session.add(user)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
