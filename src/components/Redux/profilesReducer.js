import { ADD_NEW_PROFILE } from './profilesActions';
import randomDefault from './Defaults/randomGeneratorDefaults';

const initialState = [
  {
    randomDefault,
    profileName: 'Default',
  },
];

const profilesReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case ADD_NEW_PROFILE:
      return Object.assign([], state, [...state, payload]);
    default:
      return state;
  }
};

export default profilesReducer;
