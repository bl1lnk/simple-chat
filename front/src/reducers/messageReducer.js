import { 
    MESSAGE_CREATE_FAIL, 
    MESSAGE_CREATE_REQUEST, 
    MESSAGE_CREATE_SUCCESS,
    MESSAGE_LIST_FAIL,
    MESSAGE_LIST_REQUEST,
    MESSAGE_LIST_SUCCESS
 } from "../constants/messageConstants"

export const createMessageReducer = (state={message:[]}, action)=>{
    switch(action.type){
        case MESSAGE_CREATE_REQUEST:
            return {loading: true}
        case MESSAGE_CREATE_SUCCESS:
            return {loading: false, messages: action.payload}
        case MESSAGE_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const listMessageReducer = (state={messages:[]}, action)=>{
    switch(action.type){
        case MESSAGE_LIST_REQUEST:
            return {loading: true}
        case MESSAGE_LIST_SUCCESS:
            return {loading: false, messages: action.payload}
        case MESSAGE_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}



