import { authenticate } from "./session";

const LOAD_CHANNEL = 'channels/LOAD_CHANNELS';

export const loadChannel = (channel) => {
    return {
        type: LOAD_CHANNEL,
        channel
    }
}

export const loadChannelByIdThunk = (channelId) => async(dispatch) => {
    console.log('WE ARE INSIDE THE LOAD CHANNELS THUNK')
    const response = await fetch(`/api/channels/${channelId}`)
    if(response.ok){
        const data = await response.json();
        dispatch(loadChannel(data))
    } else {
        console.log('LOAD CHANNELS THUNK FAILED')
        return false
    }
}

export const createChannelThunk = (channel, members) => async(dispatch) => {
    console.log('WE ARE INSIDE THE CREATE CHANNEL THUNK', members)
    const response = await fetch(`/api/channels/new/${channel.admin_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(channel)
    })
    if(response.ok){
        const data = await response.json();
        console.log(members, 'these are the members array')
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
        return data
    } else {
        console.log('CREATE CHANNEL THUNK FAILED')
        return false
    }
}

export const deleteChannelThunk = (channelId) => async(dispatch) => {
    console.log("WE ARE INSDIE THE DELETE CHANNEL THUNK", channelId)
    const response = await fetch(`/api/channels/${channelId}`, {
        method: "DELETE"
    })
    if (response.ok){

        await dispatch(authenticate())

    } else {
        console.log('DELETE CHANNEL THUNK FAILED')
        return false
    }
}

export const editChannelThunk = (channel, channelId) => async(dispatch) => {
    console.log("WE ARE INSIDE THE EDIT CHANNEL THUNK", channel, channelId)
    const response = await fetch(`/api/channels/${channelId}/edit`,{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(channel)
    })
    if(response.ok){
        await dispatch(authenticate())
    } else {
        console.log('update thunk failed')
        return false
    }

}

const channelsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
      case LOAD_CHANNEL:
        newState = {};
        console.log("action.channels 👾👾👾👉", action.channel)
        newState = {...action.channel}
        console.log("newState 👉👾👾👾", newState)
        return newState;
      default:
        return state;
    }
  };

  export default channelsReducer;
