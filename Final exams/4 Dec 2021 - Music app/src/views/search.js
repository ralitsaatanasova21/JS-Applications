import { search } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const searchTemplate=(albums, onClick, userData)=>html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onClick} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

    <div class="search-result">
        ${albums.length==0
        ? html`<p class="no-result">No result.</p>`
        : html`${albums.map((album)=>albumTemplate(album, userData))}`}
        
    </div>
`

const albumTemplate=(album, userData)=>html`
<div class="card-box">
            <img src=${album.imgUrl}>
            <div>
                <div class="text-center">
                    <p class="name">Name: ${album.name}</p>
                    <p class="artist">Artist: ${album.artist}</p>
                    <p class="genre">Genre: ${album.genre}</p>
                    <p class="price">Price: $${album.price}</p>
                    <p class="date">Release Date: ${album.releaseDate}</p>
                </div>
                <div class="btn-group">
                ${userData
                ? html `<a href="/details/${album._id}" id="details">Details</a>`
                : null}
                    
                </div>
            </div>
        </div>
`

export async function searchPage(ctx){
    let albums=[]
    const userData= getUserData();

    ctx.render(searchTemplate(albums, onClick, userData));

    async function onClick(e){
        e.preventDefault();

        let searchValue=document.querySelector('#search-input').value;
        console.log(searchValue);
        albums= await search(searchValue);
        ctx.render(searchTemplate(albums, onClick, userData));

    }
}