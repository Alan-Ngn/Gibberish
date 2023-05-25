import { loadChannelByIdThunk } from "./channel";
import { loadMessageThunk } from "./message";

export const createReplyThunk = (reply, messageId, userId, channelId) => async(dispatch) => {
    console.log('Inside create REPLY THUNK', reply, messageId, userId)
    const response = await fetch(`/api/replies/message/${messageId}/user/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reply)
    })
    if(response.ok){
        dispatch(loadMessageThunk(messageId))
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
