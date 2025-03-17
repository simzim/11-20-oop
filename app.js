import Dish from "./classes/Dish.js";
import Category from "./classes/Category.js";
import Menu from "./classes/Menu.js";
import UI from "./classes/UI.js";

const mainMenu = new Menu();

// Kategorijos
mainMenu.addCategory("Desertai");
mainMenu.addCategory("Karšti patiekalai");
mainMenu.addCategory("Gėrimai");
mainMenu.addCategory("Pusričių meniu");


// Patiekalai
mainMenu.addDish("Cepelinai", 8.5, 2, mainMenu);
mainMenu.addDish("Kepsnys", 15.5, 2, mainMenu);
mainMenu.addDish("Ledai", 5.5, 1, mainMenu);
mainMenu.addDish("Tortas", 5.5, 1, mainMenu, "pats skaniausias");
mainMenu.addDish("Kava", 3.5, 3, mainMenu, "Labai skani");
mainMenu.addDish("Arbata", 2.5, 3, mainMenu, "Vaisine");
mainMenu.addDish("Omletas", 4.5, 4, mainMenu);
mainMenu.addDish("Košė", 2.5, 3, mainMenu, "Avižinė");


// __________________________________________________
// _____ATNAUJINTAS TURINIO ATVAIZDAVIMAS___

const content = document.getElementById("content");


const showCategoryForm = document.getElementById("showCategoryForm");
showCategoryForm.addEventListener("click", () => UI.displayCategoryForm(mainMenu, content));

const showCategoryList = document.getElementById("showCategoryList");
showCategoryList.addEventListener("click", () => UI.displayCategoryList(mainMenu, content));


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




