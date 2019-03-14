import { put, take, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import FirebaseClient from '../../modules/FirebaseClient';
import Api from '../../modules/Api';
import { requestComplete, requestError } from '../request/request.action';
import { loginSuccess, setAccessToken } from './auth.action';

export function* authenticationListener(): Generator<*, *, *> {
  const authSubscriptionChannel = () =>
    eventChannel((emitter: Function) =>
      FirebaseClient.instance.auth().onAuthStateChanged(user => {
        emitter(user);
      }),
    );

  const channel = authSubscriptionChannel();

  while (true) {
    try {
      const user = yield take(channel);

      const state = yield select();

      if (user && state.authStore.isAuthenticated === true) {
        const {
          token,
          // claims: { admin },
        } = yield FirebaseClient.instance.auth().currentUser.getIdTokenResult();

        if (token) {
          yield Api.setPostHeaders(token);
          yield put(setAccessToken(token));
        }
        // else {
        //   yield put(setAccessToken(''));
        // }
      } else {
        yield console.log('### authenticationListener');
        yield console.log('not authenticated');
      }
    } catch (err) {
      yield console.log(err);
    }
  }
}

export function* login(action: Object): Generator<*, *, *> {
  const {
    key,
    id,
    params: { email, password },
  } = action.payload;

  try {
    if (email && password) {
      const response = yield FirebaseClient.instance
        .auth()
        .signInWithEmailAndPassword(email, password);

      const {
        token,
      } = yield FirebaseClient.instance.auth().currentUser.getIdTokenResult();

      if (response.user && token) {
        yield Api.setPostHeaders(token);
        yield put(loginSuccess(token));
      }

      yield put(requestComplete(key, id));
    } else {
      yield put(requestError(key, id, 'Error'));
    }
  } catch (err) {
    yield put(requestError(key, id, err));
  }
}

export const logout = () => {
  FirebaseClient.instance
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
      // An error happened.
    });
};
