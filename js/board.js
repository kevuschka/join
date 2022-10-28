let title;
let description;
let state;

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


let category = [{
    'name': 'design',
    'color': '#FF7A00'
}];


let contacts = [{
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
}];


let task = [{
    'category': [],
    'title': 'Website redesign',
    'description': "Modify the contents of the main website. Adjust the UI to the company's brand design.",
    'process': 0,
    'subtasks': 2,
    'team': [],
    'prior': [],
    'board': 0
}]

let todo = [
    {
        'category': {'name': 'design','color': '#FF7A00'},
        'title': 'Website redesign',
        'description': "Modify the contents of the main website. Adjust the UI to the company's brand design.",
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
            }
        ],
        'prior': {
            'name': 'Low',
            'image': 'assets/img/green.png',
            'color': '#7AE229'
        },
        'board': 0
    }
]

let progress = []

let feedback = []

let done = []
let boardColumns = [todo, progress, feedback, done];
let boardColumnTitle = ['To do', 'In progress', 'Awaiting Feedback', 'Done'];
let emptyBoardColumn = ['No task to do', 'Nothing in progess', 'No Feedback awaiting', 'Nothing here'];


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
                                    <div class="board-header-search-container flex">
                                        <div class="board-header-search-input-container">
                                            <div class="board-header-search-input"></div>
                                        </div>
                                        <img class="board-search-icon cursor-p" src="assets/img/search-icon.png">
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


function renderBoardContent() {
    let content = document.getElementById('board-content');
    content.innerHTML = '';
    for (let i = 0; i < boardColumns.length; i++) {
        content.innerHTML += renderTemplateBoardColumn(i);
        renderBoardColumnContent(i);
    }
}


function renderTemplateBoardColumn(i) {
    return `<div class="board-column flex column">
                <div class="board-column-header flex cursor-p">
                    <p>${boardColumnTitle[i]}</p>
                    <img class="board-column-header-plus" src="assets/img/plus-icon-big.png">
                </div>
                <div class="board-tickets flex column" id="board-column-${i}"></div>
            </div>`;
}


function renderBoardColumnContent(n) {
    let content = document.getElementById(`board-column-${n}`);
    content.innerHTML = '';
    if(boardColumns[n].length > 0) {
        if(n > 0) renderTemplateOnholdTicketResponsive(content);
        for (let j = 0; j < boardColumns[n].length; j++) {
            content.innerHTML += renderTemplateTicket(n,j);
            renderTicketContent(n,j);
        }
    } else content.innerHTML = `<p class="noTask cursor-d w-100 d-none">${boardColumnTitle[n]}</p>`;
}


function renderTemplateOnholdTicketResponsive(content) {
    content.innerHTML += `<div class="onhold-container onhold-container-first w-100"></div>`;
}


function renderTemplateTicket(n,j) {
    return `<div class="ticket-container flex column cursor-p" id="ticket-container-${n}-${j}"></div>`;
}

// ==========================>>
function renderTicketContent(n, j) {
    renderTemplateTicketCategory(n,j);
    renderTemplateTicketDescription(n,j);
    renderTemplateTicketProgressbar(n,j);
    renderTemplateTicketFooter(n,j);
    renderTicketTeam(n,j);
}


function renderTemplateTicketCategory(n,j) {
    let ticketContent = document.getElementById(`ticket-container-${n}-${j}`);
    ticketContent.innerHTML += `
        <div class="ticket-category-container flex">
            <p class="ticket-category">${boardColumns[n][j]['category']['name']}</p>
        </div>`;
}


function renderTemplateTicketDescription(n,j) {
    let ticketContent = document.getElementById(`ticket-container-${n}-${j}`);
    ticketContent.innerHTML += `
        <div class="ticket-description-container flex column">
            <p class="ticket-description-title">${boardColumns[n][j]['title']}</p>
            <div class="ticket-description">
                ${boardColumns[n][j]['description']}
            </div>
        </div>`;
}


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
// <<===============================

// TICKET TEAM
function renderTicketTeam(n,j) {
    let content = document.getElementById(`ticket-contacts-container-${n}-${j}`);
    for (let i = 0; i < boardColumns[n][j]['team'].length; i++) {
        content.innerHTML += `<div class="ticket-contact" id="board-contact-${n}-${j}-${i}">${getnameLetters(n,j,i)}</div>`;
        coloringTicketMembers(n,j,i);
    }
}


function coloringTicketMembers(column, ticket, teamMember) {
    document.getElementById(`board-contact-${column}-${ticket}-${teamMember}`).style.backgroundColor = `${boardColumns[column][ticket]['team'][teamMember]['color']}`;
}


function getnameLetters(column, ticket, teamMember) {
    let name = boardColumns[column][ticket]['team'][teamMember]['name'];
    let firstLetter = name.toString().charAt(0);  
    let index = name.indexOf(' '); 
    let secondLetter = name.toString().charAt(index+1);
    return firstLetter + secondLetter;
}


function renderOnholdTicketTarget(k) {
    let content;
    if(k < 3) {
        for (let i = (k+1); i < boardColumns.length; i++) {
            if(boardColumns[i].length > 0) {       //So when the column is empty, there will be only the empty sign, no addition signs
                content = document.getElementById(`board-column-${i}`);
                content.innerHTML += `<div class="onhold-container onhold-container-last w-100"></div>`;
            }
        }
    }
}








// let task = [{
//     'category': '',
//     'title': 'Website redesign',
//     'description': "Modify the contents of the main website. Adjust the UI to the company's brand design.",
//     'progress': 0,
//     'subtasks': 2,
//     'team': [],
//     'prior': [],
//     'board': 0
// }]

// function renderTickets(i) {
//     renderTemplateTickets(i);
//     let boardColumnContent = document.getElementById(`board-column-${i}`);
//     for (let index = 0; i < boardColumns.length; i++) {
//         for (let j = 0; j < boardColumns[i].length; j++) {
            
            
//             boardColumnContent += boardColumns[i][j];
            
//         } boardColumns[i].length
        
//     }
// }

// function renderTemplateTickets(i) {
//     let content = documnet.getElementById(`board-column-${i}`)
//         if(boardColumns[i].length > 0) {
//             for (let j = 0; j < boardColumns[i].length; j++) {
//                 content.innerHTML += renderTemplateTicket(i,j);
//             }
//         }        
