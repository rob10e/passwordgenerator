import { UPDATE_CURRENT_OPTIONS, SELECT_PROFILE } from './currentOptionsActions';
import randomDefaultOptions from './Defaults/randomGeneratorDefaults';
import pronounceableDefaultOptions from './Defaults/pronounceableGeneratorDefaults';

const initialState = { ...randomDefaultOptions, profile: 'Default' };

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
            return randomDefaultOptions;
          case 'pronounceable':
            return pronounceableDefaultOptions;
          default:
            return Object.assign({}, state, {
              profile: '',
              generatorName,
              options: {},
            });
        }
      }
      return Object.assign({}, state, { profile: '', generatorName, options: payload.options });
    case SELECT_PROFILE:
      return payload;
    default:
      return state;
  }
};

export default currentOptionsReducer;
