import produce from 'immer';
import api from '../api';

const prefix = 'redux-example/todo/';

// --- action types ---
const LOADING = prefix + 'LOADING';
const FETCH_COMPLETE = prefix + 'FETCH_COMPLETE';

// --- reducer ---

const initialState = {
  loading: false,
  items: [],
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOADING:
        draft.loading = true;
        break;
      case FETCH_COMPLETE:
        draft.loading = false;
        draft.items = action.payload.items;
        break;
    }
  });

// --- action creators ---

function loading() {
  return {
    type: LOADING,
  };
}

function fetchComplete(items) {
  return {
    type: FETCH_COMPLETE,
    payload: {
      items,
    },
  };
}

// --- thunk creators ---

// createStore에 주입해준 thunk 미들웨어가 해주는 일은,
// 스토어에 함수가 dispatch 되었을 때
// 그 함수를 실행시켜 주는 것이다. 이 함수를 thunk라 부른다.
// 그리고 thunk 미들웨어가 thunk를 실행할 때는,
// 첫 번째 인수에 dispatch 함수를 넘긴다.

export function fetchTodos() {
  // thunk!
  return async dispatch => {
    dispatch(loading());
    const { data } = await api.get('/todos');
    dispatch(fetchComplete(data));
  };
}
