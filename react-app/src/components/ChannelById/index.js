import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import './ChannelById.css'
import { useMessage } from "../../context/EditMessage"

import EditDeleteButton from "../EditDeleteButton"
import ConfirmDeleteButton from "../ConfirmDeleteButton"
import Thread from "../Thread"
import ChatBox from "../ChatBox"
import Replies from "../Replies"


const ChannelById = ({socket}) => {

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
                        <h2 className='content-header'>{`# ${channel.title}`}</h2>
                        <div className="chat-content-channel">
                            {channel.messages.map((message) =>(
                                <div className="chat">
                                    <div className="chat-user">
                                        <i class="fa-solid fa-user"></i>
                                        <Thread socket={socket} message={message} channelId={channelId}/>
                                    </div>
                                    {/* {(sessionUser.id === message.user_id && editDelete) && ( */}
                                        <EditDeleteButton message={message} channelId={channelId} sessionUser={sessionUser}/>
                                    {/* )} */}
                                    {sessionUser.id === message.user_id && messageId === message.id && isDelete && (
                                        <ConfirmDeleteButton socket={socket} channelId={channelId}/>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <ChatBox socket={socket} channelId={channelId} getChannel={channel} sessionUser={sessionUser}/>
                </div>
                <Replies socket={socket}/>
            </div>
        </section>
    )
}

export default ChannelById
