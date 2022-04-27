import { html } from "../lib.js";
import { getMyPosts } from "../service/data.js";
import { getUserData } from "../userdata.js";

const mypostsTemplate=(post)=>html`
<section id="my-posts-page">
    <h1 class="title">My Posts</h1>

    ${post.length==0
    ? html `<h1 class="title no-posts-title">You have no posts yet!</h1>`
    : html`
    <div class="my-posts">
    ${post.map(postTemplate)}
    </div>`}

</section>
`
const postTemplate=(post)=>html`
<div class="post">
            <h2 class="post-title">${post.title}</h2>
            <img class="post-image" src=${post.imageUrl} alt="Material Image">
            <div class="btn-wrapper">
                <a href="/details/${post._id}" class="details-btn btn">Details</a>
            </div>
        </div>`

export async function mypostsPage(ctx){
        const userData= getUserData();
        const posts= await getMyPosts(userData.id);
        ctx.render(mypostsTemplate(posts));   
}