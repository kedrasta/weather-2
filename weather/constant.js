export {
  BUTTON,
  INPUT,
  TEMP_MAIN,
  CITY_MAIN,
  APIKEY,
  SERVER_URL,
  ICON_API,
  LIKE,
  LIKE_CITY,
  DETAILS_temp,
  DETAILS_feelsLike,
  DETAILS_Weather,
  DETAILS_Sunrise,
  DETAILS_Sunset,
  DETAILS_city,
};

const BUTTON = document.getElementById("button");
const INPUT = document.getElementById("inputCity");
const TEMP_MAIN = document.getElementById("tempMain");
const CITY_MAIN = document.getElementById("cityMain");
const APIKEY = "945e9b88a8354483e22cf316ce8df5b3";
const SERVER_URL = "http://api.openweathermap.org/data/2.5/weather";
const ICON_API = document.getElementById("iconAPI");
const LIKE = document.getElementById("button_like");
const LIKE_CITY = document.getElementById("favoritesCity");
const DETAILS_city = document.getElementById("detalils_city");
const DETAILS_temp = document.getElementById("detalils_temp");
const DETAILS_feelsLike = document.getElementById("detalils_feelsLike");
const DETAILS_Weather = document.getElementById("detalils_Weather");
const DETAILS_Sunrise = document.getElementById("detalils_Sunrise");
const DETAILS_Sunset = document.getElementById("detalils_Sunset");
