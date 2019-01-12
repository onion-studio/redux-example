import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../ducks/user';

class UserLoginForm extends Component {
  static defaultProps = {
    loading: false,
    onLogin: (username, password) => {},
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onLogin, loading } = this.props;
    if (loading) {
      alert('로그인 중입니다. 잠시만 기다려주세요.');
      return;
    }
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    onLogin(username, password);
  };

  render() {
    const { loading } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button disabled={loading}>로그인</button>
      </form>
    );
  }
}

export default connect(
  state => ({
    loading: state.user.loading,
  }),
  dispatch => ({
    onLogin: (username, password) => dispatch(login(username, password)),
  })
)(UserLoginForm);
