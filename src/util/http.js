import { getJWT, setJWT } from './auth';

const createURL = partial => {
  let url = process.env.REACT_APP_API_URL;
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }

  if (partial.startsWith('/')) {
    partial = partial.substr(1);
  }

  return `${url}/api/${partial}`;
};

const fetchAPI = (endpoint, method = 'GET', body = null) =>
  fetch(createURL(endpoint), {
    method,
    headers: {
      Authorization: 'Bearer ' + getJWT(),
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  }).then(res => (res ? res.json() : res.text()));

const get = endpoint => fetchAPI(endpoint);

const post = (endpoint, body) => fetchAPI(endpoint, 'POST', body);

const put = (endpoint, body) => fetchAPI(endpoint, 'PUT', body);

const remove = endpoint => fetchAPI(endpoint, 'DELETE');

const HTTP = {
  projects: {
    getAll() {
      return get('/projects');
    },

    get(id) {
      return get(`/projects/${id}`);
    },

    create(body) {
      return post(`/projects`, body);
    },

    edit(id, body) {
      return put(`/projects/${id}`, body);
    },

    delete(id) {
      return remove(`/projects/${id}`);
    }
  },

  user: {
    authenticate(username, password, remember = true) {
      return post('/authenticate', { username, password }).then(setJWT);
    },

    authenticated() {
      return get('/authenticated')
        .then(res => res.authorized)
        .catch(() => false);
    }
  }
};

export default HTTP;
