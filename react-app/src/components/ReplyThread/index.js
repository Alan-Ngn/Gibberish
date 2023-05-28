import { useDispatch } from "react-redux"
import { useMessage } from "../../context/EditMessage"
import { editReplyThunk } from "../../store/reply"
import { useEffect, useState } from "react"

const ReplyThread = ({socket, reply, messageById}) => {

    const {replyEdit, setReplyEdit, setEditReply, setReplyEditDelete, replyId, editReply, replyEditErr, setReplyEditErr} = useMessage()
    const [editReplyPayload, setEditReplyPayload] = useState({})
    const dispatch = useDispatch()
    const updateEditReply = (e) => setEditReply(e.target.value)
    const editReplyObj = {}
    const ulEditClassName = "edit-box" + (replyEditErr ? "-error" : "");
    useEffect(()=>{
        editReplyObj.reply = editReply
        editReplyObj.id = replyId
        editReplyObj.type = 'reply-PUT'
        setEditReplyPayload(editReplyObj)
    },[editReply])

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if(editReplyPayload.reply.length===0){
            setReplyEditErr(['Please enter a message'])
        } else if (editReplyPayload.reply.length > 255) {
            setReplyEditErr(['Message must be less than 255 characters'])
        } else {
            socket.emit('chat', editReplyPayload)
            setReplyEdit(false)
            setReplyEditDelete(true)
            setReplyEditErr('')
        }




        // const data = await dispatch(editReplyThunk(editReplyPayload, messageById.id, replyId))
        // if (data) {
        //     setReplyEditErr(data)
        // } else {
        //     setReplyEditErr('')
        //     setReplyEdit(false)
        //     setReplyEditDelete(true)
        // }
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
                className={ulEditClassName}
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
