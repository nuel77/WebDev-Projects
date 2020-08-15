import * as actionTypes from './actionTypes'
import {createStore} from "redux";
import {combineReducers} from "redux";

const loginUser = {
    email: "",
    name: "",
}
const initialDataList = {
    email: "",
    name: "",
    id: "",
    urlDataList: []
}
const initialUIData = {
    selected: "HOME"
}
const initialAuth = {
    isLoggedIn: false
}
const loginReducer = (state = loginUser, action) => {
    switch (action.type) {
        case (actionTypes.LOGIN_USER):
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
            }
        default:
            return state
    }
}
const userDataReducer = (state = initialDataList, action) => {
    switch (action.type) {
        case actionTypes.ADD:
            return {
                ...state,
                urlDataList: [...state.urlDataList, action.payload]
            }
        case actionTypes.INITIALIZE_URL_LIST:
            return {
                ...state,
                urlDataList: [...action.payload]
            }
        case actionTypes.DELETE:
            return {
                ...state,
                urlDataList: state.urlDataList.filter((elem) =>
                    elem._id !== action.payload.id
                )
            }
        default:
            return state
    }
}
const UIReducer = (state = initialUIData, action) => {
    switch (action.type) {
        case actionTypes.SELECTED_CATEGORY:
            return {
                ...state,
                selected: action.payload
            }
        default:
            return state
    }
}
const authReducer = (state = initialAuth, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCESS:
            return {
                ...state,
                isLoggedIn: true
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            }
        default:
            return state
    }
}
const rootReducer = combineReducers({
    userData: userDataReducer,
    ui: UIReducer,
    loggedUser: loginReducer,
    auth: authReducer
})
export default createStore(rootReducer)

/*
userData
-----------
urlDataList=[{
url: String,
title: String,
desc: String,
category: String

ui
--------
{
selected: String
}
}]

loggedUser
-------
{
email:string,
name:string,
}

 */