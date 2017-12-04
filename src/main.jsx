import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import 'react-hot-loader/patch';
import storeCreator from './Redux/store';

const creator = storeCreator({});
const store = creator.store;
const persistor = creator.persistor;

const render = () => {
  // NB: We have to re-require MyApp every time or else this won't work
  // We also need to wrap our app in the AppContainer class
  const App = require('./app.jsx').default; // eslint-disable-line global-require
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

render();
if (module.hot) {
  module.hot.accept(render);
}
