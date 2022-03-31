import { showView } from "./util.js";
import { homePage } from "./home.js";
import { detailsPage } from "./details.js";

const section = document.querySelector("#edit-movie");
const form = section.querySelector("form");
form.addEventListener("submit", edit);

export function editPage(movieId) {
  showView(section);
  getMovie(movieId);
}
async function getMovie(movieId) {
  let url = `http://localhost:3030/data/movies/${movieId}`;
  let response = await fetch(url);
  let data = await response.json();
  formDetails(data);
}

function formDetails(data) {
  let title = form.querySelector('[name="title"]');
  let description = form.querySelector('[name="description"]');
  let img = form.querySelector('[name="imageUrl"]');
  title.value = data.title;
  description.value = data.description;
  img.value = data.img;
  form.id = data._id;
}

async function edit(e) {
  e.preventDefault();
  const formData = new FormData(form);

  const title = formData.get("title");
  const description = formData.get("description");
  const img = formData.get("imageUrl");
  const id = form.id;

  await editMovie(title, description, img, id);
  form.reset();
  homePage();
  // detailsPage();
}

async function editMovie(title, description, img, movieId) {
  let user = JSON.parse(localStorage.getItem("user"));

  await fetch(`http://localhost:3030/data/movies/${movieId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": user.accessToken,
    },
    body: JSON.stringify({ title, description, img }),
  });
}
