async function solution() {
  let main = document.querySelector("#main");
  const url = `http://localhost:3030/jsonstore/advanced/articles/list`;

  const response = await fetch(url);
  const data = await response.json();

  data.forEach((el) => {
    // div Accordion
    let divAccodrion = document.createElement("div");
    divAccodrion.classList = "accordion";

    //div Head
    let divHead = document.createElement("div");
    let span = document.createElement("span");
    let button = document.createElement("button");
    divHead.classList = "head";
    button.classList = "button";
    button.textContent = "More";
    span.textContent = el.title;
    button.id = el._id;

    button.addEventListener("click", pText);

    //div Extra
    let divExtra = document.createElement("div");
    let p = document.createElement("p");
    divExtra.classList = "extra";

    divHead.appendChild(span);
    divHead.appendChild(button);
    divExtra.appendChild(p);

    divAccodrion.appendChild(divHead);
    divAccodrion.appendChild(divExtra);
    main.appendChild(divAccodrion);

    async function pText(e) {
      let url = `http://localhost:3030/jsonstore/advanced/articles/details/${e.target.id}`;
      const response = await fetch(url);
      const data = await response.json();

      let p = e.target.parentNode.parentNode.children[1].children[0];
      let extra = p.parentNode;
      p.textContent = data.content;

      if (button.textContent === "More") {
        button.textContent = "Less";
        extra.style.display = "block";
      } else {
        button.textContent = "More";
        extra.style.display = "none";
      }
    }
  });
}
solution();
