import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';

import authReducer from './auth/auth.reducer';
import requestReducer from './request/request.reducer';
import demoReducer from './demo/demo.reducer';

const authPersistConfig = {
  key: 'authStore',
  storage: sessionStorage,
  whitelist: ['authenticated', 'token'],
};

export default {
  authStore: persistReducer(authPersistConfig, authReducer),
  demoStore: demoReducer,
  requestStore: requestReducer,
};
