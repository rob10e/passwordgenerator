import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
//import createElectronStorage from 'redux-persist-electron-storage';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

// const config = {
//   key: 'root',
//   storage: createElectronStorage(),
// };

// const reducer = persistCombineReducers(config, rootReducer);

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  // Middleware you want to use in development:
  applyMiddleware(thunk),
);
/* eslint-enable */

export default function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/reactjs/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer);
  const persistor = persistStore(store);
  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept(
      './rootReducer',
      () => store.replaceReducer(require('./rootReducer').default), // eslint-disable-line global-require
    );
  }

  return { persistor, store };
}
