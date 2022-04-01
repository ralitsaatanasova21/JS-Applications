import { html, render } from "../node_modules/lit-html/lit-html.js";
import { getAllBooks } from "./load.js";
import { renderCreate } from "./create.js";

const root = document.querySelector("#buttonSection");

function renderButton() {
  render(buttonLoad(), root);
}

const buttonLoad = () => html`
  <button id="loadBooks" @click=${getAllBooks}>LOAD ALL BOOKS</button>
`;

start();

export function start() {
  renderButton();
  getAllBooks();
  renderCreate();
}

