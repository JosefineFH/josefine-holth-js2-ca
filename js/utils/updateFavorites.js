import { saveArticle, getFromStorage } from "../utils/storage.js";

export async function updateFavoritesData(img, id, title) {
  let currentFavPosts = getFromStorage("favorite_article");
  parseInt(id)
  const newFavoriteList = currentFavPosts.filter((post) => {
    if(post.id !== id){
      return true
    }
  })
 
  saveArticle(newFavoriteList)

  const data = {
    id: id,
    title: title,
    img: img,
  };

  newFavoriteList.push(data);
  saveArticle(newFavoriteList);

}
