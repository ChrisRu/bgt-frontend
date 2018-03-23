export const setJWT = res => {
  if (res) {
    window.localStorage.setItem('jwt', JSON.stringify(res));
  }

  return res;
};

export const getJWT = () => {
  const jwt = JSON.parse(window.localStorage.getItem('jwt'));

  if (jwt === null) {
    return false;
  }

  return jwt;
};
