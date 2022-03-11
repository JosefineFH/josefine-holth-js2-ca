import createFeaturedPosts from "../component/createHTML.js"
import { saveArticle } from "./storage.js"

export function removeFromFavorites(posts){
  const deleteThisPost = event.target.dataset.id
  const newFavoriteList = posts.filter((post) => {
    if(post.id !== deleteThisPost){
      return true
    }
  })
  posts = newFavoriteList
  
  saveArticle(posts)
}