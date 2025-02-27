
class Menu {

    #categories = [];

    constructor(){
        this.#categories = [];
    }

    getCategories(){
        return this.#categories;
    }

    addCategory(category){
        this.#categories.push(category);
    }

    generateInnerHTML(){
        let htmlContent = `<ul>`;

        this.getCategories().forEach(cat => {
            htmlContent += `<li>${cat.getCategoryName()}</li>`
        })

        htmlContent += `</ul>`;

    return htmlContent;
    }




}

export default Menu;