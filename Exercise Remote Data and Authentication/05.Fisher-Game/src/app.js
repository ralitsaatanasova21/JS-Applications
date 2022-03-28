const userData = JSON.parse(sessionStorage.getItem("userData"));
const guest = document.querySelector("#guest");
const user = document.querySelector("#user");
const addBtn = document.querySelector("#addForm .add");
const loadBtn = document.querySelector(".load");
const form = document.querySelector("#addForm");
const spam = document.querySelector("span");
const divCatches = document.querySelector("#catches");

loadBtn.addEventListener("click", onLoad);
form.addEventListener("submit", onSubmit);

window.addEventListener("DOMContentLoaded", () => {
  if (userData != null) {
    guest.style.display = "none";
    user.style.display = "block";
    addBtn.disabled = false;
  } else {
    user.style.display = "none";
    guest.style.display = "block";
  }
});
async function onSubmit(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
}

async function onLoad() {
  let res = await fetch("http://localhost:3030/data/catches");
  let data = await res.json();

  divCatches.replaceChildren(...data.map(createDiv));
  document.getElementById("main").style.display = "block";
}

function createDiv(item) {
  let isOwner = userData && item._ownerId === userData.id;

  let div = document.createElement("div");
  div.classList.add("catch");
  div.innerHTML = `<label>Angler</label>
    <input type="text" class="angler" value="${item.angler}" ${
    !isOwner ? "disabled" : ""
  }>
    <label>Weight</label>
    <input type="text" class="weight" value="${item.weight}" ${
    !isOwner ? "disabled" : ""
  }>
    <label>Species</label>
    <input type="text" class="species" value="${item.species}" ${
    !isOwner ? "disabled" : ""
  }>
    <label>Location</label>
    <input type="text" class="location" value="${item.location}" ${
    !isOwner ? "disabled" : ""
  }>
    <label>Bait</label>
    <input type="text" class="bait" value="${item.bait}" ${
    !isOwner ? "disabled" : ""
  }>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value="${item.captureTime}" ${
    !isOwner ? "disabled" : ""
  }>
    <button class="update" data-id="${item._id}" ${
    !isOwner ? "disabled" : ""
  }>Update</button>
    <button class="delete" data-id="${item._id}" ${
    !isOwner ? "disabled" : ""
  }>Delete</button>`;

  divElement.addEventListener("click", (e) => {
    if (e.target.className == "update") {
      let id = e.target.dataset.id;
      updateInfo(e.currentTarget, id);
    } else if (e.target.className == "delete") {
      let id = e.target.dataset.id;
      deleteCatch(e.currentTarget, id);
    }
  });

  return div;
}
async function updateInfo(current,id) {
  let angler = current.children[1].value;
  let weight = current.children[3].value;
  let species = current.children[5].value;
  let location = current.children[7].value;
  let bait = current.children[9].value;
  let captureTime = current.children[11].value;

  let url = `http://localhost:3030/data/catches/${id}`;
  fetch(url,
   {
       method: 'put',
       headers: {
           'content-type': 'application/json',
           'X-Authorization': userData.token
       },
       body: JSON.stringify({angler,weight,species,location,bait,captureTime})
   });

}

async function deleteCatch(current,id) {
   let url = `http://localhost:3030/data/catches/${id}`;
   fetch(url,{
       method:'delete',
       headers: {
           'X-Authorization': userData.token
       }
   });
   divCatches.removeChild(current);
}

async function logOut(e) {
   e.preventDefault();
   let url = `http://localhost:3030/users/logout`;
   try{
   let response = await fetch(url, {
       method: 'get',
       headers: {
           'X-Authorization': `${userData.token}`
       }
   })
   if(response.ok != true) {
       let error = await response.json();
       throw new Error(error.message);
   }
   sessionStorage.clear();
   window.location = './index.html';
   }catch(error) {
      alert(error);
   }
}