let createdTask = {
    'category': {'name': 'Design','color': '#FF7A00'},
    'title': 'Website redesign',
    'description': "Modify the contents of the main website. Adjust the UI to the company's brand design.",
    'progress': 0,
    'subtasks': 1,
    'team': [
        {
            'name': 'Simon Meyer',
            'color': '#0190E0',
            'email': 'simon.meyer@gmail.com',
            'phone': '+49 0123 456 78 9'
        },{
            'name': 'Maximilian Vogel',
            'color': '#EE00D6',
            'email': 'maximilian.vogel@gmail.com',
            'phone': '+49 0123 456 78 9'
        }
    ],
    'prior': {
        'name': 'Low',
        'image': 'assets/img/green.png',
        'color': '#7AE229'
    },
    'board': 0
};


let createdTask2 = {
    'category': {'name': 'Media','color': '#29ABE2'},
    'title': 'New Interview',
    'description': "Making an interview with someone on the planet earth.",
    'progress': 0,
    'subtasks': 2,
    'team': [
        {
            'name': 'Simon Meyer',
            'color': '#0190E0',
            'email': 'simon.meyer@gmail.com',
            'phone': '+49 0123 456 78 9'
        },{
            'name': 'Maximilian Vogel',
            'color': '#EE00D6',
            'email': 'maximilian.vogel@gmail.com',
            'phone': '+49 0123 456 78 9'
        },{
            'name': 'Eva Fischer',
            'color': '#02CF2F',
            'email': 'Eva.Fischer@gmail.com',
            'phone': '+49 0123 456 78 9'
        },{
            'name': 'Kevin Schumilo',
            'color': '#02CF2F',
            'email': 'Eva.Fischer@gmail.com',
            'phone': '+49 0123 456 78 9'
        }
    ],
    'prior': {
        'name': 'Urgent',
        'image': './assets/img/red-prio.svg',
        'color': '#FF3D00'
    },
    'board': 0,
    'due-date': ''
};


let boardColumnTitle = ['To do', 'In progress', 'Awaiting Feedback', 'Done'];
let emptyBoardColumn = ['No task to do', 'Nothing in progess', 'No Feedback awaiting', 'Nothing here'];
let currentElementTicket;
let currentElementColumn;

let currentElement;

function addTast() {
    todo.push(createdTask); // beide JSON dürfen vom Namen nicht gleich sein! sonst haben sie den selben Pointer
    todo.push(createdTask2);
}

function test() {
    templateBoard();
    renderBoardContent();
}


function templateBoard() {
    renderResponsiveHeaderTitle();
    let content = document.getElementById('content-container');
    content.innerHTML += `
                    <div class="board-wrapper">
                        <div class="board-container flex column">
                            <div class="board-header flex">
                                <div class="board-header-left flex">
                                    <p>Board</p>
                                    <img class="board-header-addTask-button-resp cursor-p d-none" src="assets/img/board-add-task-icon.png">
                                </div>
                                <div class="board-header-right flex">
                                    <div class="board-header-search-wrapper flex">
                                        <div class="board-header-search-container flex" id="board-header-search-container" onclick="showInput()">
                                            <div class="board-header-search-input-container flex">
                                                <div class="board-header-search-input w-100"></div>
                                            </div>
                                            <img class="board-search-icon cursor-p" src="assets/img/search-icon.png">
                                        </div>
                                    </div>
                                    <div class="board-header-addTask-button flex cursor-p">
                                        <p>Add task</p>
                                        <img class="board-white-plus-image" src="assets/img/board-add-task-icon.png">
                                    </div>
                                </div>
                            </div>
                            <div class="board-content flex" id="board-content"></div>
                        </div>
                    </div>`;
}



function showInput() {
    document.getElementById(`board-header-search-container`).classList.add('d-none');
    document.getElementById(`board-header-search-input-popup-full`).classList.remove('d-none');
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


function renderTemplateBoardColumn(i) {
    return `<div class="board-column flex column">
                <div class="board-column-header flex cursor-p">
                    <p>${boardColumnTitle[i]}</p>
                    <div class="board-column-header-plus flex">+</div>
                </div>
                <div class="board-tickets w-100 flex column" id="board-column-${i}" ondrop="drop(${i})" ondragover="allowDrop(event);highlightAreas(${i})" ondragleave="removeHighlightAreas(${i})"></div>
            </div>`;
}

//<img class="board-column-header-plus" src="assets/img/plus-icon-big.png">



function renderBoardColumnContent(n) {
    let content = document.getElementById(`board-column-${n}`);
    //removeEmptyBoardColumnProperties(n);
    if(boardColumns[n].length > 0) {
        for (let j = 0; j < boardColumns[n].length; j++) {
            content.innerHTML += renderTemplateTicket(n,j);
            renderTicketContent(n,j);
        }
    }
}


////////////////// TICKET /////////////////////
// >>===============================> =======================================> ==============================================> =======================================>
function renderTemplateTicket(n,j) {
    return `<div class="ticket-container flex column cursor-p" id="ticket-container-${n}-${j}" draggable="true" ondragstart="startDragging(${n}, ${j})" onmousedown="highlightTicket(${n},${j})" onmouseup="removeHighlightTicket(${n},${j})"></div>`;
}


function renderTicketContent(n, j) {
    renderTemplateTicketCategory(n,j);
    renderTemplateTicketDescription(n,j);
    renderTemplateTicketProgressbar(n,j);
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
    if(boardColumns[n][j]['progress'] > 1) { 
        let ticketContent = document.getElementById(`ticket-container-${n}-${j}`);
        ticketContent.innerHTML += `
            <div class="process-bar-container flex" id="process-bar-container-${n}-${j}">
                <div class="process-bar"></div>
                <div class="process-state">${boardColumns[n][j]['progress']}/${boardColumns[n][j]['subtasks']} Done</div>
            </div>`;
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
    let k = boardColumns[n][j]['team'].length;
    let content = document.getElementById(`ticket-contacts-container-${n}-${j}`);
    if(boardColumns[n][j]['team'].length > 3) k = 2;
    for (let i = 0; i < k ; i++) {
        content.innerHTML += `<div class="ticket-contact" id="board-contact-${n}-${j}-${i}">${getNameLetters(n,j,i)}</div>`;
        coloringTicketMembers(n,j,i);
    }
    if(k < boardColumns[n][j]['team'].length) renderContactPlaceholder(k,n,j,content);
}


function getNameLetters(column, ticket, teamMember) {
    let name = boardColumns[column][ticket]['team'][teamMember]['name'];
    let firstLetter = name.toString().charAt(0).toUpperCase();  
    let index = name.indexOf(' '); 
    let secondLetter = name.toString().charAt(index+1).toUpperCase();
    return firstLetter + secondLetter;
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
    document.getElementById(`board-column-${n}`).classList.remove('emptyColumn');
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
    document.getElementById(`board-column-${n}`).classList.add('emptyColumn');
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
    currentElementTicket = ticket;
}


function drop(column) {
    if (currentElement['board'] != column) {
        boardColumns[currentElement['board']].splice(currentElementTicket,1);
        if(window.innerWidth > 800) pushNewElement(column);
        else unshiftNewElement(column);
        currentElement = '';
    }
    renderBoardContent();
}


function pushNewElement(column) {
    boardColumns[column].push(currentElement);
    boardColumns[column][boardColumns[column].length-1]['board'] = column; 
}


function unshiftNewElement(column) {
    boardColumns[column].unshift(currentElement);
    boardColumns[column][0]['board'] = column; 
}

////////////////// AREA & TICKET - HIGHLIGHTING //////////////////////////
function highlightAllAreas(i,column,ticket) {
    if(i != currentElement['board']) {
        document.getElementById(`onhold-container-column-${i}-last`).classList.add('highlight-area');
        if(window.innerWidth > 800 || boardColumns[i].length > 0)
            document.getElementById(`onhold-container-column-${i}-first`).classList.add('highlight-area');
        let myDiv = document.getElementById(`ticket-container-${column}-${ticket}`);
        let getHeight = myDiv.offsetHeight;
        document.getElementById(`onhold-container-column-${i}-last`).style.height = `${getHeight}px`;
    }
    removeAllHighlightAreas(i);
}


function removeAllHighlightAreas(i) {
    setTimeout( () => {
        if(i != currentElement['board']) {
            document.getElementById(`onhold-container-column-${i}-last`).classList.add('no-highlight-area');
            if(window.innerWidth > 800 || boardColumns[i].length > 0)
                document.getElementById(`onhold-container-column-${i}-first`).classList.add('no-highlight-area');
        }
    }, 600)
}


// function removeHighlighting(i) {
//     for (let i = 0; i < boardColumns.length; i++) {
//         document.getElementById(`onhold-container-column-${i}-last`).classList.remove('highlight-area');
//         document.getElementById(`onhold-container-column-${i}-first`).classList.remove('highlight-area');
//     }
// }


function highlightAreas(i) {
    if(i != currentElement['board']) {
        document.getElementById(`onhold-container-column-${i}-last`).classList.add('highlight-area-more');
        if(window.innerWidth > 800 || boardColumns[i].length > 0)
            document.getElementById(`onhold-container-column-${i}-first`).classList.add('highlight-area-more');
    }
}


function removeHighlightAreas(i) {
    document.getElementById(`onhold-container-column-${i}-last`).classList.remove('highlight-area-more');
    if(window.innerWidth > 800 || boardColumns[i].length > 0)
        document.getElementById(`onhold-container-column-${i}-first`).classList.remove('highlight-area-more');
}


function highlightTicket(column, ticket) {
    document.getElementById(`ticket-container-${column}-${ticket}`).classList.add('ticket-highlight');
}


function removeHighlightTicket(column, ticket) {
    document.getElementById(`ticket-container-${column}-${ticket}`).classList.remove('ticket-highlight');
}





