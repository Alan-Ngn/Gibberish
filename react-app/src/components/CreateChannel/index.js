import { useState } from "react"
import { useModal } from "../../context/Modal"
import { useSelector } from "react-redux"

const CreateChannelModal = ({adminId}) => {
    const {closeModal} = useModal()
    const users = useSelector(state => state.users)
    const [title, setTitle] = useState('')
    const [checkUser, setCheckUser] = useState([])
    const updateTitle =(e) => setTitle(e.target.value)

    const handleSubmit = async(e) => {
        e.preventDefault()

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
                             isChecked={checkUser.includes(user.id)}
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
