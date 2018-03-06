export const fetchAPI = (endpoint, method = 'GET', body = null) =>
  fetch(process.env.REACT_APP_API_URL + endpoint, {
    method,
    headers: {
      Authorization: 'Bearer ' + getJWT(),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  });

export const setJWT = token => {
  window.localStorage.setItem('jwt', JSON.stringify({ token }));
};

export const getJWT = () => {
  const jwt = JSON.parse(window.localStorage.getItem('jwt'));

  if (jwt === null) {
    return false;
  }

  return jwt.token;
};

export const isAuthenticated = () =>
  fetchAPI('/authenticated').catch(() => false);

export const authenticate = (username, password, remember = true) =>
  fetchAPI('/authenticate', 'POST', {
    username,
    password
  });
