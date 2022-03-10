import {
  saveArticle,
  getFromStorage
} from "../util/storage.js";

export function saveToFavorites(id, title, imgUrl) {
  let countContainer = document.querySelector(".favorite_count");
  let currentFavPosts = getFromStorage("favorite_article");
  let count = currentFavPosts.length
  const favoritesButton = document.querySelectorAll(".favorite_button");

  const existingPostInStorage = currentFavPosts.find(
    (element) => element.id === id
  );

    console.log(currentFavPosts)


  if (existingPostInStorage === undefined) {
    const data = {
      id: id,
      title: title,
      img: imgUrl,
    };
    currentFavPosts.push(data);
    saveArticle(currentFavPosts);

    
    count++
    countContainer.innerHTML = `<p>Articles in favorite: <span class="favorite_count">${count}</span></p>`
    favoritesButton.forEach(button => {
      if(button.dataset.id === id){
        button.classList.add("toggle")
        console.log(button)
      }
    });
    
  } else {
    const newPostStorage = currentFavPosts.filter((post) => post.id !== id);

    count--
    countContainer.innerHTML = `<p>Articles in favorite: <span class="favorite_count">${count}</span></p>`
    favoritesButton.forEach(button => {
      if(button.dataset.id === id){
        button.classList.remove("toggle")
        console.log(button)
      }
    });
    saveArticle(newPostStorage);
    
  }
}