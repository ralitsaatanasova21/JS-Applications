import { html, render } from "../node_modules/lit-html/lit-html.js";
import { towns as townNames } from "./towns.js";

const list = (towns) => html`
  <ul>
    ${towns.map(
      (x) => html`<li class=${x.match ? "active" : null}>${x.name}</li>`
    )}
  </ul>
`;

const towns = townNames.map((t) => ({ name: t, match: false }));
const root = document.querySelector("#towns");
const input = document.querySelector("#searchText");
const output = document.querySelector("#result");
document.querySelector("button").addEventListener("click", onSearch);

update();

// towns.forEach(x=>{name: x, match: true})
function update() {
  render(list(towns), root);
}

function onSearch() {
  const match = input.value.trim().toLowerCase();
  let matches = 0;
  for (let town of towns) {
    if (match && town.name.toLocaleLowerCase().includes(match)) {
      town.match = true;
      matches++;
    } else {
      town.match = false;
    }
  }

  output.textContent = `${matches} matches found`;
  input.value = "";
  update();
}
