import { getMyProfile } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const profileTemplate=(teater, userData)=>html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${userData.email}</h2>
    </div>
    <div class="board">
        ${teater.length==0
            ? html`<div class="no-events">
                   <p>This user has no events yet!</p>
                   </div>`
            : html`${teater.map(teaterTemplate)}`}

    </div>
</section>
`
const teaterTemplate=(teater)=>html`
<div class="eventBoard">
            <div class="event-info">
                <img src=${teater.imageUrl}>
                <h2>${teater.title}</h2>
                <h6>${teater.date}</h6>
                <a href="/details/${teater._id}" class="details-button">Details</a>
            </div>
        </div>
`

export async function profilePage(ctx){
    const userData= getUserData();

    if(userData){
        const teater= await getMyProfile(userData.id);
        ctx.render(profileTemplate(teater, userData));   
    }
}