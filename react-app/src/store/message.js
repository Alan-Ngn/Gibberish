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
    const response = await fetch(`/api/messages/${messageId}`)
    if(response.ok){
        const data = await response.json();
        dispatch(loadMessage(data))
    } else {
        return false
    }
}

export const createMessageThunk = (message, channelId, userId) => async(dispatch) => {
    const response = await fetch(`/api/messages/channel/${Number(channelId)}/user/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message)
    })
    if(response.ok){
        await dispatch(authenticate())
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const deleteMessageThunk = (id, channelId) => async(dispatch) => {
    const response = await fetch(`/api/messages/${id}`,{
        method: "DELETE"
    })
    if(response.ok){
        await dispatch(authenticate())
    } else {
        return false
    }
}

export const editMessageThunk = (message, id, channelId) => async(dispatch) => {
    const response = await fetch(`/api/messages/${id}/edit`, {
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message)
    })
    if(response.ok){
        await dispatch(authenticate())
	} else if (response.status < 500) {
		const data = await response.json();
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
        newState = {...action.message}
        return newState;
      default:
        return state;
    }
  };

  export default messagesReducer;
