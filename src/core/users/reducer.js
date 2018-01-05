import {CLIENT_SET, CLIENT_UNSET} from './constants'

const initialState = {
    id: null,
    token: null,
}

export function userReducer(state = initialState, action ) {
    switch(action.type) {
        case FETCH_PUBLIC_PROFILE:
            return {
              username: action.payload.username
            }
        case CLIENT_SET:
            return {
                id: action.payload.token.userId,
                username: action.payload.token.username,
            }
        case CLIENT_UNSET:
            return {
                id: null,
                token: null,
            }
        default:
            return state
    }
}

// export default reducer
