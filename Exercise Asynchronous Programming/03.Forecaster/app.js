async function attachEvents() {
  let url = "http://localhost:3030/jsonstore/forecaster/locations";
  let input = document.querySelector("#location");
  let submitBtn = document.querySelector("#submit");
  let divForecast = document.querySelector("#forecast");
  let current = document.querySelector("#current");
  let upcoming = document.querySelector("#upcoming");

  let res = await fetch(url);
  let data = await res.json();

  submitBtn.addEventListener("click", () => {
    divForecast.style.display = "block";

    let result = Object.entries(data).find((e) => e[1].name === input.value);
    if (result === undefined) {
      divForecast.textContent = "Error";
    } else {
      fetch(
        `http://localhost:3030/jsonstore/forecaster/today/${result[1].code}`
      )
        .then((e) => e.json())
        .then((data) => {
          let divF = document.createElement("div");
          let spanSymbol = document.createElement("span");
          let spanCondition = spanSymbol.cloneNode(true);
          let spanLocation = spanSymbol.cloneNode(true);
          let spanDegrees = spanSymbol.cloneNode(true);
          let spanWeather = spanSymbol.cloneNode(true);

          divF.classList = "forecasts";
          spanSymbol.classList = "condition symbol";
          spanCondition.classList.add("condition");
          spanLocation.classList.add("forecast-data");
          spanDegrees.classList.add("forecast-data");
          spanWeather.classList.add("forecast-data");

          spanWeather.textContent = data.forecast.condition;
          spanSymbol.textContent = weatherType(spanWeather.textContent);
          spanLocation.textContent = data.name;
          spanDegrees.textContent = `${data.forecast.low}°/${data.forecast.high}°`;

          spanCondition.appendChild(spanLocation);
          spanCondition.appendChild(spanDegrees);
          spanCondition.appendChild(spanWeather);
          divF.appendChild(spanSymbol);
          divF.appendChild(spanCondition);
          current.appendChild(divF);
        });

      fetch(
        `http://localhost:3030/jsonstore/forecaster/upcoming/${result[1].code}`
      )
        .then((e) => e.json())
        .then((data) => {
          let divInfo = document.createElement("div");
          data.forecast.forEach((e) => {
            divInfo.classList = "forecast-info";
            let divUpcoming = getUpcoming(e.low, e.high, e.condition);

            divInfo.appendChild(divUpcoming);
          });
          upcoming.appendChild(divInfo);
        });
    }

    input.value = "";
    try {
      document.querySelector(".forecasts").remove();
      document.querySelector(".forecast-info").remove();
    } catch (err) {}
    
  });
  function weatherType(weather) {
    let a = "";
    switch (weather) {
      case "Sunny":
        a = "☀";
        break;
      case "Partly sunny":
        a = "⛅";
        break;
      case "Overcast":
        a = "☁";
        break;
      case "Rain":
        a = "☂";
        break;
    }
    return a;
  }
  function getUpcoming(low, high, condition) {
    let spanUpcoming = document.createElement("span");
    let sSymbol = spanUpcoming.cloneNode(true);
    let sDegrees = spanUpcoming.cloneNode(true);
    let sWeather = spanUpcoming.cloneNode(true);

    spanUpcoming.classList = "upcoming";
    sSymbol.classList = "condition symbol";
    sDegrees.classList.add("forecast-data");
    sWeather.classList.add("forecast-data");

    sSymbol.textContent = weatherType(condition);
    sDegrees.textContent = `${low}°/${high}°`;
    sWeather.textContent = condition;

    spanUpcoming.appendChild(sSymbol);
    spanUpcoming.appendChild(sDegrees);
    spanUpcoming.appendChild(sWeather);

    return spanUpcoming;
  }
}
attachEvents();
