import { useMessage } from "../../context/EditMessage"
import { useEffect } from "react"

import './ChatBox.css'


const ChatBox = ({socket, channelId, sessionUser, getChannel}) => {
    const messageObj ={}
    const {err, setErr, messagePayload, setMessagePayload, message, setMessage} = useMessage()
    const updateMessage = (e) => setMessage(e.target.value)
    const ulClassName = "chat-box" + (err ? "-error" : "");

    useEffect(()=>{
        messageObj.message = message
        messageObj.userId = sessionUser.id
        messageObj.channelId = channelId
        messageObj.type = 'message-POST'
        setMessagePayload(messageObj)
    },[message])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr('')
        if (messagePayload.message.length === 0){
            setErr(['Please enter a message'])
        } else if (messagePayload.message.length > 255){
            setErr(['Message must be less than 255 characters'])
        } else {
            socket.emit("chat", messagePayload);
            setMessage('')
            setErr('')
        }
        // if (data) {
        //     setErr(data)
        // } else {
        //     setErr('')
        // }
    }

    return (
        <form className='chat-form' onSubmit={handleSubmit}>
            <div className="chat-input">
                <input
                    className={ulClassName}
                    name="message"
                    id="message"
                    type="text"
                    placeholder={err.length > 0 ? (err[0]) : `Message ${getChannel.title}`}
                    value={message}
                    onChange={updateMessage}
                >
                </input>
                <button className="message-button" type="submit"><i class="fa-sharp fa-solid fa-arrow-right-to-bracket"></i></button>
            </div>
                <div className="message-box">
                    {message.length === 0 ? <p>Maximum Character Limit: 255</p> : message.length > 255 ? <p className="char-over-limit">{`${message.length - 255} Characters Over Limit`}</p> : <p>{`${255-message.length} Characters Remaining`}</p>}
                </div>
        </form>
    )
}

export default ChatBox
