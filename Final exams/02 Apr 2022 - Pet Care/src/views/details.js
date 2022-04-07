import { html } from "../lib.js";
import {
  addDonation,
  deletePetById,
  getDonationsFromUser,
  getPetById,
  totalDonationsForBook,
} from "../service/data.js";
import { getUserData } from "../userdata.js";

const detailsTemplate = (
  pet,
  isOwner,
  onDelete,
  countDonations,
  showDonateButton,
  onDonate
) => html`
  <section id="detailsPage">
    <div class="details">
      <div class="animalPic">
        <img src=${pet.image} />
      </div>
      <div>
        <div class="animalInfo">
          <h1>Name: ${pet.name}</h1>
          <h3>Breed: ${pet.breed}</h3>
          <h4>Age: ${pet.age}</h4>
          <h4>Weight: ${pet.weight}</h4>
          <h4 class="donation">Donation: ${countDonations}$</h4>
        </div>
        <!-- if there is no registered user, do not display div-->
        <div class="actionBtn">
          <!-- Only for registered user and creator of the pets-->
          ${buttons(pet, isOwner, onDelete)}

          <!--(Bonus Part) Only for no creator and user-->
          ${donation(showDonateButton, onDonate)}
        </div>
      </div>
    </div>
  </section>
`;
const buttons = (pet, isOwner, onDelete) => {
  if (isOwner) {
    return html`<a href="/edit/${pet._id}" class="edit">Edit</a>
      <a @click=${onDelete} href="javascript:void(0)" class="remove"
        >Delete</a
      >`;
  } else {
    return null;
  }
};

const donation=(showDonateButton, onDonate)=>{
    if(showDonateButton==true){
        return html `<a @click=${onDonate} href="" class="donate">Donate</a>`
    }else{
        return null;
    }

}

export async function detailsPage(ctx) {
  const userData = await getUserData();
  const pet = await getPetById(ctx.params.id);
  const isOwner = userData && pet._ownerId == userData.id;
  const hasDonation = userData
    ? await getDonationsFromUser(ctx.params.id, userData.id)
    : 0;
  let countDonations = await totalDonationsForBook(ctx.params.id);
  countDonations*=100;

  const showDonateButton = userData != null && isOwner == false && hasDonation == false;

  ctx.render(
    detailsTemplate(
      pet,
      isOwner,
      onDelete,
      countDonations,
      showDonateButton,
      onDonate
    )
  );

  async function onDelete() {
    const choice = confirm("Are you sure you want to delete this meme?");

    if (choice) {
      await deletePetById(ctx.params.id);
      ctx.page.redirect("/");
    }
  }

  async function onDonate() {
    await addDonation(ctx.params.id);
    ctx.page.redirect("/details/" + ctx.params.id);
  }
}
