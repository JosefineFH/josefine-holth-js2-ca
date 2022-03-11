import createFeaturedPosts from "./component/createHTML.js";
import displayPosts from "./admin/dashboard.js";
import { dropdown } from "./component/dropdownMenu.js";
import { baseUrl } from "./data/api.js";
import searchForPost from "./utils/searchPost.js";

dropdown();

async function getPosts() {
  try {
    const featuredPostUrl = baseUrl + "articles";
    const response = await fetch(featuredPostUrl);
    const posts = await response.json();

    const { pathname } = document.location;

    if (pathname === "/loginDashboard.html") {
      displayPosts(posts);
    
    } else {
      createFeaturedPosts(posts);

      searchForPost(posts);
    }
  } catch (error) {
    console.log(error);
  }
}

getPosts();
