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
