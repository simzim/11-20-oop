
class Dish {

    #id;
    #name;
    #price;
    #description;
    #category;

    static dishCounter = 0;

    // konstruktorius
    constructor(name, price, description = 'Nera aprašymo'){
        
        Dish.dishCounter++;
        this.#id = Dish.dishCounter;
        this.#name = name;
        this.#price = price;
        this.#description = description;
        this.#category = null;
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
        return this.#category ? this.#category.getCategoryName() : 'Nėra kategorijos';
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

    setCategory(category){
        this.#category = category;
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
