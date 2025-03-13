import Category from "./Category.js";
class UI{

// KATEGORIJOS PRIDEJIMAS / REDAGAVIMAS
  static displayCategoryForm(menu, contentElement, category = null) {
    let categoryName = '';
    let title = '';
    let btnText = '';
    
    if(category){
        categoryName = category.getCategoryName();
        title = 'Redaguoti Kategoriją';
        btnText = 'Atnaujinti Kategoriją';
    } else {
        title = 'Pridėti naują Kategoriją';
        btnText = 'Išsaugoti Kategoriją';
    }

    contentElement.innerHTML = `
              <h2>${title}</h2>
              <form id="addCategoryForm" class="addForm">
                  <label for="categoryName">Pavadinimas:</label>
                  <input type="text" id="categoryName" required value='${categoryName}' />
                  <button class="btn" type="submit">${btnText}</button>
              </form>
          `;
      
        const categoryForm = document.getElementById("addCategoryForm");
      
        categoryForm.addEventListener("submit", (e) => {
          e.preventDefault();

          const categoryName = e.target.categoryName.value;
      
          if(category){
            category.setCategoryName(categoryName);

          }else {
            const newCategory = new Category(categoryName, menu);
          }
          //console.log(categoryName);
         
      
        //   console.log(
        //     `kategorijos objektas sukurtas ${newCategory.getCategoryName()}`
        //   );
        //   console.log(mainMenu);
          e.target.reset();
        });
      }

      // KATEGORIJU RODYMAS

      static displayCategoryList(menu, contentElement ){

        let htmlContent = `<table>
            <tr>
                <th>Eil. nr.</th>
                <th>Pavadinimas</th>
                <th>Veiksmai</th>
            </tr>
        `;
        let counter = 0;
        
        menu.getCategories().forEach(cat => {
            htmlContent += 
            `<tr>
                <td>${++counter}</td>
                <td>${cat.getCategoryName()}</td>
                <td> mygtukai </td>
            </tr>`
        })

        htmlContent += `</table>`;
        contentElement.innerHTML = htmlContent;

    }

}
export default UI;