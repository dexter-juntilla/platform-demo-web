import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import { loginSuccess } from './auth.action';
import { requestComplete, requestError } from '../request/request.action';

export function* login(action: Object): Generator<*, *, *> {
  const {
    key,
    id,
    params: { email, password },
  } = action.payload;

  try {
    yield call(delay, 2000);

    if (email && password) {
      yield put(loginSuccess('random_stuff'));
      yield put(requestComplete(key, id));
    } else {
      yield put(requestError(key, id, 'Error'));
    }
  } catch (err) {
    yield put(requestError(key, id, err));
  }
}
