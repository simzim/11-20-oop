
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