import { page, render } from "./lib.js";
import { logout } from "./service/data.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { navBar } from "./views/nav.js";
import { registerPage } from "./views/register.js";

const root = document.querySelector("#main-content");
document.querySelector("#logoutBtn").addEventListener("click", onLogout);


page(refresh);
page("/", homePage);
page("/details/:id", detailsPage);
page("/catalog", catalogPage)
page("/login", loginPage);
page("/register", registerPage);
page("/create", createPage);
page("/edit/:id", editPage);
// page("/my-books", mybooksPage);

navBar();
page.start();

function refresh(ctx, next) {
  ctx.render = (content) => render(content, root);
  ctx.updateNav = navBar();
  next();
}

async function onLogout() {
  await logout();
  navBar();
  page.redirect("/");
}


