export function dropdown() {
  const dropdown = document.querySelector(".navbar__icon");
  const dropdownList = document.querySelector("#topNavbar");

  dropdown.addEventListener("click", () => {
    if (dropdownList.className === "navbar__list") {
      dropdownList.className += " responsive";
    } else {
      dropdownList.className = "navbar__list";
    }
  });
}
