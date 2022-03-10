import { baseUrl } from "../data/api.js";
import { dropdown } from "./dropdownMenu.js";

dropdown();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

try {
  const container = document.querySelector(".main__post");
  const featuredPostUrl = baseUrl + "articles/"+ id;
  
  const response = await fetch(featuredPostUrl);
  const post = await response.json();
  const author = post.author;
  const body = post.bodyText;
  const lastUpdated = post.updated_at;
  const title = post.title;
  const categories = post.category;
  const coverImage = post.cover[0];
  
  let altText;

  let timeStamp = lastUpdated;
  let updated = timeStamp.slice(0, 10);

  if(!author || !categories || !body || !title){

    container.innerHTML = `<div class="content__notFound">
    <p>No post was found</p>
    <a href="/">Back</a>
    </div>`;
  } else {

    if(coverImage.alternativeText.length === 0){
      altText = "No image or Image text was found";
    }else{
      altText = coverImage.alternativeText;
    }

    container.innerHTML = `
    <div>
    <img src="${coverImage.url}" alt="${altText}">
    <p>${author} - ${updated}</p>
    <h1>${title}</h1>
    <div>
    ${body}
    </div>
    </div>`;
  }
  
  
} catch (error) {
  container.innerHTML = error;
}