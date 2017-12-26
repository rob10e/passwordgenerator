import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { remote } from 'electron';
import {
  Button,
  Icon,
  InputGroup,
  Tooltip,
  Position,
  Menu,
  MenuItem,
  MenuDivider,
  Popover,
} from '@blueprintjs/core';
import OurToaster from './Toaster';
import { addNewProfile, toggleFavorite, deleteProfile } from './Redux/profilesActions';
import { selectProfile } from './Redux/currentOptionsActions';

class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileEditMode: false,
      profileNewName: '',
      currentProfile: 'Default',
    };
    this.profileChange = false;
  }

  getProfile(profileName) {
    const profile = this.props.profiles.filter(item => item.profile === profileName)[0];
    this.props.selectProfile(profile.profile, profile.generatorName, profile.options);
  }

  menu = (
    <Menu>
      {this.props.profiles.map(item => (
        <MenuItem
          key={item.guid}
          iconName={`star${item.favorite ? '' : '-empty'}`}
          text={item.profile}
          onClick={(event) => {
            event.persist();
            const profileName = event.target.text;
            this.getProfile(profileName);
          }}
        >
          <MenuItem
            iconName="star"
            text="Make Favorite"
            onClick={() => this.props.toggleFavorite(item.profile)}
          />
          <MenuItem
            iconName="cross"
            text="Delete Profile"
            onClick={() => {
              this.props.deleteProfile(item.profile);
              OurToaster.show({ message: `${item.profile} was deleted` });
            }}
          />
        </MenuItem>
      ))}
    </Menu>
  );

  handleSaveProfile() {
    const profile = this.state.profileNewName;
    this.props.addNewProfile(profile, this.props.current.generatorName, this.props.current.options);
    this.setState({
      profileEditMode: false,
    });

    OurToaster.show({ message: `Saved new profile: ${profile}` });
  }

  renderProfileSelector() {
    if (this.state.profileEditMode) {
      return (
        <InputGroup
          type="text"
          className="pt-minimal profile-input"
          value={this.state.profileNewName}
          onChange={(event) => {
            event.persist();
            this.setState({ profileNewName: event.target.value });
          }}
          rightElement={
            <div>
              <Tooltip position={Position.BOTTOM} content="Cancel">
                <Button
                  className="pt-minimal"
                  onClick={() => this.setState({ profileEditMode: false })}
                >
                  <Icon iconName="cross" />
                </Button>
              </Tooltip>
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
      <Tooltip position={Position.LEFT} content="Select Profile">
        <Popover
          popoverClassName="pt-minimal dropdown-adjust"
          content={this.menu}
          position={Position.BOTTOM_RIGHT}
        >
          <Button
            rightIconName="caret-down"
            className="pt-minimal"
            text={this.props.current.profile}
          />
        </Popover>
      </Tooltip>
    );
  }

  render() {
    const window = remote.getCurrentWindow();
    const isMaximized = window.isMaximized();
    return (
      <nav className="pt-navbar">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading">All Password Generator</div>
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

MainHeader.propTypes = {
  current: PropTypes.any,
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      profileName: PropTypes.string,
      generatorName: PropTypes.string,
      options: PropTypes.any,
    }),
  ),
  addNewProfile: PropTypes.func.isRequired,
  selectProfile: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profiles: state.profiles,
  current: state.currentOptions,
});

export default connect(mapStateToProps, {
  addNewProfile,
  selectProfile,
  toggleFavorite,
  deleteProfile,
})(MainHeader);
