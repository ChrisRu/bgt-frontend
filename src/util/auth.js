export const fetchAPI = (endpoint, method = 'GET', body = null) => {
  const jwt = getJWT();

  return fetch(process.env.API_URL + endpoint, {
    method,
    headers: {
      Authorization: 'Bearer ' + jwt,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  });
};

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

export const isAuthenticated = () => {
  return fetchAPI('authenticated');
};
