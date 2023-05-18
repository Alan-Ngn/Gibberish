import { useState } from "react"
import { useModal } from "../../context/Modal"
import { useDispatch, useSelector } from "react-redux"
import OpenModalButton from "../OpenModalButton"
import DeleteChannelModal from "../DeleteChannel"
import CreateChannelModal from "../CreateChannel"

const KebabModal = ({channelId, members, channelTitle}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const users = useSelector(state => state.users)
	const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState('')
    const [checkUser, setCheckUser] = useState([])
    const [err, setErr] = useState(null)
    const updateTitle =(e) => setTitle(e.target.value)

    console.log(channelId, 'this is my channel Id', members, 'and these are my members')

    const cancelOnClick = (e) => {
        e.preventDefault();
        closeModal();
      };

    return (
        <div>
            <OpenModalButton
            buttonText='Delete Channel'
            modalComponent={<DeleteChannelModal channelId={channelId} />}
            />
            <OpenModalButton
            buttonText='Edit Channel'
            modalComponent={<CreateChannelModal channelId={channelId} members={members} channelTitle={channelTitle}/>}
            />
        </div>
    )
}

export default KebabModal
