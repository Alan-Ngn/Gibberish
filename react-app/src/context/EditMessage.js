import { createContext, useContext, useState } from "react";

export const MessageContext = createContext()
export const useMessage = () => useContext(MessageContext)

export default function MessageProvider( { children } ){
    const [edit, setEdit] = useState(false)
    const [messageId, setMessageId] = useState(0)
    const [ogMessage, setOgMessage] = useState('')
    return (
        <MessageContext.Provider value={{edit, setEdit, messageId, setMessageId, ogMessage, setOgMessage}}>
            {children}
        </MessageContext.Provider>

    )
}
