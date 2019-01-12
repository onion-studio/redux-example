import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getToken } from '../../token';
import withUser from './withUser';

class UserInfo extends Component {
  static defaultProps = {
    loading: false,
    username: null,
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
    } else {
      return <div>Username: {username}</div>;
    }
  }
}

export default compose(
  withUser,
  connect(state => ({
    loading: state.user.loading,
    username: state.user.username,
  }))
)(UserInfo);
