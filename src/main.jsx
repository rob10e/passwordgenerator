import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import 'react-hot-loader/patch';
import store from './Redux/store';

const render = () => {
  // NB: We have to re-require MyApp every time or else this won't work
  // We also need to wrap our app in the AppContainer class
  const App = require('./app.jsx').default; // eslint-disable-line global-require
  ReactDOM.render(
    <AppContainer>
      <Provider store={store({})}>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

render();
if (module.hot) {
  module.hot.accept(render);
}
