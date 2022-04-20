import { html } from "../lib.js";
import { getMyCars } from "../service/data.js";
import { getUserData } from "../userdata.js";

const mycarsTemplate=(cars)=>html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">

        ${cars.length==0
        ? html `<p class="no-cars"> You haven't listed any cars yet.</p>`
        : html`${cars.map(mycars)}`}
        
        
    </div>
</section>
`
const mycars=(car)=> html`
<div class="listing">
            <div class="preview">
                <img src=${car.imageUrl}>
            </div>
            <h2>${car.brand} ${car.model}</h2>
            <div class="info">
                <div class="data-info">
                    <h3>Year: ${car.year}</h3>
                    <h3>Price: ${car.price} $</h3>
                </div>
                <div class="data-buttons">
                    <a href="/details/${car._id}" class="button-carDetails">Details</a>
                </div>
            </div>
        </div>
`

export async function mycarsPage(ctx){
    const userData= getUserData();

    if(userData){
        const cars= await getMyCars(userData.id);
        ctx.render(mycarsTemplate(cars));   
    }
}