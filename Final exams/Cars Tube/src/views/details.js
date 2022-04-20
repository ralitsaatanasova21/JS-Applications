import { html } from "../lib.js";
import { deleteById, getById } from "../service/data.js";
import { getUserData } from "../userdata.js";

const detailsTemplate=(car, isOwner, onDelete)=>html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${car.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}.</p>

        <div class="listings-buttons">
        ${isOwner
        ? html`
            <a href="/edit/${car._id}" class="button-list">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>`
        : null}
            
        </div>
    </div>
</section>

`

export async function detailsPage(ctx){
    const userData= await getUserData();
    const car= await getById(ctx.params.id);
    // const likes= await totalLikesForTeater(ctx.params.id);
    // const hasLike= userData ? await getLikeTeaterFromUser(ctx.params.id, userData.id) : 0;

    const isOwner= userData && car._ownerId==userData.id;

    // const showLikeButton= userData!=null && isOwner==false && hasLike==false;
 
    ctx.render(detailsTemplate(car, isOwner, onDelete));

    async function onDelete(){
        const choice= confirm('Are you sure you want to delete this meme?');

        if(choice){
            await deleteById(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    // async function onLike(){
    //     await likeBook(ctx.params.id);
    //     ctx.page.redirect('/details/' + ctx.params.id);
    // }
}