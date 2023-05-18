import { useState } from "react"
import { useModal } from "../../context/Modal"
import { useDispatch, useSelector } from "react-redux"
import { createChannelThunk } from "../../store/channel"

const CreateChannelModal = ({adminId}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const users = useSelector(state => state.users)
	const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState('')
    const [checkUser, setCheckUser] = useState([])
    const [err, setErr] = useState(null)
    const updateTitle =(e) => setTitle(e.target.value)

    const payload = {}

    const handleSubmit = async(e) => {
        e.preventDefault()
        payload.admin_id = sessionUser.id
        payload.title = title
        console.log(payload, checkUser,'CREATE CHANNEL DATA')
        if(checkUser.length > 0){
            dispatch(createChannelThunk(payload, checkUser))
        } else {
            setErr('Please add members')
        }
        closeModal()
    }

    const handleClick = (e) =>{
        console.log('handle click works')
        setCheckUser([... new Set([...checkUser, e.target.id])])
        if (checkUser.includes(e.target.id)){
            setCheckUser([...checkUser.filter(user => user !== e.target.id)])
        }
        console.log('adding users to array',checkUser)
    }
    console.log('adding users to array',checkUser)
    if(!users) return null
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    id="title"
                    placeholder="Title"
                    value={title}
                    onChange={updateTitle}
                />
                <fieldset>
                    {Object.values(users).map((user)=>(
                        <div>
                            <input
                             key={user.id}
                             type="checkbox"
                             id={user.id}
                             name={user.username}
                             onClick={handleClick}
                             >
                            </input>
                            <label
                             for={user.username}>{user.first_name} {user.last_name}</label>
                        </div>
                    ))}
                </fieldset>
                <button type="submit">Create Channel</button>
            </form>
        </div>
    )
}

export default CreateChannelModal
