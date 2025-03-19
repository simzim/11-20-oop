
class Category {
    
    #id;
    #categoryName;
    #dishesList;

    static categoryCounter =0;
        
    constructor(name){
        Category.categoryCounter++;
        
        this.#id = Category.categoryCounter;
        this.#categoryName = name;
        this.#dishesList = [];
    }

    getId(){
        return this.#id;
    }

    getCategoryName(){
        return this.#categoryName;
    }

    getDishesList(){
        return this.#dishesList;
    }

    setCategoryName(newName){
        this.#categoryName = newName;
    }

    addDish(dish){

        const exists = this.#dishesList.some(existingDish => existingDish.getId() === dish.getId());

        if(!exists){
            this.#dishesList.push(dish);
        }
    }

    removeDish(dish){
        this.#dishesList = this.#dishesList.filter(d => d.getId() !== dish.getId())
    }
}
export default Category;