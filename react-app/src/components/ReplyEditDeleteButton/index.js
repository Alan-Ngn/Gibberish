import { useMessage } from "../../context/EditMessage"

const ReplyEditDeleteButton = ({reply}) => {
    const {setReplyEditDelete, setReplyEdit, setReplyId, setEditReply, setIsReplyDelete} = useMessage()
    return(
        <div className="hide-edit-delete">
            <button className="edit-button"
                onClick={() => {
                setReplyEdit(true)
                setReplyEditDelete(false)
                setReplyId(reply.id)
                setEditReply(reply.reply)}}>
                <i class="fa-solid fa-screwdriver-wrench"/>
                <div className="edit-button-text">Edit</div>
            </button>
            <button className="delete-button"
                onClick={() => {
                setIsReplyDelete(true)
                setReplyEditDelete(false)
                setReplyId(reply.id)}}>
                <i class="fa-solid fa-trash"/>
                <div className="delete-button-text">Delete</div>
            </button>
        </div>
    )
}

export default ReplyEditDeleteButton
