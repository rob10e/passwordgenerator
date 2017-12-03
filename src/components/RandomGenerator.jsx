import React, { Component } from 'react';
import {
  FormGroup,
  Switch,
  NumericInput,
  InputGroup,
  Button,
  Checkbox,
  Tooltip,
  Position,
} from '@blueprintjs/core';
import RandomPasswordGenerator from './../utils/RandomPasswordGenerator';

// TODO: Add more constrain checking

class RandomGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upperCase: true,
      lowerCase: true,
      digits: true,
      minus: false,
      underline: false,
      space: false,
      special: false,
      brackets: false,
      highAnsi: false,
      upperCaseMinimum: true,
      lowerCaseMinimum: true,
      digitsMinimum: true,
      minusMinimum: false,
      underlineMinimum: false,
      spaceMinimum: false,
      specialMinimum: false,
      bracketsMinimum: false,
      highAnsiMinimum: false,
      length: 20,
      byEntropy: false,
      byLength: true,
      entropy: 128,
      customCharacters: '',
    };
    this.passwordGenerator = new RandomPasswordGenerator();
  }

  render() {
    return (
      <div>
        <FormGroup inline className="formgroup-no-label">
          <div className="pt-control-group pt-fill">
            <Switch
              label="Length:"
              checked={this.state.byLength}
              onChange={(event) => {
                event.persist();
                this.setState({
                  byLength: event.target.checked,
                  byEntropy: !event.target.checked,
                });
              }}
            />
            <NumericInput
              disabled={!this.state.byLength}
              value={this.state.length}
              min={5}
              max={80}
              clampValueOnBlur
              minorStepSize={1}
              onValueChange={value =>
                this.setState({
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
              checked={this.state.byEntropy}
              onChange={(event) => {
                event.persist();
                this.setState({
                  byEntropy: event.target.checked,
                  byLength: !event.target.checked,
                });
              }}
            />
            <NumericInput
              disabled={!this.state.byEntropy}
              value={this.state.entropy}
              min={30}
              max={4096}
              clampValueOnBlur
              onValueChange={value =>
                this.setState({
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
              checked={this.state.upperCase}
              onChange={(event) => {
                event.persist();
                this.setState({
                  upperCase: event.target.checked,
                });
              }}
            />
            <Switch
              label="Lower Case"
              checked={this.state.lowerCase}
              onChange={(event) => {
                event.persist();
                this.setState({
                  lowerCase: event.target.checked,
                });
              }}
            />
            <Switch
              label="Digits"
              checked={this.state.digits}
              onChange={(event) => {
                event.persist();
                this.setState({
                  digits: event.target.checked,
                });
              }}
            />
            <Switch
              label="Minus"
              checked={this.state.minus}
              onChange={(event) => {
                event.persist();
                this.setState({
                  minus: event.target.checked,
                });
              }}
            />
            <Switch
              label="Underline"
              checked={this.state.underline}
              onChange={(event) => {
                event.persist();
                this.setState({
                  underline: event.target.checked,
                });
              }}
            />
          </div>
          <div className="pt-control-group pt-vertical" style={{ width: '10%' }}>
            <Tooltip className="tooltip-fix" position={Position.TOP} content="Ensure at least 1 uppercase character">
              <Checkbox
                disabled={!this.state.upperCase}
                checked={this.state.upperCaseMinimum}
                onChange={(event) => {
                  event.persist();
                  this.setState({ upperCaseMinimum: event.target.checked });
                }}
              />
            </Tooltip>
            <Tooltip className="tooltip-fix" position={Position.TOP} content="Ensure at least 1 lowercase character">
              <Checkbox
                disabled={!this.state.lowerCase}
                checked={this.state.lowerCaseMinimum}
                onChange={(event) => {
                  event.persist();
                  this.setState({ lowerCaseMinimum: event.target.checked });
                }}
              />
            </Tooltip>
            <Tooltip className="tooltip-fix" position={Position.TOP} content="Ensure at least 1 numeric character">
              <Checkbox
                disabled={!this.state.digits}
                checked={this.state.digitMinimum}
                onChange={(event) => {
                  event.persist();
                  this.setState({ digitMinimum: event.target.checked });
                }}
              />
            </Tooltip>
            <Tooltip className="tooltip-fix" position={Position.TOP} content="Ensure at least 1 minus character">
              <Checkbox
                disabled={!this.state.minus}
                checked={this.state.minusMinimum}
                onChange={(event) => {
                  event.persist();
                  this.setState({ minusMinimum: event.target.checked });
                }}
              />
            </Tooltip>
            <Tooltip className="tooltip-fix" position={Position.TOP} content="Ensure at least 1 underline character">
              <Checkbox
                disabled={!this.state.underline}
                checked={this.state.underlineMinimum}
                onChange={(event) => {
                  event.persist();
                  this.setState({ underlineMinimum: event.target.checked });
                }}
              />
            </Tooltip>
          </div>
          <div className="pt-control-group pt-vertical" style={{ width: '40%' }}>
            <Switch
              label="Space"
              checked={this.state.space}
              onChange={(event) => {
                event.persist();
                this.setState({
                  space: event.target.checked,
                });
              }}
            />
            <Switch
              label="Special"
              checked={this.state.special}
              onChange={(event) => {
                event.persist();
                this.setState({
                  special: event.target.checked,
                });
              }}
            />
            <Switch
              label="Brackets"
              checked={this.state.brackets}
              onChange={(event) => {
                event.persist();
                this.setState({
                  brackets: event.target.checked,
                });
              }}
            />
            <Switch
              label="High ANSI characters"
              checked={this.state.highAnsi}
              onChange={(event) => {
                event.persist();
                this.setState({
                  highAnsi: event.target.checked,
                });
              }}
            />
          </div>
          <div className="pt-control-group pt-vertical" style={{ width: '10%' }}>
            <Tooltip className="tooltip-fix" position={Position.TOP} content="Ensure at least 1 space character">
              <Checkbox
                disabled={!this.state.space}
                checked={this.state.spaceMinimum}
                onChange={(event) => {
                  event.persist();
                  this.setState({ spaceMinimum: event.target.checked });
                }}
              />
            </Tooltip>
            <Tooltip className="tooltip-fix" position={Position.TOP} content="Ensure at least 1 special character">
              <Checkbox
                disabled={!this.state.special}
                checked={this.state.specialMinimum}
                onChange={(event) => {
                  event.persist();
                  this.setState({ specialMinimum: event.target.checked });
                }}
              />
            </Tooltip>
            <Tooltip className="tooltip-fix" position={Position.TOP} content="Ensure at least 1 bracket character">
              <Checkbox
                disabled={!this.state.brackets}
                checked={this.state.bracketMinimum}
                onChange={(event) => {
                  event.persist();
                  this.setState({ bracketMinimum: event.target.checked });
                }}
              />
            </Tooltip>
            <Tooltip className="tooltip-fix" position={Position.TOP} content="Ensure at least 1 high ANSI character">
              <Checkbox
                disabled={!this.state.highAnsi}
                checked={this.state.highAnsiMinimum}
                onChange={(event) => {
                  event.persist();
                  this.setState({ highAnsiMinimum: event.target.checked });
                }}
              />
            </Tooltip>
          </div>
        </div>
        <FormGroup label="Also include these:" labelFor="text-input">
          <InputGroup
            placeholder="Custom characters"
            value={this.state.customCharacters}
            onChange={(event) => {
              event.persist();
              let value = event.target.value;
              value = value.replace(/ /, '\u00a0');
              this.setState({
                customCharacters: value,
              });
            }}
          />
        </FormGroup>
        <Button
          text="Generate"
          onClick={() => {
            this.props.onGenerate(this.passwordGenerator.generateBasic(this.state));
          }}
        />
      </div>
    );
  }
}

export default RandomGenerator;
