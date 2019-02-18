import {
  EMAIL_INPUT_CHANGED,
  PASSWORD_INPUT_CHANGED,
  LOG_IN,
  LOG_OUT,
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
} from './auth.action';

export const initialState = {
  isAuthenticated: false,
  email: '',
  password: '',
  triedToLoginOnce: false,
  token: '',
  error: '',
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case LOG_OUT:
      return {
        ...initialState,
      };
    case EMAIL_INPUT_CHANGED:
      return {
        ...state,
        email: action.payload.email,
      };
    case PASSWORD_INPUT_CHANGED:
      return {
        ...state,
        password: action.payload.password,
      };
    case LOG_IN:
      return {
        ...state,
        triedToLoginOnce: true,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        email: '',
        password: '',
        error: '',
        isAuthenticated: true,
        triedToLoginOnce: false,
        token: action.payload.token,
      };
    case LOG_IN_FAILED:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
