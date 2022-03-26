async function attachEvents() {
  let loadBtn = document.querySelector("#btnLoadPosts");
  let select = document.querySelector("#posts");
  let viewBtn = document.querySelector("#btnViewPost");
  let postTile = document.querySelector("#post-title");
  let ulPosts = document.querySelector("#post-body");
  let ulComments = document.querySelector("#post-comments");

  let urlPosts = "http://localhost:3030/jsonstore/blog/posts";
  let urlComments = "http://localhost:3030/jsonstore/blog/comments";

  let resPosts = await fetch(urlPosts);
  let dataPosts = await resPosts.json();

  let resComments = await fetch(urlComments);
  let dataComments = await resComments.json();

  loadBtn.addEventListener("click", () => {
    Object.entries(dataPosts).forEach((e) => {
      let option = document.createElement("option");
      option.value = e[1].id;
      option.textContent = e[1].title;

      select.appendChild(option);
    });
  });

  viewBtn.addEventListener("click", () => {
    try {
      let parentPost = document.querySelector("ul #post-body").parentNode;
      parentPost.removeChild(document.querySelector("ul #post-body"));
    } catch (err) {}

    try {
      let parentComments = document.querySelector("#post-comments");
      let last = parentComments.lastChild;
      while (last) {
        parentComments.removeChild(last);
        last = parentComments.lastChild;
      }
    } catch (error) {}

    let findPostId = Object.entries(dataPosts).find(
      (e) => e[1].id === select.value
    );

    if (findPostId) {
      postTile.textContent = findPostId[1].title;

      let p = document.createElement("p");
      p.id = "post-body";
      p.textContent = findPostId[1].body;

      ulPosts.appendChild(p);
    }

    let findCommentId = Object.entries(dataComments).find(
      (e) => e[1].postId === findPostId[1].id
    );

    if (findCommentId) {
      let li = document.createElement("li");
      li.id = `${findCommentId[1].id}`;
      li.textContent = findCommentId[1].text;

      ulComments.appendChild(li);
    }
  });
}
attachEvents();
