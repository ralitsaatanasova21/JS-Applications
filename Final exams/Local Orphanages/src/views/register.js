import { html } from "../lib.js";
import { register } from "../service/data.js";

const registerTemplate=(onSubmit)=>html`
<section id="register-page" class="auth">
    <form @submit=${onSubmit} id="register">
        <h1 class="title">Register</h1>

        <article class="input-group">
            <label for="register-email">Email: </label>
            <input type="email" id="register-email" name="email">
        </article>

        <article class="input-group">
            <label for="register-password">Password: </label>
            <input type="password" id="register-password" name="password">
        </article>

        <article class="input-group">
            <label for="repeat-password">Repeat Password: </label>
            <input type="password" id="repeat-password" name="repeatPassword">
        </article>

        <input type="submit" class="btn submit-btn" value="Register">
    </form>
</section>

`

export async function registerPage(ctx){
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();

        const formData=new FormData(e.target);

        const email=formData.get('email');
        const password=formData.get('password');
        const rePass=formData.get('repeatPassword');

        if(email=='' || password==''){
          return alert('Empty field!');
        }

        if(password!=rePass){
            return alert("Password don't match!");
        }

        await register(email,password);
        ctx.updateNav;
        ctx.page.redirect('/');
    }
}