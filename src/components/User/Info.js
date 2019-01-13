import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withUser from './withUser';

class UserInfo extends Component {
  static defaultProps = {
    loading: false,
    username: null,
  };

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
