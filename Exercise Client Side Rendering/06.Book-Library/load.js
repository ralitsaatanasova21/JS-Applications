import { html, render } from "../node_modules/lit-html/lit-html.js";
import { getContactById } from "./edit.js";

const url = `http://localhost:3030/jsonstore/collections/books`;
const root = document.querySelector("#tableSection");

let dataInfo;

function renderTable() {
  render(templateTable(), root);
}

export async function getAllBooks() {
  let response = await fetch(url);
  let data = await response.json();
  dataInfo = Object.entries(data);
  renderTable();
}

const templateTable = () => html`<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Author</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    ${dataInfo.map(
      (item) => html` <tr>
        <td>${item[1].title}</td>
        <td>${item[1].author}</td>
        <td id=${item[0]}>
          <button
            @click=${(e) => {
              e.preventDefault();
              getContactById(item[0]);
            }}
          >
            Edit
          </button>
          <button @click=${onDelete}>Delete</button>
        </td>
      </tr>`
    )}
  </tbody>
</table> `;

async function onDelete(e) {
  e.preventDefault();
  let id = e.target.parentElement.id;
  await fetch(`${url}/${id}`, {
    method: "delete",
  });

  getAllBooks();
}
