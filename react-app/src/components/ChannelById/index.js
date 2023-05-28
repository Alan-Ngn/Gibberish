import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import './ChannelById.css'
import { useMessage } from "../../context/EditMessage"

import EditDeleteButton from "../EditDeleteButton"
import ConfirmDeleteButton from "../ConfirmDeleteButton"
import Thread from "../Thread"
import ChatBox from "../ChatBox"
import Replies from "../Replies"
import { authenticate } from "../../store/session";
import { io } from 'socket.io-client';
import { useEffect } from "react"
let socket;

const ChannelById = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();
        socket.on("chat", (chat) => {
            // Whenver a chat is sent, Dispatch our fetch to get all messages and set the messages to the returned list
            dispatch(authenticate())
        })
        socket.on("reply", (chat) => {
            dispatch(authenticate())
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])
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
                                <Thread socket={socket} message={message} channelId={channelId}/>
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
                    <ChatBox socket={socket} channelId={channelId} getChannel={channel} sessionUser={sessionUser}/>
                </div>
                <Replies socket={socket}/>
            </div>
        </section>
    )
}

export default ChannelById
