import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadChannelByIdThunk } from "../../store/channel"
import { useParams } from "react-router-dom"
import './ChannelById.css'
import { createMessageThunk } from "../../store/message"
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
    }

    if(getChannel.id !== Number(channelId)) return null
    console.log(getChannel.id, 'MY CHANNEL', Number(channelId))
    return (
        <section className="ChannelById">
            {getChannel.messages.map((message) =>(
                <div className="chat">
                    <p className="chat-name">{message.user.first_name} {message.user.last_name}</p>
                    <p>{message.message}</p>
                </div>
            ))}
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Post Message</button>
            </form>
        </section>
    )
}

export default ChannelById
