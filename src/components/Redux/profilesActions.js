export const ADD_NEW_PROFILE = 'ADD_NEW_PROFILE';

export const addNewProfile = (profile, generatorName, options) => ({
  type: ADD_NEW_PROFILE,
  payload: { profile, generatorName, options },
});
