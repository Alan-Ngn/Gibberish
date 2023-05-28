import { useMessage } from "../../context/EditMessage"

const ReplyConfirmDeleteButton = ({socket, replyId, messageById}) => {
    const {setIsReplyDelete, setReplyEditDelete} = useMessage()
    const replyDeletePayload = {}
    const confirmDelete = (e) => {
        // dispatch(deleteReplyThunk(replyId, messageById.id)).then(setIsReplyDelete(false)).then(setReplyEditDelete(true))
        e.preventDefault();
        replyDeletePayload.id = replyId
        replyDeletePayload.type = 'reply-DELETE'
        socket.emit('chat', replyDeletePayload)
        setIsReplyDelete(false)
        setReplyEditDelete(true)
    }

    return (
        <div className="delete-confirmation-buttons">
            <button className="confirm-delete-button"
                onClick={confirmDelete}>
                <i class="fa-regular fa-square-check"></i>
                <div className="confirm-delete-button-text">Confirm</div>
            </button>
            <button
                className="cancel-delete-button"
                onClick={()=>{
                setIsReplyDelete(false)
                setReplyEditDelete(true)
                }}>
                <i class="fa-solid fa-ban"></i>
                <div className="cancel-delete-button-text">Cancel</div>
            </button>
        </div>
    )
}

export default ReplyConfirmDeleteButton
