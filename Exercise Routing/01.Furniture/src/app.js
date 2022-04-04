import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailtsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";

const root = document.querySelector("div.container");
document.querySelector("#logoutBtn").addEventListener("click", onLogout);

page(decorateContext);
page("/", catalogPage);
page("/details/:id", detailtsPage);
page("/create", createPage);
page("/edit/:id", editPage);
page("/login", loginPage);
page("/register", registerPage);
page("/my-furniture", catalogPage);

updateNav();

page.start();

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, root);
  ctx.updateNav = updateNav();
  next();
}

function updateNav() {
  const user = getUserData();

  if (user) {
    document.querySelector("#user").style.display = "inline-block";
    document.querySelector("#guest").style.display = "none";
  } else {
    document.querySelector("#user").style.display = "none";
    document.querySelector("#guest").style.display = "inline-block";
  }
}

async function onLogout() {
  await logout();
  updateNav();
  page.redirect("/");
}
