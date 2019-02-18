export const EMAIL_INPUT_CHANGED = 'EMAIL_INPUT_CHANGED';
export const PASSWORD_INPUT_CHANGED = 'PASSWORD_INPUT_CHANGED';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILED = 'LOG_IN_FAILED';

export const emailInputChanged = (email: string) => ({
  type: EMAIL_INPUT_CHANGED,
  payload: {
    email,
  },
});

export const passwordInputChanged = (password: string) => ({
  type: PASSWORD_INPUT_CHANGED,
  payload: {
    password,
  },
});

export const logIn = (email: string, password: string) => ({
  type: LOG_IN,
  payload: {
    email,
    password,
  },
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const loginSuccess = (token: string) => ({
  type: LOG_IN_SUCCESS,
  payload: {
    token,
  },
});

export const loginFailed = (error: string) => ({
  type: LOG_IN_FAILED,
  payload: {
    error,
  },
});
