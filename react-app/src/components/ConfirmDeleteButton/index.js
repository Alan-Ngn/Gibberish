import { useDispatch } from "react-redux"
import { useMessage } from "../../context/EditMessage"
import { deleteMessageThunk } from "../../store/message"

const ConfirmDeleteButton = ({channelId}) => {
    const dispatch = useDispatch()
    const {setEditDelete, setIsDelete, messageId} = useMessage()
    
    const confirmDelete = (e) => {
        dispatch(deleteMessageThunk(messageId, channelId)).then(setIsDelete(false)).then(setEditDelete(true))
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
