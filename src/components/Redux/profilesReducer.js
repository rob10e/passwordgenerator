import { ADD_NEW_PROFILE, TOGGLE_FAVORITE, DELETE_PROFILE } from './profilesActions';
import { randomGeneratorProfileDefault } from './Defaults/randomGeneratorDefaults';

const initialState = [
  {
    ...randomGeneratorProfileDefault,
  },
];

function alphabatizeProfiles(a, b) {
  const nameA = a.profile.toUpperCase() || '';
  const nameB = b.profile.toUpperCase() || '';
  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

function sortProfiles(profiles) {
  const favorites = profiles.filter(item => item.favorite) || [];
  const notFavorites = profiles.filter(item => !item.favorite) || [];
  favorites.sort(alphabatizeProfiles);
  notFavorites.sort(alphabatizeProfiles);
  const combined = favorites.concat(notFavorites);
  return combined;
}

const profilesReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case ADD_NEW_PROFILE:
      return sortProfiles(Object.assign([], state, [...state, payload]));
    case TOGGLE_FAVORITE: {
      return sortProfiles(
        state.map(
          (item) => {
            if (item.profile === payload.profile) {
              return { ...item, favorite: !(item.favorite || false) };
            }
            return item;
          },
        ),
      );
    }
    case DELETE_PROFILE: {
      return sortProfiles(state.filter(item => item.profile !== payload.profile));
    }
    default:
      return state;
  }
};

export default profilesReducer;
