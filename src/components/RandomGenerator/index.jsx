import React, { Component } from 'react';
import { FormGroup, Switch, NumericInput, InputGroup, Button } from '@blueprintjs/core';
import RandomPasswordGenerator from '../../utils/RandomPasswordGenerator';

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
              onValueChange={value =>
                this.setState({
                  entropy: value,
                })
              }
            />
          </div>
        </FormGroup>
        <div className="pt-control-group pt-horizontal" style={{ width: '100%', marginTop: 20 }}>
          <div className="pt-control-group pt-vertical" style={{ width: '50%' }}>
            <Switch
              label="Upper Case (A, B, C, ...)"
              checked={this.state.upperCase}
              onChange={(event) => {
                event.persist();
                this.setState({
                  upperCase: event.target.checked,
                });
              }}
            />
            <Switch
              label="Lower Case (a, b, c, ...)"
              checked={this.state.lowerCase}
              onChange={(event) => {
                event.persist();
                this.setState({
                  lowerCase: event.target.checked,
                });
              }}
            />
            <Switch
              label="Digits (0, 1, 2, ...)"
              checked={this.state.digits}
              onChange={(event) => {
                event.persist();
                this.setState({
                  digits: event.target.checked,
                });
              }}
            />
            <Switch
              label="Minus (-)"
              checked={this.state.minus}
              onChange={(event) => {
                event.persist();
                this.setState({
                  minus: event.target.checked,
                });
              }}
            />
            <Switch
              label="Underline (_)"
              checked={this.state.underline}
              onChange={(event) => {
                event.persist();
                this.setState({
                  underline: event.target.checked,
                });
              }}
            />
          </div>
          <div className="pt-control-group pt-vertical" style={{ width: '50%' }}>
            <Switch
              label="Space ( )"
              checked={this.state.space}
              onChange={(event) => {
                event.persist();
                this.setState({
                  space: event.target.checked,
                });
              }}
            />
            <Switch
              label="Special (!, $, %, &, ...)"
              checked={this.state.special}
              onChange={(event) => {
                event.persist();
                this.setState({
                  special: event.target.checked,
                });
              }}
            />
            <Switch
              label="Brackets ([, ], (, ), {, }, <, >)"
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
          onClick={() =>
            this.props.onGenerate(this.passwordGenerator.generateBasic(this.state))
          }
        />
      </div>
    );
  }
}

export default RandomGenerator;
