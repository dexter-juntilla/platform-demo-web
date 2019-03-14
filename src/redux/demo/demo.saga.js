import { delay } from 'redux-saga';
import { call, put, race, all } from 'redux-saga/effects';

import Api from '../../modules/Api';
import { fetchDemoResponse } from './demo.action';
import { timeoutSeconds } from '../../config/settings';
import { requestError, requestComplete } from '../request/request.action';

export function* fetchDemoData(action: Object): Generator<*, *, *> {
  try {
    const { response, timeout } = yield race({
      response: call(Api.get, 'cars', action.payload.params || {}),
      timeout: call(delay, timeoutSeconds * 1000),
      // cancelled: call(shouldCancel, action),
    });

    if (timeout) {
      yield put(
        requestError(action.payload.key, action.payload.id, 'Request timeout'),
      );

      return;
    }

    yield put(fetchDemoResponse(response));
    yield put(requestComplete(action.payload.key, action.payload.id, response));

    if (action.payload.successAction) {
      if (action.payload.successAction.constructor === Array) {
        const effects = action.payload.successAction.map(el => put(el));

        yield all(effects);
      } else if (typeof action.payload.successAction === 'object') {
        yield put(action.payload.successAction);
      }
    }
  } catch (err) {
    yield put(requestError(action.payload.key, action.payload.id, err));
  }
}

export function* createCar(action: Object): Generator<*, *, *> {
  try {
    const { brand, color } = action.payload.params;

    const response = yield call(Api.post, 'car', { brand, color });
    yield console.log(response);
  } catch (err) {
    yield console.log(err);
  }
}
