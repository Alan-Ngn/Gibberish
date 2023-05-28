import { useSelector } from "react-redux"
import { useMessage } from "../../context/EditMessage"
import './replies.css'
import ReplyBox from "../ReplyBox";
import ReplyConfirmDeleteButton from "../ReplyConfirmDeleteButton";
import ReplyEditDeleteButton from "../ReplyEditDeleteButton";
import ReplyThread from "../ReplyThread";

const Replies = ({socket}) => {
    const { openReply, setOpenReply, messageReplyId, channelReplyId, isReplyDelete, replyEditDelete, replyId } = useMessage()
	const sessionUser = useSelector(state => state.session.user);

    const channel = sessionUser.channels.filter(channel => channel.id === Number(channelReplyId))[0]

    if (typeof channel === 'undefined') return null
    const messageById = sessionUser.channels.filter(channel => channel.id === Number(channelReplyId))[0].messages.filter(message=>message.id===messageReplyId)[0]
    if (typeof messageById === 'undefined') return null
    const handleClose = (e) => {
        setOpenReply(false)
    }

    return (
        <>
        {openReply &&

(        <section className="replies-thread">
            <h2>Thread</h2><h3>{messageById.channel.title}</h3><button onClick={handleClose}><i class="fa-solid fa-xmark"></i></button>
            <p>{messageById.user.first_name} {messageById.user.last_name}</p>
            <p>{messageById.message}</p>
            {(messageById.replies.map((reply) => (
                <div className="chat">
                    <ReplyThread socket={socket} reply={reply} messageById={messageById} />
                    {sessionUser.id === reply.user_id && replyEditDelete &&(
                        <ReplyEditDeleteButton reply={reply} />
                    )}
                    {sessionUser.id === reply.user_id && replyId === reply.id && isReplyDelete && (
                        <ReplyConfirmDeleteButton socket={socket} replyId={replyId} messageById={messageById}/>
                    )}
                </div>
            )))}
            <ReplyBox socket={socket} messageById={messageById} channel={channel} sessionUser={sessionUser}/>
        </section>)
        }
        </>
    )
}

export default Replies
