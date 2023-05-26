import { useDispatch } from "react-redux"
import { useMessage } from "../../context/EditMessage"
import { editMessageThunk, loadMessageThunk } from "../../store/message"
import { useEffect } from "react"
import './Thread.css'

const Thread = ({message, channelId}) => {
    const dispatch = useDispatch()
    const editMessageObj = {}
    const {editMessage, setEditMessage, edit, messageId, setEdit, setEditDelete, editErr, setEditErr, editMessagePayload, setEditMessagePayload, setOpenReply} = useMessage()
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
                    <textarea
                    className={ulEditClassName}
                    name="edit-message"
                    id="edit-message"
                    type='text'
                    placeholder={editErr[0]}
                    value={editMessage}
                    onChange={updateEditMessage}
                    >
                    </textarea>
                    <button className="message-button" type="submit"><i class="fa-sharp fa-solid fa-arrow-right-to-bracket"></i></button>
                    <button className="message-button" onClick={handleEditCancel}><i class="fa-solid fa-ban"></i></button>
                </form>
                : (<p className="message">{message.message}</p>)}
            </div>
            <button
                className='reply'
                onClick={(e) => {
                e.preventDefault()

                dispatch(loadMessageThunk(message.id)).then(() => setOpenReply(true))
            }}>
                {`${message.replies.length} Replies`}
            </button>
        </div>
    )
}

export default Thread
