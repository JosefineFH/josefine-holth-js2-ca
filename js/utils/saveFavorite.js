import { saveArticle, getFromStorage } from "../utils/storage.js";

export function saveToFavorites(id, title, imgUrl) {
  let countContainer = document.querySelector(".favorite_count");
  let currentFavPosts = getFromStorage("favorite_article");
  let count = currentFavPosts.length;
  const favoritesButton = document.querySelectorAll(".favorite_button");

  const existingPostInStorage = currentFavPosts.find(
    (element) => element.id === id
  );

  if (existingPostInStorage === undefined) {
    const data = {
      id: id,
      title: title,
      img: imgUrl,
    };
    currentFavPosts.push(data);
    saveArticle(currentFavPosts);
    console.log(currentFavPosts.length);

    count++;
    countContainer.innerHTML = `<p>Posts in favorite: <span class="favorite_count">${count}</span></p>`;
    favoritesButton.forEach((button) => {
      if (button.dataset.id === id) {
        button.classList.add("toggle");
      }
    });
  } else {
    const newPostStorage = currentFavPosts.filter((post) => post.id !== id);
    count--;
    countContainer.innerHTML = `<p>Posts in favorite: <span class="favorite_count">${count}</span></p>`;
    if (newPostStorage.length === 0) {
      countContainer.innerHTML = `<p>You can add some posts if you want to read them later.</p>`;
    }

    favoritesButton.forEach((button) => {
      if (button.dataset.id === id) {
        button.classList.remove("toggle");
      }
    });
    saveArticle(newPostStorage);
  }
}
