import { combineReducers } from 'redux'
import userReducer from './userReducer'
import questionReducer from './questionReducer'
const allReducer = combineReducers({
    user: userReducer,
    questions: questionReducer
})
export default allReducer