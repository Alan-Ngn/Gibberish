import { useDispatch } from "react-redux"
import { useMessage } from "../../context/EditMessage"
import { editReplyThunk } from "../../store/reply"
import { useEffect, useState } from "react"

const ReplyThread = ({reply, messageById}) => {
    
    const {replyEdit, setReplyEdit, setEditReply, setReplyEditDelete, replyId, editReply, replyEditErr, setReplyEditErr} = useMessage()
    const [editReplyPayload, setEditReplyPayload] = useState({})
    const dispatch = useDispatch()
    const updateEditReply = (e) => setEditReply(e.target.value)
    const editReplyObj = {}

    useEffect(()=>{
        editReplyObj.reply = editReply
        setEditReplyPayload(editReplyObj)
    },[editReply])

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(editReplyThunk(editReplyPayload, messageById.id, replyId))
        if (data) {
            setReplyEditErr(data)
        } else {
            setReplyEditErr('')
            setReplyEdit(false)
            setReplyEditDelete(true)
        }
    }

    const handleEditCancel = (e) =>{
        e.preventDefault()
        setReplyEditErr('')
        setReplyEdit(false)
        setReplyEditDelete(true)
    }

    return (
        <div>
            <p>{reply.user.first_name} {reply.user.last_name}</p>
            {replyEdit && replyId === reply.id ?
            <form onSubmit={handleEditSubmit}>
                <input
                name="edit-message"
                id="edit-message"
                type='text'
                placeholder={replyEditErr[0]}
                value={editReply}
                onChange={updateEditReply}
                >
                </input>
                <button className="message-button" type="submit"><i class="fa-sharp fa-solid fa-arrow-right-to-bracket"></i></button>
                <button className="message-button" onClick  ={handleEditCancel}><i class="fa-solid fa-ban"></i></button>
            </form>
                : <p>{reply.reply}</p>
            }
        </div>
    )
}

export default ReplyThread
