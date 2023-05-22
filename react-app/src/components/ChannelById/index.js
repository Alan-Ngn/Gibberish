import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadChannelByIdThunk } from "../../store/channel"
import { useParams } from "react-router-dom"
import './ChannelById.css'
import { createMessageThunk, editMessageThunk } from "../../store/message"
import MessageDropdown from "../MessageMenu"
import { useMessage } from "../../context/EditMessage"


const ChannelById = () => {
    const dispatch = useDispatch()
    const { edit, setEdit, messageId, setMessageId, ogMessage, setOgMessage } = useMessage();
    const { channelId } = useParams()
    const [message, setMessage] = useState('')
    const [editMessage, setEditMessage] = useState('')
    const [messagePayload, setMessagePayload] = useState({})
    const [editMessagePayload, setEditMessagePayload] = useState({})
    const [err, setErr] = useState('')
    const [editErr, setEditErr] = useState('')
    const ulClassName = "chat-box" + (err ? "-error" : "");
    const ulEditClassName = "edit-box" + (editErr ? "-error" : "");
    const getChannel = useSelector(state => state.channels)
	const sessionUser = useSelector(state => state.session.user);
    const messageObj ={}
    const editMessageObj = {}
    const updateMessage = (e) => setMessage(e.target.value)
    const updateEditMessage = (e) => setOgMessage(e.target.value)
    console.log(edit,'global context edit')
    useEffect(() => {
        if(getChannel.id !== Number(channelId)){
            dispatch(loadChannelByIdThunk(channelId))
        }
    },[dispatch, channelId])

    useEffect(()=>{
        messageObj.message = message

        setMessagePayload(messageObj)
    },[message])

    useEffect(()=>{
        editMessageObj.message = ogMessage
        console.log(ogMessage)
        setEditMessagePayload(editMessageObj)
    },[ogMessage])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(createMessageThunk(messagePayload, channelId, sessionUser.id))
        setMessage('')
        if (data) {
            setErr(data)
        } else {
            setErr('')
        }
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(editMessageThunk(editMessagePayload, messageId, channelId))
        // setEditMessage('')
        if (data) {
            setEditErr(data)
        } else {
            setEditErr('')
            setEdit(false)
        }
        console.log(editErr, ' what is our edit error')
    }

    const handleEditCancel = (e) =>{
        setEditErr('')
        setEdit(false)
    }

    if(getChannel.id !== Number(channelId)) return null
    // console.log(getChannel.id, 'MY CHANNEL', Number(channelId))
    // console.log(sessionUser.id, getChannel.messages[0].user_id)
    return (
        <section className="ChannelById">
            <div className="chat-area">
                <h2>{getChannel.title}</h2>
            {getChannel.messages.map((message) =>(
                <div className="chat">
                    <p className="chat-name">{message.user.first_name} {message.user.last_name}</p>
                    <div className="message-wrapper">
                    {edit && messageId === message.id ?
                    <form onSubmit={handleEditSubmit}>
                        <textarea
                        className={ulEditClassName}
                        name="edit-message"
                        id="edit-message"
                        type='text'
                        placeholder={editErr.length > 0 ? (editErr[0]) : `Edit Message ${message.message}`}
                        value={ogMessage}
                        onChange={updateEditMessage}
                        >
                        </textarea>
                        <button className="message-button" type="submit"><i class="fa-sharp fa-solid fa-arrow-right-to-bracket"></i></button>
                        <button className="message-button" onClick={handleEditCancel}><i class="fa-solid fa-ban"></i></button>
                    </form>
                    : (<p className="message">{message.message}</p>)}
                    {sessionUser.id === message.user_id && (
                        <MessageDropdown id={message.id} channelId={channelId} message={message.message}/>
                    )}
                    </div>
                </div>
            ))}
            </div>
                {/* {err.length > 0 && (<p className="error-handling">{err[0]}</p>)} */}
            <form className='chat-form' onSubmit={handleSubmit}>
                <textarea
                    className={ulClassName}
                    name="message"
                    id="message"
                    type="text"
                    placeholder={err.length > 0 ? (err[0]) : `Message ${getChannel.title}`}
                    value={message}
                    onChange={updateMessage}
                >
                </textarea>
                <button className="message-button" type="submit"><i class="fa-sharp fa-solid fa-arrow-right-to-bracket"></i></button>
            </form>
        </section>
    )
}

export default ChannelById
