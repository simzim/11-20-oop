import Dish from "./classes/Dish.js";
import Category from "./classes/Category.js";
import Menu from "./classes/Menu.js";
import UI from "./classes/UI.js";

const mainMenu = new Menu();

// Kategorijos
const dessert = new Category("Desertai", mainMenu);
const dinner = new Category("Karšti patiekalai", mainMenu);
const drinks = new Category("Gėrimai", mainMenu);
const breakfast = new Category("Pusričių meniu", mainMenu);


// Patiekalai
const kitoks = new Dish("Cepelinai", 8.5, 2, mainMenu);
const kep = new Dish("Kepsnys", 15.5, 2, mainMenu);
const iceCream = new Dish("Ledai", 5.5, 1, mainMenu);
const cake = new Dish("Tortas", 5.5, 1, mainMenu, "pats skaniausias");
const cafe = new Dish("Kava", 3.5, 3, mainMenu, "Labai skani");
const tea = new Dish("Arbata", 2.5, 3, mainMenu, "Vaisine");
const oml = new Dish("Omletas", 4.5, 4, mainMenu);
const kose = new Dish("Košė", 2.5, 3, mainMenu, "Avižinė");


// __________________________________________________
// _____ATNAUJINTAS TURINIO ATVAIZDAVIMAS___

const content = document.getElementById("content");


const showCategoryForm = document.getElementById("showCategoryForm");
showCategoryForm.addEventListener("click", () => UI.displayCategoryForm(mainMenu, content));

const showCategoryList = document.getElementById("showCategoryList");
showCategoryList.addEventListener("click", () => UI.displayCategoryList(mainMenu, content));



// __________________________________________________
// _____HTML turinio kurimas -> rodyti kategorijas___



// function displayCategoryList() {
//   content.innerHTML = mainMenu.generateInnerHTML();
// }

// __________________________________________________
// _____HTML turinio kurimas -> prideti  patiekala___

const showDishForm = document.getElementById("showDishForm");

showDishForm.addEventListener("click", () => displayDishForm());

function displayDishForm() {
  content.innerHTML = `
        <h2>Pridėti naują Patiekalą</h2>
        <form id="addDishForm" class="addForm">
            <label for="dishName">Pavadinimas:</label>
            <input type="text" id="dishName" required />

            <label for="dishPrice">Kaina:</label>
            <input type="text" id="dishPrice" required />

            <label for="dishDescription">Aprašymas:</label>
            <textarea name="description" id="dishDescription" rows="5" cols="30"></textarea>
            
            <label for="categorySelect">Pasirinkite kategoriją:</label>
            <select id='categorySelect'>
                <option value=''>Pasirinkite Kategoriją:</option>
                ${mainMenu
                  .getCategories()
                  .map(
                    (cat) =>
                      `<option value='${cat.getId()}'>${cat.getCategoryName()}</option>`
                  )}
            </select>
            <button class="btn" type="submit">Išsaugoti</button>
        </form>
    `;
  const dishForm = document.getElementById("addDishForm");

  dishForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const dishName = e.target.dishName.value;
    const dishPrice = e.target.dishPrice.value;
    const dishDescription = e.target.dishDescription.value;
    const dishCategory = e.target.categorySelect.value;

    const newDish = new Dish(
      dishName,
      dishPrice,
      dishCategory,
      mainMenu,
      dishDescription
    );
    e.target.reset();
  });
}


// __________________________________________________
// _____HTML turinio kurimas -> rodyti patiekalu sarasa___

const showDishList = document.getElementById("showDishList");

showDishList.addEventListener("click", () => displayDishList());

function displayDishList() {
  content.innerHTML = mainMenu.generateDishInnerHTML();
}




