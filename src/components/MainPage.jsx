import React, { Component } from 'react';
import {
  FormGroup,
  Card,
  Button,
  InputGroup,
  Classes,
  Intent,
  Tag,
  Tooltip,
  Position,
} from '@blueprintjs/core';
import { copy } from 'copy-paste';
import OurToaster from './Toaster';
import RandomGenerator from './RandomGenerator';

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      message: '',
      score: 0,
      currentGenerator: 'random',
    };
    this.generator = null;
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
    this.generators = [
      {
        label: 'Random',
        value: 'random',
        index: 0,
      },
    ];
  }

  renderGenerator() {
    switch (this.state.currentGenerator) {
      case 'random':
        return <RandomGenerator onGenerate={results => this.setState(results)} />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div style={{ margin: '0 auto', width: 600, padding: 50 }}>
        <Card elevation={2}>
          <div className="pt-select pt-minimal pt-fill">
            <select
              className="select-as-h5"
              onChange={event => this.setState({ currentGenerator: event.target.value })}
            >
              {this.generators.map(item => (
                <option key={item.index} value={item.value}>
                  {`${item.label} Generator`}
                </option>
              ))}
            </select>
          </div>
          <hr />
          <div style={{ marginTop: 20 }}>
            <FormGroup label={'Generated Password'} labelFor="text-input">
              <InputGroup
                intent={Intent[this.colors[this.state.score.strength]]}
                placeholder="Generated Password"
                value={this.state.password}
                rightElement={
                  <div>
                    {this.state.score.strength && (
                      <Tag className={Classes.MINIMAL}>
                        {this.messages[this.state.score.strength]}
                      </Tag>
                    )}
                    <Tooltip position={Position.TOP} content="Copy to clipboard">
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
                    </Tooltip>
                  </div>
                }
              />
              <p disabled={this.state.message.length === 0}>{this.state.message}</p>
            </FormGroup>
            {this.renderGenerator()}
          </div>
        </Card>
      </div>
    );
  }
}

export default MainPage;
