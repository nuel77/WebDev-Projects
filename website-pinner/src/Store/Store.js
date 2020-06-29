import * as actionTypes from './actionTypes'
import {createStore} from "redux";

const initialDataList = {
    urlDataList: []
}
const rootReducer = (state = initialDataList, action) => {
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

export default createStore(rootReducer)