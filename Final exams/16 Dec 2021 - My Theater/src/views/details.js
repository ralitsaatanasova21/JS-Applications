import { deleteTeaterById, getLikeTeaterFromUser, getTeaterById, like, totalLikesForTeater } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate=(teater, isOwner, onDelete, likes, showLikeButton, onLike)=>html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${teater.title}</h1>
            <div>
                <img src=${teater.imageUrl} />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${teater.description}</p>
            <h4>Date: ${teater.date}</h4>
            <h4>Author: ${teater.author}</h4>
            <div class="buttons">
            ${buttonsTemplate(teater, isOwner, onDelete, onLike, showLikeButton)}
           
            
            </div>
            <p class="likes">Likes: ${likes}</p>
        </div>
    </div>
</section>
`

const buttonsTemplate=(teater, isOwner, onDelete, onLike, showLikeButton)=>{
    if(isOwner){
        return html`
        <a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
        <a class="btn-edit" href="/edit/${teater._id}">Edit</a>`
    }else{
        if(showLikeButton==true){
            return html`<a @click=${onLike} class="btn-like" href="javascript:void(0)">Like</a>`
        }else{
            return null;
        }
    }  
}

export async function detailsPage(ctx){
    const userData= await getUserData();
    const teater= await getTeaterById(ctx.params.id);
    const likes= await totalLikesForTeater(ctx.params.id);
    const hasLike= userData ? await getLikeTeaterFromUser(ctx.params.id, userData.id) : 0;

    const isOwner= userData && teater._ownerId==userData.id;

    const showLikeButton= userData!=null && isOwner==false && hasLike==false;
 
    ctx.render(detailsTemplate(teater, isOwner, onDelete, likes, showLikeButton, onLike));

    async function onDelete(){
        const choice= confirm('Are you sure you want to delete this meme?');

        if(choice){
            await deleteTeaterById(ctx.params.id);
            ctx.page.redirect('/profile');
        }
    }

    async function onLike(likes){
        await like(ctx.params.id);
        likes++;
        ctx.page.redirect('/details/' + ctx.params.id);
    }

}