import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from'redux-devtools-extension'
import {userRegisterReducer, userLoginReducer, userDetailsReducer, listNotificationsReducer} from './reducers/userReducers'
import {createMessageReducer, listMessageReducer} from './reducers/messageReducer'

const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userDetails:userDetailsReducer,
    createMessage: createMessageReducer,
    listMessage: listMessageReducer,
    listNotifications:listNotificationsReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState={
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store