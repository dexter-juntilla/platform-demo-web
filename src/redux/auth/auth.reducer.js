import { LOG_OUT, LOG_IN_SUCCESS } from './auth.action';

export const initialState = {
  isAuthenticated: false,
  token: '',
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case LOG_OUT:
      return {
        ...initialState,
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
