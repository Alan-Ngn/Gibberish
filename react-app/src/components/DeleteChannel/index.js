import { useState } from "react"
import { useModal } from "../../context/Modal"
import { useDispatch, useSelector } from "react-redux"
import { createChannelThunk, deleteChannelThunk } from "../../store/channel"

const DeleteChannelModal = ({channelId}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const users = useSelector(state => state.users)
	const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState('')
    const [checkUser, setCheckUser] = useState([])
    const [err, setErr] = useState(null)
    const updateTitle =(e) => setTitle(e.target.value)

    console.log(channelId, 'this is my channel Id')
    const deleteOnClick = (e) => {
        e.preventDefault();
        dispatch(deleteChannelThunk(channelId)).then(closeModal);
      };

    const cancelOnClick = (e) => {
        e.preventDefault();
        closeModal();
      };

    return (
        <div className="modal channel-modal">
          <h1>Comfirm Delete</h1>
          <p>Are you sure you want to remove this channel from the listings?</p>
          <button onClick={deleteOnClick}>Yes (Delete Channel)</button>
          <button onClick={cancelOnClick}>
            No (Keep Channel)
          </button>
        </div>
    )
}

export default DeleteChannelModal
