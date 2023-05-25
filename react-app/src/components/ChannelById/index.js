import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadChannelByIdThunk } from "../../store/channel"
import { useParams } from "react-router-dom"
import './ChannelById.css'
import { useMessage } from "../../context/EditMessage"

import EditDeleteButton from "../EditDeleteButton"
import ConfirmDeleteButton from "../ConfirmDeleteButton"
import Thread from "../Thread"
import ChatBox from "../ChatBox"


const ChannelById = () => {
    const dispatch = useDispatch()
    const { messageId, editDelete, isDelete } = useMessage()
    const { channelId } = useParams()
    const getChannel = useSelector(state => state.channels)
	const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        if(getChannel.id !== Number(channelId)){
            dispatch(loadChannelByIdThunk(channelId))
        }
    },[dispatch, channelId])

    if(getChannel.id !== Number(channelId)) return null

    return (
        <section className="ChannelById">
            <div className="chat-area-wrapper">
                <div className="chat-area">
                    <h2>{getChannel.title}</h2>
                {getChannel.messages.map((message) =>(
                    <div className="chat">
                        <Thread message={message} channelId={channelId}/>
                        {sessionUser.id === message.user_id && editDelete && (
                            <EditDeleteButton message={message}/>
                        )}
                        {sessionUser.id === message.user_id && messageId === message.id && isDelete && (
                            <ConfirmDeleteButton channelId={channelId}/>
                        )}
                    </div>
                ))}
                </div>
                <ChatBox channelId={channelId} getChannel={getChannel} sessionUser={sessionUser}/>
            </div>
        </section>
    )
}

export default ChannelById
