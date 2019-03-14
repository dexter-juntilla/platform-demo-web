import { delay } from 'redux-saga';
import { takeEvery, takeLatest, fork, put, call } from 'redux-saga/effects';
import { takeLeadingByPayload } from './util/effects';
import {
  DEBOUNCE_REQUEST,
  SEND_REQUEST,
  SEND_REQUEST_AWAIT,
  SEND_REQUEST_LATEST,
  sendRequestLatest,
} from './request/request.action';
import defaultRequestSaga from './request/request.saga';
import FirebaseClient from '../modules/FirebaseClient';
import {
  FETCH_SAMPLE_DATA,
  LOGIN,
  CREATE_CAR,
} from './request/request.constants';
import { fetchDemoData, createCar } from './demo/demo.saga';
import { login, authenticationListener } from './auth/auth.saga';

import { debounceTimeoutSeconds } from '../config/settings';

function* sendRequest(action: Object) {
  switch (action.payload.key) {
    case FETCH_SAMPLE_DATA:
      yield fork(fetchDemoData, action);
      break;
    case LOGIN:
      yield fork(login, action);
      break;
    case CREATE_CAR:
      yield fork(createCar, action);
      break;
    default:
      yield fork(defaultRequestSaga, action);
  }
}

function* dispatchRequest(action: Object) {
  yield call(delay, debounceTimeoutSeconds * 1000);
  const { key, id, params, successAction, failureAction } = action.payload;
  yield put(sendRequestLatest(key, id, params, successAction, failureAction));
}

export default function* rootSaga(): Generator<*, *, *> {
  yield FirebaseClient.init();
  yield takeLatest(DEBOUNCE_REQUEST, dispatchRequest);
  yield takeEvery(SEND_REQUEST, sendRequest);
  yield takeLatest(SEND_REQUEST_LATEST, sendRequest);
  yield takeLeadingByPayload(SEND_REQUEST_AWAIT, sendRequest);
  yield authenticationListener();
}
