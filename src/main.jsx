import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'react-hot-loader/patch';
//import App from './app';

const render = () => {
  // NB: We have to re-require MyApp every time or else this won't work
  // We also need to wrap our app in the AppContainer class
  const App = require('./app.jsx').default; // eslint-disable-line global-require
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('app'),
  );
};

render();
if (module.hot) {
  module.hot.accept(render);
}
