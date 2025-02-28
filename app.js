import Dish from './classes/Dish.js';
import Category from './classes/Category.js';
import Menu from './classes/Menu.js';

const mainMenu = new Menu();

console.log(mainMenu);

const dessert = new Category('Desertai', mainMenu);
const kita = new Category('kita', mainMenu);
const drinks = new Category('Gėrimai', mainMenu);
// console.log(dessert);

const kitoks = new Dish('lialia', 5.5, kita);
const iceCream = new Dish('Ledai', 5.5, dessert);
const cake = new Dish('Tortas', 5.5, dessert, 'pats skaniausias');

// __________________________________________________
// _____HTML turinio kurimas -> rodyti kategorijas___

const content = document.getElementById('content');

const showCategoryList = document.getElementById('showCategoryList');

showCategoryList.addEventListener('click', () => displayCategoryList());

function displayCategoryList(){
    content.innerHTML = mainMenu.generateInnerHTML();
}

// __________________________________________________
// _____HTML turinio kurimas -> prideti  kategorijas___

const showCategoryForm = document.getElementById('showCategoryForm');

showCategoryForm.addEventListener('click', ()=> displayCategoryForm());

function displayCategoryForm(){
    content.innerHTML = `
        <h2>Pridėti naują Kategoriją</h2>
        <form id="addCategoryForm" class="addForm">
            <label for="categoryName">Pavadinimas:</label>
            <input type="text" id="categoryName" required />

            <button class="btn" type="submit">Išsaugoti</button>
        </form>
    `;

    const categoryForm = document.getElementById('addCategoryForm');

    categoryForm.addEventListener('submit', (e) => {
        
        e.preventDefault();

        const categoryName = e.target.categoryName.value;

        //console.log(categoryName);
        const newCategory = new Category(categoryName, mainMenu);

        console.log(`kategorijos objektas sukurtas ${newCategory.getCategoryName()}`)
        console.log(mainMenu)
        e.target.reset();
    })
}




// console.log(kita);
// console.log(dessert);
// console.log(`Viso sukurta ${Dish.dishCounter}`);
// console.log(`Viso prideta patiekalu i kategorijas ${Category.dishCounter}`);

// console.log(iceCream.dishCounter);


// console.log(iceCream.getInfo());
