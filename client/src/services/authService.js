import jwtDecode from "jwt-decode";

import http from "./httpService";

const apiEndpoint = "http://localhost:3001/api/v1/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function loginUser(email, password) {
  const { data: jwt } = await http.post(apiEndpoint + "", {
    email,
    password,
  });
  localStorage.setItem(tokenKey, jwt);
  http.setJwt(getJwt());
}

export function loginUserWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
  http.setJwt(getJwt());
}

export function logoutUser() {
  localStorage.removeItem(tokenKey);
  http.setJwt("");
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getRoles() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    if (jwt) {
      const { role } = jwtDecode(jwt);
      return role;
    }
    return null;
  } catch (ex) {
    return null;
  }
  // return {
  //   WALLET_OWNER: "wallet_owner",
  //   ADMIN: "admin",
  //   BANK: "bank",
  // };
}

export default {
  loginUser,
  loginUserWithJwt,
  logoutUser,
  getCurrentUser,
  getJwt,
  getRoles,
};