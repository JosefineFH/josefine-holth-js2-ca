const logoutButton = document.querySelector(".logout");

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user")

  window.location.href = "/login.html";
  
});
