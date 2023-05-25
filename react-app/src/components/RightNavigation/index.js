import { useDispatch, useSelector } from "react-redux"
import { useMessage } from "../../context/EditMessage"
import ChannelById from "../ChannelById";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createReplyThunk, deleteReplyThunk, editReplyThunk } from "../../store/reply";

const RightNavigation = () => {

    const dispatch = useDispatch()
    const [reply, setReply] = useState('')
    const [replyPayload, setReplyPayload] = useState({})
    const [err, setErr] = useState('')
    const [edit, setEdit] = useState(false)
    const [editDelete, setEditDelete] = useState(true)
    const [replyId, setReplyId] = useState(0)
    const [editReply, setEditReply] = useState('')
    const [editReplyPayload, setEditReplyPayload] = useState({})
    const [isDelete, setIsDelete] = useState(false)
    const [editErr, setEditErr] = useState('')
	const sessionUser = useSelector(state => state.session.user);
    const messageById = useSelector(state => state.messages)
    const channel = useSelector(state => state.channels)
    const updateReply = (e) => setReply(e.target.value)
    const updateEditReply = (e) => setEditReply(e.target.value)
    const replyObj ={}
    const editReplyObj = {}
    useEffect(()=>{
        replyObj.reply = reply
        setReplyPayload(replyObj)
    },[reply])

    useEffect(()=>{
        editReplyObj.reply = editReply
        setEditReplyPayload(editReplyObj)
    },[editReply])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(createReplyThunk(replyPayload, messageById.id, sessionUser.id, channel.id))
        setReply('')
        if (data) {
            setErr(data)
        } else {
            setErr('')
        }
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(editReplyThunk(editReplyPayload, messageById.id, replyId))
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
        dispatch(deleteReplyThunk(replyId, messageById.id)).then(setIsDelete(false)).then(setEditDelete(true))
    }
    if (Object.values(messageById).length === 0 ) return null

    return (
        <section>
            <h2>Thread</h2><h3>{messageById.channel.title}</h3>
            <p>{messageById.user.first_name} {messageById.user.last_name}</p>
            <p>{messageById.message}</p>
            {(messageById.replies.map((reply) => (
                <div className="chat">
                    <div>
                        <p>{reply.user.first_name} {reply.user.last_name}</p>
                        {edit && replyId === reply.id ?
                        <form onSubmit={handleEditSubmit}>
                            <textarea
                            name="edit-message"
                            id="edit-message"
                            type='text'
                            placeholder={editErr[0]}
                            value={editReply}
                            onChange={updateEditReply}
                            >
                            </textarea>
                            <button className="message-button" type="submit"><i class="fa-sharp fa-solid fa-arrow-right-to-bracket"></i></button>
                            <button className="message-button" onClick  ={handleEditCancel}><i class="fa-solid fa-ban"></i></button>
                        </form>
                            : <p>{reply.reply}</p>
                        }
                    </div>
                    {sessionUser.id === reply.user_id && editDelete &&(
                        <div className="hide-edit-delete">
                            <button className="edit-button" onClick={() => {
                                setEdit(true)
                                setEditDelete(false)
                                setReplyId(reply.id)
                                setEditReply(reply.reply)}}><i class="fa-solid fa-screwdriver-wrench"/><div className="edit-button-text">Edit</div></button>
                            <button className="delete-button" onClick={() => {
                                setIsDelete(true)
                                setEditDelete(false)
                                setReplyId(reply.id)
                                }}><i class="fa-solid fa-trash"/><div className="delete-button-text">Delete</div></button>
                        </div>
                    )}
                    {sessionUser.id === reply.user_id && replyId === reply.id && isDelete && (
                                  <div className="delete-confirmation-buttons">
                                    <button className="confirm-delete-button" onClick={confirmDelete}><i class="fa-regular fa-square-check"></i><div className="confirm-delete-button-text">Confirm</div></button>

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
                    )}
                </div>

            )))}
            <form className='chat-form' onSubmit={handleSubmit}>
                <div className="chat-area">
                    <textarea
                        name="message"
                        id="message"
                        type="text"
                        placeholder={err.length > 0 ? (err[0]) :`Reply...`}
                        value={reply}
                        onChange={updateReply}
                    >
                    </textarea>
                    <div className="message-box">

                    {reply.length === 0 ? <p>Maximum Character Limit: 255</p> : reply.length > 255 ? <p className="char-over-limit">{`${reply.length - 255} Characters Over Limit`}</p> : <p>{`${255-reply.length} Characters Remaining`}</p>}
                    </div>
                </div>
                <button className="message-button" type="submit"><i class="fa-sharp fa-solid fa-arrow-right-to-bracket"></i></button>
            </form>
        </section>
    )
}

export default RightNavigation
