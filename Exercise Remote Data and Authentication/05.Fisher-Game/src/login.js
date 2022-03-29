window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", onLogin);
});

async function onLogin(e) {
  e.preventDefault();

  let formData = new FormData(e.target);
  let email = formData.get("email");
  let password = formData.get("password");

  try {
    let res = await fetch("http://localhost:3030/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok != true) {
      let error = await res.json();
      throw new Error(error.message);
    }

    let data = await res.json();
    let userData = {
      email: data.email,
      id: data._id,
      token: data.accessToken,
    };

    sessionStorage.setItem("userData", JSON.stringify(userData));
    window.location = "/05.Fisher-Game/index.html";
  } catch (err) {
    alert(err.message);
  }
}