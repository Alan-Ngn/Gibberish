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

    const [ogMessage, setOgMessage] = useState('')
    const [repliedMessageId, setRepliedMessageId] = useState(0)
    const [repliedChannelId, setRepliedChannelId] = useState(0)

    return (
        <MessageContext.Provider value={{edit, setEdit, messageId, setMessageId, editDelete, setEditDelete, isDelete, setIsDelete, editMessage, setEditMessage, editErr, setEditErr, editMessagePayload, setEditMessagePayload, message, setMessage, messagePayload, setMessagePayload, err, setErr, ogMessage, setOgMessage, repliedMessageId, setRepliedMessageId, repliedChannelId, setRepliedChannelId}}>
            {children}
        </MessageContext.Provider>

    )
}
