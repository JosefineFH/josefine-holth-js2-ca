const tokenKey = "token";
const userKey = "user";

export function saveToken(token) {
  saveToStorage(tokenKey, token);
}
export function getToken() {
  return getFromStorage(tokenKey);
}

export function saveUser(user) {
  saveToStorage(userKey, user);
}

export function getUser() {
  const user = getFromStorage(userKey);

  if (user) {
    return user;
  }

  return false;
}

export function saveArticle(article) {
  saveToStorage("favorite_article", article);
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromStorage(key) {
  const value = localStorage.getItem(key);

  if (value === null) {
    return [];
  }

  return JSON.parse(value);
}
