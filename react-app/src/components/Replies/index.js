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
            <div className="reply-content-header-wrapper">
                <h2>Thread</h2>
                <p className="reply-title">{`# ${messageById.channel.title}`}</p>
                <button onClick={handleClose}>
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className="reply-content-wrapper">

                <div className="reply-message">
                    <div className="reply-chat-user">
                        <i class="fa-solid fa-user"></i>
                        <div className="chat-user-message">
                            <p>{messageById.user.first_name} {messageById.user.last_name}</p>
                            <p className="message">{messageById.message}</p>
                        </div>
                    </div>
                    <div className="reply-count-border-wrapper">

                        <div className="reply-count">
                        {`${messageById.replies.length} replies`}
                        </div>
                        <div className="reply-count-border"></div>
                    </div>
                </div>
                <div className="reply-content">
                    {(messageById.replies.map((reply) => (
                        <div className="chat">
                            <div className="chat-user">
                                <i class="fa-solid fa-user"></i>
                                <ReplyThread socket={socket} reply={reply} messageById={messageById} />
                            </div>
                            {sessionUser.id === reply.user_id && replyEditDelete &&(
                                <ReplyEditDeleteButton reply={reply} />
                            )}
                            {sessionUser.id === reply.user_id && replyId === reply.id && isReplyDelete && (
                                <ReplyConfirmDeleteButton socket={socket} replyId={replyId} messageById={messageById}/>
                            )}
                        </div>
                    )))}
                </div>
                <ReplyBox socket={socket} messageById={messageById} channel={channel} sessionUser={sessionUser}/>
            </div>
        </section>)
        }
        </>
    )
}

export default Replies
