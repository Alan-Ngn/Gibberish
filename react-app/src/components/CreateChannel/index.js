import { useState } from "react"
import { useModal } from "../../context/Modal"
import { useDispatch, useSelector } from "react-redux"
import { createChannelThunk, editChannelThunk } from "../../store/channel"
import { createMemberThunk, deleteMemberThunk } from "../../store/member"
import './CreateChannel.css';

const CreateChannelModal = ({socket, id, members, channelTitle, type}) => {
    const memberId = members.map(member => (member.id))
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const users = useSelector(state => state.users)
	const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState(channelTitle)
    const [checkUser, setCheckUser] = useState([...memberId])
    const [err, setErr] = useState('')
    const updateTitle =(e) => setTitle(e.target.value)
    const payload = {}
    const channelTitleName = "channel-name" + (err.length === 0 ? "" : "-err");
    const handleSubmit = async(e) => {
        e.preventDefault()
        payload.admin_id = sessionUser.id
        payload.title = title
        payload.id = id
        payload.members = checkUser
        if(type==='edit' && members.length > 0 && checkUser.length > 0){
            payload.type = 'channel-PUT'
            if (payload.title.length === 0){
                setErr(['Give your channel a name to continue. You can always change the name later.'])
            } else if (payload.title.length > 255){
                setErr(['Give your channel a name to continue. You can always change the name later.'])
            } else {
                console.log(payload)
                socket.emit("chat", payload);
                const deleteMembers = memberId.filter(member => !checkUser.includes(member))
                const addMembers = checkUser.filter(member => !memberId.includes(member))
                setErr('')
                if(deleteMembers.length > 0){
                    // dispatch(deleteMemberThunk(id, deleteMembers))
                    payload.type = 'member-DELETE'
                    for (let i = 0; i < deleteMembers.length; i++) {
                        payload.deleteMember = deleteMembers[i]
                        socket.emit("chat", payload);
                    }
                }
                if(addMembers.length > 0){
                    // dispatch(createMemberThunk(id, addMembers))
                    payload.type = 'member-POST'
                    for (let i = 0; i < addMembers.length; i++) {
                        payload.addMember = addMembers[i]
                        socket.emit("chat", payload);
                    }
                }
                closeModal()
            }
            // const data = await dispatch(editChannelThunk(payload, id))

            // if (data) {
            //     setErr(data)
            // } else {
            //     setErr('')
            //     if(deleteMembers.length > 0){
            //         dispatch(deleteMemberThunk(id, deleteMembers))
            //     }
            //     if(addMembers.length > 0){
            //         dispatch(createMemberThunk(id, addMembers))
            //     }
            //     closeModal()
            // }
        }
        else if(type==='create' && checkUser.length > 0){
            payload.type = 'channel-POST'
            if (payload.title.length === 0){
                setErr(['Give your channel a name to continue. You can always change the name later.'])
            } else if (payload.title.length > 255){
                setErr(['Give your channel a name to continue. You can always change the name later.'])
            } else {
                socket.emit("chat", payload);
                setErr('')
                closeModal()
            }
        } else {
            setErr('Please add members')
        }
    }

    const handleClick = (e) =>{
        setCheckUser([... new Set([...checkUser, Number(e.target.id)])])
        if (checkUser.includes(Number(e.target.id))){
            setCheckUser([...checkUser.filter(user => user !== Number(e.target.id))])
        }
    }

    const handleCancel = (e) => {
        e.preventDefault()
        closeModal()
    }

    if(!users) return null

    return (
        <div className="create-channel-modal">
            <div className="create-channel-header">
                <h3>Create a channel</h3>
                <button onClick={handleCancel}><i class="fa-solid fa-xmark"></i></button>
            </div>

            <form onSubmit={handleSubmit}>
                {type==='edit' && (
                    <input
                    className="id-hide"
                    name='id'
                    id='id'
                    value={id}/>
                )}
                <label for={'title'}>Name</label>
                <input
                    className={channelTitleName}
                    name="title"
                    id="title"
                    placeholder="# eg.gym-bros"
                    value={title}
                    onChange={updateTitle}
                />
                {err.length > 0 && (<p className="channel-create-error">{err[0]}</p>)}
                <p>Channels are where conversations happen around a topic. Use a name that is easy to find and understand</p>
                <fieldset>
                    {Object.values(users).filter(admin => admin.id !== sessionUser.id).map((user)=>(
                        <div>
                            <input
                            className="checkbox"
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
                <button className="channel-create-button" type="submit">Create Channel</button>
            </form>
        </div>
    )
}

export default CreateChannelModal
