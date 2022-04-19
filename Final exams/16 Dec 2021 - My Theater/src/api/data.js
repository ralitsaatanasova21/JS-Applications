import * as api from "./api.js";

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllTeaters() {
  return api.get("/data/theaters?sortBy=_createdOn%20desc&distinct=title");
}

export async function getTeaterById(id) {
  return api.get("/data/theaters/" + id);
}

export async function deleteTeaterById(id) {
  return api.del("/data/theaters/" + id);
}

export async function createTheater(teater) {
  return api.post("/data/theaters", teater);
}

export async function editTeater(id, teater) {
  return api.put("/data/theaters/" + id, teater);
}

export async function getMyProfile(userId) {
  return api.get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function like(theaterId) {
  return api.post("/data/likes", { theaterId });
}

export async function totalLikesForTeater(theaterId) {
  return api.get(`/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`);
}

export async function getLikeTeaterFromUser(theaterId, userId) {
  return api.get(`/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

