// import { combineReducers } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import currentOptionsReducer from '../components/Redux/currentOptionsReducer';
import profilesReducer from '../components/Redux/profilesReducer';
import createElectronStorage from 'redux-persist-electron-storage';

const config = {
  key: 'root',
  storage: createElectronStorage(),
};

const reducer = persistCombineReducers(config, {
  profiles: profilesReducer,
  currentOptions: currentOptionsReducer,
});

// const rootReducer = combineReducers({
//   profiles: profilesReducer,
//   currentOptions: currentOptionsReducer,
// });

export default reducer;
