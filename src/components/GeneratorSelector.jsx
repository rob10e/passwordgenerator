import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateGeneratorOptions } from './Redux/currentOptionsActions';

const GeneratorSelector = props => (
  <div style={{ flex: '0 0 auto' }}>
    <div className="pt-select pt-minimal pt-fill">
      <select
        className="select-as-h5"
        value={props.currentGenerator}
        onChange={event => props.updateGeneratorOptions(event.target.value)}
      >
        {props.generators.map(item => (
          <option key={item.index} value={item.value}>
            {`${item.label} Generator`}
          </option>
        ))}
      </select>
    </div>
  </div>
);

GeneratorSelector.propTypes = {
  currentGenerator: PropTypes.string.isRequired,
  updateGeneratorOptions: PropTypes.func.isRequired,
  generators: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  currentGenerator: state.currentOptions.generatorName,
});

export default connect(mapStateToProps, { updateGeneratorOptions })(GeneratorSelector);
