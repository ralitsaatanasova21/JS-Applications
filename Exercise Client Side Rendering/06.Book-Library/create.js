import { html, render } from "../node_modules/lit-html/lit-html.js";
import { getAllBooks } from "./load.js";

const root = document.querySelector("#createSection");
const url = `http://localhost:3030/jsonstore/collections/books`;

export function renderCreate() {
  render(templateSection(), root);
}

let templateSection = () => html`
  <form id="add-form" @submit=${createBook}>
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." />
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." />
    <input type="submit" value="Submit" />
  </form>
`;


async function createBook(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  let title = formData.get("title");
  let author = formData.get("author");

  await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, author }),
  });

  e.target.reset();

  getAllBooks();
}
