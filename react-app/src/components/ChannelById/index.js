import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadChannelByIdThunk } from "../../store/channel"
import { useHistory, useParams } from "react-router-dom"
import './ChannelById.css'
import { useMessage } from "../../context/EditMessage"

import EditDeleteButton from "../EditDeleteButton"
import ConfirmDeleteButton from "../ConfirmDeleteButton"
import Thread from "../Thread"
import ChatBox from "../ChatBox"
import Replies from "../Replies"


const ChannelById = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { messageId, editDelete, isDelete } = useMessage()
    const { channelId } = useParams()
    // const getChannel = useSelector(state => state.channels)
	const sessionUser = useSelector(state => state.session.user);
    const channel = sessionUser.channels.filter(channel => channel.id === Number(channelId))[0]
    console.log( (typeof channel === 'undefined') , 'testing after channel delete')
    if(typeof channel === 'undefined') {
        history.push('/')
        return null
    }
    // useEffect(() => {
    //     if(getChannel.id !== Number(channelId)){
    //         dispatch(loadChannelByIdThunk(channelId))
    //     }
    // },[dispatch, channelId])

    // if(getChannel.id !== Number(channelId)) return null

    return (
        <section className="ChannelById">
            <div className="chat-area-right-navigation">
                <div className="chat-area-wrapper">
                    <div className="chat-area">
                        <h2>{channel.title}</h2>
                    {channel.messages.map((message) =>(
                        <div className="chat">
                            <div className="chat-user">
                                <i class="fa-solid fa-user"></i>
                                <Thread message={message} channelId={channelId}/>
                            </div>
                            {sessionUser.id === message.user_id && editDelete && (
                                <EditDeleteButton message={message}/>
                            )}
                            {sessionUser.id === message.user_id && messageId === message.id && isDelete && (
                                <ConfirmDeleteButton channelId={channelId}/>
                            )}
                        </div>
                    ))}
                    </div>
                    <ChatBox channelId={channelId} getChannel={channel} sessionUser={sessionUser}/>
                </div>
                <Replies/>
            </div>
        </section>
    )
}

export default ChannelById
