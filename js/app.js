var weatherInfo = document.querySelector(".weather__info");
var weatherInfoDate = document.querySelector(".weather__info__date");
var search = document.querySelector("#search");
var searchBtn = document.querySelector("#btn");
var currentLocation = document.querySelector(".location");
var tempCurrent = document.querySelector(".temp");
var condition = document.querySelector(".condition__text");
var humidity = document.querySelector(".humidity");
var wind = document.querySelector(".wind");
var today = new Date();
var currentDayString = today
  .toLocaleString("default", {
    dateStyle: "full",
  })
  .replaceAll(",", "")
  .split(" ");
console.log(currentDayString);

function getData(location) {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=1f60ebe4794e4adcb75210034221103&q=${location}&days=3&aqi=no&alerts=no`,
  )
    .then((res) => res.json())
    .then((data) => {
      weatherInfoDate.innerHTML = `<h2>${currentDayString[0]}</h2>
<p>${currentDayString[2]}<small>${currentDayString[1]}</small><small>${currentDayString[3]}</small>
</p>
`;

      currentLocation.innerHTML = data.location.name;
      tempCurrent.innerHTML = `${data.current.temp_c}  <img class="icon" src="${data.current.condition.icon}"/>`;
      condition.innerHTML = data.current.condition.text;
      humidity.innerHTML = data.current.humidity + "%";
      wind.innerHTML =
        data.current.wind_kph + "  " + "<i class='fa-solid fa-wind'></i>";
      var dayString = today.toLocaleDateString();
      console.log(dayString);
      var nextTwoDays = data.forecast.forecastday
        .splice(1)
        .map((item) => {
          let day = new Date(item.date)
            .toLocaleString("default", { dateStyle: "full" })
            .replaceAll(",", "")
            .split(" ");

          return `
<div class="day">
  <div class="date">
<h2>${day[0]}</h2>
<p>${day[2]}<small>${day[1]}</small><small>${day[3]}</small>
</p>
</div>
 <h1 class="tempNext-max">${item.day.maxtemp_c}<img class="icon" src="${item.day.condition.icon}"/></h1>
<h2 class="tempNext-min">${item.day.mintemp_c}</h2>
<p class="state">${item.day.condition.text}</p>
</div>
`;
        })
        .join(" ");
      document.querySelector(".next__day").innerHTML = nextTwoDays;
    })
    .catch((error) => console.log(error));
}
document.addEventListener("DOMContentLoaded", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let { longitude } = position.coords;
      let { latitude } = position.coords;
      getData(`${latitude},${longitude}`);

      weatherInfo.style.opacity = "1";
    });
  } else {
    weatherInfo.style.opacity = "0";
  }
});
searchBtn.addEventListener("click", function () {
  getData(search.value);

  weatherInfo.style.opacity = "1";
  search.value = "";
});
