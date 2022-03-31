import { createPost } from "./createPost.js";

let newTopicSection = document.querySelector(".new-topic-border");
let form = newTopicSection.querySelector("form");
let btnPost = newTopicSection.querySelector(".public");
let btnCancel = newTopicSection.querySelector(".cancel");
btnPost.addEventListener("click", onPost);
btnCancel.addEventListener("click", (e) => onCancel(e));

async function onPost(e) {
  e.preventDefault();
  let formData = new FormData(form);

  let title = formData.get("topicName");
  let username = formData.get("username");
  let post = formData.get("postText");

  let objNewTopic = {
    title,
    username,
    post,
  };

  await newTopic(objNewTopic);
  form.reset();
  document
    .querySelector(".topic-container")
    .appendChild(createPost(objNewTopic));
}

export async function newTopic(objNewTopic) {
  await fetch("http://localhost:3030/jsonstore/collections/myboard/posts", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(objNewTopic),
  });
}
function onCancel(e) {
  e.preventDefault();
  document.querySelector("#topicName").value = "";
  document.querySelector("#username").value = "";
  document.querySelector("#postText").value = "";
}

export async function displayPosts(objNewTopic) {
  let ala = Array.from(document.querySelector(".topic-container"));

  let res = await fetch(
    `http://localhost:3030/jsonstore/collections/myboard/posts/`
  );
  let data = await res.json();

  let target = ala.find((x) => x.id === objNewTopic._id);
  console.log(target);

  section.querySelector("h2").textContent = target.title;

  console.log(data);
}
