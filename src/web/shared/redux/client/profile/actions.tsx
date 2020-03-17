import {
  SET_USER_PROFILE
} from '../../enums/types'

interface State {
  type: string,
  payload: any
}

export const setCurrentUserInfo = (payload: any): State => {
  return {
    type: SET_USER_PROFILE,
    payload
  };
}

export const getUserInfo = (userId: string = ''): any => {
  return dispatch => {
    return new Promise(resolve => {
      dispatch(setCurrentUserInfo({userId}))
      resolve('good')
    })
  }
}