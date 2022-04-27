import { page, render } from "./lib.js";
import { homePage } from "./views/home.js";
import { catalogPage } from "./views/catalog.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "./api/data.js";
import { getUserData } from "./util.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { profilePage } from "./views/profile.js";

const root = document.querySelector("main");
document.querySelector("#logoutBtn").addEventListener("click", onLogout);

page(decorateContext);
page('/', homePage);
page("/memes", catalogPage);
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
  page.redirect('/')
}

function navBar(){
    const userData= getUserData();

    if(userData){
        document.querySelector('.user').style.display='block';
        document.querySelector('.guest').style.display='none';
        document.querySelector('.user span').textContent= `Welcome, ${userData.email}`;
    }else{
        document.querySelector('.user').style.display='none';
        document.querySelector('.guest').style.display='block';
    }
}