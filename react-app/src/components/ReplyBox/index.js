import { useEffect, useState } from "react";
import { createReplyThunk } from "../../store/reply";
import { useDispatch } from "react-redux";

const ReplyBox = ({messageById, channel, sessionUser}) => {
    const dispatch = useDispatch()
    const [err, setErr] = useState('')
    const [reply, setReply] = useState('')
    const [replyPayload, setReplyPayload] = useState({})
    const replyObj ={}
    const ulClassName = "reply-box" + (err ? "-error" : "");

    const updateReply = (e) => setReply(e.target.value)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(createReplyThunk(replyPayload, messageById.id, sessionUser.id, channel.id))
        setReply('')
        if (data) {
            setErr(data)
        } else {
            setErr('')
        }
    }
    useEffect(()=>{
        replyObj.reply = reply
        setReplyPayload(replyObj)
    },[reply])
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
