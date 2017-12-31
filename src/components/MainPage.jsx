import React, { Component } from 'react';
import { Card } from '@blueprintjs/core';

import GeneratorControls from './GeneratorControls';
import Random from './Generators/RandomView';
import Pronounceable from './Generators/PronounceableContainer';
import PronounceableGenerator from '../utils/pronounceable';
import RandomGenerator from '../utils/random';

class MainPage extends Component {
  generators = [
    {
      label: 'Random',
      value: 'random',
      index: 0,
      view: <Random />,
      generator: new RandomGenerator(),
    },
    {
      label: 'Pronounceable',
      value: 'pronounceable',
      index: 1,
      view: <Pronounceable />,
      generator: new PronounceableGenerator(),
    },
  ];

  render() {
    return (
      <div style={{ margin: '0 auto', width: 600, padding: '50px 50px 0 50px' }}>
        <Card elevation={2}>
          <GeneratorControls generators={this.generators} />
        </Card>
      </div>
    );
  }
}

export default MainPage;
