import { selectProfile } from './currentOptionsActions';

export const ADD_NEW_PROFILE = 'ADD_NEW_PROFILE';

export const addProfile = (profile, generatorName, options) => ({
  type: ADD_NEW_PROFILE,
  payload: { profile, generatorName, options },
});

export const addNewProfile = (profile, generatorName, options) => async (dispatch) => {
  await dispatch(addProfile(profile, generatorName, options));
  await dispatch(selectProfile(profile, generatorName, options));
};
