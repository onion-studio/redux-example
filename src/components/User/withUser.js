import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(WrappedComponent) {
  class WithUser extends Component {
    static defaultProps = {
      isLoggedIn: false,
    };
    render() {
      const { isLoggedIn, ...rest } = this.props;
      if (isLoggedIn) {
        return <WrappedComponent {...rest} />;
      } else {
        return <div>로그인이 필요합니다.</div>;
      }
    }
  }

  return connect(state => ({
    isLoggedIn: !!state.user.username,
  }))(WithUser);
}
