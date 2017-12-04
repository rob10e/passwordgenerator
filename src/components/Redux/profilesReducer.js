import { ADD_NEW_PROFILE, TOGGLE_FAVORITE, DELETE_PROFILE } from './profilesActions';
import randomDefault, { randomGeneratorProfileDefault } from './Defaults/randomGeneratorDefaults';

const initialState = [
  {
    ...randomGeneratorProfileDefault,
  },
];

const profilesReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case ADD_NEW_PROFILE:
      return Object.assign([], state, [...state, payload]);
    case TOGGLE_FAVORITE: {
      return state.map(
        item =>
          item.profile === payload.profile
            ? { ...item, favorite: !(item.favorite || false) }
            : item,
      );
    }
    case DELETE_PROFILE: {
      return state.filter(item => item.profile !== payload.profile);
    }
    default:
      return state;
  }
};

export default profilesReducer;
