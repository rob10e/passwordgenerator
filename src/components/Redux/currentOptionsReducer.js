import { UPDATE_CURRENT_OPTIONS, SELECT_PROFILE } from './currentOptionsActions';
import randomDefault, { randomDefaultOptions } from './Defaults/randomGeneratorDefaults';

const initialState = { ...randomDefault, profileName: randomDefault.profileName };

const currentOptionsReducer = (state = initialState, action) => {
  const payload = action.payload;
  let generatorName = action.generatorName;
  switch (action.type) {
    case UPDATE_CURRENT_OPTIONS:
      if (payload.generatorName === null || payload.generatorName === undefined) {
        generatorName = state.generatorName;
      }
      if (payload.options === null || payload.options === undefined) {
        switch (payload.generatorName) {
          case 'random':
            return Object.assign({}, state, {
              profileName: '',
              generatorName,
              options: randomDefaultOptions,
            });
          default:
            return Object.assign({}, state, {
              profileName: '',
              generatorName,
              options: {},
            });
        }
      }
      return Object.assign({}, state, { profileName: '', generatorName, options: payload.options });
    case SELECT_PROFILE:
      return Object.assign({}, state, ...payload);
    default:
      return state;
  }
};

export default currentOptionsReducer;
