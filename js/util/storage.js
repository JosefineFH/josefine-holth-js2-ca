export function saveArticle(article){
  saveToStorage("favorite_article", article);
}

function saveToStorage(key, value){
  localStorage.setItem(key, JSON.stringify(value))
}

export function getFromStorage(key) {
  const value = localStorage.getItem(key);

  if (value === null) {
      return [];
  }

  return JSON.parse(value);
}