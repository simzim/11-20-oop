
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

 
    editCategory(categoryId){
        const category = this.#categories.find(cat => cat.getId() === parseInt(categoryId));
        return category;
    }




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