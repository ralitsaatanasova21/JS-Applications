async function solve() {
  const tableBody = document.querySelector("tbody");
  const submit = document.querySelector("#submit");
  const first = document.querySelector('[name="firstName"]');
  const last = document.querySelector('[name="lastName"]');
  const number = document.querySelector('[name="facultyNumber"]');
  const grade = document.querySelector('[name="grade"]');

  const url = "http://localhost:3030/jsonstore/collections/students";

  submit.addEventListener("click", onClick);

  // GET
  const res = await fetch(url);
  const data = await res.json();

  Object.values(data).forEach((e) => {
    const tr = document.createElement("tr");

    const firstNameCell = tr.insertCell(0);
    firstNameCell.innerText = e.firstName;

    const lastNameCell = tr.insertCell(1);
    lastNameCell.innerText = e.lastName;

    const numberCell = tr.insertCell(2);
    numberCell.innerText = Number(e.facultyNumber);

    const gradeCell = tr.insertCell(3);
    gradeCell.innerText = Number(e.grade);

    tableBody.appendChild(tr);
  });

  //POST
  async function onClick(e) {
    e.preventDefault();

    if (
      first.value !== "" &&
      last.value != "" &&
      number.value != "" &&
      grade.value != ""
    ) {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          firstName: first.value,
          lastName: last.value,
          facultyNumber: Number(number.value),
          grade: Number(grade.value),
        }),
      });
      const tr = document.createElement("tr");

      const firstNameCell = tr.insertCell(0);
      firstNameCell.innerText = first.value;

      const lastNameCell = tr.insertCell(1);
      lastNameCell.innerText = last.value;

      const numberCell = tr.insertCell(2);
      numberCell.innerText = Number(number.value);

      const gradeCell = tr.insertCell(3);
      gradeCell.innerText = Number(grade.value);

      tableBody.appendChild(tr);
      first.value = "";
      last.value = "";
      number.value = "";
      grade.value = "";
    }
  }
}
solve();
