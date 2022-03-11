import createHtml from "../component/createHTML.js"
const search = document.querySelector("#search");


export default function searchForPost(posts) {
  search.onkeyup = () => {
    const searchValue = event.target.value.trim().toLowerCase();
    const filterPost = posts.filter((post) => {
      if(post.title.toLowerCase().startsWith(searchValue)){
        return true;
      } 
    })
    createHtml(filterPost)
  };
}
