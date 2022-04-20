import { page, render } from "./lib.js";
import { logout } from "./service/data.js";
import { getUserData } from "./userdata.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { mycarsPage } from "./views/my-listings.js";
import { registerPage } from "./views/register.js";
import { searchPage } from "./views/search.js";

const root = document.querySelector("#site-content");
document.querySelector("#logoutBtn").addEventListener("click", onLogout);

page(refresh);
page("/", homePage);
page("/details/:id", detailsPage);
page("/login", loginPage);
page("/register", registerPage);
page("/catalog", catalogPage)
page("/create", createPage);
page("/edit/:id", editPage);
page("/my-listings", mycarsPage);
page("/by-year", searchPage);


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
    document.querySelector("#profile").style.display = "block";
    document.querySelector("#guest").style.display = "none";
    document.querySelector("#profile").querySelector("a").textContent = `Welcome ${userData.username}`;
  } else {
    document.querySelector("#profile").style.display = "none";
    document.querySelector("#guest").style.display = "block";
  }
}

async function onLogout() {
  await logout();
  navBar();
  page.redirect("/");
}



