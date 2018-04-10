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
  console.log(endpoint, method, body) ||
  fetch(createURL(endpoint), {
    method,
    headers: {
      Authorization: 'Bearer ' + getJWT(),
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: body ? JSON.stringify(body) : undefined
  })
    .then(res => res.json())
    .then(res => {
      if (String(res).startsWith('<!DOCTYPE html>')) {
        throw new Error('Wrong endpoint');
      }

      return res;
    })
    .then(res => res.data);

const get = endpoint => fetchAPI(endpoint.toLowerCase());
const post = (endpoint, body) => fetchAPI(endpoint.toLowerCase(), 'POST', body);
const put = (endpoint, body) => fetchAPI(endpoint.toLowerCase(), 'PUT', body);
const patch = (endpoint, body) =>
  fetchAPI(endpoint.toLowerCase(), 'PATCH', body);
const remove = endpoint => fetchAPI(endpoint.toLowerCase(), 'DELETE');

const createEndPoints = name => ({
  getAll: () => get(`/${name}`),
  get: id => get(`/${name}/${id}`),
  create: body => post(`/${name}`, body),
  edit: body => patch(`/${name}/${body.projectId || body.id}`, body),
  editComplete: body => put(`/${name}/${body.projectId}`, body),
  delete: id => remove(`/${name}/${id}`)
});

const HTTP = {
  projects: {
    getAll: () => get(`/projects`),
    get: id => get(`/projects/${id}`),
    create: body => post(`/projects`, body),
    edit: body => put(`/projects/${body.id}`, body),
    editComplete: body => patch(`/projects/${body.id}`, body),
    delete: id => remove(`/projects/${id}`)
  },

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
      return get('/geocoding/reverse?' + queryString.stringify({ lat, lon }));
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
    },

    create(data) {
      return post('/users/create', data);
    },

    get() {
      return get('/users/current');
    }
  }
};

models.forEach(({ type }) => {
  HTTP[type] = createEndPoints(type);
});

export default HTTP;
