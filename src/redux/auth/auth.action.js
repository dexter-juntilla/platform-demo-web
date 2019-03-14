export const LOG_OUT = 'LOG_OUT';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export const logOut = () => ({
  type: LOG_OUT,
});

export const loginSuccess = (token: string) => ({
  type: LOG_IN_SUCCESS,
  payload: {
    token,
  },
});

export const setAccessToken = (token: string) => ({
  type: SET_ACCESS_TOKEN,
  payload: {
    token,
  },
});
