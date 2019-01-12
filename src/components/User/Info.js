import React, { Component } from 'react';
import { connect } from 'react-redux';
import { refreshUserInfo } from '../../ducks/user';
import { getToken } from '../../token';

class UserInfo extends Component {
  static defaultProps = {
    loading: false,
    username: null,
    fetch: () => {},
  };

  componentDidMount() {
    const { username, fetch } = this.props;
    if (getToken() && !username) {
      fetch();
    }
  }

  render() {
    const { loading, username } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    } else if (username) {
      return <div>Username: {username}</div>;
    } else {
      return <div>No information</div>;
    }
  }
}

export default connect(
  state => ({
    loading: state.user.loading,
    username: state.user.username,
  }),
  dispatch => ({
    fetch: () => dispatch(refreshUserInfo()),
  })
)(UserInfo);
