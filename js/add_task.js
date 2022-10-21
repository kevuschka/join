let dropdownCategories = ['Option 1', 'Option 2', 'Option 3']
let dropdownContacts = ['Hans', 'Jürgen', 'Franz']


function renderAddTask() {
    renderCategoryDropdown();
   // renderContactsDropdown();
}


function renderCategoryDropdown() {
    let id = 'category-dropdown';
    let dropdown = document.getElementById(id);
    dropdown.innerHTML = templateDropdownNewCategory();
    for (let i = 0; i < dropdownCategories.length; i++) {
        let category = dropdownCategories[i];
        dropdown.innerHTML += templateDropdownCategories(category);
    }
    
}


function templateDropdownNewCategory() {
    return /*html*/ `
        <span class="dropdown-content-child" onclick="changeVisibilityDropdown('category-dropdown'); createNewCategory()">New category</span>
    `;
}


function templateDropdownCategories(category, categoryID) {
    return /*html*/ `
        <span class="dropdown-content-child" id="${categoryID}" onclick="changeVisibilityDropdown('category-dropdown'); selectCategory('${category}')">${category}</span>
    `;
}


function createNewCategory() {
    //TODO
}


function changeVisibilityDropdown(dropdownID) {
    let dropdown = document.getElementById(dropdownID);
    if (dropdown.classList.contains('d-none')) {
        dropdown.classList.remove('d-none');
    } else {
        dropdown.classList.add('d-none');
    }
}


function selectCategory(categoryName) {
    changeCategoryDropdownText(categoryName)
    //TODO
}


function changeCategoryDropdownText(categoryName) {
    let dropdown = document.getElementById('dropdown-text-category');
    dropdown.innerHTML = `${categoryName}`;
}