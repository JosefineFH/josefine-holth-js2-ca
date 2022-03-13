import { baseUrl } from "../data/api.js";
import { getToken, getUser } from "../utils/storage.js";


export async function removePost(id) {
  const doDelete = confirm("Are you sure you want to delete this article?");
  const errorMessage = document.querySelector(".message__container")

  if (doDelete) {
    const url = baseUrl + "articles/" + id;

    const token = getToken();

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
    } catch (error) {
      errorMessage.innerHTML = "<p>Something whent wrong when you ware trying to delete this.</p>"
    }
  }
}
