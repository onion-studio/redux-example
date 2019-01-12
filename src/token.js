const tokenName = 'redux-example-token';

export function getToken() {
  return localStorage.getItem(tokenName);
}

export function setToken(token) {
  localStorage.setItem(tokenName, token);
}

export function removeToken() {
  localStorage.removeItem(tokenName);
}
