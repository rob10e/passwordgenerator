import React from 'react';

const Header = () => (
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
  );

export default Header;
