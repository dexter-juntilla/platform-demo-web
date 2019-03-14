import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './modules/reduxProvider';
import { AppContainer } from './containers/appContainer';

// import 'primereact/resources/themes/nova-light/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import './styles/main.scss';

const wrapper = document.getElementById('root');

if (wrapper) {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <AppContainer />
        </HashRouter>
      </PersistGate>
    </Provider>,
    wrapper,
  );
}
