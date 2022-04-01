import { html, render } from "../node_modules/lit-html/lit-html.js";
import { start } from "./app.js";

const root = document.querySelector("#createSection");
const url = `http://localhost:3030/jsonstore/collections/books`;
let data;
let contactId;

function renderEdit() {
  render(templateEdit(data), root);
}

export async function getContactById(id) {
  contactId = id;
  const response = await fetch(`${url}/${id}`);
  data = await response.json();
  renderEdit();
}

const templateEdit = (data) => html`
  <form id="edit-form" @submit=${onEdit}>
    <input type="hidden" name="id" />
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input
      type="text"
      name="title"
      placeholder="Title..."
      value=${data.title}
    />
    <label>AUTHOR</label>
    <input
      type="text"
      name="author"
      placeholder="Author..."
      value=${data.author}
    />
    <input type="submit" value="Save" />
  </form>
`;


async function onEdit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  let title = formData.get("title");
  let author = formData.get("author");

  await fetch(url + contactId, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, author }),
  });

  e.target.reset();

  start();
}
