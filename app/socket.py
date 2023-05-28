from flask_socketio import SocketIO, emit
import os
from app.models import Message, db, Reply, Channel, members, User
# socketio = SocketIO()

#! Needs to be changed for RENDER
if os.environ.get("FLASK_ENV") == "production":
    origins = ['http://gibberish-z0ju.onrender.com', 'https://gibberish-z0ju.onrender.com']
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle thread messages
@socketio.on("chat")
def handle_chat(data):
    if data != "User connected!":
        if data['type'] == 'message-POST':
            message = Message(
                user_id=data['userId'],
                channel_id=data['channelId'],
                message=data['message'],
            )
            db.session.add(message)
            db.session.commit()
        if data['type'] == 'message-PUT':
            message = Message.query.get(data["id"])
            message.message = data['message']
            db.session.add(message)
            db.session.commit()
        if data['type'] == 'message-DELETE':
            message = Message.query.get(data["id"])
            db.session.delete(message)
            db.session.commit()

        if data['type'] == 'reply-POST':
            reply = Reply(
                user_id=data['userId'],
                message_id=data['messageId'],
                reply=data['reply'],
            )
            db.session.add(reply)
            db.session.commit()
        if data['type'] == 'reply-PUT':
            reply = Reply.query.get(data['id'])
            reply.reply =data['reply']
            db.session.add(reply)
            db.session.commit()
        if data['type'] == 'reply-DELETE':
            reply = Reply.query.get(data['id'])
            db.session.delete(reply)
            db.session.commit()

        if data['type'] == 'channel-POST':
            print(data, 'channel post')
            channel = Channel(
                title=data['title'],
                admin_id=data['admin_id']
            )
            db.session.add(channel)
            db.session.commit()

            for member in data['members']:
                db.session.execute(members.insert().values(user_id=member, channel_id = channel.to_dict()['id']))
                db.session.commit()

        if data['type'] == 'channel-PUT':
            channel = Channel.query.get(data['id'])
            # print(data, 'channel post')
            channel.title = data['title']
            db.session.add(channel)
            db.session.commit()
        if data['type'] == 'channel-DELETE':
            channel = Channel.query.get(data["id"])
            db.session.delete(channel)
            db.session.commit()

        if data['type'] == 'member-DELETE':
            db.session.execute(members.delete().where(members.c.user_id==data['deleteMember']).where(members.c.channel_id==data['id']))
            db.session.commit()

        if data['type'] == 'member-POST':
            db.session.execute(members.insert().values(user_id=data['addMember'], channel_id = data['id']))
            db.session.commit()
    print(data, 'chat data?')
    emit("chat", data, broadcast=True)

# handle reply messages
# @socketio.on("all")
# def handle_all(data):
#     print(data,'what is this data?')
#     emit("all", data, broadcast=True)
# {'id': 31, 'username': 'lolfffffffsafdasfadf', 'email': 'lasdffffsfdfk@aa.io', 'first_name': 'lolf', 'last_name': 'llolf', 'profile_pic': None, 'admin': False} what is this data?
# {'message': 'test', 'userId': 2, 'channelId': '14', 'type': 'message-POST'} chat data?
# @socketio.on("editMessage")
# def handle_edit_chat(data):
#     print('we in here')
#     if data != "User connected!":
#         message = Message.query.get(data["id"])
#         message.message = data['message']
#         db.session.add(message)
#         db.session.commit()
#     emit("editMessage", data, broadcast=True)
