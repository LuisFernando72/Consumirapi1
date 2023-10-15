const allSideMenu = document.querySelectorAll("#menu_opcion .side-menu.top li a");
const ul = document.querySelectorAll("#menu_opcion ul li ul");

let opcion = document.querySelectorAll(".opcion");
let opcion2 = document.querySelectorAll(".opcion2");

opcion.forEach(function (item) {
  let ala = item.id;
  item.addEventListener("click", function (i) {
    //console.log(ala);
    localStorage.setItem("ula", ala);
    let elemento = i.target.parentNode;
    elemento.children[1].classList.toggle("activo");
  });
});

// VER MAS POR AQUI BROO

let getul = localStorage.getItem("ula");
//console.log(getul);
if (getul.length != 0) {
  let variable = "#" + getul;
 // console.log(variable);
  let casa = document.querySelectorAll(variable);
  casa.forEach(function (item) {
    item.classList.toggle("activo");
   // console.log(item);
  });
}

 
//VER POR AQUI, ENVIAR SOLO UNA VARIABLE Y ACTIVAR SOLO UNA, LA QUE SE LE DIO CLICK
allSideMenu.forEach((item) => {
  const li = item.parentElement;
  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
      
    });
    localStorage.setItem("lia", li.id);
    
    li.classList.add("active");
  });
});

let get_lia = localStorage.getItem("lia");
if (get_lia.length != 0) {
  let variable = "#" + get_lia;
  document.querySelector(variable).classList.add("active");
}

const body = document.querySelector("body");
const sidebar_toggle = body.querySelector("#contenido nav .bx.bx-menu");
let modeToggle = body.querySelector("#switch-mode");
const sidebar = body.querySelector("#menu_opcion");

document.addEventListener("DOMContentLoaded", function () {
  const swictherTheme = document.querySelector("#switch-mode");
  const root = document.documentElement;

  if (root.getAttribute("data-theme") === "dark") {
    swictherTheme.checked = true;
  }

  function toggleTheme() {
    const setTheme = this.checked ? "dark" : "light";
    root.setAttribute("data-theme", setTheme);
    localStorage.setItem("theme", setTheme);
  }

  swictherTheme.addEventListener("click", toggleTheme);
});

sidebar_toggle.addEventListener("click", () => {
  sidebar.classList.toggle("hide");
  if (sidebar.classList.contains("close")) {
    localStorage.setItem("status", "close");
  } else {
    localStorage.setItem("status", "open");
  }
});
// console.log(getMode)
