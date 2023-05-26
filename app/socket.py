from flask_socketio import SocketIO, emit
import os
from app.models import Message,db
socketio = SocketIO()

#! Needs to be changed for RENDER
if os.environ.get("FLASK_ENV") == "production":
    origins = []
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    if data != "User connected!":
        message = Message(
            user_id=data['userId'],
            channel_id=data['channelId'],
            message=data['message'],
        )
        db.session.add(message)
        db.session.commit()
    emit("chat", data, broadcast=True)
