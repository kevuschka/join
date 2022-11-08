/**
 * Prerender alle popup-windows in the popup div.
 */
function renderPopups() {
    let container = document.getElementById('popUp');
    container.innerHTML = renderHeaderMenuPopup();
    container.innerHTML += renderTemplateTicketInfoPopup();
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
    slideIn();
}

/**
 * That function is for letting the header menu-popup slide in, removing the class d-none before.
 */
function slideIn() {
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
    slideOut();
}

/**
 * That function is for letting the slideout-effect happen without applying d-none first.
 */
function slideOut() {
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
    let content = document.getElementById('board-ticket-info-popup-full');
    content.innerHTML = `
        <div class="ticket-info-popup-container relative">
            <div class="ticket-info-popup-wrapper w-100 flex column">
                <div class="ticket-info-popup-category flex">
                    <p class="h-100" id="ticket-info-popup-category-${column}-${ticket}">${boardColumns[column][ticket]['category']['name']}</p>
                </div>
                <div class="ticket-info-popup-title flex">
                    <p>${boardColumns[column][ticket]['title']}</p>
                </div>
                <div class="ticket-info-popup-description flex">
                    <p>${boardColumns[column][ticket]['description']}</p>
                </div>
                <div class="ticket-info-popup-date-and-prio-and-assignedTo">
                    <div class="ticket-info-popup-date flex">
                        <p>Due date:</p>
                        <p></p>
                    </div>
                    <div class="ticket-info-popup-prio flex">
                        <p>Priority:</p>
                        <div class="ticket-info-popup-prio-wrapper flex" id="ticket-info-popup-prio-${column}-${ticket}">
                            <p>${boardColumns[column][ticket]['prior']['name']}</p>
                            <img id="ticket-info-popup-prio-image-${column}-${ticket}" src="${boardColumns[column][ticket]['prior']['image']}">
                        </div>
                    </div>
                    <div class="ticket-info-popup-assignedTo flex column" id="ticket-info-popup-assignedTo-${column}-${ticket}">
                        <p>Assigned To:</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    renderTicketInfoPopupTeammembers(column, ticket);
    colorTicketElements(column, ticket);
    document.getElementById('board-ticket-info-popup-full').classList.remove('d-none');
}





function renderTicketInfoPopupTeammembers(column, ticket) {
    let content = document.getElementById(`ticket-info-popup-assignedTo-${column}-${ticket}`);
    for (let i = 0; i < boardColumns[column][ticket]['team'].length; i++) {
        content.innerHTML += `
        <div class="ticket-info-popup-member flex">
            <div class="ticket-contact ticket-info-popup-member-circle" id="ticket-info-popup-member-cicle-${column}-${ticket}-${i}">${getNameLetters(column,ticket,i)}</div>
            <p>${boardColumns[column][ticket]['team'][i]['name']}</p>
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
}


