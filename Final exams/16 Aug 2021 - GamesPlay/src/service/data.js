import * as api from "./requests.js";

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAll() {
  return api.get("/data/games?sortBy=_createdOn%20desc&distinct=category");
}

export async function getById(id) {
  return api.get("/data/games/" + id);
}

export async function deleteById(id) {
  return api.del("/data/games/" + id);
}

export async function create(game) {
  return api.post("/data/games", game);
}

export async function edit(id, game) {
  return api.put("/data/games/" + id, game);
}

// export async function getMyBooks(userId) {
//   return api.get(
//     `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
//   );
// }

// //LIKES
// export async function likeBook(bookId) {
//   return api.post("/data/likes", { bookId });
// }

// export async function totalLikesForBook(bookId) {
//   return api.get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
// }

// export async function getLikeBookFromUser(bookId, userId) {
//   return api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
// }

// //SEARCH
// export async function search(query) {
//   return api.get('/data/albums?where' + encodeURIComponent(`=name%20LIKE%20%22${query}%22`));
// }

//COMMENTS
export async function createComment(com) {
  return api.post("/data/comments", com);
}

export async function loadAllComments(gameId) {
  return api.get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}
