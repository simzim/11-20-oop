import Category from "./Category.js";
class UI{

// -----------------------------------------------
// KATEGORIJOS PRIDEJIMAS / REDAGAVIMAS
// -----------------------------------------------

/**
 * Atvaizduoja puslapyje Kategorijų kurimo arba redagavimo formą
 * 
 * @static
 * @param {object} menu 
 * @param {dom object} contentElement 
 * @param {object} category 
 */

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
          }
          e.target.reset();
        });
      }

      // -----------------------------------------------
      // KATEGORIJU RODYMAS
      // -----------------------------------------------
/**
 * 
 * @param {*} menu 
 * @param {*} contentElement 
 */

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

    // -----------------------------------------------
    // PETIEKALU LENTELES RODYMAS
    // -----------------------------------------------
  static displayDishList(menu, contentElement){
    let htmlContent = `<table>`

    menu.getCategories().forEach(cat =>{
        htmlContent += `
            <tr>
                <th>Kategorija</th>
                <th colspan='3'>${cat.getCategoryName()}</th>
            </tr>
        `;
        cat.getDishesList().forEach(dish => {
            htmlContent += `
                <tr>
                  <td>${dish.getName()}</td>
                  <td>${dish.getPrice()} Eur</td>
                  <td>${dish.getDescription()}</td>
                  <td> 
                    <button data-dish-id ='${dish.getId()}'  class="action-btn edit-button" >
                      <img src='../assets/img/edit.png' width='25'>
                    </button>

                    <button data-dish-id ='${dish.getId()}'  class="action-btn delete-button" >
                      <img src='../assets/img/delete.png' width='25'>
                    </button>                
                  </td>
                </tr>
            `});
    });

    const uncategorizedDishes = menu.getAllDishes().filter(dish => dish.getCategory() === 'Nėra kategorijos')
    console.log(uncategorizedDishes);

    if (uncategorizedDishes.length > 0){
      htmlContent += `
      <tr>
          <th>Kategorija</th>
          <th colspan='3'>Be Kategorijos</th>
      </tr>
    `;
    uncategorizedDishes.forEach(dish => {
      htmlContent += `
          <tr>
              <td>${dish.getName()}</td>
              <td>${dish.getPrice()} Eur</td>
              <td>${dish.getDescription()}</td>
              <td> 
                <button data-dish-id ='${dish.getId()}'  class="action-btn edit-button" >
                  <img src='../assets/img/edit.png' width='25'>
                </button>

                <button data-dish-id ='${dish.getId()}'  class="action-btn delete-button" >
                  <img src='../assets/img/delete.png' width='25'>
                </button>                
              </td>
          </tr>
      `});
    } else {
      htmlContent += `
      <tr>
          <td colspan='4'>Patekalų be kategorijos nėra</td>
      </tr>
      `
    }
    htmlContent += `</table>`
   contentElement.innerHTML = htmlContent;

   const editButtons = contentElement.querySelectorAll('.edit-button');
   editButtons.forEach(button => {
     button.addEventListener('click', (e) => {

       const dishId = e.target.closest('button').dataset.dishId;
   
       if(dishId){
         UI.displayDishForm(menu, contentElement, dishId);
       }
    });
  });

  const deleteButtons = contentElement.querySelectorAll('.delete-button');
  deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const dishId = e.target.closest('button').dataset.dishId;

      if(confirm('Ar tikrai norite ištrinti patiekalą?')){
        console.log(dishId);
        menu.removeDish(dishId);
        UI.displayDishList(menu, contentElement);
      }
      UI.displayDishList(menu, contentElement);

    });
  });

}

// -----------------------------------------------
// PATIEKALŲ FORMOS RODYMAS
// -----------------------------------------------

static displayDishForm(menu, contentElement, dishId = null) {

  const dish = menu.getAllDishes().find(dish => dish.getId() === parseInt(dishId));

  console.log(dish);

  let title = 'Pridėti naują Patiekalą';
  let btnText = 'Išsaugoti Patiekalą';
  let dishName = '';
  let dishPrice = '';
  let dishDescription = '';
  let id = '';

  if(dish){
    title = 'Redaguoti Patiekalą';
    btnText = 'Atnaujinti Patiekalą';
    dishName = dish.getName();
    dishPrice = dish.getPrice();
    dishDescription = dish.getDescription();
    id = dish.getId();
  } 

  contentElement.innerHTML = `
        <h2>${title}</h2>
        <form id="dishForm" class="addForm">
            <label for="dishName">Pavadinimas:</label>
            <input type="text" id="dishName" required  value='${dishName}'/>

            <label for="dishPrice">Kaina:</label>
            <input type="text" id="dishPrice" required value='${dishPrice}'/>

            <label for="dishDescription">Aprašymas:</label>
            <textarea name="description" id="dishDescription" rows="5" cols="30">${dishDescription}</textarea>
            
            <label for="categorySelect">Pasirinkite kategoriją:</label>
            <select id='categorySelect'>
                <option value='' ${id === '' ? 'selected' : ''}>Pasirinkite Kategoriją:</option>
            ${ console.log('ku ku')}
                ${(() =>{
                  const dishCategoryId = (dish && dish.getCategoryObj() )? dish.getCategoryObj().getId() : null;
                  console.log('bu bu')
                  return menu
                          .getCategories()
                          .map(
                            (cat) =>
                            `<option value='${cat.getId()}' ${dishCategoryId === cat.getId() ? 'selected' : ''}>${cat.getCategoryName()}</option>`
                    );
                  })() }
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

    if(dish){
      dish.setName(dishName);
      dish.setPrice(dishPrice);
      dish.setDescription(dishDescription);

      const oldCategory = dish.getCategoryObj();
      
      const newCategory = menu.editCategory(dishCategoryId);
      
      if (oldCategory && oldCategory.getId() !== newCategory.getId()){
        oldCategory.removeDish(dish);
      }

      newCategory.addDish(dish)
      
      dish.setCategory(newCategory);
      UI.displayDishList(menu, contentElement);
    } else {
      menu.addDish(dishName, dishPrice, dishCategoryId, dishDescription);
    }
    e.target.reset();
  });
}

}
export default UI;