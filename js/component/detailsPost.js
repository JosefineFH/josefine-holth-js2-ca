import { baseUrl } from "../data/api.js";
import { dropdown } from "./dropdownMenu.js";


const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
if (!id) {
  document.location.href = "/";
}
const container = document.querySelector(".main__post");

try {
  const featuredPostUrl = baseUrl + "articles/" + id;

  const response = await fetch(featuredPostUrl);
  const post = await response.json();
  const author = post.author;
  const body = post.bodyText;
  const lastUpdated = post.updated_at;
  const title = post.title;
  const categories = post.category;

  let altText;

  let timeStamp = lastUpdated;
  let updated = timeStamp.slice(0, 10);
  let coverImage = post.cover[0];

  if (!author || !categories || !body || !title) {
    container.innerHTML = `<div class="content__notFound">
    <p>No post was found</p>
    <a href="/">Back</a>
    </div>`;
  } else {
    if (!coverImage) {
      coverImage = {
        alternativeText: "There is noe cover image her",
        url: "/assets/img/image_note_found.png",
      };
    } else {
      if (!coverImage.alternativeText) {
        altText = "No image or Image text was found";
      } else {
        altText = coverImage.alternativeText;
      }
    }
    

    container.innerHTML = `
    <div>
    <div class="img__container" style="background-image: url('${coverImage.url}');">
    </div>
    <p class="author__paragraph">${author} - ${updated}</p>
    <h1>${title}</h1>
    <div>
    ${body}
    </div>
    </div>`;
  }
} catch (error) {
  container.innerHTML = error;
}
const dropdownButton = document.querySelector(".navbar__icon");

dropdownButton.addEventListener("click", () => {
  dropdown();
});