import * as api from "./requests.js";

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAll() {
  return api.get("/data/cars?sortBy=_createdOn%20desc");
}

export async function getById(id) {
  return api.get("/data/cars/" + id);
}

export async function deleteById(id) {
  return api.del("/data/cars/" + id);
}

export async function create(car) {
  return api.post("/data/cars", car);
}

export async function edit(id, car) {
  return api.put("/data/cars/" + id, car);
}

export async function getMyCars(userId) {
  return api.get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

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
export async function search(query) {
  return api.get(`/data/cars?where=year%3D${query}`);
}

//COMMENTS
// export async function createComment(com) {
//   return api.post("/data/comments", com);
// }

// export async function loadAllComments(gameId) {
//   return api.get(`/data/comments?where=gameId%3D%22${gameId}%22`);
// }
