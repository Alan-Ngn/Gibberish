const LOAD_USERS = 'users/LOAD_USERS'

export const loadUsers = (users) => {
    return {
        type: LOAD_USERS,
        users
    }
}

export const loadUsersThunk = () => async(dispatch) => {
    console.log('WE ARE IN THE LOAD USERS THUNK')
    const response = await fetch('/api/users/')
    if(response.ok){
        const data = await response.json()
        dispatch(loadUsers(data))
    } else {
        console.log('LOAD USERS THUNKS FAILED')
        return false
    }
}

const usersReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
      case LOAD_USERS:
        newState = {};
        console.log("action.users 👾👾👾👉", action.users)
        action.users.forEach((user) => {
            newState[user.id] = user
        })
        console.log("newState 👉👾👾👾", newState)
        return newState;
      default:
        return state;
    }
  };

  export default usersReducer;
