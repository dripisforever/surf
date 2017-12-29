import {CLIENT_SET, CLIENT_UNSET} from './constants'

export function setClient(token) {
    return {
        type: CLIENT_SET,
        payload: {
          token: token
        }
        
    }
}

export function unsetClient() {
    return {
        type: CLIENT_UNSET,

    }
}
