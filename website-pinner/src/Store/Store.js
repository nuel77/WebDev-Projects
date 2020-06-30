import * as actionTypes from './actionTypes'
import {createStore} from "redux";
import {combineReducers} from "redux";

const initialDataList = {
    urlDataList: []
}
const initialUIData = {
    selected: "HOME"
}
const userDataReducer = (state = initialDataList, action) => {
    switch (action.type) {
        case actionTypes.ADD:
            return {
                ...state,
                urlDataList: [...state.urlDataList, action.payload]
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
const rootReducer = combineReducers({userData: userDataReducer, ui: UIReducer})
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


 */