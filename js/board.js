let boardColumnTitle = ['To do', 'In progress', 'Awaiting Feedback', 'Done'];
let emptyBoardColumn = ['No task to do', 'Nothing in progess', 'No Feedback awaiting', 'Nothing here'];
let currentElementTicket;
let currentElement;

function renderBoard() {
    renderBoardContent();
}


function renderBoardContent() {
    let content = document.getElementById('board-content');
    content.innerHTML = '';
    for (let i = 0; i < boardColumns.length; i++) {
        content.innerHTML += renderTemplateBoardColumn(i);
        if(window.innerWidth > 800 || boardColumns[i].length > 0) renderOnholdTicketTargetResponsive(i);
        else renderBoardColumnIsEmptySign(i);
        renderBoardColumnContent(i);
    }
    renderOnholdTicketTarget();
}


function renderBoardColumnContent(n) {
    let content = document.getElementById(`board-column-${n}`);
    if(boardColumns[n].length > 0) {
        for (let j = 0; j < boardColumns[n].length; j++) {
            content.innerHTML += renderTemplateTicket(n,j);
            renderTicketContent(n,j);
        }
    }
}


////////////////// TICKET /////////////////////
// >>===============================> =======================================> ==============================================> =======================================>
/**
 * That is a template function which returns the ticket-container, where the ticket details will be rendered inside
 * @param {number} n - n is the column number starting at 0
 * @param {number} j - j is the row or the ticket-number in that column
 * @returns the ticket template
 */
function renderTemplateTicket(n,j) {
    return `<div class="ticket-container flex column cursor-p" id="ticket-container-${n}-${j}" draggable="true" ondragstart="startDragging(${n}, ${j})" onmousedown="highlightTicket(${n},${j})" onmouseup="removeHighlightTicket(${n},${j})" onclick="renderTicketInfoPopupContainer(${n}, ${j})"></div>`;
}


function renderTicketContent(n, j) {
    renderTemplateTicketCategory(n,j);
    renderTemplateTicketDescription(n,j);
    renderTemplateTicketProgressbar(n,j);
    setProgressBar(n,j);
    renderTemplateTicketFooter(n,j);
    renderTicketTeam(n,j);
}

////////////////// CATEGORY
function renderTemplateTicketCategory(n,j) {
    let ticketContent = document.getElementById(`ticket-container-${n}-${j}`);
    ticketContent.innerHTML += `
        <div class="ticket-category-container flex">
            <p class="ticket-category" id="ticket-category-${n}-${j}">${boardColumns[n][j]['category']['name']}</p>
        </div>`;
    document.getElementById(`ticket-category-${n}-${j}`).style.backgroundColor = `${boardColumns[n][j]['category']['color']}`;
}

////////////////// DESCRIPTION
function renderTemplateTicketDescription(n,j) {
    let ticketContent = document.getElementById(`ticket-container-${n}-${j}`);
    ticketContent.innerHTML += `
        <div class="ticket-description-container flex column">
            <p class="ticket-description-title">${boardColumns[n][j]['title']}</p>
                <div class="ticket-description" id="ticket-description-${n}-${j}">
                    ${boardColumns[n][j]['description']}
                </div>
        </div>`;
}

////////////////// PROGRESSBAR
function renderTemplateTicketProgressbar(n,j) {
    if(boardColumns[n][j]['subtasks'] > 0) { 
        let ticketContent = document.getElementById(`ticket-container-${n}-${j}`);
        ticketContent.innerHTML += `
            <div class="process-bar-container flex" id="process-bar-container-${n}-${j}">
                <progress class="process-bar" id="process-bar-${n}-${j}" value="" max="1"></progress>
                <div class="process-state">${boardColumns[n][j]['finished-subtasks']}/${boardColumns[n][j]['subtasks']}</div>
            </div>`;
    }
}


function setProgressBar(n,j) {
    if(boardColumns[n][j]['finished-subtasks'] > 0) {
        let progressValue = (boardColumns[n][j]['finished-subtasks']/boardColumns[n][j]['subtasks']);
        document.getElementById(`process-bar-${n}-${j}`).value = progressValue;
    }
}


function renderTemplateTicketFooter(n,j) {
    let ticketContent = document.getElementById(`ticket-container-${n}-${j}`);
    ticketContent.innerHTML += `
        <div class="ticket-footer-container flex">
            <div class="ticket-contacts-container flex" id="ticket-contacts-container-${n}-${j}"></div>
            <img class="state-img" src="${boardColumns[n][j]['prior']['image']}">
        </div>`;
}

////////////////// TEAM
function renderTicketTeam(n,j) {
    let name;
    let k = boardColumns[n][j]['team'].length;
    let content = document.getElementById(`ticket-contacts-container-${n}-${j}`);
    if(boardColumns[n][j]['team'].length > 3) k = 2;
    for (let i = 0; i < k ; i++) {
        name = boardColumns[n][j]['team'][i]['name'];
        content.innerHTML += `<div class="ticket-contact" id="board-contact-${n}-${j}-${i}">${getNameLetters(name)}</div>`;
        coloringTicketMembers(n,j,i);
    }
    if(k < boardColumns[n][j]['team'].length) renderContactPlaceholder(k,n,j,content);
}


function coloringTicketMembers(column, ticket, teamMember) {
    document.getElementById(`board-contact-${column}-${ticket}-${teamMember}`).style.backgroundColor = `${boardColumns[column][ticket]['team'][teamMember]['color']}`;
}


function renderContactPlaceholder(k,column,ticket,content) {
    if (k < boardColumns[column][ticket]['team'].length) {
        content.innerHTML += `<div class="ticket-contact contact-placeholder">+${getRestNumberOfMembers(column, ticket)}</div>`;
    }
}


function getRestNumberOfMembers(column, ticket) {
    return boardColumns[column][ticket]['team'].length - 2;
}
// <<=============================== <======================================= <============================================== <=======================================


function removeEmptyBoardColumnProperties(n) {
    removeClasslist(`board-column-${n}`, `emptyColumn`);
}


function renderTemplateOnholdTicketResponsive(content, column) {
    content.innerHTML += `<div class="onhold-container-first w-100" id="onhold-container-column-${column}-first"></div>`;
}


function renderBoardColumnIsEmptySign(n) {
    content = document.getElementById(`board-column-${n}`);
    content.innerHTML = `<p class="noTask cursor-d w-100">${emptyBoardColumn[n]}</p>`;
    emptyBoardColumnProperties(n);
}


function emptyBoardColumnProperties(n) {
    addClasslist(`board-column-${n}` ,`emptyColumn`);
}


function renderOnholdTicketTarget() {
    let content;
        for (let i = 0; i < boardColumns.length; i++) {   
                content = document.getElementById(`board-column-${i}`);
                content.innerHTML += `<div class="onhold-container-last w-100" id="onhold-container-column-${i}-last"></div>`;
        }
}

function renderOnholdTicketTargetResponsive(i) {
    let content;  
    content = document.getElementById(`board-column-${i}`);
    content.innerHTML = `<div class="onhold-container-first w-100" id="onhold-container-column-${i}-first"></div>`;
}

////////////////// DRAGGING AND DROP /////////////////////
function startDragging(column, ticket) {
    currentElement = boardColumns[column][ticket];
    for (let i = 0; i < boardColumns.length; i++) highlightAllAreas(i,column,ticket);
    for (let i = 0; i < boardColumns.length; i++) removeAllHighlightAreas(i);
    currentElementTicket = ticket;
}


async function drop(column) {
    if (currentElement['board'] != column) {
        boardColumns[currentElement['board']].splice(currentElementTicket,1);
        if(window.innerWidth > 800) pushNewElement(column);
        else unshiftNewElement(column);
        currentElement = '';
    }
    await addBoard();
    await init();
}


function allowDrop(ev) {
    ev.preventDefault();
}


function pushNewElement(column) {
    boardColumns[column].push(currentElement);
    boardColumns[column][boardColumns[column].length-1]['board'] = column; 
}


function unshiftNewElement(column) {
    boardColumns[column].unshift(currentElement);
    boardColumns[column][0]['board'] = column; 
}


////////////////// SEARCHBAR INPUT /////////////////////
function widerInputField() {
    addClasslist('board-search-icon', 'd-none');
    addClasslist(`board-header-search-input-container`, `border-none`);
}


function narrowInputField() {
    removeClasslist('board-search-icon', 'd-none');
    removeClasslist(`board-header-search-input-container`, `border-none`);
}


function searchTasks() {
    let input = document.getElementById('board-header-search-input');
    let inputComparison = input.value.toLowerCase();
    if(input.value.length > 0) filterTasks(inputComparison);
    else showAllTickets();
}


function filterTasks(inputComparison) {
    showAllTickets();
    for (let i = 0; i < boardColumns.length; i++) {
        if(boardColumns[i].length > 0) {
            for (let j = 0; j < boardColumns[i].length; j++) {
                let ticketTitle = boardColumns[i][j]['title'].toLowerCase();
                let ticketDescription = boardColumns[i][j]['description'].toLowerCase();
                if(!(ticketTitle.includes(inputComparison) || ticketDescription.includes(inputComparison))) hideTicket(i,j);
            }
        }
    }
}


function showAllTickets() {
    hiddenTickets = [];
    for (let i = 0; i < boardColumns.length; i++) {
        if(boardColumns[i].length > 0) {
            for (let j = 0; j < boardColumns[i].length; j++) {
                removeClasslist(`ticket-container-${i}-${j}`, 'd-none');
            }
        }
    }
}


function hideTicket(column, ticket) {
    addClasslist(`ticket-container-${column}-${ticket}`, 'd-none');
    hiddenTickets.push([column, ticket]);
}


function hideSomeTickets() {
    for (let i = 0; i < hiddenTickets.length; i++) {
        addClasslist(`ticket-container-${hiddenTickets[i][0]}-${hiddenTickets[i][1]}`, 'd-none');
    }
}


////////////////// AREA & TICKET - HIGHLIGHTING //////////////////////////
function highlightAllAreas(i,column,ticket) {
    if(i != currentElement['board']) {
        addClasslist(`onhold-container-column-${i}-last`, `highlight-area`);
        if(window.innerWidth > 800 || boardColumns[i].length > 0)
            addClasslist(`onhold-container-column-${i}-first`, `highlight-area`);
        let myDiv = document.getElementById(`ticket-container-${column}-${ticket}`);
        let getHeight = myDiv.offsetHeight;
        document.getElementById(`onhold-container-column-${i}-last`).style.height = `${getHeight}px`;
    }
}


function removeAllHighlightAreas(i) {
    setTimeout( () => {
        if(i != currentElement['board']) {
            addClasslist(`onhold-container-column-${i}-last`, `no-highlight-area`);
            if(window.innerWidth > 800 || boardColumns[i].length > 0)
                addClasslist(`onhold-container-column-${i}-first`, `no-highlight-area`);
        }
    }, 600)
}


function highlightAreas(i) {
    if(i != currentElement['board']) {
        addClasslist(`onhold-container-column-${i}-last`, `highlight-area-more`);
        if(window.innerWidth > 800 || boardColumns[i].length > 0)
            addClasslist(`onhold-container-column-${i}-first`, `highlight-area-more`);
    }
}


function removeHighlightAreas(i) {
    removeClasslist(`onhold-container-column-${i}-last`, `highlight-area-more`);
    if(window.innerWidth > 800 || boardColumns[i].length > 0)
        removeClasslist(`onhold-container-column-${i}-first`, `highlight-area-more`);
}


function highlightTicket(column, ticket) {
    addClasslist(`ticket-container-${column}-${ticket}`, `ticket-highlight`);
}


function removeHighlightTicket(column, ticket) {
    removeClasslist(`ticket-container-${column}-${ticket}`, `ticket-highlight`);
}




