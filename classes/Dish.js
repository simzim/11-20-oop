

class Dish {

    #id;
    #name;
    #price;
    #description;
    #category;

    static allDishes = []
    static dishCounter = 0;

    // konstruktorius
    constructor(name, price, categoryId, mm, description = 'Nera aprašymo'){
        
        Dish.dishCounter++;
        this.#id = Dish.dishCounter;
        this.#name = name;
        this.#price = price;
        this.#description = description;
        // this.#category = category;
        // category.addDish(this);
        Dish.allDishes.push(this);

        const category = mm.getCategories().find(cat => cat.getId() == categoryId);
        if(category){
            this.#category = category;
            category.addDish(this);
        } else {
            throw new Error('Kategorija nerasta');
        }

    }

    // Geteriai

    getName(){
        return this.#name;
    }

    getPrice(){
        return this.#price;
    }

    getDescription(){
        return this.#description;
    }

    getCategory(){
        return this.#category.getCategoryName();
    }

    getId(){
        return this.#id;
    }

    // Seteriai

    setName(newName){
        this.#name = newName;
    }

    setPrice(newPrice){
        if (newPrice >=0){
            this.#price = newPrice;
        } else {
            throw new Error ('kaina negali būti mažesnė už 0')
        }
        
    }

    setDescription(newDescription){
        this.#description = newDescription;
    }

    setCategory(newCategory){
        this.#category.setCategoryName(newCategory);
    }

    getInfo(){
        return `Patiekalas: ${this.#name},
                kaina: ${this.#price},
                aprašymas: ${this.#description}
                kategorija: ${this.#category.getCategoryName()},
                `;
    }

    static calculateAveragePrice(allDishes){
        const total = allDishes.reduce((sum, dish) => sum + dish.getPrice(), 0)
        return total / allDishes.length;
    }


}

export default Dish;
