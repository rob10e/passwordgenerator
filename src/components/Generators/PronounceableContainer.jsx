import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateGeneratorOptions } from '../Redux/currentOptionsActions';
import { options as defaults } from '../Redux/Defaults/pronounceableGeneratorDefaults';
import PronounceableView from './PronounceableView';

class PronounceableContainer extends Component {
  setOptions(options) {
    this.props.updateGeneratorOptions(null, { ...this.props.options, ...options });
  }

  render() {
    return <PronounceableView {...this.props} setOptions={options => this.setOptions(options)} />;
  }
}

PronounceableContainer.defaultProps = defaults;

PronounceableContainer.propTypes = {
  // onGenerate: PropTypes.func.isRequired,
  updateGeneratorOptions: PropTypes.func.isRequired,
  options: PropTypes.shape({
    length: PropTypes.number,
    samples: PropTypes.number,
  }),
};

const mapStateToProps = state => ({
  options: state.currentOptions.options,
});

export default connect(mapStateToProps, { updateGeneratorOptions })(PronounceableContainer);
