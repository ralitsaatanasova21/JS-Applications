function attachEvents() {
  const url = "http://localhost:3030/jsonstore/messenger";
  const list = document.querySelector("#messages");
  const sendBtn = document.querySelector("#submit");
  const refreshBtn = document.querySelector("#refresh");
  const author = document.querySelector('[name="author"]');
  const content = document.querySelector('[name="content"]');

  sendBtn.addEventListener("click", addMessage);
  refreshBtn.addEventListener("click", loadMessage);

  //add createMessage to the list
  async function addMessage() {
    if (author.value != "" && content.value != "") {
      const res = await createMessage({
        author: author.value,
        content: content.value,
      });
      
      list.value += "\n" + `${author.value}: ${content.value}`;
      content.value = "";
      author.value = "";
    }
  }

  //POST
  async function createMessage(message) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
    const result = await res.json();

    return result;
  }

  //GET
  async function loadMessage() {
    const res = await fetch(url);
    const data = await res.json();

    list.value = Object.values(data)
      .map((x) => `${x.author}: ${x.content}`)
      .join("\n");
  }
}
attachEvents();
