import Dish from "./Dish.js";
import Category from "./Category.js";

class Menu {

    #categories = [];
    allDishes = [];

    constructor(){
        this.#categories = [];
        this.allDishes = [];
    }

    getCategories(){
        return this.#categories;
    }

    addCategory(name){
        const category = new Category(name)
        this.#categories.push(category);
        return category;
    }

 
    editCategory(categoryId){
        const category = this.#categories.find(cat => cat.getId() === parseInt(categoryId));
        return category;
    }

    removeCategory(categoryId){

        const categoryIndex = this.getCategories().findIndex(cat => cat.getId() === parseInt(categoryId));
        if (categoryIndex === -1) throw new Error('Kategorija nerasta');
        const category = this.#categories[categoryIndex];

        category.getDishesList().forEach(dish => {
            console.log(dish);
            dish.setCategory(null);
        });

        this.getCategories().splice(categoryIndex, 1);
    }

    addDish(name, price, categoryId, description){
        const category = this.getCategories().find(cat => cat.getId() === parseInt(categoryId))

        const dish = new Dish(name, price, description);
        category.addDish(dish);
        this.allDishes.push(dish);
        return dish;
    }


// Kraustisim i UI klase
    generateDishInnerHTML(){
        let htmlContent = `<table>`

        this.#categories.forEach(cat =>{
            htmlContent += `
                <tr>
                    <th>Kategorija</th>
                    <th colspan='2'>${cat.getCategoryName()}</th>
                </tr>
            `;
            cat.getDishesList().forEach(dish => {
                htmlContent += `
                    <tr>
                        <td>${dish.getName()}</td>
                        <td>${dish.getPrice()} Eur</td>
                        <td>${dish.getDescription()}</td>
                    </tr>
                
                `
            })
        })
        htmlContent += `</table>`
        
        return htmlContent;

    }


}

export default Menu;