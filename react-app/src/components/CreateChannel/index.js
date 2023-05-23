import { useState } from "react"
import { useModal } from "../../context/Modal"
import { useDispatch, useSelector } from "react-redux"
import { createChannelThunk, editChannelThunk } from "../../store/channel"
import { createMemberThunk, deleteMemberThunk } from "../../store/member"
import './CreateChannel.css';
const CreateChannelModal = ({id, members, channelTitle, type}) => {
    const memberId = members.map(member => (member.id))
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const users = useSelector(state => state.users)
	const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState(channelTitle)
    const [checkUser, setCheckUser] = useState([...memberId])
    const [err, setErr] = useState('')
    const [x, setX] =useState(id)
    const updateTitle =(e) => setTitle(e.target.value)
    console.log(checkUser, 'what is my checkusers before i push any checkboxes')
    const payload = {}

    const handleSubmit = async(e) => {
        e.preventDefault()
        payload.admin_id = sessionUser.id
        payload.title = title
        payload.id = id
        console.log(' CHANNEL ID')
        console.log(payload, checkUser,'CREATE CHANNEL DATA', id)
        if(type==='edit' && members.length > 0 && checkUser.length > 0){
            const data = await dispatch(editChannelThunk(payload, id))
            const deleteMembers = memberId.filter(member => !checkUser.includes(member))
            console.log(deleteMembers, 'delete members')
            if (data) {
                setErr(data)
            } else {
                setErr('')
                closeModal()
            }
            if(deleteMembers.length > 0){
                dispatch(deleteMemberThunk(id, deleteMembers))
            }
            const addMembers = checkUser.filter(member => !memberId.includes(member))
            if(addMembers.length > 0){
                dispatch(createMemberThunk(id, addMembers))
            }
            console.log(addMembers,' add members')}
        else if(type==='create' && checkUser.length > 0){
            const data = await dispatch(createChannelThunk(payload, checkUser))
            console.log(data,'these are the errors for creating')
            if (data) {
                setErr(data)
            } else {
                setErr('')
                console.log('why didnt you close')
                closeModal()
            }
        } else {
            setErr('Please add members')
        }
        // closeModal()
    }

    const handleClick = (e) =>{
        console.log('handle click works',Number(e.target.id))
        setCheckUser([... new Set([...checkUser, Number(e.target.id)])])
        if (checkUser.includes(Number(e.target.id))){
            setCheckUser([...checkUser.filter(user => user !== Number(e.target.id))])
        }
        console.log('adding users to array',checkUser)
    }
    console.log('adding users to array',checkUser)
    if(!users) return null
    return (
        <div>
            {err.length > 0 && (<p>{err[0]}</p>)}
            <form onSubmit={handleSubmit}>
                {type==='edit' && (
                    <input
                    className="id-hide"
                    name='id'
                    id='id'
                    value={id}/>
                )}
                <input
                    name="title"
                    id="title"
                    placeholder="Title"
                    value={title}
                    onChange={updateTitle}
                />
                <fieldset>
                    {Object.values(users).filter(admin => admin.id !== sessionUser.id).map((user)=>(
                        <div>
                            <input
                             key={user.id}
                             type="checkbox"
                             id={user.id}
                             name={user.username}
                             onChange={handleClick}
                             checked={checkUser.includes(user.id)}
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
