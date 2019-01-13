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

// compose: 함수를 합성할 때 사용하는 함수
export default compose(
  withUser,
  // connect: Redux와 연동할 수 있는 "HOC를 반환하는 함수"
  connect(
    // Redux state로부터 어떻게 prop을 넘겨줄지를 서술하는 함수
    // a.k.a mapStateToProps
    state => ({
      loading: state.todo.loading,
      items: state.todo.items,
    }),
    // Redux store의 dispatch 함수를 가지고 prop을 만들어내는 함수
    // a.k.a mapDispatchToProps
    dispatch => ({
      fetch: () => dispatch(fetchTodos()),
    })
  )
)(TodoList);
