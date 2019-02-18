import { put } from 'redux-saga/effects';
import axios from 'axios';

import { loginSuccess, loginFailed } from './auth.action';

export function* login(action: Object): Generator<*, *, *> {
  try {
    const { email, password } = action.payload;
    const response = yield axios
      .post(
        'https://us-central1-ryoaki-api-server.cloudfunctions.net/ryoakiApp/api/v1/users/login',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          email,
          password,
        },
      )
      .then(apiResponse => apiResponse);

    const {
      data: { token, signInError },
    } = response;

    if (token) {
      yield put(loginSuccess(token));
    } else if (signInError) {
      yield put(loginFailed(signInError));
    } else {
      yield put(loginFailed('Failed to login'));
    }
    console.log(token);
  } catch (err) {
    yield put(loginFailed(JSON.stringify(err)));
  }
}
