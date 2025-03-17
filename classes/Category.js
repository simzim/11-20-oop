
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
        this.#dishesList.push(dish);
        Category.dishCounter++;
    }
}
export default Category;