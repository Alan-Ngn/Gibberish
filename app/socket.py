from flask_socketio import SocketIO, emit
import os
from app.models import Message,db, Reply
socketio = SocketIO()

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
    emit("chat", data, broadcast=True)

#handle reply messages
# @socketio.on("reply")
# def handle_reply(data):
#     if data != "User connected!":
#         reply = Reply(
#             user_id=data['userId'],
#             message_id=data['messageId'],
#             reply=data['reply'],
#         )
#         db.session.add(reply)
#         db.session.commit()
#     emit("reply", data, broadcast=True)


# @socketio.on("editMessage")
# def handle_edit_chat(data):
#     print('we in here')
#     if data != "User connected!":
#         message = Message.query.get(data["id"])
#         message.message = data['message']
#         db.session.add(message)
#         db.session.commit()
#     emit("editMessage", data, broadcast=True)
