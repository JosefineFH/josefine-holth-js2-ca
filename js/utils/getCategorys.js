import { baseUrl } from "../data/api.js";

export default async () => {
  const url = baseUrl + "categories";

  try {
    const response = await fetch(url)
    const json = await response.json()
    const categories = document.querySelector("#category");
    json.forEach(category => {

      categories.innerHTML = `
      <option value='${category.id}'>${category.title}</option>
      `;
    });

  } catch (error) {
    
  }
}