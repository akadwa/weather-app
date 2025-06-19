const weatherIcons = {
  "clear-day": "fa-sun",
  "clear-night": "fa-moon",
  rain: "fa-cloud-rain",
  snow: "fa-snowflake",
  sleet: "fa-cloud-meatball",
  wind: "fa-wind",
  fog: "fa-smog",
  cloudy: "fa-cloud",
  "partly-cloudy-day": "fa-cloud-sun",
  "partly-cloudy-night": "fa-cloud-moon",
  thunderstorm: "fa-bolt",
  hail: "fa-cloud-showers-heavy",
};

export function getWeatherIconClass(iconName, size = "3x") {
  const iconClass = weatherIcons[iconName] || "fa-question-circle";
  return ["fa-solid", iconClass, `fa-${size}`];
}
