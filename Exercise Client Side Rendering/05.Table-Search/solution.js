import { html, render } from "../node_modules/lit-html/lit-html.js";

const templateRow = (student) => html` 
<tr class=${student.match ? 'select' : ''}>
  <td>${student.item.firstName} ${student.item.lastName}</td>
  <td>${student.item.email}</td>
  <td>${student.item.course}</td>
</tr>`;

const root = document.querySelector("tbody");
const url = "http://localhost:3030/jsonstore/advanced/table";
const input = document.querySelector("#searchField");
const button = document.querySelector("#searchBtn");
button.addEventListener("click", onClick);

let students;
getStudents();

async function getStudents() {
  let res = await fetch(url);
  let data = await res.json();
  students = Object.values(data).map((s) => ({ item: s, match: false }));

  update();
}

function update() {
  render(students.map(templateRow), root);
}

function onClick() {
  let value = input.value.trim().toLowerCase();

  for (let student of students) {
    student.match = Object.values(student.item).some((i) =>
      i.toLowerCase().includes(value)
    );
  }

  update();
}
