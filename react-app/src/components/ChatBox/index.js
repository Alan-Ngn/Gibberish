import { useDispatch } from "react-redux"
import { useMessage } from "../../context/EditMessage"
import { createMessageThunk } from "../../store/message"
import { useEffect } from "react"
import { io } from 'socket.io-client';
import './ChatBox.css'
import { authenticate } from "../../store/session";

let socket;

const ChatBox = ({channelId, sessionUser, getChannel}) => {
    const dispatch = useDispatch()
    const messageObj ={}
    const {err, setErr, messagePayload, setMessagePayload, message, setMessage} = useMessage()
    const updateMessage = (e) => setMessage(e.target.value)
    const ulClassName = "chat-box" + (err ? "-error" : "");

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();
        // dispatch(getDMS(userId,ownerId))
        socket.on("chat", (chat) => {
            // Whenver a chat is sent, Dispatch our fetch to get all messages and set the messages to the returned list
            dispatch(authenticate())
            // let msgArr = Object.values(msg)
            // setMessages(...msgArr)

        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    useEffect(()=>{
        messageObj.message = message
        messageObj.userId = sessionUser.id
        messageObj.channelId = channelId
        setMessagePayload(messageObj)
    },[message])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const data = await dispatch(createMessageThunk(messagePayload, channelId, sessionUser.id))
        socket.emit("chat", messagePayload);
        setMessage('')
        // if (data) {
        //     setErr(data)
        // } else {
        //     setErr('')
        // }
    }

    return (
        <form className='chat-form' onSubmit={handleSubmit}>
            <div className="chat-textarea">
                <textarea
                    className={ulClassName}
                    name="message"
                    id="message"
                    type="text"
                    placeholder={err.length > 0 ? (err[0]) : `Message ${getChannel.title}`}
                    value={message}
                    onChange={updateMessage}
                >
                </textarea>
                <div className="message-box">

                {message.length === 0 ? <p>Maximum Character Limit: 255</p> : message.length > 255 ? <p className="char-over-limit">{`${message.length - 255} Characters Over Limit`}</p> : <p>{`${255-message.length} Characters Remaining`}</p>}
                </div>
            </div>
            <button className="message-button" type="submit"><i class="fa-sharp fa-solid fa-arrow-right-to-bracket"></i></button>
        </form>
    )
}

export default ChatBox