import { loadChannelByIdThunk } from "./channel";
import { authenticate } from "./session";

const LOAD_MESSAGE = 'messages/LOAD_MESSAGE'

export const loadMessage = (message) => {
    return {
        type: LOAD_MESSAGE,
        message
    }
}

export const loadMessageThunk = (messageId) => async(dispatch) => {
    console.log('loadMessage thunk', messageId)
    const response = await fetch(`/api/messages/${messageId}`)
    if(response.ok){
        const data = await response.json();
        console.log(data,'DATA FROM SUCCESFULL')
        dispatch(loadMessage(data))
    } else {
        console.log('LOAD CHANNELS THUNK FAILED')
        return false
    }
}

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
	} else if (response.status < 500) {
		const data = await response.json();
        console.log(data.errors, 'ERRRORSRSRSR')
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
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

export const editMessageThunk = (message, id, channelId) => async(dispatch) => {
    console.log('INSIDE EDIT MESSAGE THUNK', message, id, channelId)
    const response = await fetch(`/api/messages/${id}/edit`, {
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message)
    })
    if(response.ok){
        dispatch(loadChannelByIdThunk(channelId))
	} else if (response.status < 500) {
		const data = await response.json();
        console.log(data.errors, 'ERRRORSRSRSR')
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

const messagesReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
      case LOAD_MESSAGE:
        newState = {};
        console.log("action.messages 👾👾👾👉", action.message)
        newState = {...action.message}
        console.log("newState 👉👾👾👾", newState)
        return newState;
      default:
        return state;
    }
  };

  export default messagesReducer;
