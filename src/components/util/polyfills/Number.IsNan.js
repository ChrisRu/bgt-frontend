if (!Number.isNaN) {
  Number.isNan = function(value) {
    // eslint-disable-next-line no-self-compare
    return value !== value;
  };
}
