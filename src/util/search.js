export const fuzzysearch = (needle, haystack) => {
  needle = needle.toLowerCase();
  haystack = haystack.toLowerCase();

  const hlen = haystack.length;
  const nlen = needle.length;

  if (nlen > hlen) {
    return false;
  }

  if (nlen === hlen) {
    return needle === haystack;
  }

  outer: for (let i = 0, j = 0; i < nlen; i++) {
    const nch = needle.charCodeAt(i);

    while (j < hlen) {
      if (haystack.charCodeAt(j++) === nch) {
        continue outer;
      }
    }

    return false;
  }

  return true;
};

export const searchKeys = (needle, haystackObject) =>
  Object.values(haystackObject).some(value => fuzzysearch(needle, value));

export default fuzzysearch;
