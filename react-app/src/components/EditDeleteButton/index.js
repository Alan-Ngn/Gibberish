import { useMessage } from "../../context/EditMessage"

const EditDeleteButton = ({message, channelId,sessionUser}) => {
    const {editDelete, setEdit, setMessageId, setEditDelete, setIsDelete, setEditMessage, setOpenReply, setMessageReplyId, setChannelReplyId} = useMessage()
    return (
        <div className="hide-edit-delete">
            {sessionUser.id === message.user_id && editDelete && (
                <>
                    <button className="edit-button" onClick={() => {
                        setEdit(true)
                        setEditDelete(false)
                        setMessageId(message.id)
                        setEditMessage(message.message)}}><i class="fa-solid fa-screwdriver-wrench"/><div className="edit-button-text">Edit</div></button>
                    <button className="delete-button" onClick={() => {
                        setIsDelete(true)
                        setEditDelete(false)
                        setMessageId(message.id)
                        }}><i class="fa-solid fa-trash"/><div className="delete-button-text">Delete</div></button>
                </>
            )}
            <button className="reply-button" onClick={(e)=>{
                e.preventDefault()
                setMessageReplyId(message.id)
                setChannelReplyId(channelId)
                setOpenReply(true)
                }}>
                <i class="fa-solid fa-comment-dots"/><div className="reply-button-text">Reply</div>
            </button>
        </div>
    )
}

export default EditDeleteButton
