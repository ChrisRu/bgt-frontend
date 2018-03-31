function latLngAccuracy(t) {
  return Math.round(1e6 * t) / 1e6;
}

function Convert(t, a) {
  if (t < 1e3) {
    t *= 1e3;
  }

  if (a < 1e3) {
    a *= 1e3;
  }

  if (t < 0 || t > 29e4) {
    throw new Error(t + ',' + a + ' - x must be between 0 and 290,000');
  }

  if (a < 29e4 || a > 63e4) {
    throw new Error(t + ',' + a + ' - y must be between 290,000 and 630,000');
  }

  return DoTheMath(t, a);
}

// Please don't ask.
// I stole this.
// Let's hope it works.
// If it's broken don't come to me.
// I have no idea how this works either.
function DoTheMath(t, a) {
  const o = (t - 155e3) * Math.pow(10, -5);
  const e = (a - 463e3) * Math.pow(10, -5);
  const n =
    3236.0331637 * e +
    -32.5915821 * Math.pow(o, 2) +
    -0.2472814 * Math.pow(e, 2) +
    -0.8501341 * Math.pow(o, 2) * e +
    -0.0655238 * Math.pow(e, 3) +
    0.0052771 * Math.pow(o, 4) +
    -0.0171137 * Math.pow(o, 2) * Math.pow(e, 2) +
    371e-7 * Math.pow(e, 4) +
    3314e-7 * Math.pow(o, 4) * e +
    -3859e-7 * Math.pow(o, 2) * Math.pow(e, 3) +
    143e-7 * Math.pow(o, 4) * Math.pow(e, 2) +
    -9e-6 * Math.pow(o, 2) * Math.pow(e, 4);
  const h = 52.156160556 + n / 3600;
  const p =
    5261.3028966 * o +
    105.9780241 * o * e +
    -0.8192156 * Math.pow(o, 3) +
    2.4576469 * o * Math.pow(e, 2) +
    -0.0560092 * Math.pow(o, 3) * e +
    0.0560089 * o * Math.pow(e, 3) +
    2574e-7 * Math.pow(o, 5) +
    -0.0025614 * Math.pow(o, 3) * Math.pow(e, 2) +
    0.001277 * o * Math.pow(e, 4) +
    293e-7 * Math.pow(o, 5) * e +
    -973e-7 * Math.pow(o, 3) * Math.pow(e, 3) +
    291e-7 * o * Math.pow(e, 5);
  const M = 5.387638889 + p / 3600;

  return {
    lat: h + (-96.862 - 11.714 * (h - 52) - 0.125 * (M - 5)) / 1e5,
    lng: M + (0.329 * (h - 52) - 37.902 - 14.667 * (M - 5)) / 1e5
  };
}

export default function convertRdToGeo(rdLat, rdLng) {
  const { lat, lng } = Convert(rdLat, rdLng);
  return [latLngAccuracy(lat), latLngAccuracy(lng)];
}
