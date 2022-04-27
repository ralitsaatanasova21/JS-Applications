import { html } from "../lib.js";
import { addDonation, deletePostById, getDonationsFromUser, getPostById, totalDonationsForBook } from "../service/data.js";
import { getUserData } from "../userdata.js";

const detailsTemplate=(post, isOwner, onDelete, showDonateButton, countDonations, onDonate)=>html`
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src=${post.imageUrl} alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${post.title}</h2>
                <p class="post-description">Description: ${post.description}</p>
                <p class="post-address">Address: ${post.address}</p>
                <p class="post-number">Phone number: ${post.phone}</p>
                <p class="donate-Item">Donate Materials: ${countDonations}</p>

                <div class="btns">
                ${isOwner
                ? html`
                    <a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>`
                : null}

                ${showDonateButton
                ? html`<a @click=${onDonate} href="" class="donate-btn btn">Donate</a>`
                : null}
                                        
                </div>

            </div>
        </div>
    </div>
</section>
`

export async function detailsPage(ctx){
    const userData= await getUserData();
    const post= await getPostById(ctx.params.id);

    const isOwner= userData && post._ownerId==userData.id;
    const hasDonation = userData
    ? await getDonationsFromUser(ctx.params.id, userData.id)
    : 0;
    const showDonateButton = userData != null && isOwner == false && hasDonation == false;
    let countDonations = await totalDonationsForBook(ctx.params.id);
    countDonations*=1;
 
    ctx.render(detailsTemplate(post, isOwner, onDelete, showDonateButton, countDonations, onDonate));

    async function onDelete(){
        const choice= confirm('Are you sure you want to delete this meme?');

        if(choice){
            await deletePostById(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function onDonate() {
        await addDonation(ctx.params.id);
        ctx.page.redirect("/details/" + ctx.params.id);
      }
}