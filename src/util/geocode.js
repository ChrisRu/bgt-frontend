import queryString from 'query-string';

const url = 'https://nominatim.openstreetmap.org/search?q=';
const options = queryString.stringify({
  format: 'json',
  polygon: 1,
  addressdetails: 1,
  'accept-language': 'nl'
});

const search = async search => {
  const location = search.split(' ').join('+');

  return fetch(`${url}${location}&${options}`).then(res => res.json());
};

export default search;
