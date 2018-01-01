import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup, Switch } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { options as defaults } from '../Redux/Defaults/symbolReplaceGeneratorDefaults';
import SymbolReplaceGenerator from '../../utils/symbolReplace';
import { updateGeneratorOptions } from '../Redux/currentOptionsActions';

class SymbolReplace extends Component {
  constructor(props) {
    super(props);
    this.passwordGenerator = new SymbolReplaceGenerator();
  }

  state = {
    inputString: '',
  };

  setOptions(options) {
    this.props.updateGeneratorOptions(null, { ...this.props.options, ...options });
  }

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
        <Switch
          label="Use wrappers"
          checked={this.props.options.useWrappers}
          onChange={(event) => {
            event.persist();
            this.setOptions({
              useWrappers: event.target.checked,
            });
          }}
        />
        <hr />
      </div>
    );
  }
}

SymbolReplace.defaultProps = defaults;

SymbolReplace.propTypes = {
  options: PropTypes.shape({
    useWrappers: PropTypes.bool,
  }),
  updateGeneratorOptions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  options: state.currentOptions.options,
});

export default connect(mapStateToProps, { updateGeneratorOptions }, null, { withRef: true })(
  SymbolReplace,
);
