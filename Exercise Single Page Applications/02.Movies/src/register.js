import { showView, updateNav } from "./util.js";
import { homePage } from "./home.js";

const section = document.querySelector("#form-sign-up");
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);

export function registerPage() {
  showView(section);
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);

  const email = formData.get("email");
  const password = formData.get("password");
  const repeatPassword = formData.get("repeatPassword");

  await register(email, password, repeatPassword);
  form.reset();
  updateNav();
  homePage();
}

async function register(email, password, repeatPassword) {
  let isValidate = true;

  if (email == "") {
    alert("Empty field!");
    isValidate = false;
  }
  if (password != repeatPassword) {
    alert("Password don't match!");
    isValidate = false;
  }
  if (password.length < 6 || repeatPassword.length < 6) {
    alert("Password must be at least 6 characters long!");
    isValidate = false;
  }


  if (isValidate) {
    try {
      const res = await fetch("http://localhost:3030/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      const user = await res.json();
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      alert(err.message);
      throw err;
    }
  }
}
