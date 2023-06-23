import { authenticate } from "./session";

const LOAD_CHANNEL = 'channels/LOAD_CHANNELS';

export const loadChannel = (channel) => {
    return {
        type: LOAD_CHANNEL,
        channel
    }
}

export const loadChannelByIdThunk = (channelId) => async(dispatch) => {
    const response = await fetch(`/api/channels/${channelId}`)
    if(response.ok){
        const data = await response.json();
        dispatch(loadChannel(data))
    } else {
        return false
    }
}

export const createChannelThunk = (channel, members) => async(dispatch) => {
    const response = await fetch(`/api/channels/new/${channel.admin_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(channel)
    })
    if(response.ok){
        const data = await response.json();
        if(members.length > 0){
            for (let i = 0; i < members.length; i++) {
                const member = members[i];
                await fetch(`/api/members/channel/${data.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(member)
                })
            }
        }
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

export const deleteChannelThunk = (id) => async(dispatch) => {
    const response = await fetch(`/api/channels/${id}`, {
        method: "DELETE"
    })
    if (response.ok){

        await dispatch(authenticate())

    } else {
        return false
    }
}

export const editChannelThunk = (channel, id) => async(dispatch) => {
    const response = await fetch(`/api/channels/${id}/edit`,{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(channel)
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

const channelsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
      case LOAD_CHANNEL:
        newState = {};
        newState = {...action.channel}
        return newState;
      default:
        return state;
    }
  };

  export default channelsReducer;
