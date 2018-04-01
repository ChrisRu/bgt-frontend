import queryString from 'query-string';

import { getJWT, setJWT } from '../functions/auth';
import models from '../../forms/models';

const createURL = partial => {
  let url = process.env.REACT_APP_API_URL;
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }

  if (partial.startsWith('/')) {
    partial = partial.substr(1);
  }

  return `${url}/${partial}`;
};

const fetchAPI = (endpoint, method = 'GET', body = null) =>
  fetch(createURL(endpoint), {
    method,
    headers: {
      Authorization: 'Bearer ' + getJWT(),
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  })
    .then(res => {
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }

      if (res.error) {
        throw new Error(res.error.message);
      }

      return res;
    })
    .then(res => res.json())
    .then(res => res.data)
    .catch(error => {
      console.error(error);
    });

const get = endpoint => fetchAPI(endpoint);
const post = (endpoint, body) => fetchAPI(endpoint, 'POST', body);
const put = (endpoint, body) => fetchAPI(endpoint, 'PUT', body);
const patch = (endpoint, body) => fetchAPI(endpoint, 'PATCH', body);
const remove = endpoint => fetchAPI(endpoint, 'DELETE');

const createEndPoints = name => ({
  getAll: () => get(`/${name}`),
  get: id => get(`/${name}/${id}`),
  create: body => post(`/${name}`, body),
  edit: (id, body) => patch(`/${name}/${id}`, body),
  editComplete: (id, body) => put(`/${name}/${id}`, body),
  delete: id => remove(`/${name}/${id}`)
});

const HTTP = {
  projects: createEndPoints('projects'),

  stats: {
    get() {
      return get('/stats');
    }
  },

  geo: {
    code(location) {
      if (!location) {
        return Promise.resolve([]);
      }

      return get(`/geocoding/search/${location}`);
    },

    getDetails(key) {
      if (!key) {
        return Promise.resolve([]);
      }

      return get(`/geocoding/getDetails/${key}`);
    },

    getMeldingen() {
      return get(`/geocoding/terugmeldingen`);
    },

    search(location) {
      return this.code(location);
    },

    reverse(lat, lon) {
      return get('/geocoding/reverse/' + queryString.stringify({ lat, lon }));
    }
  },

  user: {
    authenticate(username, password, remember = true) {
      if (!username || !password) {
      }

      return post('/authenticate', { username, password }).then(
        token => (remember ? setJWT(token) : token)
      );
    },

    authenticated() {
      return get('/authenticated')
        .then(res => res.authenticated)
        .catch(() => false);
    }
  }
};

models.forEach(({ type }) => {
  HTTP[type] = createEndPoints(type);
});

export default HTTP;
