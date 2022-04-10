import { getAllAlbums } from "../api/data.js";
import { html } from "../lib.js";

const homeTemplate=(albums)=>html`
<section id="welcomePage">
    <div id="welcome-message">
        <h1>Welcome to</h1>
        <h1>My Music Application!</h1>
    </div>

    <div class="music-img">
        <img src="./images/musicIcons.webp">
    </div>
</section>
`

export async function homePage(ctx){
    const albums= await getAllAlbums();
    ctx.render(homeTemplate(albums));
}