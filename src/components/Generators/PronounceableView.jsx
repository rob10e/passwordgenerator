import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, NumericInput } from '@blueprintjs/core';

import { options as defaults } from '../Redux/Defaults/pronounceableGeneratorDefaults';

const PronounceableView = props => (
  <div>
    <FormGroup inline className="formgroup-no-label">
      <div className="pt-control-group pt-fill">
        <label htmlFor="length">Length:</label>
        <NumericInput
          value={props.options.length}
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
          value={props.options.samples}
          min={1}
          max={30}
          clampValueOnBlur
          minorStepSize={1}
          onValueChange={value =>
            props.setOptions({
              samples: value,
            })
          }
        />
      </div>
    </FormGroup>
    {/*props.passwordList && props.passwordList.length > 0 ? (
      <table className="pt-table pt-interactive pt-condensed" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Password</th>
            <th>Strength</th>
          </tr>
        </thead>
        <tbody>
          {props.passwordList.map(item => (
            <tr key={`${item.password}_id`} onClick={() => props.onGenerate(item)}>
              <td>{item.password}</td>
              <td>{props.strengths[item.score.strength]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : null*/}
    <hr />
  </div>
);

PronounceableView.defaultProps = defaults;

PronounceableView.propTypes = {
  setOptions: PropTypes.func,
  options: PropTypes.shape({
    length: PropTypes.number,
    samples: PropTypes.number,
  }),
  strengths: PropTypes.arrayOf(PropTypes.string),
  // passwordList: PropTypes.arrayOf(PropTypes.string),
};

export default PronounceableView;
