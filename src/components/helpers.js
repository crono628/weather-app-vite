import thunderstorm from '../assets/thunderstorm.svg';
import sunny from '../assets/sunny.svg';
import cloudy from '../assets/cloudy.svg';
import rainy from '../assets/rainy.svg';
import snow from '../assets/snow.svg';

function minutesDisplay(date) {
  let minutes = date.getMinutes().toString();
  if (minutes.length === 1) {
    return '0' + minutes;
  }
  return minutes;
}

function hourDisplay(date, offset) {
  let hours = date.getUTCHours().toString();
  hours -= offset;
  if (hours < 0) {
    hours += 24;
  }
  return hours;
}

function iconSelection(num) {
  if (num < 300) {
    return thunderstorm;
  } else if (num < 600) {
    return rainy;
  } else if (num >= 600 && num < 700) {
    return snow;
  } else if (num >= 700 && num < 800) {
    return foggy;
  } else if (num === 800) {
    return sunny;
  } else {
    return cloudy;
  }
}

export { minutesDisplay, hourDisplay, iconSelection };
