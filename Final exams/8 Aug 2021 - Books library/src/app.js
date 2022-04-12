import { page, render } from "./lib.js";
import { homePage } from "./views/home.js";
import { detailsPage } from "./views/details.js";
import { loginPage } from "./views/login.js";
import { getUserData } from "./util.js";
import { logout } from "./api/data.js";
import { registerPage } from "./views/register.js";
import { createPage } from "./views/create.js";
import { editPage } from "./views/edit.js";
import { mybooksPage } from "./views/mybooks.js";

const root = document.querySelector("#site-content");
document.querySelector("#logoutBtn").addEventListener("click", onLogout);

page(decorateContext);
page("/", homePage);
page("/details/:id", detailsPage);
page("/login", loginPage);
page("/register", registerPage);
page("/create", createPage);
page("/edit/:id", editPage);
page("/my-books", mybooksPage);

navBar();
page.start();

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, root);
  ctx.updateNav = navBar();
  next();
}

async function onLogout() {
  await logout();
  navBar();
  page.redirect("/");
}

function navBar() {
  const userData = getUserData();

  if (userData) {
    document.querySelector("#user").style.display = "block";
    document.querySelector("#guest").style.display = "none";
    document.querySelector("span").textContent = `Welcome, ${userData.email}`;
  } else {
    document.querySelector("#user").style.display = "none";
    document.querySelector("#guest").style.display = "block";
  }
}
