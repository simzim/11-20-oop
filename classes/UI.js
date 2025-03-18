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
            UI.displayCategoryList(menu, contentElement );

          }else {
            menu.addCategory(categoryName);
            // const newCategory = new Category(categoryName, menu);
          }
   
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
                <td> 
                  <button data-category-id ='${cat.getId()}'  class="action-btn edit-button" >
                    <img src='../assets/img/edit.png' width='25'>
                  </button>

                  <button data-category-id ='${cat.getId()}'  class="action-btn delete-button" >
                    <img src='../assets/img/delete.png' width='25'>
                  </button>                
                </td>
            </tr>`
        })

        htmlContent += `</table>`;
        contentElement.innerHTML = htmlContent;

        const editButtons = contentElement.querySelectorAll('.edit-button');
        editButtons.forEach(button => {
          button.addEventListener('click', (e) => {
            const categoryId = e.target.closest('button').dataset.categoryId;

            const category = menu.editCategory(categoryId);
            if(category){
              UI.displayCategoryForm(menu, contentElement, category);
            }
         });
         });

        const deleteButtons = contentElement.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
          button.addEventListener('click', (e) => {
            const categoryId = e.target.closest('button').dataset.categoryId;

            if(confirm('Ar tikrai norite ištrinti kategoriją?')){
              console.log(categoryId);
              menu.removeCategory(categoryId);

              UI.displayCategoryList(menu, contentElement);
            }

            UI.displayCategoryList(menu, contentElement);

          });
        });
    }

    // Patiekalu lenteles rodymas
  static displayDishList(menu, contentElement){
    let htmlContent = `<table>`

    menu.getCategories().forEach(cat =>{
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
            `});
    });

    const uncategorizedDishes = menu.getAllDishes().filter(dish => dish.getCategory() === 'Nėra kategorijos')
    console.log(uncategorizedDishes);

    if (uncategorizedDishes.length > 0){
      htmlContent += `
      <tr>
          <th>Kategorija</th>
          <th colspan='2'>Be Kategorijos</th>
      </tr>
    `;
    uncategorizedDishes.forEach(dish => {
      htmlContent += `
          <tr>
              <td>${dish.getName()}</td>
              <td>${dish.getPrice()} Eur</td>
              <td>${dish.getDescription()}</td>
          </tr>
      `});


    } else {
      htmlContent += `
      <tr>
          <td colspan='3'>Patekalų be kategorijos nėra</td>
      </tr>
      `
    }


    htmlContent += `</table>`
   contentElement.innerHTML = htmlContent;
}

static displayDishForm(menu, contentElement) {
  contentElement.innerHTML = `
        <h2>Pridėti naują Patiekalą</h2>
        <form id="dishForm" class="addForm">
            <label for="dishName">Pavadinimas:</label>
            <input type="text" id="dishName" required />

            <label for="dishPrice">Kaina:</label>
            <input type="text" id="dishPrice" required />

            <label for="dishDescription">Aprašymas:</label>
            <textarea name="description" id="dishDescription" rows="5" cols="30"></textarea>
            
            <label for="categorySelect">Pasirinkite kategoriją:</label>
            <select id='categorySelect'>
                <option value=''>Pasirinkite Kategoriją:</option>
                ${menu
                  .getCategories()
                  .map(
                    (cat) =>
                      `<option value='${cat.getId()}'>${cat.getCategoryName()}</option>`
                  )}
            </select>
            <button class="btn" type="submit">Išsaugoti</button>
        </form>
    `;
  const dishForm = document.getElementById("dishForm");

  dishForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const dishName = e.target.dishName.value;
    const dishPrice = e.target.dishPrice.value;
    const dishDescription = e.target.dishDescription.value;
    const dishCategoryId = e.target.categorySelect.value;

    menu.addDish(dishName, dishPrice, dishCategoryId, dishDescription);

    // const newDish = new Dish(
    //   dishName,
    //   dishPrice,
    //   dishCategory,
    //   mainMenu,
    //   dishDescription
    // );
    e.target.reset();
  });
}




}
export default UI;