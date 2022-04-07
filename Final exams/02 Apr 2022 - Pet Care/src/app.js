import { page, render } from "./lib.js";
import { logout } from "./service/data.js";
import { getUserData } from "./userdata.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";

const root = document.querySelector("#content");
document.querySelector("#logoutBtn").addEventListener("click", onLogout);

page(refresh);
page("/", homePage);
page("/details/:id", detailsPage);
page("/login", loginPage);
page("/register", registerPage);
page("/catalog", catalogPage)
page("/create", createPage);
page("/edit/:id", editPage);

navBar();
page.start();

function refresh(ctx, next) {
  ctx.render = (content) => render(content, root);
  ctx.updateNav = navBar();
  next();
}

function navBar() {
  const userData = getUserData();

  if (userData) {
    Array.from(document.querySelectorAll(".user")).forEach(x=>x.style.display = "inline-block");
    Array.from(document.querySelectorAll(".guest")).forEach(x=>x.style.display = "none");
  } else {
    Array.from(document.querySelectorAll(".guest")).forEach(x=>x.style.display = "inline-block");
    Array.from(document.querySelectorAll(".user")).forEach(x=>x.style.display = "none");
  }
}

async function onLogout() {
  await logout();
  navBar();
  page.redirect("/");
}



