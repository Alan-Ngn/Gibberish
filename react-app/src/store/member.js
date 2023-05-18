import { authenticate } from "./session";

export const createMemberThunk = (channelId, members) => async(dispatch) => {
    for (let i = 0; i < members.length; i++) {
        const member = members[i];
        const response = await fetch(`/api/members/channel/${channelId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(member)
        })
        if(response.ok){
            await dispatch(authenticate())
        } else {
            console.log('delete member thunk failed')
            return false
        }
    }
}

export const deleteMemberThunk = (channelId, members) => async(dispatch) => {

    for (let i = 0; i < members.length; i++) {
        const member = members[i];
        const response = await fetch(`/api/members/${member}/channel/${channelId}/delete`, {
            method: "DELETE"
        })
        if(response.ok){
            await dispatch(authenticate())
        } else {
            console.log('delete member thunk failed')
            return false
        }
    }
}
