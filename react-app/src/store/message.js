import { loadChannelByIdThunk } from "./channel";
import { authenticate } from "./session";

export const createMessageThunk = (message, channelId, userId) => async(dispatch) => {
    console.log('INSIDE MESSAGE CREATE THUNK', message, Number(channelId), userId)
    const response = await fetch(`/api/messages/channel/${Number(channelId)}/user/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message)
    })
    if(response.ok){
        const data = await response.json();
        dispatch(loadChannelByIdThunk(channelId))
    } else {
        console.log('LOAD MESSAGE THUNK FAILED')
        return false
    }
}

export const deleteMessageThunk = (id, channelId) => async(dispatch) => {
    console.log('WE ARE INSIDE THE DELETE MESSAGE THUNK', id)
    const response = await fetch(`/api/messages/${id}`,{
        method: "DELETE"
    })
    if(response.ok){
        dispatch(loadChannelByIdThunk(channelId))
    } else {
        console.log('DELETE MESSAGE THUNK FAILED')
        return false
    }
}
