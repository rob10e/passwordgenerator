import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FormGroup, NumericInput, Button } from '@blueprintjs/core';
import PronounceablePasswordGenerator from '../../utils/PronounceableGenerator';
import { updateGeneratorOptions } from '../Redux/currentOptionsActions';
import strengths from '../../utils/passwordStrengths';

// TODO: Add more constrain checking

class PronounceableGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = { passwordList: [] };
    // this.passwordGenerator = new PronounceablePasswordGenerator();
  }

  setOptions(options) {
    this.props.updateGeneratorOptions(null, { ...this.props.options, ...options });
  }

  render() {
    const options = this.props.options;
    return (
      <div>
        <FormGroup inline className="formgroup-no-label">
          <div className="pt-control-group pt-fill">
            <label htmlFor="length">Length:</label>
            <NumericInput
              value={options.length}
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
              value={options.samples}
              min={1}
              max={30}
              clampValueOnBlur
              minorStepSize={1}
              onValueChange={value =>
                this.setOptions({
                  samples: value,
                })
              }
            />
          </div>
        </FormGroup>
        {this.state.passwordList && this.state.passwordList.length > 0 ? (
          <table className="pt-table pt-interactive pt-condensed" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Password</th>
                <th>Strength</th>
              </tr>
            </thead>
            <tbody>
              {this.state.passwordList.map(item => (
                <tr key={`${item.password}_id`} onClick={() => this.props.onGenerate(item)}>
                  <td>{item.password}</td>
                  <td>{strengths[item.score.strength]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
        <hr />
        <Button
          className="pt-fill"
          text="Generate"
          onClick={() => {
            const generator = new PronounceablePasswordGenerator(options);
            this.setState({ passwordList: generator });
            // this.props.onGenerate(generator[0]);
          }}
        />
      </div>
    );
  }
}

PronounceableGenerator.propTypes = {
  onGenerate: PropTypes.func.isRequired,
  updateGeneratorOptions: PropTypes.func.isRequired,
  options: PropTypes.shape({
    length: PropTypes.number,
    samples: PropTypes.number,
  }),
};

const mapStateToProps = state => ({
  options: state.currentOptions.options,
});

export default connect(mapStateToProps, { updateGeneratorOptions })(PronounceableGenerator);
