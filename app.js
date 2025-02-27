import Dish from './classes/Dish.js';
import Category from './classes/Category.js';


const dessert = new Category('Desertai');

const kita = new Category('kita');

console.log(dessert);
const kitoks = new Dish('lialia', 5.5, kita);
const iceCream = new Dish('Ledai', 5.5, dessert);
const cake = new Dish('Tortas', 5.5, dessert, 'pats skaniausias');



console.log(dessert);
console.log(`Viso sukurta ${Dish.dishCounter}`);
console.log(`Viso prideta patiekalu i kategorijas ${Category.dishCounter}`);

console.log(iceCream.dishCounter);


// console.log(iceCream.getInfo());
