import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
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
import strengths from './../utils/passwordStrengths';

const colors = ['DANGER', 'DANGER', 'WARNING', 'WARNING', 'PRIMARY', 'PRIMARY', 'SUCCESS'];

const DisplayGeneratedPassword = props => (
  <div style={{ flex: '0 0 auto' }}>
    <FormGroup label={'Generated Password'} labelFor="text-input">
      <InputGroup
        intent={Intent[colors[props.score.strength]]}
        placeholder="Generated Password"
        value={props.password}
        rightElement={
          <div>
            {props.score.strength && (
              <Tag className={Classes.MINIMAL}>{strengths[props.score.strength]}</Tag>
            )}
            <Tooltip position={Position.TOP} content="Copy to clipboard">
              <Button
                className={Classes.MINIMAL}
                intent={Intent.WARNING}
                iconName="clipboard"
                onClick={() => {
                  copy(props.password, (err) => {
                    if (err) throw err;
                    OurToaster.show({ message: 'Copied' });
                  });
                }}
              />
            </Tooltip>
          </div>
        }
      />
      <p disabled={props.message.length === 0}>{props.message}</p>
    </FormGroup>
  </div>
);

DisplayGeneratedPassword.defaultProps = {
  password: '',
  message: '',
  score: {
    score: 0,
    strength: null,
  },
};

DisplayGeneratedPassword.propTypes = {
  password: PropTypes.string,
  message: PropTypes.string,
  score: PropTypes.shape({
    score: PropTypes.number,
    strength: PropTypes.number,
  }),
};

export default DisplayGeneratedPassword;
