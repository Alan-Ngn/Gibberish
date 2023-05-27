import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import './ChannelById.css'
import { useMessage } from "../../context/EditMessage"

import EditDeleteButton from "../EditDeleteButton"
import ConfirmDeleteButton from "../ConfirmDeleteButton"
import Thread from "../Thread"
import ChatBox from "../ChatBox"
import Replies from "../Replies"


const ChannelById = () => {

    const { messageId, editDelete, isDelete } = useMessage()
    const { channelId } = useParams()

	const sessionUser = useSelector(state => state.session.user);
    const channel = sessionUser.channels.filter(channel => channel.id === Number(channelId))[0]
    if(typeof channel === 'undefined') {
        return null
    }

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
