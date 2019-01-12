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
  null, // mapStateToProps가 필요 없는 경우
  dispatch => ({
    onLogout: () => dispatch(logout()),
  })
)(UserLogoutButton);
