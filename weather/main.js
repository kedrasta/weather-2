import {
  BUTTON,
  INPUT,
  TEMP_MAIN,
  CITY_MAIN,
  APIKEY,
  SERVER_URL,
  ICON_API,
  LIKE,
  LIKE_CITY,
  DETAILS_city,
  DETAILS_temp,
  DETAILS_feelsLike,
  DETAILS_Weather,
  DETAILS_Sunrise,
  DETAILS_Sunset,
} from "./constant.js";

import fromUnixTime from "date-fns/fromUnixTime";
import { format } from "date-fns";

LIKE_CITY.addEventListener("click", deleteCity);
LIKE_CITY.addEventListener("click", showCity);
LIKE.addEventListener("click", addNewCity);
BUTTON.addEventListener("click", chekInput);

let listcity = [];

if (localStorage.getItem(`city`)) {
  listcity = JSON.parse(localStorage.getItem(`city`));
  render();
}

function locakStor() {
  localStorage.setItem(`city`, JSON.stringify(listcity));
}

function chekInput(event) {
  event.preventDefault();
  if (INPUT.value) {
    chekWeather(INPUT.value);
  }
}

async function chekWeather(city) {
  const URL = `${SERVER_URL}?q=${city}&appid=${APIKEY}&units=metric`;
  try {
    let data = await fetch(URL);
    let resultJson = await data.json();
    checkJSON(resultJson);
    addDetalis(resultJson);
  } catch (err) {
    treatmentErrors(err);
  } finally {
    clearForm();
  }
}

function checkJSON(result) {
  let temp = result.main.temp;
  let city = result.name;
  let imgSrc = result.weather[0].icon;
  addNow(temp, city);
  addImgNow(imgSrc);
}

function addNewCity() {
  LIKE_CITY.innerHTML = " ";
  let city = CITY_MAIN.textContent;
  listcity.push(city);
  locakStor();
  render();
}

function addDetalis(result) {
  let sunrise = format(new Date(fromUnixTime(result.sys.sunrise)), "HH:MM");
  let sunset = format(new Date(fromUnixTime(result.sys.sunset)), "HH:MM");
  DETAILS_city.textContent = result.name;
  DETAILS_temp.textContent = `Temperature : ${Math.round(result.main.temp)}`;
  DETAILS_feelsLike.textContent = `Feels like : ${Math.round(
    result.main.feels_like
  )} `;
  DETAILS_Weather.textContent = `Weather : ${result.weather[0].main}`;
  DETAILS_Sunrise.textContent = `Sunrise : ${sunrise}`;
  DETAILS_Sunset.textContent = `Sunset : ${sunset}`;
}

function render(i = 0) {
  if (listcity[i] === undefined) return;
  let city = listcity[i];
  let newElement = `<li class="li_newCity" id="newCity">${city}<button data-action="delete" id="btnClear_city"><img src="./img/delete.png" alt="del" class=imgDel></button></li>`;
  LIKE_CITY.insertAdjacentHTML("afterbegin", newElement);
  render(i + 1);
}

function showCity(event) {
  if (event.target.dataset.action == "delete") return;
  const delete_li = event.target.closest(".li_newCity");
  const getValue = delete_li.firstChild.textContent;
  chekWeather(getValue);
}

function deleteCity(event) {
  if (event.target.dataset.action !== "delete") return;
  const delete_li = event.target.closest(".li_newCity");
  const getValue = delete_li.firstChild.textContent;
  listcity.forEach((elem) => {
    if (elem === getValue) {
      const position = listcity.indexOf(elem);
      listcity.splice(position, 1);
    }
  });
  locakStor();
  LIKE_CITY.innerHTML = " ";
  render();
}

function addImgNow(id) {
  ICON_API.src = `https://openweathermap.org/img/wn/${id}@4x.png`;
}

function clearForm() {
  INPUT.value = " ";
  INPUT.focus();
}

function addNow(t, c) {
  let temp = Math.round(t);
  let name = c;
  CITY_MAIN.innerHTML = `${name}`;
  TEMP_MAIN.innerHTML = `${temp}&deg; `;
}

function treatmentErrors(e) {
  TEMP_MAIN.textContent = `Ошибка ввода`;
  CITY_MAIN.textContent = "";
  alert(`Ошибка: ${e.status}`);
  let error = confirm("Попробовать еще раз?");
  if (!error) {
    alert("До свидания!");
    window.close();
  } else {
    alert("Введите название города!");
  }
}
