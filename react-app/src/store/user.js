const LOAD_USERS = 'users/LOAD_USERS'

export const loadUsers = (users) => {
    return {
        type: LOAD_USERS,
        users
    }
}

export const loadUsersThunk = () => async(dispatch) => {
    const response = await fetch('/api/users/')
    if(response.ok){
        const data = await response.json()
        dispatch(loadUsers(data))
    } else {
        return false
    }
}

const usersReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
      case LOAD_USERS:
        newState = {};
        action.users.forEach((user) => {
            newState[user.id] = user
        })
        return newState;
      default:
        return state;
    }
  };

  export default usersReducer;
