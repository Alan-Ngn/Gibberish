import { authenticate } from "./session";

export const createReplyThunk = (reply, messageId, userId, channelId) => async(dispatch) => {
    const response = await fetch(`/api/replies/message/${messageId}/user/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reply)
    })
    if(response.ok){
        dispatch(authenticate())
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const editReplyThunk = (reply, messageId, replyId) => async(dispatch) => {
    const response = await fetch(`/api/replies/${replyId}/edit`, {
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reply)
    })
    if(response.ok){
        dispatch(authenticate())
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const deleteReplyThunk = (replyId, messageId) => async(dispatch) => {
    const response = await fetch(`/api/replies/${replyId}`,{
        method: "DELETE"
    })
    if(response.ok){
        dispatch(authenticate())
    } else {
        return false
    }
}
