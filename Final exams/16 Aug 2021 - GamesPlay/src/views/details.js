import { html } from "../lib.js";
import { createComment, deleteById, getById, loadAllComments } from "../service/data.js";
import { getUserData } from "../userdata.js";

const detailsTemplate=(game, isOwner, onDelete, user, guest, onCreateCom, loadCom)=>html`
<section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                <img class="game-img" src=${game.imageUrl} />
                    <h1>${game.title}</h1>
                    <span class="levels">MaxLevel: ${game.maxLevel}</span>
                    <p class="type">${game.category}</p>
                </div>

                <p class="text">${game.summary}</p>

                <!-- Bonus ( for Guests and Users ) -->
                ${user || guest
                ? html `
                <div class="details-comments">
                    <h2>Comments:</h2>
                    ${user
                    ? html`
                    <ul>
                        <!-- list all comments for current game (If any) -->
                        <li class="comment">
                            <p>Content: I rate this one quite highly.</p>
                        </li>
                        <li class="comment">
                            <p>Content: The best game.</p>
                        </li>
                    </ul>`
                    : null}
                    <p class="no-comment">No comments.</p>
                </div>
                `
                : null}
                
                <!-- Edit/Delete buttons ( Only for creator of this game )  -->
                ${isOwner
                ? html `<div class="buttons">
                <a href="/edit/${game._id}" class="button">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
                </div>`
                : null}
                
            </div> 
            
            <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
            ${user
            ? html`<article class="create-comment">
            <label>Add new comment:</label>
            <form class="form">
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input @click=${onCreateCom} class="btn submit" type="submit" value="Add Comment">
            </form>
            </article>`
            : null}

</section>
`
    

export async function detailsPage(ctx){
    const userData= await getUserData();
    const game= await getById(ctx.params.id);

    const isOwner= userData && game._ownerId==userData.id;
    const user= userData!=null && !isOwner;
    const guest= userData==null;
 
    ctx.render(detailsTemplate(game, isOwner, onDelete, user, guest, onCreateCom, loadCom));

    async function onDelete(){
        const choice= confirm('Are you sure you want to delete this meme?');

        if(choice){
            await deleteById(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function onCreateCom(e){
        e.preventDefault();

        const formData=new FormData(e.target);
        const comment = formData.get("comment");

        if(comment==''){
            return alert('Empty field!');
        }
        
        if(user){
            await createComment(ctx.params.id, comment);
            ctx.page.redirect('/details/' + ctx.params.id);
        }
    }

    async function loadCom(e){
        e.preventDefault();
        await loadAllComments(ctx.params.id);
    }
}