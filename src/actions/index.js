import axiosAuth from '../apis/axiosAuth'
import * as types from './actionTypes'

export const fetchAuth = () => async dispatch => {
  const res = await axiosAuth.get(`/current_user`)
  console.log('this got hit !!!', res)
  const { id, ...user } = res.data
  if (id) {
    dispatch({ type: types.FETCH_AUTH, payload: { id } })
    dispatch({ type: types.FETCH_USER, payload: user })
  } else {
    dispatch({ type: types.FETCH_AUTH, payload: false })
  }
  return res.data
}
