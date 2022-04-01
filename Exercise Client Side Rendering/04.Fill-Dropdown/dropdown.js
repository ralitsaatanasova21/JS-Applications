import { html, render } from "../node_modules/lit-html/lit-html.js";

const selectTemplate = (items) => html`
  <select id="menu">
    ${items.map((i) => html`<option value=${i._id}>${i.text}</option>`)}
  </select>
`;

const root = document.querySelector("div");
const form = document.querySelector("form");
const url = "http://localhost:3030/jsonstore/advanced/dropdown";
form.addEventListener("submit", onSubmit);
getItems();

async function getItems() {
  let res = await fetch(url);
  let data = await res.json();

  update(Object.values(data));
}

function update(items) {
  const result = selectTemplate(items);
  render(result, root);
}

async function onSubmit(e) {
  e.preventDefault();

  const text = document.querySelector("#itemText").value;

  let res = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application.json",
    },
    body: JSON.stringify({ text }),
  });

  if (res.ok) {
    getItems();
  }

  document.querySelector("#itemText").value = "";
}
