async function lockedProfile() {
  const url = `http://localhost:3030/jsonstore/advanced/profiles`;
  let main = document.querySelector("#main");
  let profile = document.querySelector(".profile");

  const response = await fetch(url);
  const data = await response.json();

  Object.entries(data).forEach((el) => {

    let div = profile.cloneNode(true);
    main.appendChild(div);
    let name = div.querySelector('input[name="user1Username"]');
    let email = div.querySelector('input[name="user1Email"]');
    let age = div.querySelector('input[name="user1Age"]');
    let btn = div.querySelector("button");

    let isChecked = div.querySelector('input[value="unlock"]');
    name.value = el[1].username;
    
    btn.addEventListener('click',(e)=>{
      
      if (isChecked.checked) {
        let hidden=div.querySelector('.profile div');

        if (e.target.textContent === "Show more") {
          e.target.textContent = "Hide it";
          hidden.classList.remove('hiddenInfo')
    
          email.value = el[1].email;
          age.value = el[1].age;
        } else {
          e.target.textContent = "Show more";
          hidden.classList.add('hiddenInfo')
        }
      }
    })
  });

  main.children[0].remove();
}
