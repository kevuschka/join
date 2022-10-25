let dropdownCategories = ['Option 1', 'Option 2']
let dropdownContacts = ['Hans', 'Jürgen']


function renderAddTask() {
    renderAddTaskContainer()
    renderCategoryDropdown();
    renderContactsDropdown();
    renderPrio
}


function renderAddTaskContainer() {
    let container = document.getElementById('content-container');
    container.innerHTML = templateAddTask();
}


function templateAddTask() {
    return /*html*/ `
        <h1>Add Task</h1>
        <form class="content-container-child flex">
            <div class="add-task-column-left add-task-column flex column">
                <div class="add-task-column-left-child flex column">
                    <span class=>Title</span>
                    <input type="text" id="title" class="add-task-input margin-bottom-24" placeholder="Enter a title">
                </div>
                <div class="add-task-column-left-child flex column">
                    <span class=>Description</span>
                    <textarea name="description" id="description" placeholder="Enter a description" class="add-task-textarea margin-bottom-24"></textarea>
                </div>
                <div class="add-task-column-left-child flex column">
                    <span class=>Category</span>
                    <div class="dropdown-container margin-bottom-24">
                        <div class="dropdown" onclick="changeVisibilityDropdown('category-dropdown')">
                            <span id="dropdown-text-category">Select task category</span>
                            <img src="./assets/img/vector_2.png">
                        </div>
                        <div class="dropdown-content d-none" id="category-dropdown"></div>
                    </div>
                </div>
                <div class="add-task-column-left-child flex column">
                    <span class=>Assigned to</span>
                    <div class="dropdown-container">
                        <div class="dropdown" onclick="changeVisibilityDropdown('contacts-dropdown')">
                            <span>Select contacts to assign</span>
                            <img src="./assets/img/vector_2.png">
                        </div>
                        <div class="dropdown-content d-none" id="contacts-dropdown">
                        </div>
                    </div>
                </div>
            </div>
            <div class="add-task-column-right add-task-column">
                <div class="add-task-column-right-child w-100 flex column">
                    <span class=>Due Date</span>
                    <input type="date" class="add-task-input margin-bottom-24" min="2022-10-01" max="2030-12-31">
                </div>
            </div>
        </form>
    `;
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