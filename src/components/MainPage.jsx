import React, { Component } from 'react';
import { Card } from '@blueprintjs/core';

import GeneratorControls from './GeneratorControls';
import Random from './Generators/Random';
import Pronounceable from './Generators/Pronounceable';
import SymbolReplace from './Generators/SymbolReplace';

class MainPage extends Component {
  generators = [
    {
      label: 'Random',
      value: 'random',
      index: 0,
      generator: <Random />,
    },
    {
      label: 'Pronounceable',
      value: 'pronounceable',
      index: 1,
      generator: <Pronounceable />,
    },
    {
      label: 'Symbol Replace (Munged)',
      value: 'symbolreplace',
      index: 2,
      generator: <SymbolReplace />,
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
