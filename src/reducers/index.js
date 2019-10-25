import { combineReducers } from 'redux'
import { userReducer as user } from './userReducer'
import { authReducer as auth } from './authReducer'
import { authModalReducer as modal } from './authModalReducer'
export default combineReducers({
  auth,
  user,
  modal,
})
