import "../styles/main.scss";
import { getWeatherIconClass } from "./weather-icons.js";

const form = document.querySelector("form");
const locationInput = document.querySelector("#location-input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = locationInput.value.trim();

  if (!location) {
    alert("Please enter a location");
    return;
  }

  clearWeatherDisplay();

  try {
    const weatherData = await getData(location, "metric");

    if (!weatherData) {
      alert("Location not found or API error");
      return;
    }

    document.getElementById("display-container").classList.remove("hidden");

    displayLocation(weatherData.address);
    displayWeather(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Failed to fetch weather data");
  }
});

async function getData(location, unitGroup) {
  const encodedLocation = encodeURIComponent(location);
  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedLocation}?unitGroup=${unitGroup}&key=MYXF2922LTVCYSQ4NKHZ32LNV`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      address: data.resolvedAddress,
      currentConditions: {
        temp: data.currentConditions.temp,
        conditions: data.currentConditions.conditions,
        icon: data.currentConditions.icon,
        feelsLike: data.currentConditions.feelslike,
        humidity: data.currentConditions.humidity,
        windSpeed: data.currentConditions.windspeed,
        uvIndex: data.currentConditions.uvindex,
        precipProb: data.currentConditions.precipprob,
      },
      daysArray: data.days.map((day) => ({
        date: day.datetimeEpoch,
        conditions: day.conditions,
        icon: day.icon,
        temp: day.temp,
        maxTemp: day.tempmax,
        minTemp: day.tempmin,
      })),
    };
  } catch (error) {
    console.log(`Location not found!`);
    return null;
  }
}

function displayWeather(data) {
  displayCurrentWeather(
    data.currentConditions,
    data.daysArray[0],
    getDayAndDate(data.daysArray[0].date)
  );

  displayFiveDayForecast(data.daysArray);
}

function displayFiveDayForecast(daysData) {
  for (let i = 1; i < 6; i++) {
    displayDayWeather(daysData[i]);
  }
}

function displayDayWeather(dayData) {
  const forecastDaysContainer = document.querySelector(
    "#forecast-days-container"
  );

  const dayContainer = document.createElement("div");
  dayContainer.className = "day-container";
  dayContainer.id = "day-container";

  const dayAndDate = getDayAndDate(dayData.date);
  const day = dayAndDate.day;
  const date = dayAndDate.date;

  const dayElement = document.createElement("p");
  dayElement.className = "day";
  dayElement.id = "day";
  dayElement.textContent = day;

  const dateElement = document.createElement("p");
  dateElement.className = "date";
  dateElement.id = "date";
  dateElement.textContent = date;

  const iconElement = document.createElement("i");
  iconElement.className = "icon";
  iconElement.id = "icon";
  iconElement.classList.add(...getWeatherIconClass(dayData.icon));

  const conditionsElement = document.createElement("p");
  conditionsElement.className = "conditions";
  conditionsElement.id = "conditions";
  conditionsElement.textContent = dayData.conditions;

  const tempMinMaxElement = document.createElement("p");
  tempMinMaxElement.className = "temp-min-max";
  tempMinMaxElement.id = "temp-min-max";
  tempMinMaxElement.textContent = `${Math.round(
    dayData.minTemp
  )}°C / ${Math.round(dayData.maxTemp)}°C`;

  dayContainer.appendChild(dayElement);
  dayContainer.appendChild(dateElement);
  dayContainer.appendChild(iconElement);
  dayContainer.appendChild(conditionsElement);
  dayContainer.appendChild(tempMinMaxElement);

  forecastDaysContainer.appendChild(dayContainer);
}

function displayCurrentWeather(currentConditions, dayData, date) {
  const dayDisplay = document.querySelector("#current-day");
  const dateDisplay = document.querySelector("#current-date");
  const currentIconDisplay = document.querySelector("#current-icon");
  const conditionsDisplay = document.querySelector("#current-conditions");
  const tempDisplay = document.querySelector("#current-temp");
  const tempMinMaxDisplay = document.querySelector("#current-temp-min-max");
  const feelsLikeDisplay = document.querySelector("#feels-like");
  const windSpeedDisplay = document.querySelector("#wind-speed");
  const humidityDisplay = document.querySelector("#humidity");
  const uvIndexDisplay = document.querySelector("#uv-index");
  const precipProbDisplay = document.querySelector("#precip-prob");

  dayDisplay.textContent = date.day;
  dateDisplay.textContent = date.date;
  currentIconDisplay.classList.add(
    ...getWeatherIconClass(currentConditions.icon, "10x")
  );
  conditionsDisplay.textContent = currentConditions.conditions;
  tempDisplay.textContent = `${Math.round(currentConditions.temp)}°C`;
  tempMinMaxDisplay.textContent = `${Math.round(
    dayData.minTemp
  )}°C / ${Math.round(dayData.maxTemp)}°C`;

  feelsLikeDisplay.textContent = `${Math.round(currentConditions.feelsLike)}°C`;
  windSpeedDisplay.textContent = `${currentConditions.windSpeed} Km/h`;
  humidityDisplay.textContent = `${Math.round(currentConditions.humidity)}%`;
  uvIndexDisplay.textContent = currentConditions.uvIndex;
  precipProbDisplay.textContent = `${currentConditions.precipProb}%`;
}

function getDayAndDate(epochDateTime) {
  const timestamp = Number(epochDateTime) * 1000;
  const date = new Date(timestamp);

  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return {
    day,
    date: formattedDate,
  };
}

function displayLocation(location) {
  const [city, ...countryParts] = location
    .split(",")
    .map((part) => part.trim());

  const cityDisplay = document.querySelector("#city");
  const countryDisplay = document.querySelector("#country");

  cityDisplay.textContent = city;
  countryDisplay.textContent = countryParts.join(", ");
}

function clearWeatherDisplay() {
  document.querySelector("#city").textContent = "";
  document.querySelector("#country").textContent = "";

  const currentIcon = document.querySelector("#current-icon");
  currentIcon.className = "current-icon";
  currentIcon.textContent = "";

  document.querySelector("#current-day").textContent = "";
  document.querySelector("#current-date").textContent = "";
  document.querySelector("#current-conditions").textContent = "";
  document.querySelector("#current-temp").textContent = "";
  document.querySelector("#current-temp-min-max").textContent = "";

  document.querySelector("#feels-like").textContent = "";
  document.querySelector("#wind-speed").textContent = "";
  document.querySelector("#humidity").textContent = "";
  document.querySelector("#uv-index").textContent = "";
  document.querySelector("#precip-prob").textContent = "";

  const forecastContainer = document.querySelector("#forecast-days-container");
  while (forecastContainer.children.length > 1) {
    forecastContainer.removeChild(forecastContainer.lastChild);
  }
}
