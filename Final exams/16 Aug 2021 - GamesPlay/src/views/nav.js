import { getUserData } from "../userdata.js";

export function navBar() {
  const userData = getUserData();

  if (userData) {
    document.querySelector("#user").style.display = "block";
    document.querySelector("#guest").style.display = "none";
    // document.querySelector("span").textContent = `Welcome, ${userData.email}`;
  } else {
    document.querySelector("#user").style.display = "none";
    document.querySelector("#guest").style.display = "block";
  }
}