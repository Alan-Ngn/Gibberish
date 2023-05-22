import { useState } from "react"
import { useModal } from "../../context/Modal"
import { useDispatch, useSelector } from "react-redux"
import { createChannelThunk, deleteChannelThunk } from "../../store/channel"

import { deleteMessageThunk } from "../../store/message"

const DeleteModal = ({id, type, channelId}) => {
  console.log(type, 'this is the type to delte')
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const users = useSelector(state => state.users)
	const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState('')
    const [checkUser, setCheckUser] = useState([])
    const [err, setErr] = useState(null)
    const updateTitle =(e) => setTitle(e.target.value)

    console.log(id, 'this is my channel Id')
    const deleteOnClick = (e) => {
        e.preventDefault();
        if (type === 'channel'){
          dispatch(deleteChannelThunk(id)).then(closeModal);
        }
        if (type === 'message'){
          dispatch(deleteMessageThunk(id, channelId)).then(closeModal)
        }
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

export default DeleteModal
