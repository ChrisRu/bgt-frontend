export function parseLocation(location) {
  if (!location) {
    return;
  }

  const { address: { road, house_number, city, suburb }, name } = location;

  const res = [];

  if (name) {
    res.push(name);
    res.push(', ');
  }

  if (road) {
    res.push(road);
  }

  if (house_number) {
    res.push(' ');
    res.push(house_number);
  }

  if (city || suburb) {
    res.push(', ');
    res.push(city || suburb);
  }

  return res.join('');
}
