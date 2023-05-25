import { useMessage } from "../../context/EditMessage"

const EditDeleteButton = ({message}) => {
    const {setEdit, setMessageId, setEditDelete, setIsDelete, setEditMessage} = useMessage()
    return (
        <div className="hide-edit-delete">
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
    </div>
    )
}

export default EditDeleteButton
