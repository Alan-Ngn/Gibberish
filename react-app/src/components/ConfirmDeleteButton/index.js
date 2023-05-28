import { useMessage } from "../../context/EditMessage"

const ConfirmDeleteButton = ({socket, channelId}) => {
    const {setEditDelete, setIsDelete, messageId} = useMessage()
    const deleteMessagePayload ={}
    const confirmDelete = (e) => {
        e.preventDefault();
        deleteMessagePayload.id = messageId
        deleteMessagePayload.type = 'message-DELETE'
        socket.emit('chat', deleteMessagePayload)
        // dispatch(deleteMessageThunk(messageId, channelId)).then(setIsDelete(false)).then(setEditDelete(true))
        setIsDelete(false)
        setEditDelete(true)
    }

    return (
        <div className="delete-confirmation-buttons">
            <button className="confirm-delete-button"
                onClick={confirmDelete}>
                <i class="fa-regular fa-square-check"/>
                <div className="confirm-delete-button-text">Confirm</div>
            </button>
            <button
                className="cancel-delete-button"
                onClick={()=>{
                setIsDelete(false)
                setEditDelete(true)
                }}>
                <i class="fa-solid fa-ban"></i>
                <div className="cancel-delete-button-text">Cancel</div>
            </button>
        </div>
    )
}

export default ConfirmDeleteButton
