const API_KEY = import.meta.env.VITE_WEATHER_API;

export const API = {
  GEOCODE_NAME: (name, state) =>
    `https://api.openweathermap.org/geo/1.0/direct?q=${name}${
      state ? `,${state}` : ''
    },US&limit=5&appid=${API_KEY}`,
  GEOCODE_ZIP: (zip) =>
    `https://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${API_KEY}`,
  WEATHER: (lat, lon) =>
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely&appid=${API_KEY}`,
};
