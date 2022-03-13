import { getToken, getUser } from "../utils/storage.js";
import { displayMessage } from "../component/displayMessage.js";
import { baseUrl } from "../data/api.js";
import getCategories from "../utils/getCategorys.js";
import { dropdown } from "../component/dropdownMenu.js";


const token = getToken();
const user = getUser();

if (!token && !user) {
  document.location.href = "/login.html";
}
const message = document.querySelector(".message__container");
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const summaryInput = document.querySelector("#summary");
const coverInput = document.querySelector("#cover");
const bodyTextInput = document.querySelector("#bodyText");
const categories = document.querySelector("#category");
getCategories();

export function getPostValues(event) {
  event.preventDefault();

  getCategories();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const summary = summaryInput.value.trim();
  const cover = coverInput.files;
  const bodyText = CKEDITOR.instances.bodyText.getData();
  const category = categories.value;
  
  if (title.length === 0 || summary.length === 0 || bodyText.length === 0) {
    message.innerHTML = "You need to add values to all of the inputs";
  } else {
    const data = JSON.stringify({ title, author, summary, bodyText, category });
    addPost(data, cover);
  }
}

form.addEventListener("submit", getPostValues);

async function addPost(data, cover) {
  const updateUrl = baseUrl + "articles";
  const formData = new FormData();

  formData.append("files.cover", cover[0]);

  formData.append("data", data);

  const options = {
    method: "POST",
    body: formData,
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(updateUrl, options);
    const json = await response.json();

    if (json.error) {
      displayMessage("error", json.error.message, ".message__container");
    }
    window.location.href = "/loginDashboard.html";
  } catch (error) {
    console.log(error);
  }
}
const dropdownButten = document.querySelector(".navbar__icon");

dropdownButten.addEventListener("click", () => {
  dropdown();
});