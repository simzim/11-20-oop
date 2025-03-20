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

    getAllDishes(){
        return this.allDishes;
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

    removeDish(dishId){
        const dishIndex = this.getAllDishes().findIndex(dish => dish.getId() === parseInt(dishId));
        if (dishIndex === -1) throw new Error('Kategorija nerasta');
        const dish = this.allDishes[dishIndex];
        console.log(dish);

        const category = dish.getCategoryObj()
        if (category){
            category.removeDish(dish);
        }

        this.getAllDishes().splice(dishIndex, 1);
        
    }



    addDish(name, price, categoryId, description){
        const category = this.getCategories().find(cat => cat.getId() === parseInt(categoryId))

        const dish = new Dish(name, price, description);
        dish.setCategory(category);
        category.addDish(dish);
        this.allDishes.push(dish);
        return dish;
    }

}

export default Menu;