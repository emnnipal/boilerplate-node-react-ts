import {
  SET_USER_PROFILE
} from '../../enums/types'

export interface Action {
  payload: any,
  type: string
}

const initialState = {
  info: {}
};

export default (state = initialState, action: Action) => {
  switch(action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        info: action.payload
      }
    default: return state;
  }
}