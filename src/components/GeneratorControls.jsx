import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import { connect } from 'react-redux';

import DisplayGeneratedPassword from './DisplayGeneratedPassword';
import GeneratorSelector from './GeneratorSelector';
import strengths from './../utils/passwordStrengths';

class GeneratorControls extends Component {
  state = {
    activeGenerator: null,
    generator: null,
    results: null,
    passwordList: [],
    height: 0,
  };

  componentWillMount() {
    this.setGenerator();
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.updateDimensions());
    this.updateDimensions();
  }

  componentDidUpdate(nextProps) {
    if (this.props.currentGenerator !== nextProps.currentGenerator) {
      this.setGenerator();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.updateDimensions());
  }

  setGenerator() {
    let activeGenerator;
    let generator;
    this.props.generators.forEach((item) => {
      if (item.value === this.props.currentGenerator) {
        activeGenerator = React.cloneElement(item.view);
        generator = item.generator;
        this.setState({
          activeGenerator,
          generator,
          results: null,
          passwordList: [],
        });
      }
    });
  }

  updateDimensions() {
    const height = document.getElementById('app').clientHeight - 540;
    this.setState({ height });
  }

  generate() {
    if (!this.state.activeGenerator) return;
    const results = this.state.generator.generate(this.props.currentOptions);
    if (Array.isArray(results)) {
      this.setState({ passwordList: results });
    } else {
      this.setState({ results });
    }
  }

  selectFromList(results) {
    this.setState({ results });
  }

  renderPasswordList() {
    if (this.state.passwordList && this.state.passwordList.length > 0) {
      return (
        <div style={{ overflowY: 'auto', maxHeight: this.state.height, margin: '20px 0' }}>
          <table className="pt-table pt-interactive pt-condensed" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Password</th>
                <th>Strength</th>
              </tr>
            </thead>
            <tbody>
              {this.state.passwordList.map(item => (
                <tr key={`${item.password}_id`} onClick={() => this.selectFromList(item)}>
                  <td>{item.password}</td>
                  <td>{strengths[item.score.strength]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div id="generatorControl">
        <GeneratorSelector {...this.props} {...this.state.results} />
        <hr />
        <div style={{ marginTop: 20 }}>
          <DisplayGeneratedPassword {...this.state.results} />
          {this.state.activeGenerator}
          {this.renderPasswordList()}
          <Button className="pt-fill" text="Generate" onClick={() => this.generate()} />
        </div>
      </div>
    );
  }
}

GeneratorControls.propTypes = {
  generators: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
      generator: PropTypes.object.isRequired,
      view: PropTypes.object.isRequired,
    }),
  ).isRequired,
  currentGenerator: PropTypes.string.isRequired,
  /* eslint-disable */
  currentOptions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  currentGenerator: state.currentOptions.generatorName,
  currentOptions: state.currentOptions.options,
});

export default connect(mapStateToProps, null)(GeneratorControls);
