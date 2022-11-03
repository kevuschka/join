let dropdownCategories = [
    {
    'name': 'design',
    'color': '#FF7A00'
    },
    {
    'name': 'Development',
    'color': '#FF7A00'
    },
]
let dropdownContacts = ['Hans', 'Jürgen'];

async function renderAddTask() {
    renderCategoryDropdown();
    renderContactsDropdown();
    renderPrioritySelection(); 
    //eventlistenerSubtaskInput();
}


///////////////////////// CATEGORY DROPDOWN FUNCTIONS ////////////////////////////////////

function renderCategoryDropdown() {
    let id = 'category-dropdown';
    let dropdown = document.getElementById(id);
    dropdown.innerHTML = templateDropdownNewCategory();
    for (let i = 0; i < dropdownCategories.length; i++) {
        dropdown.innerHTML += templateDropdownCategories(i);
    }  
}


function templateDropdownNewCategory() {
    return /*html*/ `
        <span class="dropdown-content-child" onclick="changeVisibility('category-dropdown'); createNewCategory()">New category</span>
    `;
}


function templateDropdownCategories(i) {
    return /*html*/ `
        <span class="dropdown-content-child" onclick="changeVisibility('category-dropdown'); selectCategory('${i}')">${dropdownCategories[i]['name']}</span>
    `;
}


function createNewCategory() {
    //TODO
}


function selectCategory(i) {
    changeCategoryDropdownText(dropdownCategories[i]['name'])
    addCategoryToTask(i)
}


function changeCategoryDropdownText(categoryName) {
    let dropdown = document.getElementById('dropdown-text-category');
    dropdown.innerHTML = `${categoryName}`;
}

function addCategoryToTask(i) {
    task['category'] = dropdownCategories[i]['name'];
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


//in order to change the buttons by clicking on the input field
function eventlistenerSubtaskInput() {
    let subtaskInput = document.getElementById('subtask-input');
    while (true) {
        subtaskInput.addEventListener('focus', function() { 
            changeVisibilitySubtasks();
        });
        subtaskInput.addEventListener('blur', function() { 
            changeVisibilitySubtasks();
        });
    }
}

///////////////////////// BOTTOM BUTTONS SECTION ////////////////////////////////////

function clearImageToLightBlue() {
    let img = document.getElementById('clear-image');
    img.src = './assets/img/blue-cancel-icon.png'
}


function clearImageToDarkBlue() {
    let img = document.getElementById('clear-image');
    img.src = './assets/img/clear-x-icon.png'
}


function clearAddTask() {
    clearVariableTask()
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