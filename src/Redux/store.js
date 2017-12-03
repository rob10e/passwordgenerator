import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';

/* eslint-disable no-underscore-dangle */
const enhancer = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // Middleware you want to use in development:
  // applyMiddleware(d1, d2, d3),
);
/* eslint-enable */

export default function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/reactjs/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept(
      './rootReducer',
      () => store.replaceReducer(require('./rootReducer').default), // eslint-disable-line global-require
    );
  }

  return store;
}
