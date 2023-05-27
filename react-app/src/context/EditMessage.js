import { createContext, useContext, useState } from "react";

export const MessageContext = createContext()
export const useMessage = () => useContext(MessageContext)

export default function MessageProvider( { children } ){
    //for threads...
    const [edit, setEdit] = useState(false)
    const [messageId, setMessageId] = useState(0)
    const [editDelete, setEditDelete] = useState(true)
    const [isDelete, setIsDelete] = useState(false)
    const [editMessage, setEditMessage] = useState('')
    const [editErr, setEditErr] = useState('')
    const [editMessagePayload, setEditMessagePayload] = useState({})
    const [message, setMessage] = useState('')
    const [messagePayload, setMessagePayload] = useState({})
    const [err, setErr] = useState('')
    //for replies...
    const [messageReplyId, setMessageReplyId] = useState(0)
    const [channelReplyId, setChannelReplyId] = useState(0)
    const [openReply, setOpenReply] = useState(false)
    const [isReplyDelete, setIsReplyDelete] = useState(false)
    const [replyEditDelete, setReplyEditDelete] = useState(true)
    const [replyEdit, setReplyEdit] = useState(false)
    const [replyId, setReplyId] = useState(0)
    const [editReply, setEditReply] = useState('')
    const [replyEditErr, setReplyEditErr] = useState('')


    const [ogMessage, setOgMessage] = useState('')
    const [repliedMessageId, setRepliedMessageId] = useState(0)
    const [repliedChannelId, setRepliedChannelId] = useState(0)

    return (
        <MessageContext.Provider value={{replyEditErr, setReplyEditErr, editReply, setEditReply, replyId, setReplyId, replyEdit, setReplyEdit, replyEditDelete, setReplyEditDelete, isReplyDelete, setIsReplyDelete, edit, setEdit, messageId, setMessageId, editDelete, setEditDelete, isDelete, setIsDelete, editMessage, setEditMessage, editErr, setEditErr, editMessagePayload, setEditMessagePayload, message, setMessage, messagePayload, setMessagePayload, err, setErr, openReply, setOpenReply, messageReplyId, setMessageReplyId, channelReplyId, setChannelReplyId, ogMessage, setOgMessage, repliedMessageId, setRepliedMessageId, repliedChannelId, setRepliedChannelId}}>
            {children}
        </MessageContext.Provider>

    )
}
