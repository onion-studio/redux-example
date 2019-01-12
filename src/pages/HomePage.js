import React, { Component } from 'react';

import UserInfo from '../components/User/Info';
import UserLoginForm from '../components/User/LoginForm';
import UserLogoutButton from '../components/User/LogoutButton';
import TodoList from '../components/Todo/List';
export default class HomePage extends Component {
  render() {
    return (
      <div>
        <UserInfo />
        <UserLoginForm />
        <UserLogoutButton />
        <TodoList />
      </div>
    );
  }
}
