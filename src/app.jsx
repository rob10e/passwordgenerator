import React, { Component } from 'react';
import {
  FormGroup,
  Card,
  Button,
  Colors,
  Switch,
  NumericInput,
  InputGroup,
  Classes,
  Intent,
  Tag,
} from '@blueprintjs/core';
import { copy, paste } from 'copy-paste';
import RandomPasswordGenerator from './utils/RandomPasswordGenerator';
import OurToaster from './components/Toaster';

class App extends Component {
  constructor() {
    super();
    this.state = {
      random: {
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
      },
      password: '',
      message: '',
      score: 0,
    };
    this.messages = [
      'Unsafe password word!',
      'Too short',
      'Very weak',
      'Weak',
      'Medium',
      'Strong',
      'Very strong',
    ];
    this.colors = ['DANGER', 'DANGER', 'WARNING', 'WARNING', 'PRIMARY', 'PRIMARY', 'SUCCESS'];
    this.passwordGenerator = new RandomPasswordGenerator();
  }

  generatePassword() {
    const results = this.passwordGenerator.generateBasic(this.state.random);
    this.setState(results);
  }

  render() {
    return (
      <div className="root pt-dark">
        <nav className="pt-navbar">
          <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading">Password Generator</div>
          </div>
          <div className="pt-navbar-group pt-align-right">
            <button className="pt-button pt-minimal pt-icon-home">Home</button>
            <button className="pt-button pt-minimal pt-icon-document">Files</button>
            <span className="pt-navbar-divider" />
            <button className="pt-button pt-minimal pt-icon-user" />
            <button className="pt-button pt-minimal pt-icon-notifications" />
            <button className="pt-button pt-minimal pt-icon-cog" />
          </div>
        </nav>
        <div style={{ margin: '0 auto', width: 600, padding: 50 }}>
          <Card elevation={2}>
            <h5 style={{ color: Colors.GREEN5 }}>Random Generator</h5>
            <div style={{ marginTop: 20 }}>
              <FormGroup label={'Generated Password'} labelFor="text-input">
                <InputGroup
                  intent={Intent[this.colors[this.state.score.strength]]}
                  placeholder="Generated Password"
                  value={this.state.password}
                  rightElement={
                    <div>
                      <Tag className={Classes.MINIMAL}>
                        {this.messages[this.state.score.strength]}
                      </Tag>
                      <Button
                        className={Classes.MINIMAL}
                        intent={Intent.WARNING}
                        iconName="clipboard"
                        onClick={() => {
                          copy(this.state.password, (err) => {
                            if (err) throw err;
                            OurToaster.show({ message: 'Copied' });
                          });
                        }}
                      />
                    </div>
                  }
                />
                <p disabled={this.state.message.length === 0}>{this.state.message}</p>
              </FormGroup>
              <FormGroup inline className="formgroup-no-label">
                <div className="pt-control-group pt-fill">
                  <Switch
                    label="Length:"
                    checked={this.state.random.byLength}
                    onChange={(event) => {
                      event.persist();
                      this.setState({
                        random: {
                          ...this.state.random,
                          byLength: event.target.checked,
                          byEntropy: !event.target.checked,
                        },
                      });
                    }}
                  />
                  <NumericInput
                    disabled={!this.state.random.byLength}
                    value={this.state.random.length}
                    onValueChange={value =>
                      this.setState({
                        random: {
                          ...this.state.random,
                          length: value,
                        },
                      })
                    }
                  />
                </div>
              </FormGroup>
              <FormGroup inline className="formgroup-no-label">
                <div className="pt-control-group pt-fill">
                  <Switch
                    label="Entropy:"
                    checked={this.state.random.byEntropy}
                    onChange={(event) => {
                      event.persist();
                      this.setState({
                        random: {
                          ...this.state.random,
                          byEntropy: event.target.checked,
                          byLength: !event.target.checked,
                        },
                      });
                    }}
                  />
                  <NumericInput
                    disabled={!this.state.random.byEntropy}
                    value={this.state.random.entropy}
                    onValueChange={value =>
                      this.setState({
                        random: {
                          ...this.state.random,
                          entropy: value,
                        },
                      })
                    }
                  />
                </div>
              </FormGroup>
              <div
                className="pt-control-group pt-horizontal"
                style={{ width: '100%', marginTop: 20 }}
              >
                <div className="pt-control-group pt-vertical" style={{ width: '50%' }}>
                  <Switch
                    label="Upper Case (A, B, C, ...)"
                    checked={this.state.random.upperCase}
                    onChange={(event) => {
                      event.persist();
                      this.setState({
                        random: {
                          ...this.state.random,
                          upperCase: event.target.checked,
                        },
                      });
                    }}
                  />
                  <Switch
                    label="Lower Case (a, b, c, ...)"
                    checked={this.state.random.lowerCase}
                    onChange={(event) => {
                      event.persist();
                      this.setState({
                        random: {
                          ...this.state.random,
                          lowerCase: event.target.checked,
                        },
                      });
                    }}
                  />
                  <Switch
                    label="Digits (0, 1, 2, ...)"
                    checked={this.state.random.digits}
                    onChange={(event) => {
                      event.persist();
                      this.setState({
                        random: {
                          ...this.state.random,
                          digits: event.target.checked,
                        },
                      });
                    }}
                  />
                  <Switch
                    label="Minus (-)"
                    checked={this.state.random.minus}
                    onChange={(event) => {
                      event.persist();
                      this.setState({
                        random: {
                          ...this.state.random,
                          minus: event.target.checked,
                        },
                      });
                    }}
                  />
                  <Switch
                    label="Underline (_)"
                    checked={this.state.random.underline}
                    onChange={(event) => {
                      event.persist();
                      this.setState({
                        random: {
                          ...this.state.random,
                          underline: event.target.checked,
                        },
                      });
                    }}
                  />
                </div>
                <div className="pt-control-group pt-vertical" style={{ width: '50%' }}>
                  <Switch
                    label="Space ( )"
                    checked={this.state.random.space}
                    onChange={(event) => {
                      event.persist();
                      this.setState({
                        random: {
                          ...this.state.random,
                          space: event.target.checked,
                        },
                      });
                    }}
                  />
                  <Switch
                    label="Special (!, $, %, &, ...)"
                    checked={this.state.random.special}
                    onChange={(event) => {
                      event.persist();
                      this.setState({
                        random: {
                          ...this.state.random,
                          special: event.target.checked,
                        },
                      });
                    }}
                  />
                  <Switch
                    label="Brackets ([, ], (, ), {, }, <, >)"
                    checked={this.state.random.brackets}
                    onChange={(event) => {
                      event.persist();
                      this.setState({
                        random: {
                          ...this.state.random,
                          brackets: event.target.checked,
                        },
                      });
                    }}
                  />
                  <Switch
                    label="High ANSI characters"
                    checked={this.state.random.highAnsi}
                    onChange={(event) => {
                      event.persist();
                      this.setState({
                        random: {
                          ...this.state.random,
                          highAnsi: event.target.checked,
                        },
                      });
                    }}
                  />
                </div>
              </div>
              <FormGroup label="Also include these:" labelFor="text-input">
                <InputGroup
                  placeholder="Custom characters"
                  value={this.state.random.customCharacters}
                  onChange={(event) => {
                    event.persist();
                    let value = event.target.value;
                    value = value.replace(/ /, '\u00a0');
                    this.setState({
                      random: {
                        ...this.state.random,
                        customCharacters: value,
                      },
                    });
                  }}
                />
              </FormGroup>
            </div>
            <Button text="Generate" onClick={() => this.generatePassword()} />
          </Card>
        </div>
      </div>
    );
  }
}

export default App;
