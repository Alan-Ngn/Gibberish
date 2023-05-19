import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadChannelByIdThunk } from "../../store/channel"
import { useParams } from "react-router-dom"
import './ChannelById.css'
import { createMessageThunk } from "../../store/message"
import MessageDropdown from "../MessageMenu"


const ChannelById = () => {
    const dispatch = useDispatch()
    const { channelId } = useParams()
    const [message, setMessage] = useState('')
    const [messagePayload, setMessagePayload] = useState({})
    const getChannel = useSelector(state => state.channels)
	const sessionUser = useSelector(state => state.session.user);
    const messageObj ={}
    const updateMessage = (e) => setMessage(e.target.value)

    useEffect(() => {
        if(getChannel.id !== Number(channelId)){
            dispatch(loadChannelByIdThunk(channelId))
        }
    },[dispatch, channelId])

    useEffect(()=>{
        messageObj.message = message

        setMessagePayload(messageObj)
    },[message])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createMessageThunk(messagePayload, channelId, sessionUser.id))
        setMessage('')
    }

    if(getChannel.id !== Number(channelId)) return null
    // console.log(getChannel.id, 'MY CHANNEL', Number(channelId))
    // console.log(sessionUser.id, getChannel.messages[0].user_id)
    return (
        <section className="ChannelById">
            <div className="chat-area">
                <h2>{getChannel.title}</h2>
            {getChannel.messages.map((message) =>(
                <div className="chat">
                    <p className="chat-name">{message.user.first_name} {message.user.last_name}</p>
                    <div className="message">
                    <p>{message.message}</p>
                    {sessionUser.id === message.user_id && (
                        <MessageDropdown id={message.id} channelId={channelId}/>
                    )}
                    </div>
                </div>
            ))}
            </div>
            <form className="chat-form" onSubmit={handleSubmit}>
                <textarea
                    className="chat-box"
                    name="message"
                    id="message"
                    type="text"
                    placeholder={`Message ${getChannel.title}`}
                    value={message}
                    onChange={updateMessage}
                >
                </textarea>
                <button className="message-button" type="submit"><i class="fa-sharp fa-solid fa-arrow-right-to-bracket"></i></button>
            </form>
        </section>
    )
}

export default ChannelById
