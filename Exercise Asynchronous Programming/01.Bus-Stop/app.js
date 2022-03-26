function getInfo() {
  let stopID = document.querySelector("#stopId").value;
  let stopName = document.querySelector("#stopName");
  let ulBuses = document.querySelector("#buses");

  fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopID}`)
    .then((body) => body.json())
    .then((data) => {
      stopName.textContent = data.name;

      Object.entries(data.buses).forEach((bus) => {
        let liBus = document.createElement("li");
        liBus.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`;
        ulBuses.appendChild(liBus);
      });
    })
    .catch((err) => {
      stopName.textContent = "Error";
    });

  Array.from(ulBuses.querySelectorAll("li")).forEach((li) => li.remove());
}
