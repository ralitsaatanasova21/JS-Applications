function attachEvents() {
  const loadBtn = document.querySelector("#btnLoad");
  const createBtn = document.querySelector("#btnCreate");
  const person = document.querySelector("#person");
  const phone = document.querySelector("#phone");
  const ulPhonebook = document.querySelector("#phonebook");
  const url = "http://localhost:3030/jsonstore/phonebook";

  loadBtn.addEventListener("click", load);
  createBtn.addEventListener("click", create);

  //GET
  async function load() {
    ulPhonebook.innerHTML = "";
    let res = await fetch(url);
    let data = await res.json();

    Object.values(data).forEach((e) => {
      let li = document.createElement("li");
      li.textContent = `${e.person}: ${e.phone}`;
      li.setAttribute("id", e._id);
      let deleteBtn = document.createElement("button");
      deleteBtn.addEventListener("click", onDelete);
      deleteBtn.textContent = "Delete";
      li.appendChild(deleteBtn);
      ulPhonebook.appendChild(li);
    });
  }

  //DELETE
  async function onDelete(e) {
    const id = e.target.parentNode.id;
    e.target.parentNode.remove();

    fetch(`${url}/${id}`, {
      method: "DELETE",
    });
  }

  //POST
  async function create() {
    if (person.value !== "" && phone.value != "") {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          person: person.value,
          phone: phone.value,
        }),
      });
      loadBtn.click();

      person.value = "";
      phone.value = "";
    }
  }
}
attachEvents();
