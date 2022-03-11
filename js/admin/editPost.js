import { displayMessage } from "../component/displayMessage.js";
import { baseUrl } from "../data/api.js";
import getCategories from "../utils/getCategorys.js";
import { getToken, getUser } from "../utils/storage.js";

const token = getToken();
const user = getUser();

if (!token && !user) {
  document.location.href = "/login.html";
}
const message = document.querySelector(".message__container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(id);

const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const summaryInput = document.querySelector("#summary");
const coverInput = document.querySelector("#cover");
const bodyTextInput = document.querySelector("#bodyText");
const categories = document.querySelector("#category");
const idInput = document.querySelector("#id");

(async function () {
  const reviewUrl = baseUrl + `articles/${id}`;
  try {
    const response = await fetch(reviewUrl);
    const details = await response.json();

    getCategories();

    categories.value;
    titleInput.value = details.title;
    authorInput.value = details.author;
    summaryInput.value = details.summary;
    bodyTextInput.value = details.bodyText;
    idInput.value = details.id;
    categories.value = details.category;
  } catch (error) {
    displayMessage(
      "warning",
      "Something went wrong when the post was loaded",
      ".message__container"
    );
  }
})();

form.addEventListener("submit", submitChanges);

function submitChanges(event) {
  event.preventDefault();
  message.innerHTML = "";
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const summary = summaryInput.value.trim();
  const cover = coverInput.files;
  const bodyText = bodyTextInput.value.trim();
  const idValue = idInput.value;
  const category = categories.value;
  console.log(cover)
  if (
    title.length === 0 ||
    summary.length === 0 ||
    bodyText.length === 0 ||
    idValue.length === 0
  ) {
    document.querySelector(".message__container").innerHTML = "";
    return displayMessage(
      "warning",
      "Please supply proper values in the text field",
      ".message__container"
    );
  }
  


  const data  = JSON.stringify({ title, author, summary, bodyText, category });

  updateArticles(data , idValue, cover);
}

async function updateArticles(data, id, cover) {
  const updateUrl = baseUrl + "articles/" + id;

  const formData = new FormData();

  formData.append("files.cover", cover[0]);
  
  formData.append("data", data);

  const options = {
    method: "PUT",
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
    console.log(json)
    // window.location.href = "/loginDashboard.html"

  } catch (error) {
    console.log(error);
  }
  
}
