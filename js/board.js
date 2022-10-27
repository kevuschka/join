let title;
let description;
let state;

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
    'prior': 'assets/img/green.png',
    'board': 0
}]

let todo = [
    {
        'category': [{'name': 'design','color': '#FF7A00'}],
        'title': 'Website redesign',
        'description': "Modify the contents of the main website. Adjust the UI to the company's brand design.",
        'process': '0/2',
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
        'prior': 'assets/img/green.png',
        'board': 0
    }
]

let progress = []

let feedback = []

let done = []
let boardColumns = [todo, progress, feedback, done];
let boardColumnTitle = ['To do', 'In progress', 'Awaiting Feedback', 'Done'];
let emptyBoardColumn = ['No task to do', 'Nothing in progess', 'No Feedback awaiting', 'Nothing here'];

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
                            <div class="board-content flex" id="board-content">
                                <div class="board-column flex column">
                                    <div class="board-column-header flex cursor-p">
                                        <p>To do</p>
                                        <img class="board-column-header-plus" src="assets/img/plus-icon-big.png">
                                    </div>
                                    <div class="board-tickets flex column" id="board-0">
                                        <div class="ticket-container flex column cursor-p">
                                            <div class="ticket-category-container flex">
                                                <p class="ticket-category">Design</p>
                                            </div>
                                            <div class="ticket-description-container flex column">
                                                <p class="ticket-description-title">Website redesign</p>
                                                <div class="ticket-description">
                                                    Modify the contents of the main website. Adjust the
                                                    UI to the company's brand design.
                                                </div>
                                            </div>
                                            <div class="process-bar-container flex">
                                                <div class="process-bar"></div>
                                                <div class="process-state">0/2 Done</div>
                                            </div>
                                            <div class="ticket-footer-container flex">
                                                <div class="ticket-contacts-container flex">
                                                    <div class="ticket-contact" id="board-contact-0">SM</div>
                                                    <div class="ticket-contact" id="board-contact-1">MV</div>
                                                    <div class="ticket-contact" id="board-contact-2">EF</div>
                                                </div>
                                                <img class="state-img" src="assets/img/green.png">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="board-column flex column">
                                    <div class="board-column-header flex cursor-p">
                                        <p>In progress</p>
                                        <img class="board-column-header-plus" src="assets/img/plus-icon-big.png">
                                    </div>
                                    <div class="board-tickets flex column" id="board-1"></div>
                                </div>
                                <div class="board-column flex column">
                                    <div class="board-column-header flex cursor-p">
                                        <p>Awaiting Feedback</p>
                                        <img class="board-column-header-plus" src="assets/img/plus-icon-big.png">
                                    </div>
                                    <div class="board-tickets flex column" id="board-2"></div>
                                </div>
                                <div class="board-column flex column">
                                    <div class="board-column-header flex cursor-p">
                                        <p>Done</p>
                                        <img class="board-column-header-plus" src="assets/img/plus-icon-big.png">
                                    </div>
                                    <div class="board-tickets flex column" id="board-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>`;
}


function renderBoardContent() {
    let content = document.getElementById('board-content');
    content = '';
    for (let i = 0; i < boardColumns.length; i++) {
        content.innerHTML += renderTemplateBoardColumn(i);
        renderTickets(i);
    }
}


function renderTemplateBoardColumn(i) {
    return `<div class="board-column flex column">
                <div class="board-column-header flex cursor-p">
                    <p>${boardTitle[i]}</p>
                    <img class="board-column-header-plus" src="assets/img/plus-icon-big.png">
                </div>
                <div class="board-tickets flex column" id="board-column-${i}"></div>
            </div>`;
}


function renderBoardColumnContent(n) {
    let content = documnet.getElementById(`board-column-${n}`);
    content.innerHTML = '';
    if(n > 0) renderTemplateOnholdTicketResponsive(content);
    if(boardColumns[n].length > 0) {
    for (let j = 0; j < boardColumns[n].length; j++) {
        content.innerHTML += renderTemplateTicket(n,j);
    }
    } else content.innerHTML = `<p class="noTask cursor-d w-100 d-none">${boardColumnTitle[n]}</p>`;
}


function renderTemplateOnholdTicketTarget() {
    let content;
    for (let i = 1; i < boardColumns.length; i++) {
        content = document.getElementById(`board-column-${i}`);
        content.innerHTML += `<div class="onhold-container onhold-container-last w-100"></div>`;
    }
}

function renderTemplateOnholdTicketResponsive(content) {
    content.innerHTML += `<div class="onhold-container onhold-container-first w-100"></div>`;
}


function pressAction() {
    if(hold) {

    }
}


// function renderTickets(i) {
//     renderTemplateTickets(i);
//     let boardColumnContent = document.getElementById(`board-column-${i}`);
//     for (let index = 0; i < boardColumns.length; i++) {
//         for (let j = 0; j < boardColumns[i].length; j++) {
            
            
//             boardColumnContent += boardColumns[i][j];
            
//         } boardColumns[i].length
        
//     }
// }

function renderTemplateTickets(i) {
    let content = documnet.getElementById(`board-column-${i}`)
        if(boardColumns[i].length > 0) {
            for (let j = 0; j < boardColumns[i].length; j++) {
                content.innerHTML += renderTemplateTicket(i,j);
            }
        }        
}

function renderTemplateTicket(i,j) {
    return `<div class="ticket-container flex column cursor-p">
                <div class="ticket-category-container flex">
                    <p class="ticket-category">${boardColumns[i][j]['category']}</p>
                </div>
                <div class="ticket-description-container flex column">
                    <p class="ticket-description-title">${boardColumns[i][j]['title']}</p>
                    <div class="ticket-description">
                        ${boardColumns[i][j]['description']}
                    </div>
                </div>
                <div class="process-bar-container flex">
                    <div class="process-bar"></div>
                    <div class="process-state">0/2 Done</div>
                </div>
                <div class="ticket-footer-container flex">
                    <div class="ticket-contacts-container flex">
                        <div class="ticket-contact" id="board-contact-0">SM</div>
                        <div class="ticket-contact" id="board-contact-1">MV</div>
                        <div class="ticket-contact" id="board-contact-2">EF</div>
                    </div>
                    <img class="state-img" src="assets/img/green.png">
                </div>
            </div>`;
}

function renderTicketCategory() {

}

// let task = [{
//     'category': '',
//     'title': 'Website redesign',
//     'description': "Modify the contents of the main website. Adjust the UI to the company's brand design.",
//     'process': 0,
//     'subtasks': 2,
//     'team': [],
//     'prior': 'assets/img/green.png',
//     'board': 0
// }]