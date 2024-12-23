import { userService } from "../../services/user.service.js"

//* Count
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_BY = 'CHANGE_BY'

//* User
export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'


const initialState = {
    count: 10000,
    loggedInUser: userService.getLoggedinUser(),
}


export function userReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        //* Count
        case INCREMENT:
            return { ...state, count: state.count + 10 }
        case DECREMENT:
            return { ...state, count: state.count - 10 }
        case CHANGE_BY:
            return { ...state, count: state.count + cmd.diff }

        //* User
        case SET_USER:
            return {
                ...state,
                loggedInUser: cmd.user
            }
        case SET_USER_SCORE:
            const loggedInUser = { ...state.loggedInUser, score: cmd.score }
            return { ...state, loggedInUser }
        default:
            return state
    }
}