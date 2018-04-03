if (!Array.isArray) {
  // eslint-disable-next-line
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
