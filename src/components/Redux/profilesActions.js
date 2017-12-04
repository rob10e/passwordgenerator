import Guid from 'guid';
import { selectProfile } from './currentOptionsActions';

export const ADD_NEW_PROFILE = 'ADD_NEW_PROFILE';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const DELETE_PROFILE = 'DELETE_PROFILE';

export const deleteProfile = profile => ({
  type: DELETE_PROFILE,
  payload: { profile },
});

export const toggleFavorite = profile => ({
  type: TOGGLE_FAVORITE,
  payload: { profile },
});

export const addProfile = (profile, generatorName, options, guid) => ({
  type: ADD_NEW_PROFILE,
  payload: { profile, generatorName, options, guid },
});

export const addNewProfile = (profile, generatorName, options) => async (dispatch) => {
  const guid = Guid.create();
  await dispatch(addProfile(profile, generatorName, options, guid));
  await dispatch(selectProfile(profile, generatorName, options));
};
