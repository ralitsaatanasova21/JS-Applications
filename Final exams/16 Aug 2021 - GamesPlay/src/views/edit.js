import { html } from "../lib.js";
import { edit, getById } from "../service/data.js";

const editTemplate=(game, onSubmit)=>html`
<section id="edit-page" class="auth">
            <form @submit=${onSubmit} id="edit">
                <div class="container">

                    <h1>Edit Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" .value=${game.title}>

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" .value=${game.category}>

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${game.maxLevel}>

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" .value=${game.imageUrl}>

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary" .value=${game.summary}></textarea>
                    <input class="btn submit" type="submit" value="Edit Game">

                </div>
            </form>
        </section>

`

export async function editPage(ctx){
    const game= await getById(ctx.params.id);
    ctx.render(editTemplate(game, onSubmit));

    async function onSubmit(e){
        e.preventDefault();

        const formData=new FormData(e.target);

        const title = formData.get("title");
        const category = formData.get("category");
        const maxLevel = formData.get("maxLevel");
        const imageUrl = formData.get("imageUrl");
        const summary = formData.get("summary");
   
        if (title == "" || category == "" || imageUrl == "" || maxLevel=='' || summary=='') {
          return alert("Empty field!");
        }

        await edit(ctx.params.id, {title, category, maxLevel, imageUrl, summary});
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}