import produce from 'immer';
import api from '../api';

const prefix = 'redux-example/todo/';
const LOADING = prefix + 'LOADING';
const FETCH_COMPLETE = prefix + 'FETCH_COMPLETE';

const initialState = {
  loading: false,
  items: [],
};

// --- reducer ---

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

// --- thunks ---

export function fetchTodos() {
  return async dispatch => {
    dispatch(loading());
    const { data } = await api.get('/todos');
    dispatch(fetchComplete(data));
  };
}
