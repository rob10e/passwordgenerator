import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { options as defaults } from '../Redux/Defaults/pronounceableGeneratorDefaults';
import SymbolReplaceGenerator from '../../utils/symbolReplace';

class SymbolReplace extends Component {
  constructor(props) {
    super(props);
    this.passwordGenerator = new SymbolReplaceGenerator();
  }

  state = {
    inputString: '',
  };

  generate(options) {
    return this.passwordGenerator.generate({ ...options, inputString: this.state.inputString });
  }

  render() {
    return (
      <div style={{ flex: '0 0 auto' }}>
        <FormGroup label="Phrase to munge:" labelFor="text-input">
          <InputGroup
            placeholder="Any string here"
            value={this.state.inputString}
            onChange={(event) => {
              event.persist();
              const inputString = event.target.value;
              this.setState({
                inputString,
              });
            }}
          />
        </FormGroup>
        <hr />
      </div>
    );
  }
}

SymbolReplace.defaultProps = defaults;

SymbolReplace.propTypes = {
  setOptions: PropTypes.func,
  options: PropTypes.shape({
    length: PropTypes.number,
    samples: PropTypes.number,
  }),
  strengths: PropTypes.arrayOf(PropTypes.string),
};

export default connect(null, null, null, { withRef: true })(SymbolReplace);
