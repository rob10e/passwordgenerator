import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  FormGroup,
  Switch,
  NumericInput,
  InputGroup,
  Checkbox,
  Tooltip,
  Position,
} from '@blueprintjs/core';
import RandomPasswordGenerator from '../../utils/random';
import { updateGeneratorOptions } from '../Redux/currentOptionsActions';

class RandomView extends Component {
  static displayName = 'Random View';
  constructor(props) {
    super(props);
    this.passwordGenerator = new RandomPasswordGenerator();
  }

  setOptions(options) {
    this.props.updateGeneratorOptions(null, { ...this.props.options, ...options });
  }

  generate = options => this.passwordGenerator.generate(options);

  render() {
    const options = this.props.options;
    return (
      <div style={{ flex: '0 0 auto' }}>
        <FormGroup inline className="formgroup-no-label">
          <div className="pt-control-group pt-fill">
            <Switch
              label="Length:"
              checked={options.byLength}
              onChange={(event) => {
                event.persist();
                this.setOptions({
                  byLength: event.target.checked,
                  byEntropy: !event.target.checked,
                });
              }}
            />
            <NumericInput
              disabled={!options.byLength}
              value={options.length}
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
            <Switch
              label="Entropy:"
              checked={options.byEntropy}
              onChange={(event) => {
                event.persist();
                this.setOptions({
                  byEntropy: event.target.checked,
                  byLength: !event.target.checked,
                });
              }}
            />
            <NumericInput
              disabled={!options.byEntropy}
              value={options.entropy}
              min={30}
              max={4096}
              clampValueOnBlur
              onValueChange={value =>
                this.setOptions({
                  entropy: value,
                })
              }
            />
          </div>
        </FormGroup>
        <div className="pt-control-group pt-horizontal" style={{ width: '100%', marginTop: 20 }}>
          <div className="pt-control-group pt-vertical" style={{ width: '40%' }}>
            <Switch
              label="Upper Case"
              checked={options.upperCase}
              onChange={(event) => {
                event.persist();
                this.setOptions({
                  upperCase: event.target.checked,
                });
              }}
            />
            <Switch
              label="Lower Case"
              checked={options.lowerCase}
              onChange={(event) => {
                event.persist();
                this.setOptions({
                  lowerCase: event.target.checked,
                });
              }}
            />
            <Switch
              label="Digits"
              checked={options.digits}
              onChange={(event) => {
                event.persist();
                this.setOptions({
                  digits: event.target.checked,
                });
              }}
            />
            <Switch
              label="Minus"
              checked={options.minus}
              onChange={(event) => {
                event.persist();
                this.setOptions({
                  minus: event.target.checked,
                });
              }}
            />
            <Switch
              label="Underline"
              checked={options.underline}
              onChange={(event) => {
                event.persist();
                this.setOptions({
                  underline: event.target.checked,
                });
              }}
            />
          </div>
          <div className="pt-control-group pt-vertical" style={{ width: '10%' }}>
            <Tooltip
              className="tooltip-fix"
              position={Position.TOP}
              content="Ensure at least 1 uppercase character"
            >
              <Checkbox
                disabled={!options.upperCase}
                checked={options.upperCaseMinimum}
                onChange={(event) => {
                  event.persist();
                  this.setOptions({ upperCaseMinimum: event.target.checked });
                }}
              />
            </Tooltip>
            <Tooltip
              className="tooltip-fix"
              position={Position.TOP}
              content="Ensure at least 1 lowercase character"
            >
              <Checkbox
                disabled={!options.lowerCase}
                checked={options.lowerCaseMinimum}
                onChange={(event) => {
                  event.persist();
                  this.setOptions({ lowerCaseMinimum: event.target.checked });
                }}
              />
            </Tooltip>
            <Tooltip
              className="tooltip-fix"
              position={Position.TOP}
              content="Ensure at least 1 numeric character"
            >
              <Checkbox
                disabled={!options.digits}
                checked={options.digitMinimum}
                onChange={(event) => {
                  event.persist();
                  this.setOptions({ digitMinimum: event.target.checked });
                }}
              />
            </Tooltip>
            <Tooltip
              className="tooltip-fix"
              position={Position.TOP}
              content="Ensure at least 1 minus character"
            >
              <Checkbox
                disabled={!options.minus}
                checked={options.minusMinimum}
                onChange={(event) => {
                  event.persist();
                  this.setOptions({ minusMinimum: event.target.checked });
                }}
              />
            </Tooltip>
            <Tooltip
              className="tooltip-fix"
              position={Position.TOP}
              content="Ensure at least 1 underline character"
            >
              <Checkbox
                disabled={!options.underline}
                checked={options.underlineMinimum}
                onChange={(event) => {
                  event.persist();
                  this.setOptions({ underlineMinimum: event.target.checked });
                }}
              />
            </Tooltip>
          </div>
          <div className="pt-control-group pt-vertical" style={{ width: '40%' }}>
            <Switch
              label="Space"
              checked={options.space}
              onChange={(event) => {
                event.persist();
                this.setOptions({
                  space: event.target.checked,
                });
              }}
            />
            <Switch
              label="Special"
              checked={options.special}
              onChange={(event) => {
                event.persist();
                this.setOptions({
                  special: event.target.checked,
                });
              }}
            />
            <Switch
              label="Brackets"
              checked={options.brackets}
              onChange={(event) => {
                event.persist();
                this.setOptions({
                  brackets: event.target.checked,
                });
              }}
            />
            <Switch
              label="High ANSI characters"
              checked={options.highAnsi}
              onChange={(event) => {
                event.persist();
                this.setOptions({
                  highAnsi: event.target.checked,
                });
              }}
            />
          </div>
          <div className="pt-control-group pt-vertical" style={{ width: '10%' }}>
            <Tooltip
              className="tooltip-fix"
              position={Position.TOP}
              content="Ensure at least 1 space character"
            >
              <Checkbox
                disabled={!options.space}
                checked={options.spaceMinimum}
                onChange={(event) => {
                  event.persist();
                  this.setOptions({ spaceMinimum: event.target.checked });
                }}
              />
            </Tooltip>
            <Tooltip
              className="tooltip-fix"
              position={Position.TOP}
              content="Ensure at least 1 special character"
            >
              <Checkbox
                disabled={!options.special}
                checked={options.specialMinimum}
                onChange={(event) => {
                  event.persist();
                  this.setOptions({ specialMinimum: event.target.checked });
                }}
              />
            </Tooltip>
            <Tooltip
              className="tooltip-fix"
              position={Position.TOP}
              content="Ensure at least 1 bracket character"
            >
              <Checkbox
                disabled={!options.brackets}
                checked={options.bracketMinimum}
                onChange={(event) => {
                  event.persist();
                  this.setOptions({ bracketMinimum: event.target.checked });
                }}
              />
            </Tooltip>
            <Tooltip
              className="tooltip-fix"
              position={Position.TOP}
              content="Ensure at least 1 high ANSI character"
            >
              <Checkbox
                disabled={!options.highAnsi}
                checked={options.highAnsiMinimum}
                onChange={(event) => {
                  event.persist();
                  this.setOptions({ highAnsiMinimum: event.target.checked });
                }}
              />
            </Tooltip>
          </div>
        </div>
        <FormGroup label="Also include these:" labelFor="text-input">
          <InputGroup
            placeholder="Custom characters"
            value={options.customCharacters}
            onChange={(event) => {
              event.persist();
              let value = event.target.value;
              value = value.replace(/ /, '\u00a0');
              this.setOptions({
                customCharacters: value,
              });
            }}
          />
        </FormGroup>
        <hr />
      </div>
    );
  }
}

RandomView.propTypes = {
  updateGeneratorOptions: PropTypes.func.isRequired,
  options: PropTypes.shape({
    brackets: PropTypes.bool,
    bracketsMinimum: PropTypes.bool,
    byEntropy: PropTypes.bool,
    byLength: PropTypes.bool,
    customCharacters: PropTypes.string,
    digits: PropTypes.bool,
    digitsMinimum: PropTypes.bool,
    entropy: PropTypes.number,
    highAnsi: PropTypes.bool,
    highAnsiMinimum: PropTypes.bool,
    length: PropTypes.number,
    lowerCase: PropTypes.bool,
    lowerCaseMinimum: PropTypes.bool,
    minus: PropTypes.bool,
    minusMinimum: PropTypes.bool,
    space: PropTypes.bool,
    spaceMinimum: PropTypes.bool,
    special: PropTypes.bool,
    specialMinimum: PropTypes.bool,
    underline: PropTypes.bool,
    underlineMinimum: PropTypes.bool,
    upperCase: PropTypes.bool,
    upperCaseMinimum: PropTypes.bool,
  }),
};

const mapStateToProps = state => ({
  options: state.currentOptions.options,
});

export default connect(mapStateToProps, { updateGeneratorOptions }, null, { withRef: true })(
  RandomView,
);
