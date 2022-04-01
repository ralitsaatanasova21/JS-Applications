import { html, render } from "../node_modules/lit-html/lit-html.js";

const rootDiv = document.querySelector("#root");
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const towns = document
    .querySelector("#towns")
    .value.split(",")
    .map((x) => x.trim());

  let result = list(towns);
  render(result, rootDiv);

  document.querySelector("#towns").value = "";
});

const list = (data) => html`
  <ul>
    ${data.map((x) => html`<li>${x}</li>`)}
  </ul>
`;
