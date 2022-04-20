import { html } from "../lib.js";
import { login } from "../service/data.js";

const loginTemplate=(onSubmit)=>html`
<section id="login">
    <div class="container">
        <form @submit=${onSubmit} id="login-form" action="#" method="post">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>

`

export async function loginPage(ctx){
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();

        const formData=new FormData(e.target);

        const username=formData.get('username');
        const password=formData.get('password');

        if(username=='' || password==''){
          return alert('Empty field!');
        }

        await login(username,password);
        ctx.updateNav;
        ctx.page.redirect('/catalog');
    }
}