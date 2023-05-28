import { useEffect, useState } from "react";
import { createReplyThunk } from "../../store/reply";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/session";
import { io } from 'socket.io-client';

let socket;

const ReplyBox = ({messageById, channel, sessionUser}) => {
    const dispatch = useDispatch()
    const [err, setErr] = useState('')
    const [reply, setReply] = useState('')
    const [replyPayload, setReplyPayload] = useState({})
    const replyObj ={}
    const ulClassName = "reply-box" + (err ? "-error" : "");
    const updateReply = (e) => setReply(e.target.value)


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

    useEffect(()=>{
        replyObj.reply = reply
        replyObj.userId = sessionUser.id
        replyObj.messageId = messageById.id
        setReplyPayload(replyObj)
    },[reply])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(replyPayload.reply.length === 0) {
            setErr(['Please enter a message'])
        } else if (replyPayload.reply.length > 255) {
            setErr(['Message must be less than 255 characters'])
        } else {
            socket.emit('reply', replyPayload)
            setReply('')
        }
        // const data = await dispatch(createReplyThunk(replyPayload, messageById.id, sessionUser.id, channel.id))
        // setReply('')
        // if (data) {
        //     setErr(data)
        // } else {
        //     setErr('')
        // }
    }

    return (
        <form className='reply-form' onSubmit={handleSubmit}>
            <div className="reply-area">
                <input
                    className={ulClassName}
                    name="message"
                    id="message"
                    type="text"
                    placeholder={err.length > 0 ? (err[0]) :`Reply...`}
                    value={reply}
                    onChange={updateReply}
                >
                </input>
                <div className="message-box">

                {reply.length === 0 ? <p>Maximum Character Limit: 255</p> : reply.length > 255 ? <p className="char-over-limit">{`${reply.length - 255} Characters Over Limit`}</p> : <p>{`${255-reply.length} Characters Remaining`}</p>}
                </div>
            </div>
            <button className="message-button" type="submit"><i class="fa-sharp fa-solid fa-arrow-right-to-bracket"></i></button>
        </form>

    )
}

export default ReplyBox
