import React, { Component } from 'react';
import { remote } from 'electron';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProfile: '',
    };

    this.profiles = [];
  }
  render() {
    return (
      <nav className="pt-navbar">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading">Password Generator</div>
        </div>
        <div className="pt-navbar-group pt-align-right">
          <div className="pt-select pt-minimal">
            <select
              className="select-as-h5"
              style={{ width: 200, color: 'inherit' }}
              onChange={event => this.setState({ currentProfile: event.target.value })}
              defaultValue="default"
            >
              <option key="default" value="default">
                -- Select profile --
              </option>
              {this.profiles.length > 0
                ? this.profiles.map(item => (
                  <option key={item.index} value={item.value}>
                    {`${item.label}`}
                  </option>
                  ))
                : null}
            </select>
          </div>
          <span className="pt-navbar-divider" />
          <button
            className="pt-button pt-minimal pt-icon-small-minus"
            onClick={() => {
              const window = remote.getCurrentWindow();
              window.minimize();
            }}
          />
          <button
            className="pt-button pt-minimal pt-icon-multi-select"
            onClick={() => {
              const window = remote.getCurrentWindow();
              if (window.isMaximized) window.unmaximize();
              else window.maximize();
            }}
          />
          <button
            className="pt-button pt-minimal pt-icon-cross"
            onClick={() => {
              const window = remote.getCurrentWindow();
              window.close();
            }}
          />
        </div>
      </nav>
    );
  }
}

export default Header;
