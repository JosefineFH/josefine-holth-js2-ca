export function dropdown() {
  const dropdownList = document.querySelector("#topNavbar");

  
    if (dropdownList.className === "navbar__list") {
      dropdownList.className += " responsive";
    } else {
      dropdownList.className = "navbar__list";
    }
  
}
