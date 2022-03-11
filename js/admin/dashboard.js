import { getToken, getUser } from "../utils/storage.js";
import { dropdown } from "../component/dropdownMenu.js";
dropdown();
console.log("connected")
export default function displayPosts(posts) {
  console.log("connected")

  const token = getToken();
  const user = getUser();

  if(!user.length || !token.length){
    document.location.href = "/login.html";
  }

  const container = document.querySelector(".dashboard_container");
  
  posts.forEach(post => {
    const lastUpdated = post.updated_at;
    
    let postAuthor = post.author;
    let postCategory;
    let timeStamp = lastUpdated;
    let updated = timeStamp.slice(0, 10);

    if (postAuthor === null) {
      postAuthor = "Unknown";
    }

    if (post.category === null) {
      postCategory = "unknown";
    } else {
      postCategory = post.category.title;
    }

    container.innerHTML += `
    <div>
    <div>
    <h2>${post.title}</h2>
    <p>${postAuthor} - ${updated}</p>
    </div>
    <div>
    <button>Remove</button>
    <a href="/editPost.html?id=${post.id}">Edit</a>
    </div>
    </div>
    `

  });

}
