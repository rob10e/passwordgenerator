import { combineReducers } from 'redux';
import currentOptionsReducer from '../components/Redux/currentOptionsReducer';
import profilesReducer from '../components/Redux/profilesReducer';

const rootReducer = combineReducers({
  profiles: profilesReducer,
  currentOptions: currentOptionsReducer,
});

export default rootReducer;
