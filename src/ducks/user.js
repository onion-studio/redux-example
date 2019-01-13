import api from '../api';
import { setToken, removeToken } from '../token';

const prefix = 'redux-example/user/';

// --- action types ---

const LOADING = prefix + 'LOADING';
const COMPLETE_LOGIN = prefix + 'COMPLETE_LOGIN';
const COMPLETE_LOGOUT = prefix + 'COMPLETE_LOGOUT';

// --- reducer ---

const initialState = {
  // username을 불러오기 위한 로딩 과정 중에 있음을 나타냄
  loading: false,
  // 사용자의 id
  id: null,
  // 사용자의 username
  username: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      // 불변성을 지키기 위해, 내용이 바뀔 때마다 참조가 바뀌도록 해 준다.
      return {
        ...state,
        loading: true,
      };
    case COMPLETE_LOGIN:
      return {
        ...state,
        loading: false,
        id: action.payload.id,
        username: action.payload.username,
      };
    case COMPLETE_LOGOUT:
      return initialState;
    // immer를 사용하지 않는 경우, 반드시 default case를 명시해주어야 한다.
    default:
      return state;
  }
};

// --- action creators ---

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

// --- thunk creators ---

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
