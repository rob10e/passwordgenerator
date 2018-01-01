import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, NumericInput } from '@blueprintjs/core';
import { connect } from 'react-redux';

import { updateGeneratorOptions } from '../Redux/currentOptionsActions';
import { options as defaults } from '../Redux/Defaults/pronounceableGeneratorDefaults';
import PronounceableGenerator from '../../utils/pronounceable';

class PronounceableView extends Component {
  constructor(props) {
    super(props);
    this.passwordGenerator = new PronounceableGenerator();
  }

  generate = options => this.passwordGenerator.generate(options);

  render() {
    return (
      <div style={{ flex: '0 0 auto' }}>
        <FormGroup inline className="formgroup-no-label">
          <div className="pt-control-group pt-fill">
            <label htmlFor="length">Length:</label>
            <NumericInput
              value={this.props.options.length}
              name="length"
              min={5}
              max={80}
              clampValueOnBlur
              minorStepSize={1}
              onValueChange={value =>
                this.setOptions({
                  length: value,
                })
              }
            />
          </div>
        </FormGroup>
        <FormGroup inline className="formgroup-no-label">
          <div className="pt-control-group pt-fill">
            <label htmlFor="samples">Samples:</label>
            <NumericInput
              name="samples"
              value={this.props.options.samples}
              min={1}
              max={30}
              clampValueOnBlur
              minorStepSize={1}
              onValueChange={value =>
                this.props.setOptions({
                  samples: value,
                })
              }
            />
          </div>
        </FormGroup>
        <hr />
      </div>
    );
  }
}

PronounceableView.defaultProps = defaults;

PronounceableView.propTypes = {
  setOptions: PropTypes.func,
  options: PropTypes.shape({
    length: PropTypes.number,
    samples: PropTypes.number,
  }),
};

const mapStateToProps = state => ({
  options: state.currentOptions.options,
});

export default connect(mapStateToProps, { updateGeneratorOptions }, null, { withRef: true })(
  PronounceableView,
);
