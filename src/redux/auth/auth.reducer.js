import { LOG_OUT, LOG_IN_SUCCESS, SET_ACCESS_TOKEN } from './auth.action';

export const initialState = {
  isAuthenticated: false,
  token: '',
  claims: {
    admin: true,
  },
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case LOG_OUT:
      return {
        ...initialState,
      };
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
