let dropdownCategories = ['Option 1', 'Option 2']
let dropdownContacts = ['Hans', 'Jürgen']
let priorities = [
    {
        'name': 'Urgent',
        'image': './assets/img/red-prio.svg',
        'color': '#FF3D00'
    },
    {
        'name': 'Medium',
        'image': './assets/img/orange-prio.svg',
        'color': '#FFA800'
    },
    {
        'name': 'Low',
        'image': './assets/img/green-prio.svg',
        'color': '#7AE229'
    }
]



function renderAddTask() {
    renderAddTaskContainer()
    renderCategoryDropdown();
    renderContactsDropdown();
    renderPrioritySelection();
}


function renderAddTaskContainer() {
    let container = document.getElementById('content-container');
    container.innerHTML = templateAddTask();
}


function templateAddTask() {
    return /*html*/ `
        <h1>Add Task</h1>
        <form onsubmit="addToTodo(); return false" class="content-container-child flex">
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
                        <div class="dropdown" onclick="changeVisibility('category-dropdown')">
                            <span id="dropdown-text-category">Select task category</span>
                            <img src="./assets/img/vector_2.png">
                        </div>
                        <div class="dropdown-content d-none" id="category-dropdown"></div>
                    </div>
                </div>
                <div class="add-task-column-left-child flex column">
                    <span class=>Assigned to</span>
                    <div class="dropdown-container">
                        <div class="dropdown" onclick="changeVisibility('contacts-dropdown')">
                            <span>Select contacts to assign</span>
                            <img src="./assets/img/vector_2.png">
                        </div>
                        <div class="dropdown-content d-none" id="contacts-dropdown">
                        </div>
                    </div>
                </div>
            </div>
            <div class="add-task-column-right add-task-column">
                <div class="w-100 flex column">
                    <span>Due Date</span>
                    <input type="date" id="due-date" class="add-task-input margin-bottom-24" min="2022-10-01" max="2030-12-31">
                </div>
                <div class="w-100 flex column">
                    <span>Prio</span>
                    <div class="add-task-prio-container margin-bottom-24" id="prio-container"></div>
                </div>
                <div class="w-100 flex column margin-bottom-24">
                    <span>Subtasks</span>
                    <div class="w-100 subtask-input-container">    
                        <input type="text" id="subtask-input" class="w-100" placeholder="Add new subtask" maxlength="50">
                        <img src="./assets/img/add_task_plus_icon.png" id="subtask-add-icon" class="icon-subtask" onclick="changeVisibilitySubtasks()">
                        <div class="flex d-none" id="subtask-accept-delete-section">
                            <img src="./assets/img/add_task_cancel.png" class="icon-subtask" onclick="clearSubtaskInput()">
                            |
                            <img src="./assets/img/add_task_check.png" class="icon-subtask" onclick="addSubtask()">
                        </div>
                    </div>
                    <ul class="flex column" id="subtask-list-container"></ul>
                </div>
            </div>
            <div></div>
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
        <span class="dropdown-content-child" onclick="changeVisibility('category-dropdown'); createNewCategory()">New category</span>
    `;
}


function templateDropdownCategories(category, categoryID) {
    return /*html*/ `
        <span class="dropdown-content-child" id="${categoryID}" onclick="changeVisibility('category-dropdown'); selectCategory('${category}')">${category}</span>
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


///////////////////////// PIORITY SELECTION FUNCTIONS ////////////////////////////////////

function renderPrioritySelection() {
    let container = document.getElementById('prio-container');
    for (let i = 0; i < priorities.length; i++) {
        container.innerHTML += templatePrioritySelection(i);
    }
}


function templatePrioritySelection(i) {
    return /*html*/ `
         <button class="prio-btn" id="prio-btn-${i}" onclick="selectPrio(${i})">
            ${priorities[i]['name']}
            <img src="${priorities[i]['image']}">
        </button>
    `;
}


function selectPrio(i) {
    changeSelectedPrioBtn(i);
    resetOtherPrioBtns(i);
}


function changeSelectedPrioBtn(i) {
    let id = 'prio-btn-' + i;
    let button = document.getElementById(id);
    if (!button.hasAttribute('style')) {
        changePrioImageToWhite(button, i);
        changePrioBtnColors(button, i);
    } else {
        removeStyleAttributesBtn(button)
    }
}


function resetOtherPrioBtns(i) {
    for (let j = 0; j < priorities.length; j++) {
        let id = 'prio-btn-' + j;
        let button = document.getElementById(id); 
        //i is the clicked button
        //only gets executed for the button which was selected right before button i was clicked
        if (j != i && button.hasAttribute('style')) {
            removeStyleAttributesBtn(button)
        }
    }
}


function changePrioImageToWhite(button, i) {
    button.lastElementChild.style.filter = 'brightness(0) invert(1)'   
}


function changePrioBtnColors(button, i) {
    button.style.backgroundColor = `${priorities[i]['color']}`;
    button.style.color = 'white';
}


function removeStyleAttributesBtn(button) {
    button.removeAttribute('style');
    button.lastElementChild.removeAttribute('style');
}


///////////////////////// SUBTASK FUNCTIONS ////////////////////////////////////

function changeVisibilitySubtasks() {
    changeVisibility('subtask-add-icon');
    changeVisibility('subtask-accept-delete-section');
}


function clearSubtaskInput() {
    changeVisibilitySubtasks();
    let input = document.getElementById('subtask-input');
    clearInput(input);
}


function addSubtask() {
    let input = document.getElementById('subtask-input');
    let task = input.value;
    if (!inputFieldIsEmpty(task)) {
        changeVisibilitySubtasks();
        addTaskToSubtaskList(task);
        clearInput(input)
    }
}


function inputFieldIsEmpty(input) {
    return input == '';
}


function addTaskToSubtaskList(task) {
    let container = document.getElementById('subtask-list-container');
    container.innerHTML += templateSubtaskList(task);
}


function templateSubtaskList(task) {
    return /*html*/ `
        <li class="subtask-list-entry flex"><input class="subtask-checkbox" type="checkbox">${task}</li>
    `;
}


///////////////////////// CREATE TASK ////////////////////////////////////

function addToTodo() {
    //TODO
}


///////////////////////// GENERAL FUNCTIONS////////////////////////////////////

function changeVisibility(id) {
    let dropdown = document.getElementById(id);
    if (dropdown.classList.contains('d-none')) {
        dropdown.classList.remove('d-none');
    } else {
        dropdown.classList.add('d-none');
    }
}


function clearInput(id) {
    id.value = '';
}