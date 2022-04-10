import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { searchPage } from "./views/search.js";

const root = document.querySelector("#main-content");
document.querySelector('.logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page("/", homePage);
page("/login", loginPage);
page("/register", registerPage);
page("/create", createPage);
page("/catalog", catalogPage);
page("/details/:id", detailsPage);
page("/edit/:id", editPage);
page("/search", searchPage);


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
      Array.from(document.querySelectorAll("#user")).forEach(x=>x.style.display = "inline-block");
      Array.from(document.querySelectorAll("#guest")).forEach(x=>x.style.display = "none");
    } else {
        Array.from(document.querySelectorAll("#user")).forEach(x=>x.style.display = "none");
        Array.from(document.querySelectorAll("#guest")).forEach(x=>x.style.display = "inline-block");
    }
}
