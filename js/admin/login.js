import { displayMessage } from "../component/displayMessage.js";
import { dropdown } from "../component/dropdownMenu.js";
import { baseUrl } from "../data/api.js";
import {  saveToken,  saveUser, getToken, getUser } from "../utils/storage.js";

dropdown();

const form = document.querySelector("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const messageContainer = document.querySelector(".message__container");

form.addEventListener("submit", login);

const token = getToken();
const user = getUser();

if(user.length || token.length){
  document.location.href = "/loginDashboard.html";
}

function login(event) {
  event.preventDefault();
  const emailValue = email.value.toLowerCase().trim();
  const passwordValue = password.value.trim();

  messageContainer.innerHTML = "";

  if (emailValue.length < 3) {
    messageContainer.innerHTML += `<p>There is something wrong with your email</p>`;
  }
  if (passwordValue.length < 4) {
    messageContainer.innerHTML += `<p>There is something wrong with your password</p>`;
  }

  loginUser(emailValue, passwordValue);
}

async function loginUser(email, password) {
  const loginUrl = baseUrl + "auth/local";
  const data = JSON.stringify({
      identifier: email,
      password: password
  })

  const option = {
    method: "POST",
    body: data,
    headers: {
        "Content-Type": "application/json",
    },
};

  try {
    const response = await fetch(loginUrl, option);
    const json = await response.json();
    
    if(json.user){
      const jwt = json.jwt;
      const username = json.user.username;
      saveToken(jwt);
      saveUser(username);

      location.href = "/loginDashboard.html";
    }

    if(json.error){
      displayMessage("warning", "your username and/or password is wrong", ".message__container")
    }



  } catch (error) {
    messageContainer.innerHTML = "";
    displayMessage("warning", "There is something wrong with the login. Plies comeback later and try again.", ".message__container")
}
}
