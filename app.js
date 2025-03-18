import Menu from "./classes/Menu.js";
import UI from "./classes/UI.js";

const mainMenu = new Menu();

// Kategorijos
mainMenu.addCategory("Desertai");
mainMenu.addCategory("Karšti patiekalai");
mainMenu.addCategory("Gėrimai");
mainMenu.addCategory("Pusričių meniu");

// Patiekalai
mainMenu.addDish("Cepelinai", 8.5, 2);
mainMenu.addDish("Kepsnys", 15.5, 2);
mainMenu.addDish("Ledai", 5.5, 1);
mainMenu.addDish("Tortas", 5.5, 1, "pats skaniausias");
mainMenu.addDish("Kava", 3.5, 3, "Labai skani");
mainMenu.addDish("Arbata", 2.5, 3, "Vaisine");
mainMenu.addDish("Omletas", 4.5, 4);
mainMenu.addDish("Košė", 2.5, 4, "Avižinė");


// __________________________________________________
// _____ATNAUJINTAS TURINIO ATVAIZDAVIMAS___

const content = document.getElementById("content");

const showCategoryForm = document.getElementById("showCategoryForm");
showCategoryForm.addEventListener("click", () => UI.displayCategoryForm(mainMenu, content));

const showCategoryList = document.getElementById("showCategoryList");
showCategoryList.addEventListener("click", () => UI.displayCategoryList(mainMenu, content));

// patiekalai
const showDishList = document.getElementById("showDishList");
showDishList.addEventListener("click", () => UI.displayDishList(mainMenu, content));

const showDishForm = document.getElementById("showDishForm");
showDishForm.addEventListener("click", () => UI.displayDishForm(mainMenu, content));