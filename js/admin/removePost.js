import { baseUrl } from "../data/api.js";
import { getToken, getUser } from "../utils/storage.js";


export async function removePost(id){
  const doDelete = confirm("Are you sure you want to delete this article?");
  console.log(id)
console.log(doDelete)
  if(doDelete){
    const url = baseUrl + "articles/" + id

    const token = getToken();

    const options = {
      method: "DELETE",
      headers: {
          Authorization: `Bearer ${token}`,
      },
    }

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      console.log(json)
  } catch (error) {
      console.log(error);
  }
  }
}