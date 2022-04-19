import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { profilePage } from "./views/profile.js";
import { registerPage } from "./views/register.js";

const root = document.querySelector("#content");
document.querySelector(".logoutBtn").addEventListener("click", onLogout);

page(decorateContext);
page("/", homePage);
page("/login", loginPage);
page("/register", registerPage);
page("/create", createPage);
page("/details/:id", detailsPage);
page("/edit/:id", editPage);
page("/profile", profilePage);

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
    Array.from(document.querySelectorAll("#users")).forEach(x=>x.style.display="inline-block");
    Array.from(document.querySelectorAll("#guests")).forEach(x=>x.style.display="none");
  } else {
    Array.from(document.querySelectorAll("#users")).forEach(x=>x.style.display="none");
    Array.from(document.querySelectorAll("#guests")).forEach(x=>x.style.display="inline-block");
  }
}
