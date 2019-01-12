import produce from 'immer';

const LOADING = 'redux-example/todo/LOADING';

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
    }
  });

export function fetchTodos() {
  return async dispatch => {};
}
