import React, { Component } from 'react';
import { remote } from 'electron';
import { Button, Icon, InputGroup, Tooltip, Position } from '@blueprintjs/core';
import OurToaster from './Toaster';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProfile: 'default',
      profileEditMode: false,
      profileNewName: '',
      profiles: [],
    };
  }

  handleSaveProfile() {
    const profile = this.state.profileNewName;
    this.setState({
      profiles: [...this.state.profiles, profile],
      profileEditMode: false,
      currentProfile: profile,
    });
    OurToaster.show({ message: `Saved new profile: ${profile}` });
  }

  renderProfileSelector() {
    if (this.state.profileEditMode) {
      return (
        <InputGroup
          type="text"
          className="pt-minimal"
          value={this.state.profileNewName}
          onChange={(event) => {
            event.persist();
            this.setState({ profileNewName: event.target.value });
          }}
          rightElement={
            <div>
              <Tooltip position={Position.BOTTOM} content="Save">
                <Button className="pt-minimal" onClick={() => this.handleSaveProfile()}>
                  Save
                </Button>
              </Tooltip>
            </div>
          }
        />
      );
    }
    return (
      <div className="pt-select pt-minimal">
        <select
          className="select-as-h5 select-margin"
          style={{ width: 200, color: 'inherit' }}
          onChange={event => this.setState({ currentProfile: event.target.value })}
          value={this.state.currentProfile}
        >
          <option key="default" value="default">
            -- Select profile --
          </option>
          {this.state.profiles.length > 0
            ? this.state.profiles.map(item => (
              <option key={`${item}_key`} value={item}>
                {`${item}`}
              </option>
              ))
            : null}
        </select>
      </div>
    );
  }

  render() {
    const window = remote.getCurrentWindow();
    const isMaximized = window.isMaximized();
    return (
      <nav className="pt-navbar">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading">Password Generator</div>
        </div>
        <div className="pt-navbar-group pt-align-right">
        <Tooltip position={Position.BOTTOM} content="Add new profile">
          <Button className="pt-minimal">
            <Icon iconName="plus" onClick={() => this.setState({ profileEditMode: true })} />
          </Button>
          </Tooltip>
          {this.renderProfileSelector()}
          <span className="pt-navbar-divider" />
          <Tooltip position={Position.BOTTOM} content="Minimize">
            <button
              className="pt-button pt-minimal pt-icon-small-minus"
              onClick={() => window.minimize()}
            />
          </Tooltip>
          <Tooltip position={Position.BOTTOM} content={isMaximized ? 'Restore' : 'Maximize'}>
            <button
              className="pt-button pt-minimal pt-icon-multi-select"
              onClick={() => {
                if (window.isMaximized()) window.unmaximize();
                else window.maximize();
              }}
            />
          </Tooltip>
          <Tooltip position={Position.BOTTOM} content="Close">
            <button className="pt-button pt-minimal pt-icon-cross" onClick={() => window.close()} />
          </Tooltip>
        </div>
      </nav>
    );
  }
}

export default Header;
