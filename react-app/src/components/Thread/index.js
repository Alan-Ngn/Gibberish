import { useMessage } from "../../context/EditMessage"
import { useEffect } from "react"
import './Thread.css'
import { useDispatch } from "react-redux"
import { editMessageThunk } from "../../store/message"




const Thread = ({socket, message, channelId}) => {
    const dispatch = useDispatch()
    const editMessageObj = {}
    const {editMessage, setEditMessage, edit, messageId, setEdit, setEditDelete, editErr, setEditErr, editMessagePayload, setEditMessagePayload, setOpenReply, setMessageReplyId, setChannelReplyId} = useMessage()
    const updateEditMessage = (e) => setEditMessage(e.target.value)
    const ulEditClassName = "edit-box" + (editErr ? "-error" : "");

    useEffect(()=>{
        editMessageObj.message = editMessage
        setEditMessagePayload(editMessageObj)
    },[editMessage])

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(editMessageThunk(editMessagePayload, messageId, channelId))

        if (data) {
            setEditErr(data)
        } else {
            setEditErr('')
            setEdit(false)
            setEditDelete(true)
        }
    }

    const handleEditCancel = (e) =>{
        e.preventDefault()
        setEditErr('')
        setEdit(false)
        setEditDelete(true)
    }

    return (
        <div className="chat-name-message">

            <p className="chat-name">{message.user.first_name} {message.user.last_name}</p>
            <div className="message-wrapper">
                {edit && messageId === message.id ?
                <form onSubmit={handleEditSubmit}>
                    <input
                    className={ulEditClassName}
                    name="edit-message"
                    id="edit-message"
                    type='text'
                    placeholder={editErr[0]}
                    value={editMessage}
                    onChange={updateEditMessage}
                    >
                    </input>
                    {editMessage.length === 0 ? <p>Maximum Character Limit: 255</p> : editMessage.length > 255 ? <p className="char-over-limit">{`${editMessage.length - 255} Characters Over Limit`}</p> : <p>{`${255-editMessage.length} Characters Remaining`}</p>}
                    <button className="message-button" type="submit"><i class="fa-sharp fa-solid fa-arrow-right-to-bracket"></i></button>
                    <button className="message-button" onClick={handleEditCancel}><i class="fa-solid fa-ban"></i></button>
                </form>
                : (<p className="message">{message.message}</p>)}
            </div>
            <button
                className='reply'
                onClick={(e) => {
                e.preventDefault()
                setMessageReplyId(message.id)
                setChannelReplyId(channelId)
                setOpenReply(true)
            }}>
                {message.replies.length > 1 ? `${message.replies.length} Replies` : message.replies.length === 1 ? `${message.replies.length} Reply` : ''}
            </button>
        </div>
    )
}

export default Thread
