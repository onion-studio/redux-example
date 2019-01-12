import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchTodos } from '../../ducks/todo';
import withUser from '../User/withUser';

class TodoList extends Component {
  static defaultProps = {
    loading: false,
    items: [
      // {
      //   id: 1,
      //   body: 'title',
      //   complete: false
      // }
    ],
    fetch: () => {},
  };

  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }
  render() {
    const { loading, items } = this.props;
    if (loading) {
      return <div>loading...</div>;
    }
    if (items.length === 0) {
      return <div>항목이 없습니다.</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.id}>{item.body}</li>
          ))}
        </ul>
      );
    }
  }
}

export default compose(
  withUser,
  connect(
    state => ({
      loading: state.todo.loading,
      items: state.todo.items,
    }),
    dispatch => ({
      fetch: () => dispatch(fetchTodos()),
    })
  )
)(TodoList);
