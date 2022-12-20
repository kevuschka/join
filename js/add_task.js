let categoryObject;
let contactIconArray = []; //safes the indexes of the seleceted Contacts
let currentUser = {
    'name': 'Max Mustermann',
    'color': '#0190E0',
    'email': 'max.mustermann@gmail.com',
    'phone': '+490123456789',
    'abbreviation': 'MM'
}

setURL('https://gruppe-348.developerakademie.net/smallest_backend_ever');

async function initAddTask() {
    renderResponsiveHeaderTitle(); //in script.js
    await includeHTML();
    clearTask();
    setTimeout(function(){
        renderAddTask();
    }, 500);
}


//basic task structure
function clearTask() {
    task = { 
        'category': [],
        'title': '',
        'description': '',
        'process': 0,
        'subtasks': 0,
        'subtasksArray': [],
        'team': [],
        'prior': '',
        'board': 0,
        'due-date': '',
    };
}


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "assets/templates/task_form.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML += await resp.text();
        } else {
            element.innerHTML += 'Page not found';
        }
    }
}


async function renderAddTask() {
    renderCategoryDropdown();
    renderCategoryColorSelection();
    renderContactsDropdown();
    renderPrioritySelection();
}


///////////////////////// CATEGORY DROPDOWN FUNCTIONS ////////////////////////////////////

function renderCategoryDropdown() {
    let id = 'category-dropdown';
    let dropdown = document.getElementById(id);
    dropdown.innerHTML = templateDropdownNewCategory();
    for (let i = 0; i < category.length; i++) {
        dropdown.innerHTML += templateDropdownCategories(i);
    }  
}


function templateDropdownNewCategory() {
    return /*html*/ `
        <span class="dropdown-content-child" onclick="changeVisibility('category-dropdown'); changeVisibilityCategory(); focusOnInput('new-category-input'); createNewCategoryObject()">New category</span>
    `;
}


function templateDropdownCategories(i) {
    return /*html*/ `
        <div class="dropdown-content-child" onclick="changeVisibility('category-dropdown'); selectCategory('${i}')">
            ${category[i]['name']}
            <div class="category-colors" style="background-color: ${category[i]['color']}"></div>
        </div>
    `;
}


function renderCategoryColorSelection() {
    let container = document.getElementById('category-color-selection-ctn');
    container.innerHTML = '';
    for (let i = 0; i < categoryColors.length; i++) {
        container.innerHTML += templateCategoryColors(i);
    }
}


function templateCategoryColors(i) {
    return /*html*/ `
        <div onclick="changeColorSelected(${i})" id="category-color-${i}" class="category-colors category-colors-selection-section" style="background-color: ${categoryColors[i]}"></div>
    `;
}


function changeColorSelected(i) {
    changeClassOfClickedElem(i);
    changeColorInCategoryObject(i);
    removeClassOfPriorClickedElem(i);
}


function changeClassOfClickedElem(i) {
    let elem = document.getElementById('category-color-' + i)
    if (elem.classList.contains('category-colors-selected')) {
        elem.classList.remove('category-colors-selected');
    } else {
        elem.classList.add('category-colors-selected');
    }
}

//if color is already in the categoryObject, the click should remove the color; else add the color
function changeColorInCategoryObject(i) {
    if (categoryObject['color'] == categoryColors[i]) {
        categoryObject['color'] = '';
    } else {
        categoryObject['color'] = categoryColors[i];
    }
}

//if before there was another color selected before selecting this one; the prior one should loose its class
function removeClassOfPriorClickedElem(i) {
    for (let j = 0; j < categoryColors.length; j++) {
        let color = document.getElementById('category-color-' + j)
        // i!=j because otherwise you would instantly remove the class from the element you just selected
        //is only true for the element which was clicked before the current selection
        if (i != j && color.classList.contains('category-colors-selected')) { 
            color.classList.remove('category-colors-selected');
        }
    } 
}


function removeClassFromSelectedColor() {
    for (let j = 0; j < categoryColors.length; j++) {
        let color = document.getElementById('category-color-' + j)
        if (color.classList.contains('category-colors-selected')) { 
            color.classList.remove('category-colors-selected');
        }
    } 
}


function changeVisibilityCategory() {
    clearInput('new-category-input');
    changeVisibility('category-dropdown-field');
    changeVisibility('new-category-input-ctn');
    changeVisibility('category-color-selection-ctn');
}


function addNewCategory() {
    if (BothValuesAreEntered()) {
        addCategoryNameToCategoryObject()
        pushCategoryObjectToCategoryArray()
        renderCategoryDropdown();
        changeVisibilityCategory();
        selectCategory(category.length - 1);
    } else {
        alert("Please select a color and type in a category name!")
    }
}

//checks if both values of the categoryObject are filled
function BothValuesAreEntered() {
    let categoryInput = document.getElementById('new-category-input').value;
    if (categoryInput != '' && categoryObject['color'] != '') {
        return true
    }
}


function addCategoryNameToCategoryObject() {
    categoryObject['name'] = document.getElementById('new-category-input').value;
}


function pushCategoryObjectToCategoryArray() {
    category.push(categoryObject);
    saveCategoriesOnServer();
}


function saveCategoriesOnServer() {
    backend.setItem('category', JSON.stringify(category));
}


function createNewCategoryObject() {
    categoryObject = {
        'name': '',
        'color': ''
    };
}


function selectCategory(i) {
    changeCategoryDropdownText(i)
    addCategoryToTask(i)
}

function changeCategoryDropdownText(i) {
    let dropdown = document.getElementById('dropdown-text-category');
    dropdown.innerHTML = templateSelectedCategoryinDropdownField(i);
}


function templateSelectedCategoryinDropdownField(i) {
    return /*html*/ `
            ${category[i]['name']}
            <div class="category-colors" style="background-color: ${category[i]['color']}"></div>
    `;
}

function addCategoryToTask(i) {
    task['category'] = category[i];
}


///////////////////////// CONTACTS DROPDOWN FUNCTIONS ////////////////////////////////////

function renderContactsDropdown() {
    let dropdown = document.getElementById('contacts-dropdown');
    dropdown.innerHTML = templateContactsYou();
    for (let i = 0; i < contacts.length; i++) {
        dropdown.innerHTML += templateDropdownContacts(i);
    }
    dropdown.innerHTML += templateDropwdownInviteNewContact();  
}


function templateContactsYou() {
    return /*html*/ `
        <label for="checkbox-you" class="dropdown-content-child space-between">    
                <span>You</span>
                <input value="you" name="checkbox" class="contacts-cb" id="checkbox-you" type="checkbox">
        </label>
    `;
}


function templateDropdownContacts(i) {
    return /*html*/ `
        <label for="checkbox${i}" class="dropdown-content-child space-between">    
                <span>${contacts[i]['name']}</span>
                <input value="${i}" name="checkbox" class="contacts-cb" id="checkbox${i}" type="checkbox" onclick="changeDisplayInContactIconSection(${i})">
        </label>
    `;
}


//Changes if a Contacts Initials are displayed in the section below the Contact Dropdown
function changeDisplayInContactIconSection(i) {
    let index = contactIconArray.indexOf(i);
    if (ContactIsAlreadyInArray(index)) {
        removeFromContactsIconArray(index);
    } else {
        addToContactsIconArray(i);
    }
    renderContactIconSection();
}


function ContactIsAlreadyInArray(index) {
    return index > -1;
}


function removeFromContactsIconArray(index) {
    contactIconArray.splice(index, 1); 
}


function addToContactsIconArray(i) {
    contactIconArray.push(i);
}


function renderContactIconSection() {
    let container = document.getElementById('contacts-icon-section');
    container.innerHTML = '';
    for (let i = 0; i < contactIconArray.length; i++) {
        let contactIndex = contactIconArray[i] //in the contactIonArray are the indexes of the selected contacts
        container.innerHTML += templateContactIconSection(contactIndex);
    }
}


function templateContactIconSection(index) {
    return /*html*/ `
        <div class="contact-icon" style="background-color: ${contacts[index]['color']}">${contacts[index]['abbreviation']}</div>
    `;
}


function templateDropwdownInviteNewContact() {
    return /*html*/ `
        <div onclick="changeVisibilityContactSection(), focusOnInput('input-invite-contact')" class="dropdown-content-child space-between">
            <span>Invite new Contact</span>
            <img src="./assets/img/add-task-invite-icon.svg">
        </div>
    `;
}


function changeVisibilityContactSection() {
    clearInput('input-invite-contact')
    changeVisibility('invite-contact-ctn');
    changeVisibility('contacts-dropdown-ctn');
    changeVisibility('contacts-dropdown');
}


function inviteContact() {
    //TODO
}

///SHOW FIRST LETTERS PICTURE TODO

///////////////////////// PIORITY SELECTION FUNCTIONS ////////////////////////////////////

function renderPrioritySelection() {
    let container = document.getElementById('prio-container');
    for (let i = 0; i < priorities.length; i++) {
        container.innerHTML += templatePrioritySelection(i);
    }
}


function templatePrioritySelection(i) {
    return /*html*/ `
         <button type="button" class="prio-btn" id="${priorities[i]['name']}" onclick="selectPrio(${i})">
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
    let id = priorities[i]['name'];
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
        let id = priorities[j]['name'];
        let button = document.getElementById(id); 
        //i is the clicked button
        //only gets executed for the button which was selected right before button i was clicked
        if (j != i && button.hasAttribute('style')) {
            removeStyleAttributesBtn(button)
        }
    }
}


function changePrioImageToWhite(button) {
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

function changeVisibilitySubtask() {
    changeVisibility('subtask-placeholder-input-ctn');
    changeVisibility('subtask-input-ctn');
}


function clearSubtaskInput() {
    changeVisibilitySubtask();
    clearInput('subtask-input');
}


function addSubtask() {
    let input = document.getElementById('subtask-input');
    let subtask = input.value;
    if (!inputFieldIsEmpty(subtask)) {
        changeVisibilitySubtask();
        addTaskToSubtaskList(subtask);
        addSubtaskToTask(subtask);
        clearInput('subtask-input')
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


function addSubtaskToTask(subtask) {
    task['subtasksArray'].push(subtask);
    task['subtasks']++;
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
    if (window.location.pathname == '/add_task.html') {
        initAddTask();
    } else {
        closeBoardAddtaskPopup()
    }
}


///////////////////////// CREATE TASK ////////////////////////////////////

async function createTask() {
     addInputValuesToTask('title');
     addInputValuesToTask('description');
     addInputValuesToTask('due-date');
     addPriotityToTask();
     pushAssignedContactsToTask();
     pushTaskToTodo();
     clearAddTask();
     switchToBoard();
}


function addPriotityToTask() {
    for (let i = 0; i < priorities.length; i++) {
        let btn = document.getElementById(priorities[i]['name']); //id of the btns equals name of the priority
        if (btn.hasAttribute('style')) {
            task['prior'] = priorities[i];
        }
    }
}


function addInputValuesToTask(identifier) {
    task[identifier] = document.getElementById(identifier).value;
}


function pushAssignedContactsToTask() {
    let checkboxes = document.querySelectorAll('.contacts-cb:checked'); //get all selected contacts checkboxes
    for (let i = 0; i < checkboxes.length; i++) {
        if (currentUserIsSelected(checkboxes[i])) {
            addCurrentUserToTeam()
        } else {
            task['team'].push(contacts[checkboxes[i].value]); //value contains and index of the contact in the object contacts
        }
    }
}


function currentUserIsSelected(checkbox) {
    return checkbox.value == 'you';
}


function addCurrentUserToTeam() {
    //TODO
}


function pushTaskToTodo() {
    boardColumns[0].push(task);
}


function switchToBoard() {
    if (URLequalsBoardHtml()) {
        setTimeout(function (){
            window.location.href = '/board.html';     
          }, 500);
    }
}


function URLequalsBoardHtml() {
    if ('/add_task.html' == window.location.pathname) {
        return true
    }
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


function focusOnInput(id) {
    document.getElementById(id).focus();
}


function clearInput(id) {
    let elem = document.getElementById(id);
    if (elem.value != '') {
        elem.value = '';
    }
}


function waitOneSecond() {
    
}