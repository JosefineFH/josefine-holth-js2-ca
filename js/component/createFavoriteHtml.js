import { removeFromFavorites } from "../utils/removeFavorites.js";
import { getFromStorage } from "../utils/storage.js";

let currentFavPosts;
let container;

viewFavorites();

export function viewFavorites() {
  
  const loader = document.querySelector(".loader");
  loader.style.display = "none"
  console.log(loader)
  currentFavPosts = getFromStorage("favorite_article");
  container = document.querySelector(".post__container");

  container.innerHTML = "";
  if (currentFavPosts.length === 0) {
    container.innerHTML = `<h3 style="line-height:2em">You don't have any posts stored just yet. So way dont you look <a href="/index.html">her</a> and find something.</h3>`;
  }
  
  currentFavPosts.forEach((post) => {
    container.innerHTML += `
    <div class="article__body">
    <div class="article__img" style="background-image: url('${post.img}');">
    <button class="remove_button" data-id="${post.id}">Remove as Favorite</button>
    
    </div>
    <h2 class="article__title">${post.title}</h2>
    
    <a href="/singlePost.html?id=${post.id}">Read More</a>
  </div>`;
  
  const removeFavorite = document.querySelectorAll(".remove_button");
  removeFavorite.forEach((button) => {
    button.addEventListener("click", () => {
      removePost(currentFavPosts);
    });
  });
  });
}

function removePost(currentFavPosts) {
  
  removeFromFavorites(currentFavPosts);
  viewFavorites();
}

const emptyButton = document.querySelector(".empty__favorites");

  emptyButton.addEventListener("click", () => {
  // localStorage.removeItem("favorite_article");

  container.innerHTML = `<h3 style="line-height:2em">You don't have any posts stored just yet. So way dont you look <a href="/index.html">her</a> and find something.</h3>`;
});
