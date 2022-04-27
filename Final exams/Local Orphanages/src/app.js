import { page, render } from "./lib.js";
import { logout } from "./service/data.js";
import { getUserData } from "./userdata.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { mypostsPage } from "./views/myposts.js";
import { registerPage } from "./views/register.js";

const root = document.querySelector("#main-content");
document.querySelector("#logoutBtn").addEventListener("click", onLogout);

page(refresh);
page("/", homePage);
page("/details/:id", detailsPage);
page("/login", loginPage);
page("/register", registerPage);
page("/create", createPage);
page("/edit/:id", editPage);
page("/myposts", mypostsPage);

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
    document.querySelector("#user").style.display = "block";
    document.querySelector("#guest").style.display = "none";
  } else {
    document.querySelector("#user").style.display = "none";
    document.querySelector("#guest").style.display = "block";
  }
}

async function onLogout() {
  await logout();
  navBar();
  page.redirect("/");
}



