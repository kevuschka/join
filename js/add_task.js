let dropdownCategories = ['Option 1', 'Option 2']
let dropdownContacts = ['Hans', 'Jürgen']


function renderAddTask() {
    renderCategoryDropdown();
    renderContactsDropdown();
}


///////////////////////// CATEGORY DROPDOWN FUNCTIONS ////////////////////////////////////

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


function selectCategory(categoryName) {
    changeCategoryDropdownText(categoryName)
    addCategoryToNewTask()
}


function changeCategoryDropdownText(categoryName) {
    let dropdown = document.getElementById('dropdown-text-category');
    dropdown.innerHTML = `${categoryName}`;
}

function addCategoryToNewTask() {
    //TODO
}


///////////////////////// CONTACTS DROPDOWN FUNCTIONS ////////////////////////////////////

function renderContactsDropdown() {
    let id = 'contacts-dropdown';
    let dropdown = document.getElementById(id);
    dropdown.innerHTML = templateContactsYou();
    for (let i = 0; i < dropdownContacts.length; i++) {
        let checkboxID = 'checkbox' + i;
        let contact = dropdownContacts[i];
        dropdown.innerHTML += templateDropdownContacts(contact, checkboxID);
    }
    //dropdown.innerHTML += templateDropwdownInviteNewContact();  
}


function templateContactsYou() {
    return /*html*/ `
        <label for="checkbox-you" class="dropdown-content-child">    
                <span>You</span>
                <input name="checkbox" id="checkbox-you" type="checkbox">
        </label>
    `;
}


function templateDropdownContacts(contact, checkboxID) {
    return /*html*/ `
        <label for="${checkboxID}" class="dropdown-content-child">    
                <span>${contact}</span>
                <input name="checkbox" id="${checkboxID}" type="checkbox">
        </label>
    `;
}


function templateDropwdownInviteNewContact() {
    //TODO
}


///////////////////////// BASIC FUNCTIONALITY ////////////////////////////////////

function changeVisibilityDropdown(dropdownID) {
    let dropdown = document.getElementById(dropdownID);
    if (dropdown.classList.contains('d-none')) {
        dropdown.classList.remove('d-none');
    } else {
        dropdown.classList.add('d-none');
    }
}