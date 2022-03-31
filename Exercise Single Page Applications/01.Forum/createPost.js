export function createPost(obj) {
  let div = document.createElement("div");
  div.className = "topic-container";
  div.innerHTML = `
  <div class="topic-name-wrapper">
  <div class="topic-name">
      <a href="/theme-content.html" id="${obj._id}">
          <h2>${obj.title}</h2>
      </a>
      <div class="columns">
          <div>
              <p>Date: <time>${getDate()}</time></p>
              <div class="nick-name">
                  <p>Username: <span>${obj.username}</span></p>
              </div>
          </div>


      </div>
  </div>
</div>`;

  return div;
}
function getDate() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let date = currentDate.getDate();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let sec = currentDate.getSeconds();
    let str = `${year}-${month+1}-${date} ${hours}:${minutes}:${sec}`;
    return str;
}

