import objectPath from 'object-path';

function chunk(list, path) {
  const arrays = {};

  list.forEach(item => {
    const type = objectPath.get(item, path);

    if (type !== undefined) {
      if (arrays[type] === undefined) {
        arrays[type] = [item];
      } else {
        arrays[type].push(item);
      }
    }
  });

  return arrays;
}

export default chunk;
