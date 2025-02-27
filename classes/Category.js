class Category {
    #categoryName;
    #dishesList;

    static dishCounter =0;
    constructor(name){
        this.#categoryName = name;
        this.#dishesList = [];
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