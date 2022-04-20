import { getUserData, setUserData, clearUserData } from "../util.js";

const host = "http://localhost:3030";

async function request(url, options) {
  try {
    const response = await fetch(host + url, options);

    if (response.ok == false) {
      const error = await response.json();
      throw new Error(error.message);
    }

    if (response.status == 204) {
      return response;
    } else {
      return await response.json();
    }

  } catch (error) {
    alert(error.message);
    throw error;
  }
}

function createOptions(method = "get", data) {
  const options = {
    method,
    headers: {},
  };

  if (data != undefined) {
    options.headers["Content-Type"] = "application.json";
    options.body = JSON.stringify(data);
  }

  const userData = getUserData();
  if (userData != null) {
    options.headers["X-Authorization"] = userData.token;
  }

  return options;
}

//GET, POST, PUT, DELETE
export async function get(url) {
  return request(url, createOptions());
}

export async function post(url, data) {
  return request(url, createOptions("post", data));
}

export async function put(url, data) {
  return request(url, createOptions("put", data));
}

export async function del(url) {
  return request(url, createOptions("delete"));
}

//LOGIN, REGISTER, LOGOUT
export async function login(username, password) {
  const result = await post("/users/login", { username, password });

  const userData = {
    username: result.username,
    id: result._id,
    token: result.accessToken,
  };

  setUserData(userData);
  return result;
}

export async function register(username, password) {
  const result = await post("/users/register", { username, password });

  const userData = {
    username: result.username,
    id: result._id,
    token: result.accessToken,
  };

  setUserData(userData);
  return result;
}

export async function logout() {
  await get("/users/logout");
  clearUserData();
}
