import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../ducks/user';

class UserLogoutButton extends Component {
  static defaultProps = {
    onLogout: () => {},
  };
  render() {
    const { onLogout } = this.props;
    return <button onClick={onLogout}>로그아웃</button>;
  }
}

export default connect(
  null,
  dispatch => ({
    onLogout: () => dispatch(logout()),
  })
)(UserLogoutButton);
