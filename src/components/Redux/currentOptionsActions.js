export const UPDATE_CURRENT_OPTIONS = 'UPDATE_CURRENT_OPTIONS';
export const SELECT_PROFILE = 'SELECT_PROFILE';

export const updateGeneratorOptions = (generatorName, options) => ({
  type: UPDATE_CURRENT_OPTIONS,
  payload: { generatorName, options },
});

export const selectProfile = (profile, generatorName, options) => ({
  type: SELECT_PROFILE,
  payload: { profile, generatorName, options },
});
