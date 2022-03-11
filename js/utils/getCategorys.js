import { baseUrl } from "../data/api.js";

export default async () => {
  const url = baseUrl + "categories";

  try {
    const response = await fetch(url)
    const json = await response.json()
    const categories = document.querySelector("#category");
    json.forEach(category => {

      categories.innerHTML = `
      <option value='{id: ${category.id}, title: ${category.title}}'>${category.title}</option>
      `;
    });

  } catch (error) {
    
  }
}