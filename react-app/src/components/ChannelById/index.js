import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadChannelByIdThunk } from "../../store/channel"
import { useParams } from "react-router-dom"
import './ChannelById.css'
import { createMessageThunk, deleteMessageThunk, editMessageThunk } from "../../store/message"
import MessageDropdown from "../MessageMenu"
import { useMessage } from "../../context/EditMessage"
import OpenModalButton from "../OpenModalButton"
import DeleteModal from "../DeleteChannel"


const ChannelById = () => {
    const dispatch = useDispatch()
    const { channelId } = useParams()
    const [messageId, setMessageId] = useState(0)
    const [edit, setEdit] = useState(false)
    const [message, setMessage] = useState('')
    const [editMessage, setEditMessage] = useState('')
    const [messagePayload, setMessagePayload] = useState({})
    const [editMessagePayload, setEditMessagePayload] = useState({})
    const [err, setErr] = useState('')
    const [editErr, setEditErr] = useState('')
    const [editDelete, setEditDelete] = useState(true)
    const [isDelete, setIsDelete] = useState(false)
    const ulClassName = "chat-box" + (err ? "-error" : "");
    const ulEditClassName = "edit-box" + (editErr ? "-error" : "");
    const getChannel = useSelector(state => state.channels)
	const sessionUser = useSelector(state => state.session.user);
    const messageObj ={}
    const editMessageObj = {}
    const updateMessage = (e) => setMessage(e.target.value)
    const updateEditMessage = (e) => setEditMessage(e.target.value)

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
        editMessageObj.message = editMessage
        console.log(editMessage)
        setEditMessagePayload(editMessageObj)
    },[editMessage])

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
        console.log(data,'HANDLE EDIT SUBMIT')
        if (data) {
            setEditErr(data)
        } else {
            setEditErr('')
            setEdit(false)
            setEditDelete(true)
        }
        console.log(editErr[0], ' what is our edit error')
    }

    const handleEditCancel = (e) =>{
        e.preventDefault()
        setEditErr('')
        setEdit(false)
        setEditDelete(true)
    }

    const confirmDelete = (e) => {
        dispatch(deleteMessageThunk(messageId, channelId)).then(setIsDelete(false)).then(setEditDelete(true))
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
                    <div className="chat-name-message">
                        <p className="chat-name">{message.user.first_name} {message.user.last_name}</p>
                        <div className="message-wrapper">
                        {edit && messageId === message.id ?
                        <form onSubmit={handleEditSubmit}>
                            <textarea
                            className={ulEditClassName}
                            name="edit-message"
                            id="edit-message"
                            type='text'
                            placeholder={editErr[0]}
                            value={editMessage}
                            onChange={updateEditMessage}
                            >
                            </textarea>
                            <button className="message-button" type="submit"><i class="fa-sharp fa-solid fa-arrow-right-to-bracket"></i></button>
                            <button className="message-button" onClick  ={handleEditCancel}><i class="fa-solid fa-ban"></i></button>
                        </form>
                        : (<p className="message">{message.message}</p>)}
                        </div>
                    </div>
                    {sessionUser.id === message.user_id && editDelete && (
                                  <div className="hide-edit-delete">
                                    <button className="edit-button" onClick={() => {
                                        setEdit(true)
                                        setEditDelete(false)
                                        setMessageId(message.id)
                                        setEditMessage(message.message)}}><i class="fa-solid fa-screwdriver-wrench"/><div className="edit-button-text">Edit</div></button>
                                    <button className="delete-button" onClick={() => {
                                        setIsDelete(true)
                                        setEditDelete(false)
                                        setMessageId(message.id)
                                        }}><i class="fa-solid fa-trash"/><div className="delete-button-text">Delete</div></button>
                                    {/* <OpenModalButton
                                        buttonText='Delete'
                                        modalComponent={<DeleteModal id={message.id} type={'message'} channelId={channelId}/>}
                                    /> */}
                                  {/* <MessageDropdown id={message.id} channelId={channelId} message={message.message}/> */}
                                </div>
                    )}
                    {sessionUser.id === message.user_id && messageId === message.id && isDelete && (
                                  <div>
                                    <button className="confirm-delete-button" onClick={confirmDelete}><i class="fa-regular fa-square-check"></i><div className="confirm-delete-button-text">Confirm</div></button>
                                    <div className="cancel-delete-button">
                                        <button
                                            onClick={()=>{
                                            setIsDelete(false)
                                            setEditDelete(true)
                                        }}><i class="fa-solid fa-ban"></i>
                                        </button>
                                        <div className="cancel-delete-button-text">Cancel</div>
                                    </div>

                                </div>
                    )}
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
