export const fetchAPI = (endpoint, method = 'GET', body = null) =>
  fetch(`${process.env.REACT_APP_API_URL}/api${endpoint}`, {
    method,
    headers: {
      Authorization: 'Bearer ' + getJWT(),
      'Content-Type': 'application/json'
    },
    body
  }).then(res => res.json());

export const setJWT = token => {
  const jwt = JSON.stringify({
    token
  });

  window.localStorage.setItem('jwt', jwt);
};

export const getJWT = () => {
  const jwt = JSON.parse(window.localStorage.getItem('jwt'));

  if (jwt === null) {
    return false;
  }

  return jwt.token;
};

export const isAuthenticated = () =>
  fetchAPI('/authenticated')
    .then(res => res.authorized)
    .catch(() => false);

export const authenticate = (username, password, remember = true) => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  return fetch(`${process.env.REACT_APP_API_URL}/api/authenticate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formData
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setJWT(res.token);
      return res;
    });
};