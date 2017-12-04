import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import { connect } from 'react-redux';
import { copy } from 'copy-paste';
import OurToaster from './Toaster';
import RandomGenerator from './Generators/RandomGenerator';
import PronounceableGenerator from './Generators/PronounceableGenerator';
import { updateGeneratorOptions } from './Redux/currentOptionsActions';
import strengths from '../utils/passwordStrengths';

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      message: '',
      score: 0,
    };
    this.generator = null;
    this.colors = ['DANGER', 'DANGER', 'WARNING', 'WARNING', 'PRIMARY', 'PRIMARY', 'SUCCESS'];
    this.generators = [
      {
        label: 'Random',
        value: 'random',
        index: 0,
      },
      {
        label: 'Pronounceable',
        value: 'pronounceable',
        index: 1,
      },
    ];
  }

  renderGenerator() {
    switch (this.props.currentGenerator) {
      case 'random':
        return <RandomGenerator onGenerate={results => this.setState(results)} />;
      case 'pronounceable':
        return <PronounceableGenerator onGenerate={results => this.setState(results)} />;
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
              value={this.props.currentGenerator}
              onChange={event => this.props.updateGeneratorOptions(event.target.value)}
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
                        {strengths[this.state.score.strength]}
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

MainPage.propTypes = {
  currentGenerator: PropTypes.string.isRequired,
  updateGeneratorOptions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentGenerator: state.currentOptions.generatorName,
});

export default connect(mapStateToProps, { updateGeneratorOptions })(MainPage);
