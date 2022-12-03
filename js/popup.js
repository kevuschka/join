/**
 * Prerender alle popup-windows in the popup div.
 */
function renderPopups() {
    let container = document.getElementById('popUp');
    container.innerHTML = renderHeaderMenuPopup();
    container.innerHTML += renderTemplateTicketInfoPopup();
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
    <div class="ticket-info-popup-container auto flex column relative" onclick="doNotClose(event)" id="ticket-info-popup-container-${column}-${ticket}">
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
        </div>`;
}


function renderTicketInfoEditting(column, ticket) {
    let content = document.getElementById(`ticket-info-popup-container-${column}-${ticket}`);
    content.innerHTML = templateTicketEditing(column, ticket);
    clearContactIconArray();
    renderPrioritySelection(); //in add_task.js
    renderContactsDropdown(); //in add_task.js
    selectPrioInEditContainer(column, ticket); //in edit_task.js
    renderAlreadyAssignedContacts(column, ticket); //in edit_task.js

    // content.innerHTML += renderTicketInfoEditBtn(column, ticket);
}


function templateTicketEditing(column, ticket) {
    return /*html*/ `
    <form class="add-task-form-style-board-wrapper column flex" onsubmit="saveChanges(${column}, ${ticket}), renderTicketInfoPopupContainer(${column}, ${ticket}) clearContactIconArray(); return false">      
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
    if(window.location.pathname == '/board.html') {
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
                <img class="board-addtask-popup-cross cursor-p absolute" onclick="closeBoardAddtaskPopup()" src="assets/img/popup-cross.png">
                <div w3-include-html="./assets/templates/task_form.html" class="add-task-container" id="board-addtask-popup-content"></div>    
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
        document.getElementById('board-addtask-popup-content').innerHTML = ''; //to wait until the window is not visible
    }, 1250);
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
