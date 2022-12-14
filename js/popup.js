/**
 * Prerender alle popup-windows in the popup div.
 */
function renderPopups() {
    let container = document.getElementById('popUp');
    container.innerHTML = renderHeaderMenuPopup();
    // container.innerHTML += renderTemplateTicketInfoPopup();
    container.innerHTML += templateCreatedTaskPopUp();
    // container.innerHTML += renderTemplateBoardAddtaskPopup();
}


function renderPopupsInBoard() {
    let container = document.getElementById('popUp');
    container.innerHTML = renderHeaderMenuPopup();
    container.innerHTML += renderTemplateTicketInfoPopup();
    container.innerHTML += renderTemplateBoardAddtaskPopup();
    renderPopupCreatedAddtask();
}

function renderPopupsInContacts() {
    let container = document.getElementById('popUp');
    container.innerHTML = renderHeaderMenuPopup();
    container.innerHTML += renderTemplateBoardAddtaskPopup();
    container.innerHTML += templateContactsNewContactPopup();
    renderPopupCreatedAddtask();
    let containerResp = document.getElementById('popUp-responsive');
    containerResp.innerHTML += renderContactsInfoPopupResponsive();
}


/**Logout-Popup (Header profile onclick) */
function renderHeaderMenuPopup() {
    return `<div class="header-menu-container-full absolute d-none" id="header-menu-container-full" onclick="closeHeaderMenuPopup()">
                <div class="header-menu-container absolute flex" onclick="doNotClose(event)">
                    <div class="header-menu-spacer" onclick="closeHeaderMenuPopup()"></div>
                    <div class="header-menu flex column cursor-p" onclick="closeHeaderMenuPopup()">
                        <a href="help.html" class="header-menu-item header-menu-resp d-none">Help</a>
                        <a href="legal_notice.html" class="header-menu-item header-menu-resp d-none">Legal notice</a>
                        <a href="index.html" class="header-menu-item">Log out</a>
                    </div>
                </div>
            </div>`;
}

/**
 * Adding and removing some classes for a slide-in effect when opening the header menu-popup.
 */
function openHeaderMenuPopup() {
    removeClasslist('header-menu-container-full',`d-none`);
    headerMenuPopupSlideIn();
}

/**
 * That function is for letting the header menu-popup slide in, removing the class d-none before.
 */
function headerMenuPopupSlideIn() {
    setTimeout(() => {
        addClasslist('header-menu-container-full',`header-menu-popup-slideIn`);
    }, 1);
}

/**
 * Adding and removing some classes for a slide-out effect.
 */
function closeHeaderMenuPopup() {
    removeClasslist('header-menu-container-full',`header-menu-popup-slideIn`);
    addClasslist('header-menu-container-full',`header-menu-popup-slideOut`);
    headerMenuPopupSlideOut();
}

/**
 * That function is for letting the slideout-effect happen without applying d-none first.
 */
function headerMenuPopupSlideOut() {
    setTimeout(() => {
        addClasslist('header-menu-container-full',`d-none`);
        removeClasslist('header-menu-container-full', `header-menu-popup-slideOut`); 
    }, 125);
}

//////////////////// BOARD: SEARCHBAR - FULLSCREEN POPUP AND CLOSING /////////////////////
/**
 *  That is a fullscreen transparent popup for the searchbar in section "Board", to close the searchbar-input, when clicking on the screen area
 * @returns - a fullscreen transparent (absolute) div
 */
function renderBoardSearchbarPopup() {
    return `<div class="board-header-search-popup-full absolute w-100 d-none" id="board-header-search-input-popup-full" onclick="closeBoardSearchbarPopup()"></div>`;
}


function closeBoardSearchbarPopup() {
    document.getElementById('board-header-search-input-popup').value = '';
    document.getElementById('board-header-search-input-and-results-popup').classList.add('d-none');
    document.getElementById('board-header-search-results-popup').innerHTML = '';
    document.getElementById('board-header-search-results-popup').classList.add('d-none');
    document.getElementById(`board-header-search-input-popup-full`).classList.add('d-none');
    document.getElementById(`board-header-search-container`).classList.remove('d-none');
}


//////////////////// BOARD: TICKET ONCLICK POPUP /////////////////////

function renderTemplateTicketInfoPopup() {
    return `<div class="board-ticket-info-popup-full flex fixed w-100 d-none" id="board-ticket-info-popup-full" onclick="closeTicketInfoPopup()"></div>`;
}

function renderTicketInfoPopupContainer(column, ticket) {
    let content;
    content = document.getElementById('board-ticket-info-popup-full');
    content.innerHTML = renderTemplateTicketInfoPopupContainer(column, ticket);
    renderTicketInfoPopupTeammembers(column, ticket);
    colorTicketElements(column, ticket);
    content.classList.remove('d-none');
}


function renderTemplateTicketInfoPopupContainer(column, ticket) {
    return `
        <div class="ticket-info-popup-container column flex relative" onclick="doNotClose(event)" id="ticket-info-popup-container-${column}-${ticket}">
            <div class="ticket-info-popup-inner-container flex column h-100 w-100" id="ticket-info-popup-inner-container-${column}-${ticket}">
                <div class="ticket-info-popup-wrapper w-100 flex column">
                    <div class="ticket-info-popup-category-container flex w-100">
                        <div class="ticket-info-popup-category flex">
                            <p class="h-100 cursor-d" id="ticket-info-popup-category-${column}-${ticket}">${boardColumns[column][ticket]['category']['name']}</p> 
                        </div>
                        <img class="ticket-info-popup-cross cursor-p" src="assets/img/popup-cross.png" onclick="closeTicketInfoPopup()">
                        <img class="ticket-info-popup-backArrow cursor-p" src="assets/img/back-arraw.png" onclick="closeTicketInfoPopup()">
                    </div>
                    <div class="ticket-info-popup-title flex">
                        <p class="cursor-d">${boardColumns[column][ticket]['title']}</p>
                    </div>
                    <div class="ticket-info-popup-description flex">
                        <p class="cursor-d">${boardColumns[column][ticket]['description']}</p>
                    </div>
                    <div class="ticket-info-popup-date-and-prio-and-assignedTo">
                        <div class="ticket-info-popup-date flex">
                            <p class="cursor-d">Due date:</p>
                            <p class="cursor-d">${boardColumns[column][ticket]['due-date']}</p>
                        </div>
                        <div class="ticket-info-popup-prio flex">
                            <p class="cursor-d">Priority:</p>
                            <div class="ticket-info-popup-prio-wrapper flex" id="ticket-info-popup-prio-${column}-${ticket}">
                                <p class="cursor-d">${boardColumns[column][ticket]['prior']['name']}</p>
                                <img class="ticket-info-popup-prio-image" id="ticket-info-popup-prio-image-${column}-${ticket}" src="${boardColumns[column][ticket]['prior']['image']}">
                            </div>
                        </div>
                        <div class="ticket-info-popup-assignedTo flex column" id="ticket-info-popup-assignedTo-${column}-${ticket}">
                            <p class="cursor-d">Assigned To:</p>
                        </div>
                    </div>
                </div>
                <div class="ticket-info-popup-edit-container w-100 flex">
                    <div class="ticket-info-popup-edit flex cursor-p" onclick="renderTicketInfoEditting(${column}, ${ticket})"><img src="assets/img/pencil-white.png"></div>
                </div>
                </div>
            </div>
        </div>`;
}


function renderTicketInfoEditting(column, ticket) {
    let content = document.getElementById(`ticket-info-popup-container-${column}-${ticket}`);
    content.innerHTML = `<div class="ticket-info-popup-inner-container flex column h-100 w-100" id="ticket-info-popup-inner-container-${column}-${ticket}"></div>`;
    document.getElementById(`ticket-info-popup-inner-container-${column}-${ticket}`).innerHTML = templateTicketEditing(column, ticket);
    clearContactIconArray();
    renderPrioritySelection(); //in add_task.js
    renderContactsDropdown(); //in add_task.js
    selectPrioInEditContainer(column, ticket); //in edit_task.js
    renderAlreadyAssignedContacts(column, ticket); //in edit_task.js

    // content.innerHTML += renderTicketInfoEditBtn(column, ticket);
}


function templateTicketEditing(column, ticket) {
    return /*html*/ `
    <form class="add-task-form-style-board-wrapper column flex" onsubmit="saveChanges(${column}, ${ticket}), renderTicketInfoPopupContainer(${column}, ${ticket}); return false">      
        <div class="add-task-form-style-board">
            <div class="add-task-column-left-child flex column">
                <span class=>Title</span>
                <input type="text" value="${boardColumns[column][ticket]['title']}" id="title" required class="add-task-input margin-bottom-24" placeholder="Enter a title">
            </div>
            <div class="add-task-column-left-child flex column">
                <span class=>Description</span>
                <textarea name="description" id="description" placeholder="Enter a description" class="add-task-textarea margin-bottom-24">${boardColumns[column][ticket]['description']}</textarea>
            </div>
            <div class="w-100 flex column">
                <span>Due Date</span>
                <input type="date" id="due-date" value="${boardColumns[column][ticket]['due-date']}" class="add-task-input margin-bottom-24" min="2022-10-01" max="2030-12-31">
            </div>
            <div class="w-100 flex column">
                <span>Prio</span>
                <div class="add-task-prio-container margin-bottom-24" id="prio-container"></div>
            </div>
            <div class="add-task-column-left-child flex column margin-bottom-24">
                <span class=>Assigned to</span>
                <div class="dropdown-container">
                    <div class="dropdown" id="contacts-dropdown-ctn" onclick="changeVisibility('contacts-dropdown')">
                        <span>Select contacts to assign</span>
                        <img src="./assets/img/vector_2.png">
                    </div>
                    <div class="dropdown-content max-height-176 auto d-none" id="contacts-dropdown">
                    </div>
                    <div class="input-container d-none" id="invite-contact-ctn">
                        <input class="w-100 subtask-input" id="input-invite-contact" type="email" placeholder="Contact email">
                        <div class="flex">
                            <img src="./assets/img/add_task_cancel.png" class="icon-subtask" onclick="changeVisibilityContactSection()">
                            |
                            <img src="./assets/img/add_task_check.png" class="icon-subtask" onclick="changeVisibilityContactSection(), inviteContact()">
                        </div>
                    </div>
                </div>
                <div id="contacts-icon-section" class="flex"></div>
            </div>
        </div>
        <div class="create-task-btn-container-edit">
            <button class="flex add-task-btn create-btn">
                Ok
                <img src="./assets/img/check-small.png">
            </button>     
        </div>
    </form>
    `;
}


function renderTicketInfoEditBtn(column, ticket) {
    return `
        <div class="ticket-info-popup-editting-ok-btn-container w-100 flex">
            <div class="ticket-info-popup-editting-ok-btn cursor-p flex" onclick="renderTicketInfoPopupContainer(${column}, ${ticket})">
                <p>Ok</p>
                <img src="assets/img/check-small.png">
            </div>
        </div>`;
}





function renderTicketInfoPopupTeammembers(column, ticket) {
    let content = document.getElementById(`ticket-info-popup-assignedTo-${column}-${ticket}`);
    for (let i = 0; i < boardColumns[column][ticket]['team'].length; i++) {
        content.innerHTML += `
        <div class="ticket-info-popup-member flex">
            <div class="ticket-contact ticket-info-popup-member-circle" id="ticket-info-popup-member-cicle-${column}-${ticket}-${i}">${getNameLetters(column,ticket,i)}</div>
            <p class="cursor-d">${boardColumns[column][ticket]['team'][i]['name']}</p>
        </div>`
    }
}


function colorTicketElements(column, ticket) {
    document.getElementById(`ticket-info-popup-category-${column}-${ticket}`).style.backgroundColor = `${boardColumns[column][ticket]['category']['color']}`;
    document.getElementById(`ticket-info-popup-prio-${column}-${ticket}`).style.backgroundColor = `${boardColumns[column][ticket]['prior']['color']}`;
    for (let i = 0; i < boardColumns[column][ticket]['team'].length; i++) coloringTicketInfoPopupMembers(column, ticket, i);
    document.getElementById(`ticket-info-popup-prio-image-${column}-${ticket}`).style.filter = `brightness(0) invert(1)`;
}


function coloringTicketInfoPopupMembers(column, ticket, teamMember) {
    document.getElementById(`ticket-info-popup-member-cicle-${column}-${ticket}-${teamMember}`).style.backgroundColor = `${boardColumns[column][ticket]['team'][teamMember]['color']}`;
}


function closeTicketInfoPopup() {
    document.getElementById('board-ticket-info-popup-full').classList.add('d-none');
    document.getElementById('board-ticket-info-popup-full').innerHTML = '';
    test();
}


//////////////////// CREATED TASK ANIMATION ///////////////////////////////

function templateCreatedTaskPopUp() {
    return /*html*/ `
        <div class="pop-up-created-task absolute-centered flex" id="pop-up-created-task">
            <span>Task added to board</span>
            <img src="./assets/img/board-nav-icon.png">
        </div>
    `;
}


function startSlideUPAnimation() {
    if((window.location.pathname == '/board.html') || (window.location.pathname == '/contacts.html')) {
        document.getElementById('pop-up-created-task').classList.add('create-task-animation');
        setTimeout(() => {
            endSlideUPAnimation();
        }, 1400);
    } else {
        document.getElementById('pop-up-created-task').classList.add('create-task-animation');
    }
}


function endSlideUPAnimation() {
    document.getElementById('pop-up-created-task').classList.remove('create-task-animation');
}


//////////////////// BOARD: ADD-TASK POPUP ///////////////////////////////


async function renderAddTaskInBoard() {
    document.getElementById('board-addtask-popup-content').innerHTML = '';
    await includeHTML();
    clearTask();
    clearContactIconArray();
    renderAddTask();  //in add_task.js
}


function renderTemplateBoardAddtaskPopup() {
    return `
    <div class="board-addtask-popup-full flex absolute d-none" id="board-addtask-popup-full" onclick="closeBoardAddtaskPopup()">
        <div class="board-addtask-popup flex relative" id="board-addtask-popup" onclick="doNotClose(event)">
            <div class="board-addtask-popup-header-resp w-100" id="board-addtask-popup-header-resp">
                <img class="board-addtask-popup-header-resp-image" src="assets/img/logo-big2.png">
                <button form="myform" value="update" class="board-addtask-popup-header-resp-create-btn cursor-p flex">
                    Create
                    <img src="./assets/img/check-small.png">
                </button>
            </div>
            
            <div class="board-addtask-popup-content w-100 h-100 relative" id="board-addtask-popup-content-container">
                <img class="board-addtask-popup-cross cursor-p fixed" onclick="closeBoardAddtaskPopup()" src="assets/img/popup-cross.png">
                <div w3-include-html="./assets/templates/task_form.html" class="content-container" id="board-addtask-popup-content"></div>    
            </div>
        </div>
    </div>`;
}


function renderPopupCreatedAddtask() {
    let content = document.getElementById('board-addtask-popup');
    content.innerHTML +=  templateCreatedTaskPopUp();
}


async function openBoardAddtaskPopup() {
    await renderAddTaskInBoard()
    removeClasslist(`board-addtask-popup-full`, `hideBackgroundAnimation`);
    removeClasslist(`board-addtask-popup-full`,`d-none`);
    addClasslist(`board-addtask-popup-full`,`showBackgroundAnimation`);
    addClasslist(`board-addtask-popup-full`,`opa-1`);
    boardAddtaskPopupSlideIn();
}


function boardAddtaskPopupSlideIn() {
    setTimeout(() => {
        addClasslist(`board-addtask-popup`, `board-addtask-popup-slideIn`);
    }, 10);
}


function closeBoardAddtaskPopup() {
    removeClasslist(`board-addtask-popup`,'board-addtask-popup-slideIn');
    removeClasslist(`board-addtask-popup-full`,'showBackgroundAnimation');
    boardAddtaskPopupSlideOut();
}


function closeBoardAddtaskPopupFilled() {
    setTimeout(() => {
        removeClasslist(`board-addtask-popup`,'board-addtask-popup-slideIn');
        removeClasslist(`board-addtask-popup-full`,'showBackgroundAnimation');
    }, 1000);
    setTimeout(() => {
        addClasslist(`board-addtask-popup-full`, `hideBackgroundAnimation`);
        removeClasslist(`board-addtask-popup-full`,`opa-1`);
    }, 1102);
    setTimeout(() => {
        addClasslist(`board-addtask-popup-full`, `d-none`);
    }, 1230);
    setTimeout(() => {
        document.getElementById('board-addtask-popup-content').innerHTML = ''; //wait until the window is not visible
    }, 1250);
    if (window.location.pathname == '/contacts.html') {
        setTimeout(() => {
            window.location.href = './board.html';
        }, 1250);
    }
}


function boardAddtaskPopupSlideOut() {
    if(window.innerWidth > 800) {
        setTimeout(() => {
            addClasslist(`board-addtask-popup-full`, `hideBackgroundAnimation`);
            removeClasslist(`board-addtask-popup-full`,`opa-1`);
        }, 102);
        setTimeout(() => {
            addClasslist(`board-addtask-popup-full`, `d-none`);
            document.getElementById('board-addtask-popup-content').innerHTML = '';
        }, 230);
    } else boardAddtaskNoSlide();
}


function boardAddtaskNoSlide() {
    addClasslist(`board-addtask-popup-full`, `hideBackgroundAnimation`);
    removeClasslist(`board-addtask-popup-full`,`opa-1`);
    setTimeout(() => {
        addClasslist(`board-addtask-popup-full`, `d-none`);
    }, 1);
}


//////////////////// CONTACT: CONTACT INFO POPUP (ONLY RESPONSIVE)///////////////////////////////


function renderContactsInfoPopupResponsive() {
        return `<div class="contact-info-popup-responsive-full column flex fixed w-100 d-none" id="contact-info-popup-responsive-full"></div>`;
}


function showContactInfoPopupResponsive(contact) {
    renderTemplateContactInfoPopupResp(contact);
    contactInfoPopupAbbreviationColoring(contact);
    removeClasslist('contact-info-popup-responsive-full', 'd-none');
}


function renderTemplateContactInfoPopupResp(profil) {
    let content = document.getElementById(`contact-info-popup-responsive-full`);
    content.innerHTML = templateContactInfoPopupResp(profil);
    renderTemplateContactInfoPopupInnerWrapper();
    renderTemplateContactInfoPopupRespContactInfo(profil);
}


function templateContactInfoPopupResp(member) {
    return `<p class="header-title-resp cursor-d">Kanban Project Management Tool</p>
            <div class="contact-info-popup-resp-wrapper">
                <div class="contact-info-popup-resp-inner-wrapper column flex" id="contact-info-popup-resp-inner-wrapper"></div>
                <div class="contact-info-popup-resp-pencil-wrapper flex">
                    <img class="cursor-p" src="assets/img/pencil-white.png">
                </div>
            </div>`;
}


function renderTemplateContactInfoPopupInnerWrapper() {
    let content = document.getElementById(`contact-info-popup-resp-inner-wrapper`);
    content.innerHTML = templateContactInfoPopupRespInnerWrapper();
}


function templateContactInfoPopupRespInnerWrapper() {
    return `
        <div class="contact-info-popup-resp-title column flex">
            <div class="contact-info-popup-resp-title-without-line column flex">
                <div class="contact-info-popup-resp-title-head flex">
                    <p>Contacts</p>
                    <img src="assets/img/back-arraw.png" onclick="closeContactInfoPopupResponsive()">
                </div>
                <p>Better with a team</p>
            </div>
            <img src="assets/img/linehorizontal.png">
        </div>
        <div class="contact-info-popup-resp-contactInfo column flex" id="contact-info-popup-resp-contactInfo"></div>`;
}


function renderTemplateContactInfoPopupRespContactInfo(member) {
    let content = document.getElementById(`contact-info-popup-resp-contactInfo`);
    content.innerHTML = renderTemplateContactInfoPopupAbbreviationAndName(member);
    content.innerHTML += renderTemplateContactInfoPopupTitleAndEditContactBtn(member);
    content.innerHTML += renderTemplateContactInfoPopupEmailAndPhone(member);
}


function closeContactInfoPopupResponsive() {
    addClasslist('contact-info-popup-responsive-full', 'd-none');
}

//////////////////// CONTACT: NEW CONTACT BTN - POPUP///////////////////////////////
function templateContactsNewContactPopup() {
    return `<div class="contacts-new-contact-popup-full flex absolute d-none" id="contacts-new-contact-popup-full" onclick="closeContactsNewContactPopup()">
                    <div class="contacts-new-contact-popup-container relative" id="contacts-new-contact-popup-container" onclick="doNotClose(event)"></div>
            </div>`;
}


function openContactsNewContactPopup(index = 0) {
    renderContactsNewContactPopup(index);
    removeClasslist(`contacts-new-contact-popup-full`, `hideBackgroundAnimation`);
    removeClasslist(`contacts-new-contact-popup-full`,`d-none`);
    addClasslist(`contacts-new-contact-popup-full`,`showBackgroundAnimation`);
    addClasslist(`contacts-new-contact-popup-full`,`opa-1`);
    contactsNewContactSlideIn();
}


function renderContactsNewContactPopup(index) {
    let wrapper = document.getElementById(`contacts-new-contact-popup-container`);
    wrapper.innerHTML = templateNewContactPopup(index);
    wrapper.innerHTML += templateNewContactCloseCross();
    displayBTNs(index); 
}


function templateNewContactPopup(index) {
    return `<div class="contacts-new-contact-popup flex w-100 h-100">
                <div class="contacts-new-contact-popup-darkside-title-and-logo flex column">
                    <div class="contacts-new-contact-popup-darkside-title-and-logo-container flex column">
                            <img src="assets/img/logo-big.png">
                            <p class="contacts-new-contact-popup-title d-none" id="contacts-new-contact-popup-title">Add contact</p>
                            <p class="contacts-new-contact-popup-title d-none" id="contacts-add-contact-popup-title">Edit contact</p>
                            <div class="contacts-new-contact-popup-subtitle-container d-none flex column w-100" id="contacts-new-contact-popup-subtitle-container">
                                <p class="contacts-new-contact-popup-subtitle">Tasks are better with a team!</p>
                                <img src="assets/img/underline.png">
                            </div>
                    </div>
                </div>
                <div class="contacts-new-contact-popup-form-side relative flex">
                    <div class="contacts-new-contact-popup-abbreviation-wrapper flex">
                        <div class="contacts-new-contact-popup-abbreviation d-none" id="contacts-new-contact-abbreviation">
                            <img src="assets/img/add-contact-icon.png">
                        </div>
                        <div class="contacts-new-contact-popup-abbreviation d-none" id="contacts-new-contact-abbreviation-existing-user">
                            <div class="contacts-new-contact-popup-abbreviation-container flex w-100 h-100" id="contacts-new-contact-popup-abbreviation-container">
                                <p class="flex">${contacts[index]['abbreviation']}</p>
                            </div>
                        </div>
                    </div>
                    <div class="contacts-new-contact-popup-form flex" id="contacts-new-contant-popup-form">
                        <form class="w-100" id="contacts-new-contant-popup-form-tag">
                            <div class="contacts-new-contact-popup-form-container flex column">
                                <div class="contacts-new-contact-popup-form-inputs-container flex column">
                                    <div class="contacts-new-contact-popup-form-name flex">
                                        <input type="text" id="new-contact-form-name" name="name" placeholder="Name" required>
                                        <img src="assets/img/add-contact-name-icon.png">
                                    </div>
                                    <div class="contacts-new-contact-popup-form-email flex">
                                        <input type="email" id="new-contact-form-email" name="email" placeholder="Email" required>
                                        <img src="assets/img/add-contact-email-icon.png">
                                    </div>
                                    <div class="contacts-new-contact-popup-form-phone flex">
                                        <input type="tel" id="new-contact-form-phone" name="phone" placeholder="Phone" required>
                                        <img src="assets/img/add-contact-phone-icon.png">
                                    </div>
                                </div>
                                <div class="contacts-new-contact-popup-form-btns flex" id="contacts-new-contact-popup-form-btns">
                                    <div class="new-contact-popup-form-btn-cancel cursor-p flex d-none" id="new-contact-popup-form-btn-cancel" onmouseover="changeColorOfContactsNewContactBtnCancelToLightblue()" onmouseout="changeColorOfContactsNewContactBtnCancelToBlack()" onclick="closeContactsNewContactPopup()">
                                        <p>Cancel</p>
                                        <img class="new-contact-form-btn-cancel-cross-black" id="new-contact-form-btn-cancel-cross-black" src="assets/img/add_task_cancel.png">
                                        <img class="new-contact-form-btn-cancel-cross-blue d-none" id="new-contact-form-btn-cancel-cross-blue" src="assets/img/blue-cancel-icon.png">
                                    </div>
                                    <button class="new-contact-popup-form-btn-create cursor-p flex d-none" id="new-contact-popup-form-btn-create">
                                        <p>Create contact</p>
                                        <img src="assets/img/check-small.png"> 
                                    </button>
                                    <button class="edit-contact-popup-form-btn-save cursor-p flex d-none" id="edit-contact-popup-form-btn-save">
                                        <p>Save</p>
                                    </button>
                                </div>
                            </div>
                        </form>   
                    </div> 
                </div>
            </div>`;
}


function templateNewContactCloseCross() {
    return `
        <img class="board-addtask-popup-cross cursor-p absolute" id="new-contact-popup-cross" onclick="closeContactsNewContactPopup()" src="assets/img/popup-cross.png">`;
}


function displayBTNs(index) {
    if(window.innerWidth > 800) {
        if(contacts_add) showElementsInTemplateForAddingNewContact();
        else showElementsInTemplateForEdittingContact(index);
    } else {
        if (contacts_add) showElementsInTemplateForAddingNewContact_resp();
        else showElementsInTemplateForEdittingContact(index);
    }
}

function showElementsInTemplateForAddingNewContact() {
    contacts_add = false;
    removeClasslist(`contacts-new-contact-popup-title`, `d-none`);
    removeClasslist(`contacts-new-contact-popup-subtitle-container`, `d-none`);
    removeClasslist(`contacts-new-contact-abbreviation`, `d-none`);
    removeClasslist(`new-contact-popup-form-btn-create`, `d-none`);
    removeClasslist(`new-contact-popup-form-btn-cancel`, `d-none`);
}


function showElementsInTemplateForAddingNewContact_resp() {
    contacts_add = false;
    removeClasslist(`contacts-new-contact-popup-title`, `d-none`);
    removeClasslist(`contacts-new-contact-popup-subtitle-container`, `d-none`);
    removeClasslist(`contacts-new-contact-abbreviation`, `d-none`);
    removeClasslist(`new-contact-popup-form-btn-create`, `d-none`);
}


function showElementsInTemplateForEdittingContact(index) {
    removeClasslist(`contacts-add-contact-popup-title`, `d-none`);
    removeClasslist(`contacts-new-contact-abbreviation-existing-user`, `d-none`);
    addClasslist(`contacts-new-contact-popup-form-btns`, `justify-center`)
    removeClasslist(`edit-contact-popup-form-btn-save`, `d-none`);
    fillInputFieldsOfEditContacPopupWithExistingData(index);
}


function fillInputFieldsOfEditContacPopupWithExistingData(index) {
    document.getElementById(`new-contact-form-name`).value = contacts[index]['name'];
    document.getElementById(`new-contact-form-email`).value = contacts[index]['email'];
    document.getElementById(`new-contact-form-phone`).value = contacts[index]['phone'];
}


function contactsNewContactSlideIn() {
    setTimeout(() => {
        if(window.innerWidth > 800) addClasslist(`contacts-new-contact-popup-container`, `board-addtask-popup-slideIn`);
        if(window.innerWidth < 801) addClasslist(`contacts-new-contact-popup-container`, `contacts-popup-slideIn-responsive`);
    }, 10);
}


function closeContactsNewContactPopup() {
    if(window.innerWidth > 800) removeClasslist(`contacts-new-contact-popup-container`,'board-addtask-popup-slideIn');
    if(window.innerWidth < 801) removeClasslist(`contacts-new-contact-popup-container`,'contacts-popup-slideIn-responsive');
    removeClasslist(`contacts-new-contact-popup-full`,'showBackgroundAnimation');
    contactsNewContactsPopupSlideOut();
    makeValueContactsAddToFalse();
}


function contactsNewContactsPopupSlideOut() {
        setTimeout(() => {
            addClasslist(`contacts-new-contact-popup-full`, `hideBackgroundAnimation`);
            removeClasslist(`contacts-new-contact-popup-full`,`opa-1`);
        }, 102);
        setTimeout(() => {
            addClasslist(`contacts-new-contact-popup-full`, `d-none`);
            document.getElementById('contacts-new-contact-popup-container').innerHTML = '';
        }, 230);
}


// function contactsNewContactPopupNoSlide() {
//     addClasslist(`contacts-new-contact-popup-full`, `hideBackgroundAnimation`);
//     removeClasslist(`contacts-new-contact-popup-full`,`opa-1`);
//     setTimeout(() => {
//         addClasslist(`contacts-new-contact-popup-full`, `d-none`);
//     }, 1);
// }


function closeContactsNewContactPopupFilled() {
    setTimeout(() => {
        document.getElementById(`contacts-new-contact-popup-container`).style.transition = `unset`;
        removeClasslist(`contacts-new-contact-popup-container`,'board-addtask-popup-slideIn');
        removeClasslist(`contacts-new-contact-popup-full`,'showBackgroundAnimation');
    }, 1000);
    setTimeout(() => {
        addClasslist(`contacts-new-contact-popup-full`, `hideBackgroundAnimation`);
        removeClasslist(`contacts-new-contact-popup-full`,`opa-1`);
    }, 1102);
    setTimeout(() => {
        addClasslist(`contacts-new-contact-popup-full`, `d-none`);
    }, 1230);
    setTimeout(() => {
        document.getElementById('board-addtask-popup-content').innerHTML = ''; //wait until the window is not visible
    }, 1250);
    makeValueContactsAddToFalse();
}


function changeColorOfContactsNewContactBtnCancelToLightblue() {
    addClasslist(`new-contact-form-btn-cancel-cross-black`, `d-none`);
    removeClasslist(`new-contact-form-btn-cancel-cross-blue`, `d-none`);
}


function changeColorOfContactsNewContactBtnCancelToBlack() {
    removeClasslist(`new-contact-form-btn-cancel-cross-black`, `d-none`);
    addClasslist(`new-contact-form-btn-cancel-cross-blue`, `d-none`);
}


