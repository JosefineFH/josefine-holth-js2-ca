import { saveToFavorites } from "../utils/saveFavorite.js";
import { getFromStorage } from "../utils/storage.js";

export default function createFeaturedPosts(posts) {
  const postContainer = document.querySelector(".post__container");
  let count = document.querySelector(".favorite_count");
  let currentFavPosts = getFromStorage("favorite_article");

  if (currentFavPosts.length === 0) {
    count.innerHTML = `<p >You can add some posts if you want to read them later</p>`;
  } else {
    count.innerHTML = `<p>Saved posts: <span class="favorite_count">${currentFavPosts.length}</span></p>`;
  }
  try {
    postContainer.innerHTML = "";

    if (posts.length === 0) {
      postContainer.innerHTML = `<p class="warning">There is no more posts her.</p>`;
    }

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      let postId = post.id;
      const lastUpdated = post.updated_at;
      let postAuthor = post.author;
      const postTitle = post.title;

      let imageURL;
      let altText;

      if (post.cover[0] === undefined) {
        imageURL = "/assets/img/image_note_found.png";
        altText = "Image unknown or image is missing";
      } else {
        imageURL = post.cover[0].url;
        altText = post.cover[0].caption;
      }

      if (postAuthor === null) {
        postAuthor = "Unknown";
      }
      let timeStamp = lastUpdated;
      let updated = timeStamp.slice(0, 10);

      let postCategory;
      if (post.category === null) {
        postCategory = "unknown";
      } else {
        postCategory = post.category.title;
      }

      postContainer.innerHTML += `
      <div class="article__body">
      <div class="article__img" style="background-image: url('${imageURL}');">
      <button class="favorite_button" data-id="${postId}" data-title="${postTitle}" data-img="${imageURL}">Save as Favorite</button>
      <p class="category__placement">${postCategory}</p>
      </div>
      <h2 class="article__title">${postTitle}</h2>
      <p class="article__text">${post.summary}</p>
      <a href="/singlePost.html?id=${postId}">Read More</a>
      <div class="article__footer">
        <p>${updated}</p>
        <p>${postAuthor}</p>
      </div>
    </div>`;

      const favoritesButton = document.querySelectorAll(".favorite_button");

      favoritesButton.forEach((button) => {
        currentFavPosts.forEach((post) => {
          if (post.id === button.dataset.id) {
            button.classList.add("toggle");
          }
        });
      });

      favoritesButton.forEach((button) => {
        button.addEventListener("click", () => {
          const postDataId = button.dataset.id;
          const postTitle = button.dataset.title;
          const postImg = button.dataset.img;

          saveToFavorites(postDataId, postTitle, postImg);
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
}
