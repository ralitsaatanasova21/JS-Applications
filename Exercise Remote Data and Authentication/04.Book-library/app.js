function solve() {
  const loadBtn = document.querySelector("#loadBooks");
  const submitBtn = document.querySelector("#submit");

  const tableBody = document.querySelector("tbody");
  const form = document.querySelector("form");
  const h3 = form.children[0];
  let currId;

  loadBtn.addEventListener("click", onLoad);
  form.addEventListener("submit", infoBook);

  const url = "http://localhost:3030/jsonstore/collections/books";

  async function infoBook(e) {
    e.preventDefault();
    let formData = new FormData(form);

    let title = formData.get("title");
    let author = formData.get("author");
    let book = { title, author };

    if (submitBtn.textContent === "Submit") {
      createBook(book);
    } else {
      uploadBook(book, currId);
    }
    title.value = "";
    author.value = "";
  }
  async function uploadBook(book, id) {
    fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(book),
    });

    h3.textContent = "FORM";
    submitBtn.textContent = "Submit";
    form.reset();
    onLoad();
  }

  async function createBook(book) {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(book),
    });
    let data = await res.json();
    let id = data._id;
    book.id = id;
    bookElements(book);
    form.reset();
  }
  function bookElements(book) {
    let tr = document.createElement("tr");
    let tdTitle = document.createElement("td");
    let tdAuthor = document.createElement("td");
    let tdButtons = document.createElement("td");
    let butEdit = document.createElement("button");
    let butDel = document.createElement("button");
    butDel.addEventListener("click", onDelete);
    butEdit.addEventListener("click", onEdit);

    tdTitle.textContent = book.title;
    tdAuthor.textContent = book.author;
    butEdit.textContent = "Edit";
    butDel.textContent = "Delete";
    tr.id = book.id;

    tdButtons.appendChild(butEdit);
    tdButtons.appendChild(butDel);
    tr.appendChild(tdTitle);
    tr.appendChild(tdAuthor);
    tr.appendChild(tdButtons);
    tableBody.appendChild(tr);
  }

  async function onLoad() {
    tableBody.innerHTML = "";

    let res = await fetch(url);
    let data = await res.json();

    Object.entries(data).forEach((x) => {
      let id = x[0];
      let author = x[1].author;
      let title = x[1].title;
      let book = { id, author, title };
      bookElements(book);
    });
  }

  async function onEdit(e) {
    let id = e.target.parentNode.parentNode.id;
    currId = id;
    let lastTitle = e.target.parentNode.parentNode.children[0].textContent;
    let lastTAuthor = e.target.parentNode.parentNode.children[1].textContent;
    let titleInForm = form.children[2];
    let authorInForm = form.children[4];
    titleInForm.value = lastTitle;
    authorInForm.value = lastTAuthor;
    h3.textContent = "Edit FORM";
    submitBtn.textContent = "Save";
  }

  async function onDelete(e) {
    let id = e.target.parentNode.parentNode.id;

    fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    e.target.parentNode.parentNode.remove();
  }
}
solve();
