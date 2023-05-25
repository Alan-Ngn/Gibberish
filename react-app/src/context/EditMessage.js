import { createContext, useContext, useState } from "react";

export const MessageContext = createContext()
export const useMessage = () => useContext(MessageContext)

export default function MessageProvider( { children } ){
    const [edit, setEdit] = useState(false)
    const [messageId, setMessageId] = useState(0)
    const [ogMessage, setOgMessage] = useState('')
    const [repliedMessageId, setRepliedMessageId] = useState(0)
    const [repliedChannelId, setRepliedChannelId] = useState(0)

    return (
        <MessageContext.Provider value={{edit, setEdit, messageId, setMessageId, ogMessage, setOgMessage, repliedMessageId, setRepliedMessageId, repliedChannelId, setRepliedChannelId}}>
            {children}
        </MessageContext.Provider>

    )
}
