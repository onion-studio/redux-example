import produce from 'immer';

import api from '../api';
import { setToken, removeToken } from '../token';

const prefix = 'redux-example/user/';

const LOADING = prefix + 'LOADING';
const COMPLETE_LOGIN = prefix + 'COMPLETE_LOGIN';
const COMPLETE_LOGOUT = prefix + 'COMPLETE_LOGOUT';

const initialState = {
  // username을 불러오기 위한 로딩 과정 중에 있음을 나타냄
  loading: false,
  // 사용자의 id
  id: null,
  // 사용자의 username
  username: null,
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOADING:
        draft.loading = true;
        break;
      case COMPLETE_LOGIN:
        draft.loading = false;
        draft.id = action.payload.id;
        draft.username = action.payload.username;
        break;
      case COMPLETE_LOGOUT:
        draft.username = null;
        break;
    }
  });

export function loading() {
  return {
    type: LOADING,
  };
}

export function completeLogin(id, username) {
  return {
    type: COMPLETE_LOGIN,
    payload: {
      id,
      username,
    },
  };
}

export function completeLogout() {
  return {
    type: COMPLETE_LOGOUT,
  };
}

export function register(username, password) {
  return async dispatch => {
    dispatch(loading());
    const {
      data: { token },
    } = await api.post('/users/register', {
      username,
      password,
    });
    setToken(token);
    dispatch(refreshUserInfo());
  };
}

export function login(username, password) {
  return async dispatch => {
    dispatch(loading());
    const {
      data: { token },
    } = await api.post('/users/login', {
      username,
      password,
    });
    setToken(token);
    dispatch(refreshUserInfo());
  };
}

export function refreshUserInfo() {
  return async dispatch => {
    dispatch(loading());
    const {
      data: { id, username },
    } = await api.get('/me');
    dispatch(completeLogin(id, username));
  };
}

export function logout() {
  return async dispatch => {
    removeToken();
    dispatch(completeLogout());
  };
}
